import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import vm from "node:vm";

function loadDashboardInternals(overrides = {}) {
  const source = fs.readFileSync(new URL("./app.js", import.meta.url), "utf8").replace(/\ninit\(\);\s*$/, "\n");
  const context = { console, URL, window: {}, globalThis: {}, ...overrides };
  vm.createContext(context);
  vm.runInContext(`${source}\nglobalThis.__test = { dashboards, renderCompanyCloud, companyLogoMarkup, companyFaviconUrl, logoInitials };`, context);
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

test("company cloud renders real logo image with fallback", () => {
  const { companyLogoMarkup } = loadDashboardInternals();

  const markup = companyLogoMarkup({
    symbol: "TCS",
    companyName: "Tata Consultancy Services",
    companyLogo: "https://example.com/tcs.png",
    website: "https://www.tcs.com/",
  });

  assert.match(markup, /company-logo-tile/);
  assert.match(markup, /src="https:\/\/example.com\/tcs.png"/);
  assert.match(markup, /data-fallback-src="https:\/\/www.google.com\/s2\/favicons\?domain=www.tcs.com&amp;sz=64"/);
  assert.match(markup, /company-logo-fallback" hidden/);
  assert.match(markup, />TCS<\/strong>/);
});

test("company cloud uses website favicon when warehouse logo is missing", () => {
  const { companyLogoMarkup, companyFaviconUrl } = loadDashboardInternals();
  const company = {
    symbol: "INFY",
    companyName: "Infosys Ltd",
    companyLogo: "",
    website: "https://www.infosys.com/",
  };

  assert.equal(companyFaviconUrl(company), "https://www.google.com/s2/favicons?domain=www.infosys.com&sz=64");
  assert.match(companyLogoMarkup(company), /src="https:\/\/www.google.com\/s2\/favicons\?domain=www.infosys.com&amp;sz=64"/);
});

test("company cloud falls back to initials when logo is missing", () => {
  const { companyLogoMarkup, logoInitials } = loadDashboardInternals();
  const company = {
    symbol: "NOLOGO",
    companyName: "National Example Ltd",
    companyLogo: "",
  };

  const markup = companyLogoMarkup(company);

  assert.equal(logoInitials(company), "NE");
  assert.doesNotMatch(markup, /company-logo-tile/);
  assert.match(markup, />NE<\/span>/);
});

test("company cloud explains when only part of the universe is shown", () => {
  let html = "";
  const { renderCompanyCloud } = loadDashboardInternals({
    document: {
      getElementById() {
        return {
          set innerHTML(value) {
            html = value;
          },
        };
      },
    },
  });

  renderCompanyCloud("company-cloud", [
    { symbol: "TCS", companyName: "Tata Consultancy Services", sector: "IT", companyLogo: "", website: "" },
    { symbol: "INFY", companyName: "Infosys Ltd", sector: "IT", companyLogo: "", website: "" },
  ], true, 101);

  assert.match(html, /And many more/);
  assert.match(html, /\+99/);
  assert.match(html, /101 warehouse companies/);
});
