let companies = [
  {
    symbol: "TCS",
    companyName: "Tata Consultancy Services",
    sector: "IT",
    healthScore: 91,
    healthLabel: "EXCELLENT",
    revenue: 245000,
    roe: 46,
    opm: 25.4,
    debtToEquity: 0.04,
    salesCagr3y: 12.4,
    netProfit: 46500,
    dividendPayout: 74,
    interestCoverage: 41,
    cashConversion: 1.19,
    years: [
      { year: 2020, sales: 157000, profit: 32100, opm: 24.1, debt: 0.08, eps: 83, dividend: 52 },
      { year: 2021, sales: 164000, profit: 33800, opm: 24.5, debt: 0.07, eps: 88, dividend: 58 },
      { year: 2022, sales: 191000, profit: 38800, opm: 25.1, debt: 0.05, eps: 101, dividend: 66 },
      { year: 2023, sales: 226000, profit: 42300, opm: 25.5, debt: 0.04, eps: 111, dividend: 72 },
      { year: 2024, sales: 245000, profit: 46500, opm: 25.4, debt: 0.04, eps: 122, dividend: 74 }
    ],
    pros: ["Global delivery moat", "High cash generation", "Steady dividend profile"],
    cons: ["Moderate growth versus mid-cap IT", "Large-base acceleration is harder"]
  },
  {
    symbol: "HDFCBANK",
    companyName: "HDFC Bank",
    sector: "Banking",
    healthScore: 87,
    healthLabel: "EXCELLENT",
    revenue: 198000,
    roe: 17,
    opm: 31.2,
    debtToEquity: 6.3,
    salesCagr3y: 15.1,
    netProfit: 62100,
    dividendPayout: 22,
    interestCoverage: 8.5,
    cashConversion: 1.02,
    years: [
      { year: 2020, sales: 122000, profit: 26200, opm: 27.8, debt: 5.4, eps: 52, dividend: 16 },
      { year: 2021, sales: 132000, profit: 31700, opm: 28.4, debt: 5.8, eps: 61, dividend: 18 },
      { year: 2022, sales: 145000, profit: 38900, opm: 29.9, debt: 6.0, eps: 72, dividend: 20 },
      { year: 2023, sales: 170000, profit: 45800, opm: 30.6, debt: 6.2, eps: 83, dividend: 21 },
      { year: 2024, sales: 198000, profit: 62100, opm: 31.2, debt: 6.3, eps: 108, dividend: 22 }
    ],
    pros: ["High quality retail franchise", "Improving profitability", "Strong underwriting discipline"],
    cons: ["Leverage normal for banking but optically high", "Merger integration complexity"]
  },
  {
    symbol: "INFY",
    companyName: "Infosys",
    sector: "IT",
    healthScore: 83,
    healthLabel: "GOOD",
    revenue: 159000,
    roe: 31,
    opm: 21.3,
    debtToEquity: 0.05,
    salesCagr3y: 11.3,
    netProfit: 26700,
    dividendPayout: 63,
    interestCoverage: 35,
    cashConversion: 1.11,
    years: [
      { year: 2020, sales: 90900, profit: 16590, opm: 20.1, debt: 0.09, eps: 39, dividend: 41 },
      { year: 2021, sales: 100500, profit: 19080, opm: 21.0, debt: 0.07, eps: 45, dividend: 46 },
      { year: 2022, sales: 121600, profit: 22110, opm: 21.5, debt: 0.06, eps: 53, dividend: 52 },
      { year: 2023, sales: 146800, profit: 24570, opm: 21.8, debt: 0.05, eps: 58, dividend: 58 },
      { year: 2024, sales: 159000, profit: 26700, opm: 21.3, debt: 0.05, eps: 63, dividend: 63 }
    ],
    pros: ["Healthy margin structure", "Strong client diversification", "Reliable cash returns"],
    cons: ["Slower growth than premium IT peers", "Margin sensitivity to wage hikes"]
  },
  {
    symbol: "RELIANCE",
    companyName: "Reliance Industries",
    sector: "Energy",
    healthScore: 79,
    healthLabel: "GOOD",
    revenue: 895000,
    roe: 10,
    opm: 18.1,
    debtToEquity: 0.45,
    salesCagr3y: 14.8,
    netProfit: 79000,
    dividendPayout: 9,
    interestCoverage: 7.4,
    cashConversion: 0.94,
    years: [
      { year: 2020, sales: 540000, profit: 39800, opm: 15.8, debt: 0.71, eps: 59, dividend: 6 },
      { year: 2021, sales: 573000, profit: 49100, opm: 16.4, debt: 0.63, eps: 71, dividend: 6.5 },
      { year: 2022, sales: 689000, profit: 60700, opm: 17.3, debt: 0.54, eps: 87, dividend: 7.5 },
      { year: 2023, sales: 792000, profit: 69100, opm: 17.8, debt: 0.49, eps: 97, dividend: 8.0 },
      { year: 2024, sales: 895000, profit: 79000, opm: 18.1, debt: 0.45, eps: 108, dividend: 9.0 }
    ],
    pros: ["Diversified earnings engines", "Balance sheet improving", "Large capex optionality"],
    cons: ["Capital intensity remains high", "Returns dependent on execution across segments"]
  },
  {
    symbol: "BAJFINANCE",
    companyName: "Bajaj Finance",
    sector: "NBFC",
    healthScore: 85,
    healthLabel: "GOOD",
    revenue: 54300,
    roe: 21,
    opm: 26.8,
    debtToEquity: 4.2,
    salesCagr3y: 24.4,
    netProfit: 14550,
    dividendPayout: 14,
    interestCoverage: 5.8,
    cashConversion: 1.07,
    years: [
      { year: 2020, sales: 26100, profit: 5100, opm: 19.5, debt: 4.8, eps: 82, dividend: 8 },
      { year: 2021, sales: 26500, profit: 4410, opm: 16.6, debt: 5.1, eps: 70, dividend: 5 },
      { year: 2022, sales: 31700, profit: 7040, opm: 22.2, debt: 4.9, eps: 111, dividend: 7 },
      { year: 2023, sales: 41200, profit: 11500, opm: 27.9, debt: 4.5, eps: 181, dividend: 11 },
      { year: 2024, sales: 54300, profit: 14550, opm: 26.8, debt: 4.2, eps: 228, dividend: 14 }
    ],
    pros: ["Best-in-class growth profile", "Sharp earnings recovery", "Healthy underwriting cadence"],
    cons: ["Funding-heavy model", "Cycle risk during credit stress"]
  },
  {
    symbol: "ASIANPAINT",
    companyName: "Asian Paints",
    sector: "Consumer Goods",
    healthScore: 88,
    healthLabel: "EXCELLENT",
    revenue: 35700,
    roe: 28,
    opm: 18.6,
    debtToEquity: 0.06,
    salesCagr3y: 13.2,
    netProfit: 5840,
    dividendPayout: 57,
    interestCoverage: 22,
    cashConversion: 1.15,
    years: [
      { year: 2020, sales: 20200, profit: 2760, opm: 16.3, debt: 0.08, eps: 28, dividend: 38 },
      { year: 2021, sales: 21900, profit: 3140, opm: 16.7, debt: 0.08, eps: 32, dividend: 41 },
      { year: 2022, sales: 29400, profit: 3600, opm: 15.2, debt: 0.07, eps: 36, dividend: 46 },
      { year: 2023, sales: 34200, profit: 4880, opm: 18.1, debt: 0.06, eps: 49, dividend: 51 },
      { year: 2024, sales: 35700, profit: 5840, opm: 18.6, debt: 0.06, eps: 58, dividend: 57 }
    ],
    pros: ["Brand leadership", "Debt-light compounding business", "Strong cash conversion"],
    cons: ["Premium valuation risk", "Competition may pressure margins"]
  }
];

const dashboards = [
  {
    id: "executive",
    title: "Executive Market Overview",
    audience: "Fund managers, CXOs",
    blurb: "30-second market snapshot across score quality, sector mix, growth laggards, and profitability trends.",
    rationale: "This route becomes the public homepage or executive summary page in Django.",
    metrics: (context) => {
      const data = context.filtered;
      const excellent = data.filter((item) => item.healthScore >= 85).length;
      const weak = data.filter((item) => item.healthScore < 50).length;
      const avgRoe = average(data.map((item) => item.roe));
      const avgRevenue = average(data.map((item) => item.revenue));
      return [
        { label: "Total Companies", value: data.length, note: "Universe in current filter" },
        { label: "Average ROE", value: `${avgRoe.toFixed(1)}%`, note: "Cross-company average" },
        { label: "Excellent Health", value: excellent, note: "Score >= 85" },
        { label: "Avg Revenue", value: formatCurrency(avgRevenue), note: "In current scope" },
        { label: "Weak/Poor", value: weak, note: "Risk watchlist" }
      ];
    },
    primaryTitle: "Sector revenue concentration",
    primaryTag: "Executive view",
    primaryChart: (context) => sectorBarData(context.filtered, "revenue"),
    secondaryTitle: "Top companies by ROE",
    secondaryChart: (context) => companyRankingData(context.filtered, "roe", 5),
    tableTitle: "Sector rollup",
    tableTag: "Revenue, score, and profitability",
    table: (context) => sectorTable(context.filtered)
  },
  {
    id: "deepdive",
    title: "Company Deep Dive",
    audience: "Individual investors, research analysts",
    blurb: "One-company storytelling across profit, margins, balance sheet resilience, and dividend history.",
    rationale: "This route maps directly to a future `/companies/<symbol>/` detail page with charts driven by API responses.",
    metrics: (context) => {
      const company = context.company;
      return [
        { label: "Health Score", value: company.healthScore, note: company.healthLabel },
        { label: "3Y Sales CAGR", value: `${company.salesCagr3y.toFixed(1)}%`, note: "Growth pulse" },
        { label: "Debt / Equity", value: company.debtToEquity.toFixed(2), note: "Balance sheet health" },
        { label: "Dividend Payout", value: `${company.dividendPayout}%`, note: "Shareholder return" },
        { label: "Cash Conversion", value: `${company.cashConversion.toFixed(2)}x`, note: "OCF / Net Profit" }
      ];
    },
    primaryTitle: "Revenue vs net profit",
    primaryTag: "Last 5 reported years",
    primaryChart: (context) => companyTrendData(context.company, ["sales", "profit"]),
    secondaryTitle: "Margin and payout",
    secondaryChart: (context) => companyMiniProfile(context.company),
    tableTitle: "Yearly company summary",
    tableTag: "Selected company",
    table: (context) => companyYearTable(context.company)
  },
  {
    id: "sector",
    title: "Sector Comparison Analyzer",
    audience: "Cross-sector analysts",
    blurb: "Compare IT, banking, energy, NBFCs, and consumer businesses across score, margin, and scale.",
    rationale: "This becomes a comparison route with sector filters and reusable chart components.",
    metrics: (context) => {
      const data = context.filtered;
      return [
        { label: "Active Sectors", value: unique(data.map((item) => item.sector)).length, note: "Visible sectors" },
        { label: "Best Sector Score", value: bestSector(data).score.toFixed(1), note: bestSector(data).sector },
        { label: "Top Revenue Sector", value: bestSector(data, "revenue").sector, note: "Largest sales pool" },
        { label: "Avg OPM", value: `${average(data.map((item) => item.opm)).toFixed(1)}%`, note: "Current mix" }
      ];
    },
    primaryTitle: "Sector average health scores",
    primaryTag: "Compare sectors quickly",
    primaryChart: (context) => sectorBarData(context.filtered, "healthScore"),
    secondaryTitle: "Sector margin comparison",
    secondaryChart: (context) => sectorBarData(context.filtered, "opm"),
    tableTitle: "Companies within the current sector scope",
    tableTag: "Filtered detail",
    table: (context) => companyTable(context.filtered)
  },
  {
    id: "health",
    title: "Financial Health Scorecard",
    audience: "Risk analysts, portfolio managers",
    blurb: "Surface healthy companies, watchlist candidates, and the drivers behind each score.",
    rationale: "The design sets up a partner-facing screening page with risk filters and explainability panels.",
    metrics: (context) => {
      const data = context.filtered;
      return [
        { label: "Avg Health Score", value: average(data.map((item) => item.healthScore)).toFixed(1), note: "Across current scope" },
        { label: "Excellent", value: data.filter((item) => item.healthLabel === "EXCELLENT").length, note: "Top quartile candidates" },
        { label: "Good", value: data.filter((item) => item.healthLabel === "GOOD").length, note: "Healthy operators" },
        { label: "Attention List", value: data.filter((item) => item.healthScore < 75).length, note: "Needs monitoring" }
      ];
    },
    primaryTitle: "Health score ranking",
    primaryTag: "Screening leaderboard",
    primaryChart: (context) => companyRankingData(context.filtered, "healthScore", 6),
    secondaryTitle: "Pros vs cons pulse",
    secondaryChart: (context) => prosConsBars(context.company),
    tableTitle: "Selected company pros and cons",
    tableTag: "Explainability snapshot",
    table: (context) => prosConsTable(context.company)
  },
  {
    id: "growth",
    title: "Growth & Valuation Analytics",
    audience: "Growth investors and accelerators",
    blurb: "Spot acceleration, margin improvement, and earnings quality in one filtered view.",
    rationale: "This route would later consume fact_analysis and valuation signals from the warehouse.",
    metrics: (context) => {
      const data = context.filtered;
      return [
        { label: "Avg 3Y CAGR", value: `${average(data.map((item) => item.salesCagr3y)).toFixed(1)}%`, note: "Revenue growth" },
        { label: "Fast Growers", value: data.filter((item) => item.salesCagr3y >= 15).length, note: "3Y CAGR >= 15%" },
        { label: "Margin Leaders", value: data.filter((item) => item.opm >= 25).length, note: "OPM >= 25%" },
        { label: "Quality Earnings", value: data.filter((item) => item.cashConversion >= 1).length, note: "Cash backs profit" }
      ];
    },
    primaryTitle: "Growth scatter",
    primaryTag: "Growth vs quality",
    primaryChart: (context) => scatterData(context.filtered, "salesCagr3y", "cashConversion"),
    secondaryTitle: "EPS and dividend profile",
    secondaryChart: (context) => companyMiniProfile(context.company),
    tableTitle: "Growth comparison table",
    tableTag: "Acceleration snapshot",
    table: (context) => companyTable(context.filtered)
  },
  {
    id: "debt",
    title: "Debt & Leverage Monitor",
    audience: "Credit analysts and risk managers",
    blurb: "See leverage concentration, debt trajectories, and coverage resilience before problems compound.",
    rationale: "This route aligns with debt-monitor APIs and risk screening workflows.",
    metrics: (context) => {
      const data = context.filtered;
      return [
        { label: "Avg D/E", value: average(data.map((item) => item.debtToEquity)).toFixed(2), note: "Scope average" },
        { label: "Debt Free-ish", value: data.filter((item) => item.debtToEquity < 0.1).length, note: "D/E < 0.1" },
        { label: "High Leverage", value: data.filter((item) => item.debtToEquity > 2).length, note: "Watch closely" },
        { label: "Coverage Strength", value: `${average(data.map((item) => item.interestCoverage)).toFixed(1)}x`, note: "Interest coverage" }
      ];
    },
    primaryTitle: "Leverage ranking",
    primaryTag: "Debt intensity",
    primaryChart: (context) => companyRankingData(context.filtered, "debtToEquity", 6, true),
    secondaryTitle: "Coverage vs leverage",
    secondaryChart: (context) => scatterData(context.filtered, "debtToEquity", "interestCoverage"),
    tableTitle: "Borrowing watchlist",
    tableTag: "Current leverage summary",
    table: (context) => companyTable(context.filtered)
  },
  {
    id: "dividend",
    title: "Dividend & Shareholder Returns",
    audience: "Income investors and long-term allocators",
    blurb: "Track payout reliability, EPS compounding, and total shareholder value signals.",
    rationale: "This route is ideal for a public-facing income-investor page and partner API showcase.",
    metrics: (context) => {
      const data = context.filtered;
      return [
        { label: "Avg Dividend Payout", value: `${average(data.map((item) => item.dividendPayout)).toFixed(1)}%`, note: "Current scope" },
        { label: "High Yield Stories", value: data.filter((item) => item.dividendPayout >= 50).length, note: "Payout >= 50%" },
        { label: "Avg ROE", value: `${average(data.map((item) => item.roe)).toFixed(1)}%`, note: "Capital efficiency" },
        { label: "EPS Compounders", value: data.filter((item) => last(companyYears(item, "eps")) >= 100).length, note: "Latest EPS >= 100" }
      ];
    },
    primaryTitle: "Dividend ranking",
    primaryTag: "Income lens",
    primaryChart: (context) => companyRankingData(context.filtered, "dividendPayout", 6),
    secondaryTitle: "EPS compounding",
    secondaryChart: (context) => companyTrendData(context.company, ["eps"]),
    tableTitle: "Shareholder return profile",
    tableTag: "Dividend + profitability",
    table: (context) => companyTable(context.filtered)
  }
];

const state = {
  pageType: "home",
  dashboardId: "executive",
  sector: "All",
  companySymbol: "TCS",
  year: 2024,
  searchTerm: "",
  explorerSortKey: "healthScore",
  explorerSortDirection: "desc",
  reportsCompany: "All",
  reportsYear: "All"
};

let lastRenderedTable = null;

async function init() {
  applyRouteState();
  companies = await loadCompanies();
  state.companySymbol = companies.some((item) => item.symbol === state.companySymbol) ? state.companySymbol : companies[0]?.symbol;
  state.year = latestAvailableYear();
  populateControls();
  bindEvents();
  render();
}

function applyRouteState() {
  const path = window.location.pathname;
  const companyMatch = path.match(/^\/companies\/([^/]+)\/?$/i);
  const dashboardMatch = path.match(/^\/dashboards\/([^/]+)\/?$/i);

  if (companyMatch) {
    state.pageType = "company-detail";
    state.companySymbol = decodeURIComponent(companyMatch[1]).toUpperCase();
    return;
  }

  if (dashboardMatch) {
    const dashboardId = decodeURIComponent(dashboardMatch[1]).toLowerCase();
    if (dashboards.some((item) => item.id === dashboardId)) {
      state.pageType = "dashboard-detail";
      state.dashboardId = dashboardId;
    }
    return;
  }

  if (path === "/companies/") {
    state.pageType = "companies";
    return;
  }

  if (path === "/dashboards/") {
    state.pageType = "dashboards";
    return;
  }

  if (path === "/reports/") {
    state.pageType = "reports";
    return;
  }

  if (path === "/about/") {
    state.pageType = "about";
    return;
  }

  state.pageType = "home";
}

async function loadCompanies() {
  const apiBase = window.BS_API_BASE || "";

  try {
    const response = await fetch(`${apiBase}/api/bootstrap/`);
    if (response.ok) {
      const payload = await response.json();
      setSourceState("warehouse", `${payload.companies.length} warehouse companies`);
      return payload.companies.map(normalizeCompany);
    }
  } catch (error) {
    console.warn("API bootstrap unavailable, using embedded demo data.");
  }

  setSourceState("offline", "Demo fallback data");
  return companies;
}

function populateControls() {
  const sectorSelect = document.getElementById("sector-select");
  const dashboardSectorSelect = document.getElementById("dashboard-sector-select");
  const yearSelect = document.getElementById("year-select");
  const companySearch = document.getElementById("company-search");
  const companySelect = document.getElementById("company-select");
  const reportsCompanySelect = document.getElementById("reports-company-select");
  const reportsYearSelect = document.getElementById("reports-year-select");
  const years = unique(companies.flatMap((item) => item.years.map((entry) => entry.year))).sort((a, b) => b - a);
  const sectors = ["All", ...unique(companies.map((item) => item.sector))];

  fillSelect(sectorSelect, sectors, state.sector);
  fillSelect(dashboardSectorSelect, sectors, state.sector);
  fillSelect(yearSelect, years, state.year);
  fillSelect(companySelect, companies.map((item) => item.symbol), state.companySymbol, symbolToName);
  fillSelect(reportsCompanySelect, ["All", ...companies.map((item) => item.symbol)], state.reportsCompany, (value) => value === "All" ? "All companies" : symbolToName(value));
  fillSelect(reportsYearSelect, ["All", ...years], state.reportsYear, (value) => value === "All" ? "All years" : value);
  companySearch.value = state.searchTerm;
  syncDashboardCompanySelectOptions();
}

function renderDashboardCards() {
  const container = document.getElementById("dashboard-grid-cards");
  container.innerHTML = dashboards.map((dashboard, index) => `
    <button
      class="dashboard-card dashboard-card-button ${dashboard.id === state.dashboardId && state.pageType === "dashboard-detail" ? "active" : ""}"
      type="button"
      data-dashboard-card="${dashboard.id}"
    >
      <p class="section-tag">Dashboard ${index + 1}</p>
      <h4>${dashboard.title}</h4>
      <p class="tiny-copy">${dashboard.blurb}</p>
      <p class="tiny-copy"><strong>Best for:</strong> ${dashboard.audience}</p>
    </button>
  `).join("");
}

function bindEvents() {
  document.getElementById("sector-select").addEventListener("change", (event) => {
    state.sector = event.target.value;
    render();
  });

  document.getElementById("dashboard-sector-select").addEventListener("change", (event) => {
    state.sector = event.target.value;
    render();
  });

  document.getElementById("company-search").addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    render();
  });

  document.getElementById("company-select").addEventListener("change", (event) => {
    state.companySymbol = event.target.value;
    render();
  });

  document.getElementById("dashboard-company-select").addEventListener("change", (event) => {
    state.companySymbol = event.target.value;
    render();
  });

  document.getElementById("year-select").addEventListener("change", (event) => {
    state.year = Number(event.target.value);
    render();
  });

  document.getElementById("reports-company-select").addEventListener("change", (event) => {
    state.reportsCompany = event.target.value;
    render();
  });

  document.getElementById("reports-year-select").addEventListener("change", (event) => {
    state.reportsYear = event.target.value;
    render();
  });

  document.getElementById("dashboard-grid-cards").addEventListener("click", (event) => {
    const card = event.target.closest("[data-dashboard-card]");
    if (!card) {
      return;
    }
    navigateTo(`/dashboards/${encodeURIComponent(card.dataset.dashboardCard)}/`);
  });

  document.getElementById("insight-table-body").addEventListener("click", (event) => {
    const companyButton = event.target.closest("[data-company-symbol]");
    const sectorButton = event.target.closest("[data-sector-name]");
    if (companyButton) {
      navigateTo(`/companies/${encodeURIComponent(companyButton.dataset.companySymbol)}/`);
      return;
    }
    if (sectorButton) {
      selectSector(sectorButton.dataset.sectorName);
    }
  });

  document.getElementById("explorer-table-head").addEventListener("click", (event) => {
    const button = event.target.closest("[data-sort-key]");
    if (!button) {
      return;
    }
    toggleExplorerSort(button.dataset.sortKey);
  });

  document.getElementById("explorer-table-body").addEventListener("click", (event) => {
    const companyButton = event.target.closest("[data-company-symbol]");
    const sectorButton = event.target.closest("[data-sector-name]");
    if (companyButton) {
      navigateTo(`/companies/${encodeURIComponent(companyButton.dataset.companySymbol)}/`);
      return;
    }
    if (sectorButton) {
      selectSector(sectorButton.dataset.sectorName);
    }
  });

  document.getElementById("sector-chip-bar").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-sector-chip]");
    if (!chip) {
      return;
    }
    state.sector = chip.dataset.sectorChip;
    render();
  });

  document.getElementById("home-company-cloud").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-company-symbol]");
    if (!chip) {
      return;
    }
    navigateTo(`/companies/${encodeURIComponent(chip.dataset.companySymbol)}/`);
  });

  document.getElementById("company-cloud").addEventListener("click", (event) => {
    const chip = event.target.closest("[data-company-symbol]");
    if (!chip) {
      return;
    }
    navigateTo(`/companies/${encodeURIComponent(chip.dataset.companySymbol)}/`);
  });

  document.getElementById("company-card-grid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-company-symbol]");
    if (!button) {
      return;
    }
    navigateTo(`/companies/${encodeURIComponent(button.dataset.companySymbol)}/`);
  });

  document.getElementById("export-current-table").addEventListener("click", () => {
    if (!lastRenderedTable) {
      return;
    }
    const dashboard = dashboards.find((item) => item.id === state.dashboardId);
    downloadText(`${dashboard.id}-${state.companySymbol}-view.csv`, tableToCsv(lastRenderedTable), "text/csv");
  });

  document.getElementById("export-explorer-csv").addEventListener("click", () => {
    const table = explorerTable(filteredCompanies());
    downloadText(`bluestock-company-explorer-${state.sector.toLowerCase()}.csv`, tableToCsv(table), "text/csv");
  });

  document.getElementById("export-explorer-json").addEventListener("click", () => {
    const payload = sortedExplorerCompanies(filteredCompanies()).map((item) => ({
      symbol: item.symbol,
      company_name: item.companyName,
      sector: item.sector,
      health_score: item.healthScore,
      health_label: item.healthLabel,
      revenue: item.revenue,
      roe: item.roe,
      opm: item.opm,
      debt_to_equity: item.debtToEquity,
      sales_cagr_3y: item.salesCagr3y,
      dividend_payout: item.dividendPayout
    }));
    downloadText(`bluestock-company-explorer-${state.sector.toLowerCase()}.json`, JSON.stringify(payload, null, 2), "application/json");
  });

  window.addEventListener("popstate", () => {
    applyRouteState();
    render();
  });
}

function selectSector(sector) {
  state.sector = sector;
  render();
}

function render() {
  const dashboard = dashboards.find((item) => item.id === state.dashboardId) || dashboards[0];
  const filtered = filteredCompanies();
  const safeFiltered = filtered.length ? filtered : companies;
  const company = companies.find((item) => item.symbol === state.companySymbol) || safeFiltered[0] || companies[0];
  const context = { dashboard, company, filtered: safeFiltered, year: state.year };

  setActivePage();
  syncControls();
  renderRouteLinks();
  renderDashboardCards();
  renderHome(companies);
  renderCompaniesPage(safeFiltered, company);
  renderDashboardDetail(context);
  renderCompanyDetail(company);
  renderReportsPage();
  renderAboutPage();
  updateDocumentTitle(company, dashboard);
}

function syncCompanyDetailLink(company) {
  const link = document.getElementById("company-detail-link");
  link.href = `/companies/${encodeURIComponent(company.symbol)}/`;
  link.textContent = `Open ${company.symbol} detail page`;
}

function renderRouteLinks() {
  const activeKey = state.pageType === "company-detail"
    ? "companies"
    : state.pageType === "dashboard-detail"
      ? "dashboards"
      : state.pageType;

  document.querySelectorAll("[data-route-link]").forEach((link) => {
    link.classList.toggle("active", link.dataset.routeLink === activeKey);
  });
}

function renderHome(data) {
  const averageScore = average(data.map((item) => item.healthScore));
  document.getElementById("hero-score").textContent = averageScore.toFixed(0);
  document.getElementById("hero-score-label").textContent = labelFromScore(averageScore);
  renderHeroStats(data);
  drawSparkline(document.getElementById("hero-sparkline"), sumTrend(data, "sales"));
  renderTrustStrip(data);
  renderCompanyCloud("home-company-cloud", sortByScore(data).slice(0, 24));
  renderHomePaths();
}

function renderCompaniesPage(data, company) {
  syncCompanyDetailLink(company);
  renderSectorChips();
  renderCompanyCloud("company-cloud", sortByScore(data).slice(0, 36), true);
  renderCompanyCards(data);
  renderExplorer(data);
}

function renderDashboardDetail(context) {
  const { dashboard, company, filtered } = context;
  document.getElementById("active-dashboard-title").textContent = dashboard.title;
  document.getElementById("active-dashboard-audience").textContent = dashboard.audience;
  document.getElementById("dashboard-rationale").textContent = dashboard.rationale;
  renderRouteSpotlight(dashboard, company, filtered);
  document.getElementById("primary-chart-title").textContent = dashboard.primaryTitle;
  document.getElementById("primary-chart-tag").textContent = dashboard.primaryTag;
  document.getElementById("secondary-chart-title").textContent = dashboard.secondaryTitle;
  document.getElementById("table-title").textContent = dashboard.tableTitle;
  document.getElementById("table-tag").textContent = dashboard.tableTag;

  renderMetricsInto("metric-grid", dashboard.metrics(context));
  drawChart(document.getElementById("primary-chart"), dashboard.primaryChart(context));
  drawChart(document.getElementById("secondary-chart"), dashboard.secondaryChart(context));
  renderTableInto("insight-table-head", "insight-table-body", dashboard.table(context));
}

function renderRouteSpotlight(dashboard, company, filtered) {
  const title = document.getElementById("route-spotlight-title");
  const copy = document.getElementById("route-spotlight-copy");
  const meta = document.getElementById("route-spotlight-meta");
  title.textContent = dashboard.title;
  copy.textContent = `${dashboard.blurb} This page is intentionally lighter than the homepage so beginners can focus on one question at a time.`;
  meta.innerHTML = [
    `<span>${dashboard.audience}</span>`,
    `<span>${filtered.length} companies</span>`,
    `<span>${unique(filtered.map((item) => item.sector)).length} sectors</span>`
  ].join("");
}

function updateDocumentTitle(company, dashboard) {
  const map = {
    home: "Bluestock IQ | Nifty 100 For Retail Investors",
    companies: "Companies | Bluestock IQ",
    dashboards: "Dashboards | Bluestock IQ",
    reports: "Reports | Bluestock IQ",
    about: "About | Bluestock IQ",
    "dashboard-detail": `${dashboard.title} | Bluestock IQ`,
    "company-detail": `${company.symbol} | Bluestock IQ`
  };
  document.title = map[state.pageType] || "Bluestock IQ";
}

function normalizeCompany(company) {
  return {
    symbol: company.symbol,
    companyName: company.company_name ?? company.companyName,
    sector: company.sector,
    companyLogo: company.company_logo ?? company.companyLogo ?? "",
    website: company.website ?? "",
    nseUrl: company.nse_url ?? company.nseUrl ?? "",
    bseUrl: company.bse_url ?? company.bseUrl ?? "",
    aboutCompany: company.about_company ?? company.aboutCompany ?? "",
    healthScore: company.health_score ?? company.healthScore,
    healthLabel: company.health_label ?? company.healthLabel,
    revenue: company.revenue,
    roe: company.roe,
    opm: company.opm,
    debtToEquity: company.debt_to_equity ?? company.debtToEquity,
    salesCagr3y: company.sales_cagr_3y ?? company.salesCagr3y,
    netProfit: company.net_profit ?? company.netProfit,
    dividendPayout: company.dividend_payout ?? company.dividendPayout,
    interestCoverage: company.interest_coverage ?? company.interestCoverage,
    cashConversion: company.cash_conversion ?? company.cashConversion,
    years: company.years ?? [],
    pros: company.pros ?? [],
    cons: company.cons ?? [],
    documents: company.documents ?? []
  };
}

function setSourceState(stateName, label) {
  const sourcePill = document.getElementById("source-pill");
  if (!sourcePill) {
    return;
  }
  sourcePill.dataset.state = stateName;
  sourcePill.textContent = label;
}

function filteredCompanies() {
  const query = state.searchTerm.trim().toLowerCase();
  return companies.filter((item) => {
    const matchesSector = state.sector === "All" || item.sector === state.sector;
    const matchesSearch = !query
      || item.symbol.toLowerCase().includes(query)
      || item.companyName.toLowerCase().includes(query);
    return matchesSector && matchesSearch;
  });
}

function syncControls() {
  document.getElementById("sector-select").value = state.sector;
  document.getElementById("dashboard-sector-select").value = state.sector;
  document.getElementById("company-search").value = state.searchTerm;
  document.getElementById("company-select").value = state.companySymbol;
  document.getElementById("reports-company-select").value = state.reportsCompany;
  document.getElementById("reports-year-select").value = String(state.reportsYear);
  document.getElementById("year-select").value = String(state.year);
  syncDashboardCompanySelectOptions();
}

function syncDashboardCompanySelectOptions() {
  const companySelect = document.getElementById("dashboard-company-select");
  const options = filteredCompanies();
  const safeOptions = options.length ? options : companies;
  if (!safeOptions.some((item) => item.symbol === state.companySymbol)) {
    state.companySymbol = safeOptions[0]?.symbol ?? state.companySymbol;
  }
  fillSelect(companySelect, safeOptions.map((item) => item.symbol), state.companySymbol, symbolToName);
}

function latestAvailableYear() {
  const years = unique(companies.flatMap((item) => item.years.map((entry) => entry.year))).sort((a, b) => b - a);
  return years[0] || new Date().getFullYear();
}

function renderCompanyDetail(company) {
  document.getElementById("selected-company-name").textContent = `${company.companyName} (${company.symbol})`;
  document.getElementById("selected-health-score").textContent = Number(company.healthScore || 0).toFixed(1);
  document.getElementById("selected-health-label").textContent = company.healthLabel || labelFromScore(company.healthScore || 0);
  document.getElementById("selected-company-meta").textContent = [
    company.sector,
    `Revenue ${formatCurrency(company.revenue)}`,
    `D/E ${Number(company.debtToEquity || 0).toFixed(2)}`
  ].join(" / ");
  renderMetricsInto("company-metric-grid", dashboards.find((item) => item.id === "deepdive").metrics({ company, filtered: companies, year: state.year }));
  drawChart(document.getElementById("company-primary-chart"), companyTrendData(company, ["sales", "profit"]));
  drawChart(document.getElementById("company-secondary-chart"), companyMiniProfile(company));
  renderCompanyProfile(company);
  renderDocuments(company.documents || []);
  renderTableInto("company-insight-table-head", "company-insight-table-body", companyYearTable(company));
  document.getElementById("documents-title").textContent = window.location.pathname.startsWith("/companies/")
    ? `${company.symbol} annual reports`
    : "Documents";
}

function renderDocuments(documents) {
  const count = documents.length;
  document.getElementById("documents-count").textContent = `${count} ${count === 1 ? "link" : "links"}`;
  const list = document.getElementById("document-list");
  if (!count) {
    list.innerHTML = '<div class="document-empty">No annual reports</div>';
    return;
  }
  list.innerHTML = documents.slice(0, 6).map((document) => `
    <a href="${document.annual_report}" target="_blank" rel="noreferrer">
      ${document.year || document.fiscal_year || "Report"}
    </a>
  `).join("");
}

function renderCompanyProfile(company) {
  const logo = document.getElementById("company-logo");
  const profileName = document.getElementById("profile-company-name");
  const profileSector = document.getElementById("profile-sector");
  const description = document.getElementById("company-description");
  const links = document.getElementById("company-links");

  profileName.textContent = company.companyName;
  profileSector.textContent = `${company.sector} / ${company.symbol}`;
  description.textContent = company.aboutCompany || `${company.companyName} is part of the Bluestock IQ tracked universe.`;

  if (company.companyLogo) {
    logo.src = company.companyLogo;
    logo.alt = `${company.companyName} logo`;
    logo.hidden = false;
  } else {
    logo.hidden = true;
    logo.removeAttribute("src");
    logo.alt = "";
  }

  const profileLinks = [
    company.website ? { label: "Website", href: company.website } : null,
    company.nseUrl ? { label: "NSE", href: company.nseUrl } : null,
    company.bseUrl ? { label: "BSE", href: company.bseUrl } : null,
  ].filter(Boolean);

  links.innerHTML = profileLinks.length
    ? profileLinks.map((link) => `<a class="profile-link" href="${link.href}" target="_blank" rel="noreferrer">${link.label}</a>`).join("")
    : '<span class="document-empty">No profile links</span>';

  renderInsightList("pros-list", company.pros, "No pros available yet.");
  renderInsightList("cons-list", company.cons, "No cons available yet.");
}

function renderInsightList(elementId, items, emptyMessage) {
  const list = document.getElementById(elementId);
  if (!items.length) {
    list.innerHTML = `<li class="empty-insight">${emptyMessage}</li>`;
    return;
  }
  list.innerHTML = items.slice(0, 5).map((item) => `<li>${item}</li>`).join("");
}

function renderHeroStats(data) {
  const grid = document.getElementById("hero-stat-grid");
  const stats = [
    { label: "Companies", value: data.length },
    { label: "Top Sector", value: bestSector(data, "revenue").sector },
    { label: "Avg OPM", value: `${average(data.map((item) => item.opm)).toFixed(1)}%` },
    { label: "Watchlist", value: data.filter((item) => item.healthScore < 80).length }
  ];

  grid.innerHTML = stats.map((item) => `
    <div class="hero-stat">
      <p>${item.label}</p>
      <strong>${item.value}</strong>
    </div>
  `).join("");
}

function renderTrustStrip(data) {
  const totalDocuments = collectDocuments().length;
  const container = document.getElementById("home-trust-strip");
  const items = [
    { label: "Tracked Companies", value: data.length },
    { label: "Sectors Covered", value: unique(data.map((item) => item.sector)).length },
    { label: "Annual Reports Linked", value: totalDocuments },
    { label: "Average Health Score", value: average(data.map((item) => item.healthScore)).toFixed(1) }
  ];

  container.innerHTML = items.map((item) => `
    <div class="trust-chip">
      <p>${item.label}</p>
      <strong>${item.value}</strong>
    </div>
  `).join("");
}

function renderHomePaths() {
  const container = document.getElementById("home-path-grid");
  container.innerHTML = [
    { label: "Start Here", title: "Explore Companies", copy: "Search companies, compare sectors, and open simple detail pages.", href: "/companies/", color: "yellow" },
    { label: "Visual Learning", title: "Browse Dashboards", copy: "Pick a guided dashboard for debt, growth, dividends, or financial health.", href: "/dashboards/", color: "blue" },
    { label: "Source Material", title: "Open Reports", copy: "Go straight to annual report links when you want to read the underlying filing.", href: "/reports/", color: "red" }
  ].map((item) => `
    <a class="explainer-card ${item.color}" href="${item.href}">
      <p class="section-tag">${item.label}</p>
      <h4>${item.title}</h4>
      <p>${item.copy}</p>
    </a>
  `).join("");
}

function renderSectorChips() {
  const container = document.getElementById("sector-chip-bar");
  const sectors = ["All", ...unique(companies.map((item) => item.sector))];
  container.innerHTML = sectors.map((sector) => `
    <button type="button" class="sector-chip ${sector === state.sector ? "active" : ""}" data-sector-chip="${sector}">
      ${sector}
    </button>
  `).join("");
}

function renderCompanyCloud(targetId, data, large = false) {
  const container = document.getElementById(targetId);
  const palette = ["red", "blue", "yellow"];
  container.innerHTML = data.map((item, index) => `
    <button
      type="button"
      class="company-chip ${palette[index % palette.length]} ${large ? "large" : ""}"
      data-company-symbol="${item.symbol}"
      style="--float-delay:${(index % 7) * 0.18}s"
    >
      ${item.symbol}
    </button>
  `).join("");
}

function renderCompanyCards(data) {
  const container = document.getElementById("company-card-grid");
  const shortlist = sortedExplorerCompanies(data).slice(0, 12);

  container.innerHTML = shortlist.map((item) => `
    <article class="company-card">
      <p class="section-tag">${item.sector}</p>
      <h4>${item.companyName}</h4>
      <p class="company-card-meta">${item.healthLabel} health with ${Number(item.salesCagr3y || 0).toFixed(1)}% 3Y sales CAGR.</p>
      <div class="company-card-stats">
        <span>Score ${Number(item.healthScore || 0).toFixed(1)}</span>
        <span>ROE ${Number(item.roe || 0).toFixed(1)}%</span>
        <span>D/E ${Number(item.debtToEquity || 0).toFixed(2)}</span>
        <span>Dividend ${Number(item.dividendPayout || 0).toFixed(1)}%</span>
      </div>
      <button class="solid-button" type="button" data-company-symbol="${item.symbol}">Open ${item.symbol}</button>
    </article>
  `).join("");
}

function renderMetricsInto(containerId, metrics) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = metrics.map((item) => `
    <div class="metric-card">
      <p>${item.label}</p>
      <strong>${item.value}</strong>
      <small>${item.note}</small>
    </div>
  `).join("");
}

function renderTableInto(headId, bodyId, table) {
  const head = document.getElementById(headId);
  const body = document.getElementById(bodyId);
  lastRenderedTable = table;
  head.innerHTML = `<tr>${table.columns.map((column) => `<th>${column}</th>`).join("")}</tr>`;
  body.innerHTML = table.rows.map((row) => `
    <tr>${row.map((cell, index) => `<td data-label="${escapeAttribute(table.columns[index])}">${cell}</td>`).join("")}</tr>
  `).join("");
}

function renderExplorer(data) {
  const table = explorerTable(data);
  const head = document.getElementById("explorer-table-head");
  const body = document.getElementById("explorer-table-body");
  const explorerKpis = document.getElementById("explorer-kpis");

  explorerKpis.innerHTML = [
    `<div class="explorer-kpi"><span>Visible companies</span><strong>${table.rows.length}</strong></div>`,
    `<div class="explorer-kpi"><span>Top sector</span><strong>${bestSector(data, "revenue").sector}</strong></div>`,
    `<div class="explorer-kpi"><span>Avg score</span><strong>${average(data.map((item) => item.healthScore)).toFixed(1)}</strong></div>`
  ].join("");

  head.innerHTML = `<tr>${table.columns.map((column, index) => {
    const sortKey = table.sortKeys?.[index];
    const isActive = sortKey === state.explorerSortKey;
    const direction = isActive ? state.explorerSortDirection : "";
    return sortKey
      ? `<th><button class="sort-button ${isActive ? "active" : ""}" type="button" data-sort-key="${sortKey}">${column}<span>${direction === "asc" ? "↑" : direction === "desc" ? "↓" : "↕"}</span></button></th>`
      : `<th>${column}</th>`;
  }).join("")}</tr>`;

  body.innerHTML = table.rows.length
    ? table.rows.map((row) => `
      <tr>${row.map((cell, index) => `<td data-label="${escapeAttribute(table.columns[index])}">${cell}</td>`).join("")}</tr>
    `).join("")
    : `<tr><td colspan="${table.columns.length}" data-label="State">No companies match the current filter.</td></tr>`;
}

function renderReportsPage() {
  const documents = collectDocuments().filter((item) => {
    const companyMatch = state.reportsCompany === "All" || item.symbol === state.reportsCompany;
    const yearMatch = state.reportsYear === "All" || String(item.year) === String(state.reportsYear);
    return companyMatch && yearMatch;
  });

  const grid = document.getElementById("report-grid");
  const empty = document.getElementById("reports-empty");

  empty.hidden = documents.length > 0;
  grid.innerHTML = documents.map((item) => `
    <article class="report-card">
      <p class="section-tag">${item.sector}</p>
      <h4>${item.companyName}</h4>
      <p>${item.year || "Report year unavailable"}</p>
      <p>${item.symbol}</p>
      <div class="report-card-actions">
        <a class="yellow-button" href="${item.annual_report}" target="_blank" rel="noreferrer">Open Report</a>
      </div>
    </article>
  `).join("");
}

function renderAboutPage() {
  const grid = document.getElementById("about-score-grid");
  const items = [
    { label: "Profitability", title: "Can the company earn well?", copy: "Looks at margins and return strength to see whether profits are healthy." },
    { label: "Growth", title: "Is the business expanding?", copy: "Checks revenue and profit growth trends over multiple periods." },
    { label: "Leverage", title: "Is debt under control?", copy: "Examines borrowing and balance-sheet pressure." },
    { label: "Cash Flow", title: "Do cash flows support the story?", copy: "Prefers businesses whose cash generation backs up reported profits." },
    { label: "Dividend", title: "Does it return capital?", copy: "Tracks payout behavior for investors who care about shareholder returns." },
    { label: "Trend", title: "Is direction improving?", copy: "Rewards businesses with improving signals instead of deteriorating ones." }
  ];

  grid.innerHTML = items.map((item, index) => `
    <article class="explainer-card ${index % 3 === 0 ? "yellow" : index % 3 === 1 ? "blue" : "red"}">
      <p class="section-tag">${item.label}</p>
      <h4>${item.title}</h4>
      <p>${item.copy}</p>
    </article>
  `).join("");
}

function drawChart(svg, config) {
  if (config.type === "bars") {
    svg.innerHTML = barChartMarkup(config);
    return;
  }

  if (config.type === "line") {
    svg.innerHTML = lineChartMarkup(config);
    return;
  }

  if (config.type === "scatter") {
    svg.innerHTML = scatterChartMarkup(config);
  }
}

function drawSparkline(svg, values) {
  const width = 280;
  const height = 72;
  const points = scalePoints(values, width, height, 12);
  const linePath = pointsToPath(points);

  svg.innerHTML = `
    <line x1="12" y1="${height - 10}" x2="${width - 10}" y2="${height - 10}" stroke="#121212" stroke-width="3"></line>
    <path d="${linePath}" fill="none" stroke="#f0c020" stroke-width="5" stroke-linecap="square" stroke-linejoin="miter"></path>
  `;
}

function barChartMarkup(config) {
  const width = 620;
  const height = 260;
  const maxValue = Math.max(...config.values.map((item) => item.value), 1);
  const slot = width / config.values.length;
  const barWidth = Math.min(52, slot * 0.56);

  const bars = config.values.map((item, index) => {
    const scaledHeight = (item.value / maxValue) * 170;
    const x = slot * index + (slot - barWidth) / 2;
    const y = 210 - scaledHeight;
    return `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${scaledHeight}" fill="${item.color || "#1040c0"}" stroke="#121212" stroke-width="3"></rect>
      <text x="${x + barWidth / 2}" y="${height - 20}" text-anchor="middle" fill="#121212" font-size="12" font-weight="700">${item.label}</text>
      <text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" fill="#121212" font-size="12" font-weight="700">${item.display || item.value}</text>
    `;
  }).join("");

  return `
    <line x1="18" y1="210" x2="${width - 18}" y2="210" stroke="#121212" stroke-width="3"></line>
    ${bars}
  `;
}

function lineChartMarkup(config) {
  const width = 620;
  const height = 260;
  const series = config.series;
  const allValues = series.flatMap((item) => item.values);
  const maxValue = Math.max(...allValues, 1);
  const minValue = Math.min(...allValues, 0);
  const range = maxValue - minValue || 1;

  const lines = series.map((entry) => {
    const points = entry.values.map((value, index) => {
      const x = 36 + (index * ((width - 72) / Math.max(entry.values.length - 1, 1)));
      const y = 210 - ((value - minValue) / range) * 160;
      return { x, y };
    });

    return `
      <path d="${pointsToPath(points)}" fill="none" stroke="${entry.color}" stroke-width="4" stroke-linecap="square" stroke-linejoin="miter"></path>
      ${points.map((point) => `<rect x="${point.x - 4}" y="${point.y - 4}" width="8" height="8" fill="${entry.color}" stroke="#121212" stroke-width="2"></rect>`).join("")}
    `;
  }).join("");

  const labels = config.labels.map((label, index) => {
    const x = 36 + (index * ((width - 72) / Math.max(config.labels.length - 1, 1)));
    return `<text x="${x}" y="${height - 18}" text-anchor="middle" fill="#5f6b77" font-size="12">${label}</text>`;
  }).join("");

  return `
    <line x1="24" y1="210" x2="${width - 24}" y2="210" stroke="#121212" stroke-width="3"></line>
    <line x1="36" y1="26" x2="36" y2="210" stroke="#121212" stroke-width="3"></line>
    ${lines}
    ${labels}
  `;
}

function scatterChartMarkup(config) {
  const width = 320;
  const height = 260;
  const maxX = Math.max(...config.points.map((point) => point.x), 1);
  const maxY = Math.max(...config.points.map((point) => point.y), 1);

  const points = config.points.map((point) => {
    const cx = 36 + (point.x / maxX) * 240;
    const cy = 210 - (point.y / maxY) * 160;
    return `
      <circle cx="${cx}" cy="${cy}" r="${point.size || 10}" fill="${point.color || "#d02020"}" stroke="#121212" stroke-width="3"></circle>
      <text x="${cx}" y="${cy - 14}" text-anchor="middle" fill="#121212" font-size="10" font-weight="700">${point.label}</text>
    `;
  }).join("");

  return `
    <line x1="36" y1="210" x2="292" y2="210" stroke="#121212" stroke-width="3"></line>
    <line x1="36" y1="40" x2="36" y2="210" stroke="#121212" stroke-width="3"></line>
    ${points}
    <text x="164" y="244" text-anchor="middle" fill="#121212" font-size="12" font-weight="700">${config.xLabel}</text>
    <text x="10" y="132" text-anchor="middle" fill="#121212" font-size="12" font-weight="700" transform="rotate(-90, 10, 132)">${config.yLabel}</text>
  `;
}

function sectorBarData(data, key) {
  const grouped = unique(data.map((item) => item.sector)).map((sector) => {
    const sectorData = data.filter((item) => item.sector === sector);
    const total = key === "revenue"
      ? sum(sectorData.map((item) => item.revenue))
      : average(sectorData.map((item) => item[key]));
    return {
      label: sector,
      value: Math.round(total),
      display: key === "revenue" ? formatCompact(total) : total.toFixed(1),
      color: colorForSector(sector)
    };
  });

  return { type: "bars", values: grouped };
}

function companyRankingData(data, key, limit, ascending = false) {
  const sorted = [...data].sort((left, right) => ascending ? left[key] - right[key] : right[key] - left[key]);

  const values = sorted
    .slice(0, limit)
    .map((item) => ({
      label: item.symbol,
      value: Number(item[key].toFixed ? item[key].toFixed(1) : item[key]),
      display: item[key].toFixed ? item[key].toFixed(1) : item[key],
      color: colorForSector(item.sector)
    }));

  return { type: "bars", values };
}

function companyTrendData(company, keys) {
  return {
    type: "line",
    labels: company.years.map((entry) => entry.year),
    series: keys.map((key) => ({
      name: key,
      color: key === "sales" ? "#0f766e" : key === "profit" ? "#d96c3f" : "#144d5f",
      values: companyYears(company, key)
    }))
  };
}

function companyMiniProfile(company) {
  return {
    type: "bars",
    values: [
      { label: "OPM", value: company.opm, display: `${company.opm}%`, color: "#1040c0" },
      { label: "ROE", value: company.roe, display: `${company.roe}%`, color: "#d02020" },
      { label: "D/E", value: company.debtToEquity * 10, display: company.debtToEquity.toFixed(2), color: "#121212" },
      { label: "Payout", value: company.dividendPayout, display: `${company.dividendPayout}%`, color: "#f0c020" }
    ]
  };
}

function scatterData(data, xKey, yKey) {
  return {
    type: "scatter",
    xLabel: labelize(xKey),
    yLabel: labelize(yKey),
    points: data.map((item) => ({
      label: item.symbol,
      x: item[xKey],
      y: item[yKey],
      size: 9 + Math.max(6, item.healthScore / 9),
      color: colorForSector(item.sector)
    }))
  };
}

function prosConsBars(company) {
  return {
    type: "bars",
    values: [
      { label: "Pros", value: company.pros.length * 10, display: company.pros.length, color: "#1040c0" },
      { label: "Cons", value: company.cons.length * 10, display: company.cons.length, color: "#d02020" },
      { label: "Score", value: company.healthScore, display: company.healthScore, color: "#f0c020" }
    ]
  };
}

function sectorTable(data) {
  const rows = unique(data.map((item) => item.sector)).map((sector) => {
    const sectorData = data.filter((item) => item.sector === sector);
    return [
      `<button class="table-link" type="button" data-sector-name="${sector}">${sector}</button>`,
      sectorData.length,
      formatCurrency(sum(sectorData.map((item) => item.revenue))),
      `${average(sectorData.map((item) => item.opm)).toFixed(1)}%`,
      `${average(sectorData.map((item) => item.healthScore)).toFixed(1)}`,
      `${average(sectorData.map((item) => item.roe)).toFixed(1)}%`
    ];
  });

  return {
    columns: ["Sector", "Companies", "Revenue", "Avg OPM", "Avg Score", "Avg ROE"],
    rows
  };
}

function companyTable(data) {
  return {
    columns: ["Company", "Sector", "Health", "OPM", "D/E", "3Y CAGR", "Dividend"],
    rows: data.map((item) => [
      `<button class="table-link" type="button" data-company-symbol="${item.symbol}">${item.companyName}</button>`,
      item.sector,
      item.healthScore,
      `${item.opm}%`,
      item.debtToEquity.toFixed(2),
      `${item.salesCagr3y}%`,
      `${item.dividendPayout}%`
    ])
  };
}

function explorerTable(data) {
  const sorted = sortedExplorerCompanies(data);
  return {
    columns: ["Company", "Sector", "Health", "Label", "Revenue", "ROE", "OPM", "D/E", "3Y CAGR", "Dividend"],
    sortKeys: ["companyName", "sector", "healthScore", "healthLabel", "revenue", "roe", "opm", "debtToEquity", "salesCagr3y", "dividendPayout"],
    rows: sorted.map((item) => [
      `<button class="table-link" type="button" data-company-symbol="${item.symbol}">${item.companyName}</button>`,
      `<button class="table-link" type="button" data-sector-name="${item.sector}">${item.sector}</button>`,
      Number(item.healthScore || 0).toFixed(1),
      item.healthLabel,
      formatCurrency(item.revenue),
      `${Number(item.roe || 0).toFixed(1)}%`,
      `${Number(item.opm || 0).toFixed(1)}%`,
      Number(item.debtToEquity || 0).toFixed(2),
      `${Number(item.salesCagr3y || 0).toFixed(1)}%`,
      `${Number(item.dividendPayout || 0).toFixed(1)}%`
    ])
  };
}

function sortedExplorerCompanies(data) {
  const direction = state.explorerSortDirection === "asc" ? 1 : -1;
  return [...data].sort((left, right) => compareValues(left[state.explorerSortKey], right[state.explorerSortKey]) * direction);
}

function sortByScore(data) {
  return [...data].sort((left, right) => Number(right.healthScore || 0) - Number(left.healthScore || 0));
}

function toggleExplorerSort(sortKey) {
  if (state.explorerSortKey === sortKey) {
    state.explorerSortDirection = state.explorerSortDirection === "asc" ? "desc" : "asc";
  } else {
    state.explorerSortKey = sortKey;
    state.explorerSortDirection = sortKey === "companyName" || sortKey === "sector" || sortKey === "healthLabel" ? "asc" : "desc";
  }
  render();
}

function collectDocuments() {
  return companies
    .flatMap((company) => (company.documents || []).map((document) => ({
      symbol: company.symbol,
      companyName: company.companyName,
      sector: company.sector,
      year: document.year || document.fiscal_year || "Report",
      annual_report: document.annual_report
    })))
    .filter((item) => item.annual_report);
}

function setActivePage() {
  const activeIdMap = {
    home: "home",
    companies: "companies",
    dashboards: "dashboards",
    "dashboard-detail": "dashboard-detail",
    "company-detail": "company-detail",
    reports: "reports",
    about: "about"
  };

  const active = activeIdMap[state.pageType];
  document.querySelectorAll("[data-page]").forEach((section) => {
    section.classList.toggle("active", section.dataset.page === active);
  });
}

function navigateTo(path) {
  window.history.pushState({}, "", path);
  applyRouteState();
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function companyYearTable(company) {
  return {
    columns: ["Year", "Sales", "Net Profit", "OPM", "EPS", "Dividend Payout"],
    rows: company.years.map((entry) => [
      entry.year,
      formatCurrency(entry.sales),
      formatCurrency(entry.profit),
      `${entry.opm}%`,
      entry.eps,
      `${entry.dividend}%`
    ])
  };
}

function prosConsTable(company) {
  return {
    columns: ["Type", "Insight"],
    rows: [
      ...company.pros.map((item) => ["Pro", item]),
      ...company.cons.map((item) => ["Con", item])
    ]
  };
}

function bestSector(data, key = "healthScore") {
  const sectors = unique(data.map((item) => item.sector)).map((sector) => {
    const values = data.filter((item) => item.sector === sector);
    const score = key === "revenue"
      ? sum(values.map((item) => item.revenue))
      : average(values.map((item) => item[key]));
    return { sector, score };
  });
  return sectors.sort((left, right) => right.score - left.score)[0] || { sector: "N/A", score: 0 };
}

function sumTrend(data, key) {
  const years = unique(data.flatMap((item) => item.years.map((entry) => entry.year))).sort((a, b) => a - b);
  return years.map((year) => sum(data.map((item) => item.years.find((entry) => entry.year === year)?.[key] || 0)));
}

function companyYears(company, key) {
  return company.years.map((entry) => entry[key]);
}

function fillSelect(select, values, currentValue, labelFormatter = (value) => value) {
  select.innerHTML = values.map((value) => `
    <option value="${value}" ${String(value) === String(currentValue) ? "selected" : ""}>
      ${labelFormatter(value)}
    </option>
  `).join("");
}

function symbolToName(symbol) {
  const company = companies.find((item) => item.symbol === symbol);
  return company ? `${company.companyName} (${symbol})` : symbol;
}

function colorForSector(sector) {
  const palette = {
    IT: "#1040c0",
    Banking: "#d02020",
    Energy: "#f0c020",
    NBFC: "#121212",
    "Consumer Goods": "#6f6f6f"
  };
  return palette[sector] || "#1040c0";
}

function labelize(key) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
}

function labelFromScore(score) {
  if (score >= 85) {
    return "EXCELLENT";
  }
  if (score >= 70) {
    return "GOOD";
  }
  if (score >= 50) {
    return "AVERAGE";
  }
  if (score >= 35) {
    return "WEAK";
  }
  return "POOR";
}

function scalePoints(values, width, height, padding) {
  const maxValue = Math.max(...values, 1);
  const minValue = Math.min(...values, 0);
  const range = maxValue - minValue || 1;

  return values.map((value, index) => ({
    x: padding + (index * ((width - padding * 2) / Math.max(values.length - 1, 1))),
    y: height - padding - ((value - minValue) / range) * (height - padding * 2)
  }));
}

function pointsToPath(points) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
}

function formatCurrency(value) {
  return `Rs ${Math.round(value).toLocaleString("en-IN")} Cr`;
}

function formatCompact(value) {
  return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function average(values) {
  return values.length ? sum(values) / values.length : 0;
}

function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

function unique(values) {
  return [...new Set(values)];
}

function last(values) {
  return values[values.length - 1];
}

function compareValues(left, right) {
  if (typeof left === "string" || typeof right === "string") {
    return String(left ?? "").localeCompare(String(right ?? ""), "en", { sensitivity: "base" });
  }
  return Number(left ?? 0) - Number(right ?? 0);
}

function tableToCsv(table) {
  const lines = [
    table.columns.map(csvEscape).join(","),
    ...table.rows.map((row) => row.map((cell) => csvEscape(stripHtml(cell))).join(","))
  ];
  return `${lines.join("\n")}\n`;
}

function csvEscape(value) {
  const text = String(value ?? "");
  return `"${text.replace(/"/g, "\"\"")}"`;
}

function stripHtml(value) {
  const container = document.createElement("div");
  container.innerHTML = value;
  return container.textContent || container.innerText || "";
}

function downloadText(filename, content, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function escapeAttribute(value) {
  return String(value).replace(/"/g, "&quot;");
}

init();
