import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadDashboardInternals() {
  const source = fs.readFileSync(new URL("./app.js", import.meta.url), "utf8").replace(/\ninit\(\);\s*$/, "\n");
  const context = { console, window: {}, globalThis: {} };
  vm.createContext(context);
  vm.runInContext(`${source}\nglobalThis.__test = { dashboards };`, context);
  return context.globalThis.__test;
}

test("debt dashboard ranks highest leverage first", () => {
  const { dashboards } = loadDashboardInternals();
  const debtDashboard = dashboards.find((item) => item.id === "debt");

  const chart = debtDashboard.primaryChart({
    filtered: [
      { symbol: "LOW", sector: "IT", debtToEquity: 0, healthScore: 80 },
      { symbol: "HIGH", sector: "Banking", debtToEquity: 12.5, healthScore: 70 },
      { symbol: "MID", sector: "NBFC", debtToEquity: 4.2, healthScore: 75 },
    ],
  });

  assert.equal(chart.values[0].label, "HIGH");
  assert.equal(chart.values[0].display, "12.5");
});
