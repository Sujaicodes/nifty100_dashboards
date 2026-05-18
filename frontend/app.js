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
    primaryChart: (context) => companyRankingData(context.filtered, "debtToEquity", 6),
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

const metricExplanations = {
  "OPM": "Operating Profit Margin. It shows how much operating profit remains from sales before interest and tax. Higher usually means the core business has more breathing room.",
  "Avg OPM": "Average Operating Profit Margin for the visible group. Use it to compare sector or filtered-company profitability.",
  "ROE": "Return on Equity. It shows how efficiently a company turns shareholder capital into profit. Higher is usually better, but quality and debt still matter.",
  "Average ROE": "Average Return on Equity across the current selection. It is useful for judging capital efficiency at a group level.",
  "Avg ROE": "Average Return on Equity across the current selection. It is useful for judging capital efficiency at a group level.",
  "Debt / Equity": "Debt-to-equity compares borrowings with the shareholder capital base. Lower is usually safer outside banks and NBFCs.",
  "Avg D/E": "Average debt-to-equity for the visible companies. Banks and NBFCs should be compared within their own sector.",
  "3Y Sales CAGR": "Three-year sales CAGR shows the annualized sales growth rate across three years. It smooths out one-year jumps.",
  "Avg 3Y CAGR": "Average three-year sales CAGR for the visible group. It helps compare broad growth momentum.",
  "Cash Conversion": "Cash conversion compares operating cash flow with net profit. Around 1.0x or higher means profits are better supported by cash.",
  "Quality Earnings": "Companies where cash conversion is at least 1.0x, meaning reported profit is backed by operating cash flow.",
  "Health Score": "A blended score across profitability, growth, leverage, cash flow, dividends, and trend signals. Treat it as a research starting point, not advice.",
  "Avg Health Score": "Average health score across the visible companies. It summarizes quality for the current filter.",
  "Dividend Payout": "The share of profit returned as dividends. A steady moderate payout is often healthier than an unusually high one.",
  "Avg Dividend Payout": "Average dividend payout across the current group. Read it with EPS growth before judging income quality.",
  "Interest Coverage": "How many times operating profit covers interest cost. Higher coverage means more cushion against borrowing pressure.",
  "Coverage Strength": "Average interest coverage for the selected companies. Higher means interest costs are easier to absorb."
};

const metricGlossary = [
  {
    label: "OPM",
    title: "Operating Profit Margin",
    copy: "OPM tells you how much operating profit remains from sales before interest and tax. A higher OPM usually means the core business has stronger pricing power or cost control."
  },
  {
    label: "ROE",
    title: "Return on Equity",
    copy: "ROE shows how efficiently shareholder capital becomes profit. Strong ROE is attractive, but it should be checked with debt, cash flow, and consistency."
  },
  {
    label: "D/E",
    title: "Debt to Equity",
    copy: "D/E compares borrowings with the company capital base. Lower is usually safer for normal companies, while banks and NBFCs need sector-specific comparison."
  },
  {
    label: "CAGR",
    title: "Compounded Growth",
    copy: "CAGR smooths growth across multiple years. It helps you avoid overreacting to one unusually good or bad year."
  },
  {
    label: "Cash Conversion",
    title: "Profit backed by cash",
    copy: "Cash conversion compares operating cash flow with net profit. Around 1.0x or higher means accounting profit is better supported by actual cash."
  }
];

const dashboardChartExplanations = {
  executive: {
    primary: "This chart shows which sectors contribute the largest revenue base inside the current filter. Bigger bars mean more scale, not automatically better quality.",
    secondary: "This ranks companies by ROE, a capital-efficiency measure. Use it to spot efficient businesses, then check debt and cash conversion before trusting the signal."
  },
  deepdive: {
    primary: "This compares revenue with net profit over time. A healthier pattern is revenue and profit rising together rather than sales growing while profit stalls.",
    secondary: "This compact profile compares margin, ROE, leverage, and payout. It is a fast snapshot of profitability, balance-sheet pressure, and shareholder returns."
  },
  sector: {
    primary: "This compares average health score by sector. Use it to avoid unfairly comparing companies from very different business models.",
    secondary: "This compares sector-level OPM. Higher margin sectors usually have more operating cushion, but valuation and growth still matter."
  },
  health: {
    primary: "This ranks companies by health score. Treat the leaderboard as a shortlist generator, then inspect the factor breakdown on the company page.",
    secondary: "This compares the count of pros and cons for the selected company. More pros are useful only when the watchpoints are also understood."
  },
  growth: {
    primary: "This plots growth against cash conversion. The ideal area is strong growth with cash support, because growth without cash can be fragile.",
    secondary: "This compares profitability and payout signals for the selected company. Use it to see whether growth is paired with returns and shareholder payouts."
  },
  debt: {
    primary: "This ranks companies by debt-to-equity intensity. Taller bars mean more leverage pressure, so use this as a risk screen before checking interest coverage and sector context.",
    secondary: "This compares leverage with interest coverage. A stronger company usually has manageable debt and enough profit to cover interest costs."
  },
  dividend: {
    primary: "This ranks dividend payout. High payout can be attractive, but it needs EPS growth and cash flow support to be sustainable.",
    secondary: "This shows EPS over time for the selected company. Rising EPS gives dividends a stronger foundation."
  }
};

const state = {
  pageType: "home",
  dashboardId: "executive",
  sector: "All",
  companySymbol: "TCS",
  year: 2024,
  searchTerm: "",
  explorerSortKey: "healthScore",
  explorerSortDirection: "desc",
  companyCardPage: 1,
  companyCardPageSize: 9,
  reportsCompany: "All",
  reportsYear: "All"
};

let lastRenderedTable = null;
const chartRegistry = new Map();

async function init() {
  applyRouteState();
  setSourceState("loading", "Loading warehouse data");
  companies = await loadCompanies();
  state.companySymbol = companies.some((item) => item.symbol === state.companySymbol) ? state.companySymbol : companies[0]?.symbol;
  state.year = latestAvailableYear();
  populateControls();
  bindEvents();
  render();
}

function applyRouteState() {
  const path = currentRoutePath();
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

function currentRoutePath() {
  if (window.location.hash.startsWith("#/")) {
    return window.location.hash.slice(1);
  }
  return window.location.pathname;
}

function routeHref(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized === "/" ? "/#/" : `/#${normalized}`;
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
  return companies.map(normalizeCompany);
}

function populateControls() {
  const sectorSelect = document.getElementById("sector-select");
  const dashboardSectorSelect = document.getElementById("dashboard-sector-select");
  const yearSelect = document.getElementById("year-select");
  const companySearch = document.getElementById("company-search");
  const companySelect = document.getElementById("company-select");
  const reportsCompanySelect = document.getElementById("reports-company-select");
  const reportsYearSelect = document.getElementById("reports-year-select");
  const years = unique(companies.flatMap((item) => fiscalRows(item).map((entry) => entry.year))).sort((a, b) => b - a);
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
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || link.target || link.hasAttribute("download") || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    const href = link.getAttribute("href") || "";
    const route = href.startsWith("/#/") ? href.slice(2) : href.startsWith("/") && !href.startsWith("//") ? href : "";
    if (!route || route.startsWith("/api/") || route.endsWith(".css") || route.endsWith(".js")) {
      return;
    }
    event.preventDefault();
    navigateTo(route);
  });

  document.getElementById("sector-select").addEventListener("change", (event) => {
    state.sector = event.target.value;
    state.companyCardPage = 1;
    render();
  });

  document.getElementById("dashboard-sector-select").addEventListener("change", (event) => {
    state.sector = event.target.value;
    render();
  });

  document.getElementById("company-search").addEventListener("input", (event) => {
    state.searchTerm = event.target.value;
    state.companyCardPage = 1;
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
    state.companyCardPage = 1;
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

  document.getElementById("peer-comparison-grid").addEventListener("click", (event) => {
    const button = event.target.closest("[data-company-symbol]");
    if (!button) {
      return;
    }
    navigateTo(`/companies/${encodeURIComponent(button.dataset.companySymbol)}/`);
  });

  document.getElementById("company-card-pagination").addEventListener("click", (event) => {
    const button = event.target.closest("[data-card-page]");
    if (!button) {
      return;
    }
    state.companyCardPage = Number(button.dataset.cardPage);
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
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
  state.companyCardPage = 1;
  render();
}

function render() {
  const dashboard = dashboards.find((item) => item.id === state.dashboardId) || dashboards[0];
  const filtered = filteredCompanies();
  const safeFiltered = filtered.length ? filtered : companies;
  const company = companies.find((item) => item.symbol === state.companySymbol) || safeFiltered[0] || companies[0];
  const context = { dashboard, company, filtered: safeFiltered, rawFiltered: filtered, year: state.year };

  setActivePage();
  syncControls();
  renderRouteLinks();
  renderDashboardCards();
  renderHome(companies);
  renderCompaniesPage(filtered, company);
  renderDashboardDetail(context);
  renderCompanyDetail(company);
  renderReportsPage();
  renderAboutPage();
  updateDocumentTitle(company, dashboard);
}

function syncCompanyDetailLink(company) {
  const link = document.getElementById("company-detail-link");
  link.href = routeHref(`/companies/${encodeURIComponent(company.symbol)}/`);
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
  renderCompanyCloud("home-company-cloud", sortByScore(data).slice(0, 24), false, data.length);
  renderHomePaths();
}

function renderCompaniesPage(data, company) {
  syncCompanyDetailLink(company);
  renderSectorChips();
  renderCompanyCloud("company-cloud", sortByScore(data).slice(0, 36), true, companies.length);
  renderCompanyCards(data);
  renderExplorer(data);
}

function renderDashboardDetail(context) {
  const { dashboard, company, filtered, rawFiltered } = context;
  document.getElementById("active-dashboard-title").textContent = dashboard.title;
  document.getElementById("active-dashboard-audience").textContent = dashboard.audience;
  document.getElementById("dashboard-rationale").textContent = dashboard.rationale;
  renderRouteSpotlight(dashboard, company, filtered);
  renderDashboardGuide(dashboard, company, filtered);
  document.getElementById("primary-chart-title").textContent = dashboard.primaryTitle;
  document.getElementById("primary-chart-tag").textContent = dashboard.primaryTag;
  document.getElementById("secondary-chart-title").textContent = dashboard.secondaryTitle;
  document.getElementById("table-title").textContent = dashboard.tableTitle;
  document.getElementById("table-tag").textContent = dashboard.tableTag;

  if (!rawFiltered.length) {
    setStatus("dashboard-status", "error", "No companies match this filter yet, so this dashboard is temporarily showing the full tracked universe.");
  } else {
    clearStatus("dashboard-status");
  }

  renderMetricsInto("metric-grid", dashboard.metrics(context));
  drawChart(document.getElementById("primary-chart"), dashboard.primaryChart(context));
  drawChart(document.getElementById("secondary-chart"), dashboard.secondaryChart(context));
  renderChartExplanation("primary-chart-explanation", chartExplanation(dashboard.id, "primary"));
  renderChartExplanation("secondary-chart-explanation", chartExplanation(dashboard.id, "secondary"));
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

function renderDashboardGuide(dashboard, company, filtered) {
  const container = document.getElementById("dashboard-guide-grid");
  const sectorName = state.sector === "All" ? "all sectors" : state.sector;
  const guides = {
    executive: [
      ["Start Here", "Use this view to see market breadth before picking a company."],
      ["Best Signal", "Average score and sector revenue show where quality is concentrated."],
      ["Beginner Tip", "A high score is a starting point, not a buy signal. Open the company page next."]
    ],
    deepdive: [
      ["Selected Company", `${company.symbol} is shown with its trend, balance sheet, and shareholder return context.`],
      ["Best Signal", "Look for revenue growth and profit growth moving together."],
      ["Beginner Tip", "If profit rises but cash conversion is weak, inspect annual reports before trusting the earnings story."]
    ],
    sector: [
      ["Current Scope", `Comparing ${sectorName} across ${filtered.length} companies.`],
      ["Best Signal", "Sector averages help you avoid comparing a bank with an IT services company unfairly."],
      ["Beginner Tip", "Start with one sector at a time, then compare the strongest company with the sector average."]
    ],
    health: [
      ["Score Lens", "This view separates strong operators from companies that need more checking."],
      ["Best Signal", "Use score breakdowns on company pages to understand what is driving a high or low score."],
      ["Beginner Tip", "A weak score is a research warning, not automatically a sell call."]
    ],
    growth: [
      ["Growth Lens", "This view highlights revenue, profit, EPS, and margin direction."],
      ["Best Signal", "Quality growth means sales, profit, and cash flow improve together."],
      ["Beginner Tip", "Very fast growth with falling margins can still be risky."]
    ],
    debt: [
      ["Debt Lens", "This view helps you spot companies where borrowing pressure may matter."],
      ["Best Signal", "Debt-to-equity is more useful when read with interest coverage."],
      ["Beginner Tip", "Banks and NBFCs naturally carry higher leverage, so compare them with their own sector."]
    ],
    dividend: [
      ["Income Lens", "This view is built for investors who care about payouts and long-term shareholder returns."],
      ["Best Signal", "A sustainable dividend is better than a temporarily high payout."],
      ["Beginner Tip", "Check EPS growth before treating a high payout as attractive."]
    ]
  };

  container.innerHTML = (guides[dashboard.id] || guides.executive).map(([label, copy], index) => `
    <article class="dashboard-explainer ${index === 1 ? "blue" : index === 2 ? "yellow" : "red"}">
      <p class="section-tag">${label}</p>
      <p>${copy}</p>
    </article>
  `).join("");
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
  const years = company.years ?? [];
  const growthRows = company.growth_rows ?? company.growthRows ?? buildGrowthRowsFromYears(years);
  const cagrSummary = company.cagr_summary ?? company.cagrSummary ?? buildCagrSummaryFromYears(years);

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
    latestYoySalesGrowth: company.latest_yoy_sales_growth ?? company.latestYoySalesGrowth ?? growthRows[growthRows.length - 1]?.sales_growth_yoy ?? null,
    latestYoyProfitGrowth: company.latest_yoy_profit_growth ?? company.latestYoyProfitGrowth ?? growthRows[growthRows.length - 1]?.profit_growth_yoy ?? null,
    latestYoyEpsGrowth: company.latest_yoy_eps_growth ?? company.latestYoyEpsGrowth ?? growthRows[growthRows.length - 1]?.eps_growth_yoy ?? null,
    scoreBreakdown: company.score_breakdown ?? company.scoreBreakdown ?? {},
    growthRows,
    cagrSummary,
    years,
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
  const years = unique(companies.flatMap((item) => fiscalRows(item).map((entry) => entry.year))).sort((a, b) => b - a);
  return years[0] || new Date().getFullYear();
}

function renderCompanyDetail(company) {
  if (!company) {
    setStatus("company-detail-status", "error", "This company could not be loaded.");
    return;
  }

  clearStatus("company-detail-status");
  const sectorPeers = companies.filter((item) => item.sector === company.sector);
  const sectorAverage = buildSectorAverage(company.sector);
  const peerComparison = buildPeerComparison(company);
  const latestGrowth = company.growthRows[company.growthRows.length - 1] || {};

  document.getElementById("selected-company-name").textContent = `${company.companyName} (${company.symbol})`;
  document.getElementById("selected-health-score").textContent = Number(company.healthScore || 0).toFixed(1);
  document.getElementById("selected-health-label").textContent = company.healthLabel || labelFromScore(company.healthScore || 0);
  document.getElementById("selected-company-meta").textContent = [
    company.sector,
    `Revenue ${formatCurrency(company.revenue)}`,
    `D/E ${Number(company.debtToEquity || 0).toFixed(2)}`,
    `${sectorPeers.length} sector peers`
  ].join(" / ");
  renderMetricsInto("company-metric-grid", dashboards.find((item) => item.id === "deepdive").metrics({ company, filtered: companies, year: state.year }));
  drawChart(document.getElementById("company-primary-chart"), companyTrendData(company, ["sales", "profit"]));
  drawChart(document.getElementById("company-secondary-chart"), companyMiniProfile(company));
  drawChart(document.getElementById("growth-trend-chart"), growthTrajectoryData(company));
  renderChartExplanation("company-primary-chart-explanation", chartExplanation("deepdive", "primary"));
  renderChartExplanation("company-secondary-chart-explanation", chartExplanation("deepdive", "secondary"));
  renderChartExplanation("growth-trend-chart-explanation", "This chart turns yearly revenue, profit, and EPS into growth rates. Look for all three moving in the same direction rather than one line carrying the story alone.");
  renderCompanyProfile(company);
  renderDocuments(company.documents || []);
  renderMicroStatGrid("yoy-growth-grid", [
    { label: "Revenue YoY", value: formatPercent(latestGrowth.sales_growth_yoy), note: latestGrowth.sales_growth_yoy >= 0 ? "Growth improved" : "Revenue slipped" },
    { label: "Profit YoY", value: formatPercent(latestGrowth.profit_growth_yoy), note: latestGrowth.profit_growth_yoy >= 0 ? "Profit rose" : "Profit declined" },
    { label: "EPS YoY", value: formatPercent(latestGrowth.eps_growth_yoy), note: latestGrowth.eps_growth_yoy >= 0 ? "Per-share earnings grew" : "Per-share earnings weakened" },
    { label: "OPM Change", value: formatPercent(latestGrowth.opm_change), note: "Year-on-year margin movement" }
  ]);
  renderMicroStatGrid("cagr-grid", [
    { label: "Sales 3Y", value: formatPercent(company.cagrSummary.sales_3y), note: "Short-cycle compounding" },
    { label: "Sales 5Y", value: formatPercent(company.cagrSummary.sales_5y), note: "Medium-term revenue pace" },
    { label: "Profit 3Y", value: formatPercent(company.cagrSummary.profit_3y), note: "Short-cycle profit pace" },
    { label: "Profit 5Y", value: formatPercent(company.cagrSummary.profit_5y), note: "Medium-term profit pace" }
  ]);
  renderMicroStatGrid("sector-average-grid", [
    { label: "Health Score", value: `${Number(company.healthScore || 0).toFixed(1)} vs ${Number(sectorAverage.healthScore || 0).toFixed(1)}`, note: "Company vs sector average" },
    { label: "ROE", value: `${formatPercent(company.roe)} vs ${formatPercent(sectorAverage.roe)}`, note: "Return on equity comparison" },
    { label: "OPM", value: `${formatPercent(company.opm)} vs ${formatPercent(sectorAverage.opm)}`, note: "Operating margin comparison" },
    { label: "Debt / Equity", value: `${Number(company.debtToEquity || 0).toFixed(2)} vs ${Number(sectorAverage.debtToEquity || 0).toFixed(2)}`, note: "Lower is usually safer outside lenders" }
  ]);
  renderScoreBreakdown(company.scoreBreakdown);
  renderPeerComparison(peerComparison);
  renderBeginnerGuide(company, sectorAverage);
  renderTableInto("company-insight-table-head", "company-insight-table-body", companyYearTable(company));
  document.getElementById("documents-title").textContent = currentRoutePath().startsWith("/companies/")
    ? `${company.symbol} annual reports`
    : "Documents";
}

function renderMicroStatGrid(containerId, items) {
  const container = document.getElementById(containerId);
  container.innerHTML = items.map((item) => `
    <div class="micro-stat">
      <span>${item.label}</span>
      <strong>${item.value}</strong>
      <small>${item.note}</small>
    </div>
  `).join("");
}

function renderScoreBreakdown(breakdown = {}) {
  const container = document.getElementById("score-breakdown-list");
  const entries = Object.entries(breakdown);

  if (!entries.length) {
    container.innerHTML = `
      <div class="score-pill">
        <small>Score Detail</small>
        <strong>Not available</strong>
        <p>The warehouse has not produced factor-level scoring for this company yet.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = entries.map(([key, value]) => `
    <div class="score-pill">
      <small>${labelize(key)}</small>
      <strong>${Number(value.score || 0).toFixed(1)} / 100</strong>
      <p>${value.explanation || `${labelize(key)} score is based on the available financial metrics.`}</p>
    </div>
  `).join("");
}

function renderPeerComparison(payload) {
  const container = document.getElementById("peer-comparison-grid");
  const topPeers = payload.topPeers.length ? payload.topPeers : [payload.selectedCompany];
  const bottomPeers = payload.bottomPeers.length ? payload.bottomPeers : [payload.selectedCompany];

  container.innerHTML = [
    ...topPeers.map((peer) => peerCard(peer, "best", "Stronger peer")),
    ...bottomPeers.map((peer) => peerCard(peer, "watch", "Watch peer"))
  ].join("");
}

function peerCard(peer, tone, label) {
  return `
    <button class="peer-card ${tone}" type="button" data-company-symbol="${peer.symbol}">
      <small>${label}</small>
      <strong>${peer.symbol}</strong>
      <span>Score ${Number(peer.healthScore || 0).toFixed(1)} / ROE ${formatPercent(peer.roe)}</span>
    </button>
  `;
}

function renderBeginnerGuide(company, sectorAverage) {
  const guides = [
    {
      label: "ROE",
      title: `${formatPercent(company.roe)} return on equity`,
      copy: `ROE shows how efficiently the company turns shareholder capital into profit. The ${company.sector} average here is ${formatPercent(sectorAverage.roe)}.`
    },
    {
      label: "Debt / Equity",
      title: `${Number(company.debtToEquity || 0).toFixed(2)} debt load`,
      copy: "Debt-to-equity compares borrowings with the capital base. Lower is usually safer, but lenders such as banks and NBFCs should be compared within their sector."
    },
    {
      label: "OPM",
      title: `${formatPercent(company.opm)} operating margin`,
      copy: `OPM tells you how much operating profit remains from sales before interest and tax. The current sector average is ${formatPercent(sectorAverage.opm)}.`
    },
    {
      label: "Cash Flow",
      title: `${Number(company.cashConversion || 0).toFixed(2)}x cash conversion`,
      copy: "Cash conversion compares operating cash flow with accounting profit. Around 1.0x or higher means reported profits are better supported by cash."
    },
    {
      label: "Dividend",
      title: `${formatPercent(company.dividendPayout)} payout`,
      copy: "Dividend payout shows how much of profit is returned to shareholders. A moderate, repeatable payout is usually healthier than a very high payout without EPS growth."
    }
  ];

  document.getElementById("beginner-guide-grid").innerHTML = guides.map((item) => `
    <article class="guide-card">
      <small>${item.label}</small>
      <strong>${item.title}</strong>
      <p>${item.copy}</p>
    </article>
  `).join("");
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
    { label: "Start Here", title: "Explore Companies", copy: "Search companies, compare sectors, and open simple detail pages.", href: routeHref("/companies/"), color: "yellow" },
    { label: "Visual Learning", title: "Browse Dashboards", copy: "Pick a guided dashboard for debt, growth, dividends, or financial health.", href: routeHref("/dashboards/"), color: "blue" },
    { label: "Source Material", title: "Open Reports", copy: "Go straight to annual report links when you want to read the underlying filing.", href: routeHref("/reports/"), color: "red" }
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

function renderCompanyCloud(targetId, data, large = false, totalCount = data.length) {
  const container = document.getElementById(targetId);
  const palette = ["red", "blue", "yellow"];
  const remainingCount = Math.max(totalCount - data.length, 0);
  const chips = data.map((item, index) => `
    <button
      type="button"
      class="company-chip logo-chip ${palette[index % palette.length]} ${large ? "large" : ""}"
      data-company-symbol="${item.symbol}"
      style="--float-delay:${(index % 7) * 0.18}s"
      title="${escapeAttribute(item.companyName)}"
    >
      ${companyLogoMarkup(item)}
    </button>
  `);

  if (remainingCount > 0) {
    chips.push(`
      <div class="company-chip logo-chip more-chip ${large ? "large" : ""}" aria-label="${remainingCount} more companies are available in the table below">
        <span class="company-logo-frame">
          <span class="company-logo-fallback">+${remainingCount}</span>
        </span>
        <span class="company-chip-copy">
          <strong>And many more</strong>
          <small>${totalCount} warehouse companies</small>
        </span>
      </div>
    `);
  }

  container.innerHTML = chips.join("");
}

function companyLogoMarkup(company) {
  const primaryLogo = isValidImageUrl(company.companyLogo) ? company.companyLogo.trim() : companyFaviconUrl(company);
  const secondaryLogo = primaryLogo === company.companyLogo?.trim() ? companyFaviconUrl(company) : "";
  const hasLogo = Boolean(primaryLogo);
  const fallback = `<span class="company-logo-fallback" ${hasLogo ? "hidden" : ""}>${logoInitials(company)}</span>`;
  const image = hasLogo
    ? `<img class="company-logo-tile" src="${escapeAttribute(primaryLogo)}" ${secondaryLogo ? `data-fallback-src="${escapeAttribute(secondaryLogo)}"` : ""} alt="${escapeAttribute(company.companyName)} logo" loading="lazy" decoding="async" onerror="handleCompanyLogoError(this);">`
    : "";

  return `
    <span class="company-logo-frame">
      ${image}
      ${fallback}
    </span>
    <span class="company-chip-copy">
      <strong>${company.symbol}</strong>
      <small>${company.companyName}</small>
    </span>
  `;
}

function handleCompanyLogoError(image) {
  const fallbackSrc = image.dataset.fallbackSrc;
  if (fallbackSrc) {
    image.dataset.fallbackSrc = "";
    image.src = fallbackSrc;
    return;
  }

  image.hidden = true;
  const fallback = image.nextElementSibling;
  if (fallback) {
    fallback.hidden = false;
  }
}

function isValidImageUrl(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value.trim());
}

function companyFaviconUrl(company) {
  if (!isValidImageUrl(company.website)) {
    return "";
  }

  try {
    const host = new URL(company.website).hostname;
    return host ? `https://www.google.com/s2/favicons?domain=${encodeURIComponent(host)}&sz=64` : "";
  } catch (error) {
    return "";
  }
}

function logoInitials(company) {
  const source = company.companyName || company.symbol || "";
  const words = source.replace(/[^a-z0-9 ]/gi, " ").trim().split(/\s+/).filter(Boolean);
  const initials = words.slice(0, 2).map((word) => word[0]).join("");
  return (initials || company.symbol.slice(0, 2) || "BI").toUpperCase();
}

function renderCompanyCards(data) {
  const container = document.getElementById("company-card-grid");
  const pagination = document.getElementById("company-card-pagination");
  const sorted = sortedExplorerCompanies(data);
  const totalPages = Math.max(1, Math.ceil(sorted.length / state.companyCardPageSize));
  state.companyCardPage = Math.min(Math.max(state.companyCardPage, 1), totalPages);
  const start = (state.companyCardPage - 1) * state.companyCardPageSize;
  const shortlist = sorted.slice(start, start + state.companyCardPageSize);

  if (!sorted.length) {
    container.innerHTML = `
      <article class="company-card company-card-empty">
        <p class="section-tag">No Matches</p>
        <h4>Try another company or sector</h4>
        <p class="company-card-meta">Your current filters did not match the tracked company universe.</p>
      </article>
    `;
    pagination.innerHTML = "";
    return;
  }

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

  pagination.innerHTML = totalPages > 1
    ? `
      <button class="ghost-button" type="button" data-card-page="${state.companyCardPage - 1}" ${state.companyCardPage === 1 ? "disabled" : ""}>Previous</button>
      <span>Page ${state.companyCardPage} of ${totalPages}</span>
      <button class="solid-button" type="button" data-card-page="${state.companyCardPage + 1}" ${state.companyCardPage === totalPages ? "disabled" : ""}>Next</button>
    `
    : `<span>${sorted.length} companies</span>`;
}

function renderMetricsInto(containerId, metrics) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = metrics.map((item) => `
    <div class="metric-card" title="${escapeAttribute(metricExplanation(item.label))}" tabindex="0">
      <p>${item.label}<span class="metric-help" aria-label="${escapeAttribute(metricExplanation(item.label))}">?</span></p>
      <strong>${item.value}</strong>
      <small>${item.note}</small>
    </div>
  `).join("");
}

function metricExplanation(label) {
  if (metricExplanations[label]) {
    return metricExplanations[label];
  }
  if (label.includes("CAGR")) {
    return metricExplanations["3Y Sales CAGR"];
  }
  if (label.includes("D/E") || label.includes("Debt")) {
    return metricExplanations["Debt / Equity"];
  }
  if (label.includes("ROE")) {
    return metricExplanations["ROE"];
  }
  if (label.includes("OPM") || label.includes("Margin")) {
    return metricExplanations["OPM"];
  }
  if (label.includes("Cash")) {
    return metricExplanations["Cash Conversion"];
  }
  if (label.includes("Health")) {
    return metricExplanations["Health Score"];
  }
  return "This metric summarizes the current dashboard scope. Use it as a quick signal, then inspect the chart and company detail page for context.";
}

function renderChartExplanation(elementId, text) {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }
  element.textContent = text;
}

function chartExplanation(dashboardId, slot) {
  return dashboardChartExplanations[dashboardId]?.[slot]
    || "This chart highlights the selected metric for the current filter. Use it as a guide for what to inspect next, not as a standalone conclusion.";
}

function renderTableInto(headId, bodyId, table) {
  const head = document.getElementById(headId);
  const body = document.getElementById(bodyId);
  lastRenderedTable = table;
  head.innerHTML = `<tr>${table.columns.map((column) => `<th>${column}</th>`).join("")}</tr>`;
  body.innerHTML = table.rows.length
    ? table.rows.map((row) => `
      <tr>${row.map((cell, index) => `<td data-label="${escapeAttribute(table.columns[index])}">${cell}</td>`).join("")}</tr>
    `).join("")
    : `<tr><td colspan="${table.columns.length}" data-label="State">No records available for this view.</td></tr>`;
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
  const bragGrid = document.getElementById("about-brag-grid");
  const glossaryGrid = document.getElementById("metric-glossary-grid");
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

  const bragItems = [
    {
      label: "Warehouse Brain",
      title: "Real data underneath the shine",
      copy: "The interface is not a pretty shell over random cards. It is driven by a PostgreSQL warehouse built from multi-year company exports, annual report links, and normalized financial facts."
    },
    {
      label: "Beginner Power",
      title: "Complex finance, made readable",
      copy: "A first-time investor can move from company discovery to debt, growth, cash flow, score breakdowns, peer comparison, and original filings without getting buried in spreadsheet chaos."
    },
    {
      label: "Score Engine",
      title: "Six lenses in one view",
      copy: "Profitability, growth, leverage, cash flow, dividends, and trend signals are compressed into a practical health score with explanations that point users toward the next question."
    },
    {
      label: "Research Depth",
      title: "From cloud view to company microscope",
      copy: "The site starts broad with market and sector views, then drills into company pages with charts, pros, watchpoints, documents, and beginner guidance."
    },
    {
      label: "Launch Ready",
      title: "Built like a real product",
      copy: "The frontend can run independently, the backend exposes documented API routes, and the stack is shaped for a clean production rollout."
    },
    {
      label: "Investor Feel",
      title: "A dashboard that teaches while it shows",
      copy: "Bluestock IQ does not just display numbers. It explains why a metric matters, where the risk sits, and which source report to open when the user wants proof."
    }
  ];

  bragGrid.innerHTML = bragItems.map((item, index) => `
    <article class="brag-card ${index % 3 === 0 ? "blue" : index % 3 === 1 ? "yellow" : "red"}">
      <p class="section-tag">${item.label}</p>
      <h4>${item.title}</h4>
      <p>${item.copy}</p>
    </article>
  `).join("");

  glossaryGrid.innerHTML = metricGlossary.map((item, index) => `
    <article class="metric-glossary-card ${index % 2 === 0 ? "yellow" : "blue"}">
      <strong>${item.label}</strong>
      <div>
        <h4>${item.title}</h4>
        <p>${item.copy}</p>
      </div>
    </article>
  `).join("");
}

function drawChart(canvas, config) {
  if (!canvas || !config) {
    return;
  }

  destroyChart(canvas.id);

  if (!window.Chart) {
    drawNativeChart(canvas, config);
    return;
  }

  const chartConfig = toChartConfig(config);
  chartRegistry.set(canvas.id, new Chart(canvas, chartConfig));
}

function drawSparkline(canvas, values) {
  if (!canvas) {
    return;
  }

  destroyChart(canvas.id);

  if (!window.Chart) {
    drawNativeSparkline(canvas, values);
    return;
  }

  chartRegistry.set(canvas.id, new Chart(canvas, {
    type: "line",
    data: {
      labels: values.map((_, index) => index + 1),
      datasets: [{
        data: values,
        borderColor: "#f0c020",
        borderWidth: 4,
        pointRadius: 0,
        tension: 0
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true }
      },
      scales: {
        x: { display: false },
        y: { display: false }
      }
    }
  }));
}

function prepareCanvas(canvas) {
  const context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  const width = Math.max(canvas.clientWidth || 320, 1);
  const height = Math.max(canvas.clientHeight || 180, 1);
  const pixelRatio = window.devicePixelRatio || 1;
  canvas.width = Math.round(width * pixelRatio);
  canvas.height = Math.round(height * pixelRatio);
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  context.clearRect(0, 0, width, height);
  context.lineJoin = "miter";
  context.lineCap = "square";
  context.font = "700 12px Outfit, sans-serif";
  return { context, width, height };
}

function drawNativeChart(canvas, config) {
  if (config.type === "bars") {
    drawNativeBars(canvas, config);
    return;
  }

  if (config.type === "scatter") {
    drawNativeScatter(canvas, config);
    return;
  }

  drawNativeLine(canvas, config);
}

function drawNativeSparkline(canvas, values) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) {
    return;
  }
  const { context, width, height } = prepared;
  const padding = 8;
  const points = scaleCanvasPoints(values, width, height, padding);

  context.strokeStyle = "#121212";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(padding, height - padding);
  context.lineTo(width - padding, height - padding);
  context.stroke();

  drawCanvasPath(context, points, "#f0c020", 4);
}

function drawNativeBars(canvas, config) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) {
    return;
  }
  const { context, width, height } = prepared;
  const values = config.values || [];
  const padding = { top: 46, right: 16, bottom: 42, left: 24 };
  const chartHeight = Math.max(height - padding.top - padding.bottom, 1);
  const maxValue = Math.max(...values.map((item) => Number(item.value || 0)), 1);
  const slot = (width - padding.left - padding.right) / Math.max(values.length, 1);
  const barWidth = Math.min(54, slot * 0.58);

  context.strokeStyle = "#121212";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(padding.left, height - padding.bottom);
  context.lineTo(width - padding.right, height - padding.bottom);
  context.stroke();
  drawCanvasLegend(context, [
    { label: "Bar height = value", color: "#121212" },
    { label: "Color = sector/category", color: values[0]?.color || "#1040c0" }
  ], padding.left, 16);

  values.forEach((item, index) => {
    const value = Number(item.value || 0);
    const scaledHeight = (value / maxValue) * chartHeight;
    const x = padding.left + slot * index + (slot - barWidth) / 2;
    const y = height - padding.bottom - scaledHeight;
    context.fillStyle = item.color || "#1040c0";
    context.strokeStyle = "#121212";
    context.lineWidth = 3;
    context.fillRect(x, y, barWidth, scaledHeight);
    context.strokeRect(x, y, barWidth, scaledHeight);
    drawCanvasLabel(context, item.display ?? value, x + barWidth / 2, Math.max(y - 8, 14), "#121212");
    drawCanvasLabel(context, item.label, x + barWidth / 2, height - 16, "#121212");
  });
}

function drawNativeLine(canvas, config) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) {
    return;
  }
  const { context, width, height } = prepared;
  const series = config.series || [];
  const allValues = series.flatMap((item) => item.values || []).map((value) => Number(value || 0));
  const padding = { top: 48, right: 18, bottom: 38, left: 34 };
  const maxValue = Math.max(...allValues, 1);
  const minValue = Math.min(...allValues, 0);
  const range = maxValue - minValue || 1;

  drawCanvasAxes(context, width, height, padding);
  drawCanvasLegend(context, series.map((entry) => ({
    label: labelize(entry.name),
    color: entry.color || "#1040c0"
  })), padding.left, 16);

  series.forEach((entry) => {
    const values = entry.values || [];
    const points = values.map((value, index) => ({
      x: padding.left + index * ((width - padding.left - padding.right) / Math.max(values.length - 1, 1)),
      y: height - padding.bottom - ((Number(value || 0) - minValue) / range) * (height - padding.top - padding.bottom)
    }));
    drawCanvasPath(context, points, entry.color || "#1040c0", 3);
    points.forEach((point) => drawCanvasMarker(context, point.x, point.y, entry.color || "#1040c0"));
  });

  (config.labels || []).forEach((label, index, labels) => {
    const x = padding.left + index * ((width - padding.left - padding.right) / Math.max(labels.length - 1, 1));
    drawCanvasLabel(context, label, x, height - 14, "#5f6b77");
  });
}

function drawNativeScatter(canvas, config) {
  const prepared = prepareCanvas(canvas);
  if (!prepared) {
    return;
  }
  const { context, width, height } = prepared;
  const points = config.points || [];
  const padding = { top: 50, right: 20, bottom: 42, left: 38 };
  const maxX = Math.max(...points.map((point) => Number(point.x || 0)), 1);
  const maxY = Math.max(...points.map((point) => Number(point.y || 0)), 1);

  drawCanvasAxes(context, width, height, padding);
  drawCanvasLegend(context, [
    { label: `X = ${config.xLabel || "horizontal metric"}`, color: "#1040c0" },
    { label: `Y = ${config.yLabel || "vertical metric"}`, color: "#d02020" }
  ], padding.left, 16);
  points.forEach((point) => {
    const x = padding.left + (Number(point.x || 0) / maxX) * (width - padding.left - padding.right);
    const y = height - padding.bottom - (Number(point.y || 0) / maxY) * (height - padding.top - padding.bottom);
    drawCanvasCircle(context, x, y, point.size || 8, point.color || "#d02020");
    drawCanvasLabel(context, point.label, x, y - 14, "#121212");
  });
  drawCanvasLabel(context, config.xLabel || "", width / 2, height - 12, "#121212");
}

function drawCanvasAxes(context, width, height, padding) {
  context.strokeStyle = "#121212";
  context.lineWidth = 3;
  context.beginPath();
  context.moveTo(padding.left, padding.top);
  context.lineTo(padding.left, height - padding.bottom);
  context.lineTo(width - padding.right, height - padding.bottom);
  context.stroke();
}

function drawCanvasPath(context, points, color, lineWidth) {
  if (!points.length) {
    return;
  }
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
  context.beginPath();
  points.forEach((point, index) => {
    if (index === 0) {
      context.moveTo(point.x, point.y);
    } else {
      context.lineTo(point.x, point.y);
    }
  });
  context.stroke();
}

function drawCanvasMarker(context, x, y, color) {
  context.fillStyle = color;
  context.strokeStyle = "#121212";
  context.lineWidth = 2;
  context.fillRect(x - 4, y - 4, 8, 8);
  context.strokeRect(x - 4, y - 4, 8, 8);
}

function drawCanvasCircle(context, x, y, radius, color) {
  context.fillStyle = color;
  context.strokeStyle = "#121212";
  context.lineWidth = 3;
  context.beginPath();
  context.arc(x, y, radius, 0, Math.PI * 2);
  context.fill();
  context.stroke();
}

function drawCanvasLabel(context, text, x, y, color) {
  context.fillStyle = color;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(String(text ?? ""), x, y);
}

function drawCanvasLegend(context, items, x, y) {
  context.save();
  context.textAlign = "left";
  context.textBaseline = "middle";
  context.font = "700 11px Outfit, sans-serif";
  let cursorX = x;
  items.slice(0, 4).forEach((item) => {
    const label = String(item.label || "").slice(0, 28);
    context.fillStyle = item.color || "#1040c0";
    context.strokeStyle = "#121212";
    context.lineWidth = 2;
    context.fillRect(cursorX, y - 5, 10, 10);
    context.strokeRect(cursorX, y - 5, 10, 10);
    context.fillStyle = "#121212";
    context.fillText(label, cursorX + 15, y);
    cursorX += Math.min(context.measureText(label).width + 34, 150);
  });
  context.restore();
}

function scaleCanvasPoints(values, width, height, padding) {
  const numericValues = values.map((value) => Number(value || 0));
  const maxValue = Math.max(...numericValues, 1);
  const minValue = Math.min(...numericValues, 0);
  const range = maxValue - minValue || 1;
  return numericValues.map((value, index) => ({
    x: padding + index * ((width - padding * 2) / Math.max(numericValues.length - 1, 1)),
    y: height - padding - ((value - minValue) / range) * (height - padding * 2)
  }));
}

function toChartConfig(config) {
  const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "nearest", intersect: false },
    plugins: {
      legend: {
        display: config.type === "line",
        labels: {
          color: "#121212",
          font: { family: "Outfit", weight: "700" }
        }
      },
      tooltip: {
        backgroundColor: "#121212",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
        borderColor: "#f0c020",
        borderWidth: 2,
        displayColors: true
      }
    },
    scales: {
      x: {
        ticks: { color: "#121212", font: { family: "Outfit", weight: "700" } },
        grid: { color: "rgba(18,18,18,0.12)" },
        border: { color: "#121212", width: 2 }
      },
      y: {
        ticks: { color: "#121212", font: { family: "Outfit", weight: "700" } },
        grid: { color: "rgba(18,18,18,0.12)" },
        border: { color: "#121212", width: 2 }
      }
    }
  };

  if (config.type === "bars") {
    return {
      type: "bar",
      data: {
        labels: config.values.map((item) => item.label),
        datasets: [{
          label: "Bar height = value",
          data: config.values.map((item) => item.value),
          backgroundColor: config.values.map((item) => item.color || "#1040c0"),
          borderColor: "#121212",
          borderWidth: 3
        }]
      },
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          legend: {
            display: true,
            labels: {
              color: "#121212",
              font: { family: "Outfit", weight: "700" }
            }
          },
          tooltip: {
            ...baseOptions.plugins.tooltip,
            callbacks: {
              label: (context) => {
                const item = config.values[context.dataIndex];
                return `${item.label}: ${item.display ?? item.value}`;
              }
            }
          }
        }
      }
    };
  }

  if (config.type === "scatter") {
    return {
      type: "scatter",
      data: {
        datasets: config.points.map((point) => ({
          label: point.label,
          data: [{ x: point.x, y: point.y }],
          pointRadius: point.size || 8,
          pointHoverRadius: (point.size || 8) + 3,
          backgroundColor: point.color || "#d02020",
          borderColor: "#121212",
          borderWidth: 2
        }))
      },
      options: {
        ...baseOptions,
        plugins: {
          ...baseOptions.plugins,
          legend: {
            display: true,
            labels: {
              color: "#121212",
              font: { family: "Outfit", weight: "700" }
            }
          }
        },
        scales: {
          x: { ...baseOptions.scales.x, title: { display: true, text: config.xLabel, color: "#121212" } },
          y: { ...baseOptions.scales.y, title: { display: true, text: config.yLabel, color: "#121212" } }
        }
      }
    };
  }

  return {
    type: "line",
    data: {
      labels: config.labels,
      datasets: config.series.map((entry) => ({
        label: labelize(entry.name),
        data: entry.values,
        borderColor: entry.color,
        backgroundColor: entry.color,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0
      }))
    },
    options: baseOptions
  };
}

function destroyChart(canvasId) {
  const existing = chartRegistry.get(canvasId);
  if (existing) {
    existing.destroy();
    chartRegistry.delete(canvasId);
  }
}

function paintCanvasFallback(canvas, message) {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }
  const width = canvas.width || canvas.clientWidth || 320;
  const height = canvas.height || canvas.clientHeight || 160;
  context.clearRect(0, 0, width, height);
  context.fillStyle = "#f0c020";
  context.fillRect(0, 0, width, height);
  context.strokeStyle = "#121212";
  context.lineWidth = 4;
  context.strokeRect(4, 4, width - 8, height - 8);
  context.fillStyle = "#121212";
  context.font = "700 16px Outfit, sans-serif";
  context.fillText(message, 18, 36);
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
  const sorted = [...data].sort((left, right) => ascending
    ? Number(left[key] || 0) - Number(right[key] || 0)
    : Number(right[key] || 0) - Number(left[key] || 0));

  const values = sorted
    .slice(0, limit)
    .map((item) => {
      const value = Number(item[key] || 0);
      return {
        label: item.symbol,
        value: Number(value.toFixed(1)),
        display: value.toFixed(1),
        color: colorForSector(item.sector)
      };
    });

  return { type: "bars", values };
}

function companyTrendData(company, keys) {
  const rows = fiscalRows(company);
  return {
    type: "line",
    labels: rows.map((entry) => entry.year),
    series: keys.map((key) => ({
      name: key,
      color: key === "sales" ? "#0f766e" : key === "profit" ? "#d96c3f" : "#144d5f",
      values: rows.map((entry) => Number(entry[key] || 0))
    }))
  };
}

function companyMiniProfile(company) {
  return {
    type: "bars",
    values: [
      { label: "OPM", value: Number(company.opm || 0), display: formatPercent(company.opm), color: "#1040c0" },
      { label: "ROE", value: Number(company.roe || 0), display: formatPercent(company.roe), color: "#d02020" },
      { label: "D/E", value: Number(company.debtToEquity || 0) * 10, display: Number(company.debtToEquity || 0).toFixed(2), color: "#121212" },
      { label: "Payout", value: Number(company.dividendPayout || 0), display: formatPercent(company.dividendPayout), color: "#f0c020" }
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
  window.history.pushState({}, "", routeHref(path));
  applyRouteState();
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function companyYearTable(company) {
  return {
    columns: ["Year", "Sales", "Net Profit", "OPM", "EPS", "Dividend Payout"],
    rows: fiscalRows(company).map((entry) => [
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

function buildGrowthRowsFromYears(years = []) {
  return [...years]
    .filter((entry) => Number(entry.year) > 0)
    .sort((left, right) => Number(left.year || 0) - Number(right.year || 0))
    .map((entry, index, rows) => {
      const previous = rows[index - 1];
      return {
        year: entry.year,
        sales: entry.sales,
        profit: entry.profit,
        eps: entry.eps,
        opm: entry.opm,
        sales_growth_yoy: previous ? growthRate(entry.sales, previous.sales) : null,
        profit_growth_yoy: previous ? growthRate(entry.profit, previous.profit) : null,
        eps_growth_yoy: previous ? growthRate(entry.eps, previous.eps) : null,
        opm_change: previous ? Number(entry.opm || 0) - Number(previous.opm || 0) : null
      };
    });
}

function buildCagrSummaryFromYears(years = []) {
  const rows = [...years]
    .filter((entry) => Number(entry.year) > 0)
    .sort((left, right) => Number(left.year || 0) - Number(right.year || 0));
  return {
    sales_3y: cagrFromRows(rows, "sales", 3),
    sales_5y: cagrFromRows(rows, "sales", 5),
    sales_10y: cagrFromRows(rows, "sales", 10),
    profit_3y: cagrFromRows(rows, "profit", 3),
    profit_5y: cagrFromRows(rows, "profit", 5),
    profit_10y: cagrFromRows(rows, "profit", 10)
  };
}

function buildSectorAverage(sector) {
  const peers = companies.filter((item) => item.sector === sector);
  return {
    healthScore: average(peers.map((item) => item.healthScore)),
    roe: average(peers.map((item) => item.roe)),
    opm: average(peers.map((item) => item.opm)),
    debtToEquity: average(peers.map((item) => item.debtToEquity)),
    salesCagr3y: average(peers.map((item) => item.salesCagr3y))
  };
}

function buildPeerComparison(company) {
  const peers = companies
    .filter((item) => item.sector === company.sector)
    .sort((left, right) => Number(right.healthScore || 0) - Number(left.healthScore || 0));

  return {
    selectedCompany: company,
    topPeers: peers.slice(0, 3),
    bottomPeers: peers.slice(-3).reverse()
  };
}

function growthTrajectoryData(company) {
  const rows = (company.growthRows.length ? company.growthRows : buildGrowthRowsFromYears(company.years))
    .filter((entry) => Number(entry.year) > 0);
  return {
    type: "line",
    labels: rows.map((entry) => entry.year),
    series: [
      { name: "sales_growth_yoy", color: "#1040c0", values: rows.map((entry) => entry.sales_growth_yoy ?? 0) },
      { name: "profit_growth_yoy", color: "#d02020", values: rows.map((entry) => entry.profit_growth_yoy ?? 0) },
      { name: "eps_growth_yoy", color: "#f0c020", values: rows.map((entry) => entry.eps_growth_yoy ?? 0) }
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
  const years = unique(data.flatMap((item) => fiscalRows(item).map((entry) => entry.year))).sort((a, b) => a - b);
  return years.map((year) => sum(data.map((item) => fiscalRows(item).find((entry) => entry.year === year)?.[key] || 0)));
}

function companyYears(company, key) {
  return fiscalRows(company).map((entry) => entry[key]);
}

function fiscalRows(company) {
  return (company.years || [])
    .filter((entry) => Number(entry.year) > 0)
    .sort((left, right) => Number(left.year) - Number(right.year));
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
  return String(key)
    .replace(/_/g, " ")
    .replace(/([A-Z])/g, " $1")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^./, (value) => value.toUpperCase());
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

function formatPercent(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    return "NA";
  }
  return `${Number(value).toFixed(1)}%`;
}

function formatCompact(value) {
  return new Intl.NumberFormat("en-IN", { notation: "compact", maximumFractionDigits: 1 }).format(value);
}

function average(values) {
  return values.length ? sum(values) / values.length : 0;
}

function sum(values) {
  return values.reduce((total, value) => total + Number(value || 0), 0);
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

function growthRate(current, previous) {
  if (current === null || current === undefined || !previous) {
    return null;
  }
  return ((Number(current) - Number(previous)) / Math.abs(Number(previous))) * 100;
}

function cagrFromRows(rows, key, periods) {
  if (rows.length <= periods) {
    return null;
  }
  const start = Number(rows[rows.length - periods - 1]?.[key]);
  const end = Number(rows[rows.length - 1]?.[key]);
  if (!start || !end || start <= 0 || end <= 0) {
    return null;
  }
  return ((end / start) ** (1 / periods) - 1) * 100;
}

function setStatus(elementId, type, message) {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }
  element.className = `page-status visible ${type}`;
  element.textContent = message;
}

function clearStatus(elementId) {
  const element = document.getElementById(elementId);
  if (!element) {
    return;
  }
  element.className = "page-status";
  element.textContent = "";
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
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

init();
