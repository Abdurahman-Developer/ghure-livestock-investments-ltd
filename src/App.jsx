import { useEffect, useState } from "react";
import Login from "./login";

const API_BASE_URL = import.meta.env?.VITE_API_URL || "/api";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "sales", label: "Sales" },
  { key: "expenses", label: "Expenses" },
  { key: "livestock-assets", label: "Livestock Assets" },
  { key: "debts", label: "Debts" },
];

const DASHBOARD = [
  { key: "total-sales", label: "TOTAL SALES" },
  { key: "total-expenses", label: "TOTAL EXPENSES" },
  { key: "livestock-investments", label: "LIVESTOCK INVESTMENTS" },
  { key: "net-position", label: "NET POSITION" },
  { key: "debts", label: "DEBTS" },
];

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getMonthKey = (dateStr) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
};

export default function App() {
  // =========================================================
  // AUTH
  // =========================================================

  const [token, setToken] = useState(localStorage.getItem("token"));

  const handleLoginSuccess = (t) => {
    localStorage.setItem("token", t);
    setToken(t);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  // =========================================================
  // NAV / FILTER STATE
  // =========================================================

  const [active, setActive] = useState("overview");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [selectedStock, setSelectedStock] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavClick = (key) => {
    setActive(key);
    setSidebarOpen(false);
  };

  // =========================================================
  // SALES
  // =========================================================

  const [sales, setSales] = useState([]);

  const [salesForm, setSalesForm] = useState({
    name: "",
    stock: "",
    weight: "",
    unitPrice: "",
    date: "",
  });

  const handleSalesChange = (e) => {
    setSalesForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSalesSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/sales`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(salesForm),
      });

      if (!res.ok) {
        throw new Error("Failed to save sale");
      }

      const data = await res.json();

      setSales((prev) => [data.sales, ...prev]);

      setSalesForm({
        name: "",
        weight: "",
        unitPrice: "",
        date: "",
        stock: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSale = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/sales/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!res.ok) {
        throw new Error("Failed to delete sale");
      }

      setSales((prev) => prev.filter((sale) => sale._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================================
  // EXPENSES
  // =========================================================

  const [expenses, setExpenses] = useState([]);

  const [expensesForm, setExpensesForm] = useState({
    item: "",
    amount: "",
    date: "",
  });

  const handleExpensesChange = (e) => {
    setExpensesForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleExpensesSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/expenses`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(expensesForm),
      });

      if (!res.ok) {
        throw new Error("Failed to save expense");
      }

      const data = await res.json();

      setExpenses((prev) => [data.expenses, ...prev]);

      setExpensesForm({
        item: "",
        amount: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/expenses/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!res.ok) {
        throw new Error("Failed to delete expense");
      }

      setExpenses((prev) => prev.filter((expense) => expense._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================================
  // LIVESTOCK ASSETS
  // =========================================================

  const [assets, setAssets] = useState([]);

  const [assetsForm, setAssetsForm] = useState({
    animal: "",
    stockName: "",
    unitPrice: "",
    date: "",
  });

  const handleAssetsChange = (e) => {
    setAssetsForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAssetsSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/livestock-assets`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(assetsForm),
      });

      if (!res.ok) {
        throw new Error("Failed to save asset");
      }

      const data = await res.json();

      setAssets((prev) => [data.assets, ...prev]);

      setAssetsForm({
        animal: "",
        stockName: "",
        unitPrice: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteAsset = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/livestock-assets/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!res.ok) {
        throw new Error("Failed to delete asset");
      }

      setAssets((prev) => prev.filter((asset) => asset._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================================
  // DEBTS
  // =========================================================

  const [debts, setDebts] = useState([]);

  const [debtsForm, setDebtsForm] = useState({
    name: "",
    amount: "",
    date: "",
  });

  const handleDebtsChange = (e) => {
    setDebtsForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDebtsSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/debts`, {
        method: "POST",
        headers: authHeaders,
        body: JSON.stringify(debtsForm),
      });

      if (!res.ok) {
        throw new Error("Failed to save debt");
      }

      const data = await res.json();

      setDebts((prev) => [data.debts, ...prev]);

      setDebtsForm({
        name: "",
        amount: "",
        date: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteDebt = async (id) => {
    try {
      const res = await fetch(`${API_BASE_URL}/debts/${id}`, {
        method: "DELETE",
        headers: authHeaders,
      });

      if (!res.ok) {
        throw new Error("Failed to delete debt");
      }

      setDebts((prev) => prev.filter((debt) => debt._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // =========================================================
  // FETCH ALL DATA
  // Runs once on mount AND every time `token` changes (login/logout),
  // so data loads immediately after login without needing a refresh.
  // =========================================================

  useEffect(() => {
    if (!token) return;

    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    const getSales = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/sales`, { headers });

        if (!res.ok) {
          throw new Error("Failed to fetch sales");
        }

        const data = await res.json();

        setSales(data.sales);
      } catch (err) {
        console.error(err);
      }
    };

    const getExpenses = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/expenses`, { headers });

        if (!res.ok) {
          throw new Error("Failed to fetch expenses");
        }

        const data = await res.json();

        setExpenses(data.expenses);
      } catch (err) {
        console.error(err);
      }
    };

    const getAssets = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/livestock-assets`, {
          headers,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch assets");
        }

        const data = await res.json();

        setAssets(data.assets);
      } catch (err) {
        console.error(err);
      }
    };

    const getDebts = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/debts`, { headers });

        if (!res.ok) {
          throw new Error("Failed to fetch debts");
        }

        const data = await res.json();

        setDebts(data.debts);
      } catch (err) {
        console.error(err);
      }
    };

    getSales();
    getExpenses();
    getAssets();
    getDebts();
  }, [token]);

  // =========================================================
  // MONTH FILTER
  // =========================================================

  const monthOptions = Array.from(
    new Set([
      ...sales.map((s) => getMonthKey(s.date)),
      ...expenses.map((e) => getMonthKey(e.date)),
      ...assets.map((a) => getMonthKey(a.date)),
      ...debts.map((d) => getMonthKey(d.date)),
    ])
  ).sort((a, b) => (a < b ? 1 : -1));

  const formatMonthLabel = (key) => {
    const [year, month] = key.split("-");
    return `${MONTH_NAMES[Number(month) - 1]} ${year}`;
  };

  // =========================================================
  // STOCK FILTER
  // =========================================================

  const stockOptions = Array.from(
    new Set(assets.map((a) => a.stockName).filter(Boolean))
  ).sort();

  const filteredSales = sales
    .filter(
      (s) => selectedMonth === "all" || getMonthKey(s.date) === selectedMonth
    )
    .filter(
      (s) => selectedStock === "all" || s.stock?.stockName === selectedStock
    );

  const filteredExpenses =
    selectedMonth === "all"
      ? expenses
      : expenses.filter((e) => getMonthKey(e.date) === selectedMonth);

  const filteredAssets = assets
    .filter(
      (a) => selectedMonth === "all" || getMonthKey(a.date) === selectedMonth
    )
    .filter((a) => selectedStock === "all" || a.stockName === selectedStock);

  const filteredDebts =
    selectedMonth === "all"
      ? debts
      : debts.filter((d) => getMonthKey(d.date) === selectedMonth);

  // =========================================================
  // DASHBOARD TOTALS
  // =========================================================

  const totalSalesValue = filteredSales.reduce(
    (sum, s) => sum + Number(s.weight) * Number(s.unitPrice),
    0
  );

  const totalExpensesValue = filteredExpenses.reduce(
    (sum, e) => sum + Number(e.amount),
    0
  );

  const totalAssetsValue = filteredAssets.reduce(
    (sum, a) => sum + Number(a.unitPrice),
    0
  );

  const totalDebtsValue = filteredDebts.reduce(
    (sum, d) => sum + Number(d.amount),
    0
  );

  const netPosition = totalSalesValue - totalExpensesValue - totalAssetsValue;

  const DASHBOARD_DATA = {
    "total-sales": {
      value: totalSalesValue,
      count: filteredSales.length,
    },

    "total-expenses": {
      value: totalExpensesValue,
      count: filteredExpenses.length,
    },

    "livestock-investments": {
      value: totalAssetsValue,
      count: filteredAssets.length,
    },

    "net-position": {
      value: netPosition,
      count:
        filteredSales.length + filteredExpenses.length + filteredAssets.length,
    },

    debts: {
      value: totalDebtsValue,
      count: filteredDebts.length,
    },
  };

  // =========================================================
  // GUARD — must come AFTER all hooks so hook order stays
  // identical on every render (Rules of Hooks).
  // =========================================================

  if (!token) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <div className="min-h-screen bg-[#1B2620]">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="fixed z-50 top-0 left-0 right-0 bg-[#1B2620]/90 border-b border-white/20 backdrop-blur-sm">
        <div className="flex items-center justify-between lg:justify-center px-4 py-3 lg:gap-[100px]">
          {/* HAMBURGER — visible below lg only */}

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
            className="lg:hidden text-white/80 hover:text-[#C08B2C] p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          {/* Brand label shown on small screens next to hamburger */}
          <span className="lg:hidden text-[#C08B2C] font-bold uppercase tracking-wide text-sm">
            Ghure Livestock
          </span>

          {/* DESKTOP NAVIGATION — lg and up */}

          <nav className="hidden lg:flex flex-wrap justify-center gap-2 lg:gap-10">
            {NAV.map((item) => (
              <a
                href={`#${item.key}`}
                key={item.key}
                onClick={() => setActive(item.key)}
                className={`font-semibold uppercase tracking-wide duration-200 p-2 px-3 rounded-md ${
                  active === item.key
                    ? "text-[#C08B2C] bg-gradient-to-r from-[#C08B2C]/20 to-[#C08B2C]/5 border-[#33453C] border-l-[5px]"
                    : "text-white/60 hover:text-[#C08B2C] hover:bg-[#C08B2C]/20 border-[#33453C] hover:border-l-[5px]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* MONTH SELECT — hidden on small screens, shown in sidebar instead */}

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="hidden lg:block bg-white text-black rounded-md p-2 border border-black outline-none text-sm font-semibold"
          >
            <option value="all">All Months</option>

            {monthOptions.map((key) => (
              <option key={key} value={key}>
                {formatMonthLabel(key)}
              </option>
            ))}
          </select>

          {/* STOCK SELECT — hidden on small screens, shown in sidebar instead */}

          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="hidden lg:block bg-white text-black rounded-md p-2 border border-black outline-none text-sm font-semibold"
          >
            <option value="all">All Stock</option>

            {stockOptions.map((stockName) => (
              <option key={stockName} value={stockName}>
                {stockName}
              </option>
            ))}
          </select>

          {/* LOGOUT — desktop only, mobile logout lives in sidebar */}

          <button
            onClick={handleLogout}
            className="hidden lg:block text-white/60 hover:text-[#C08B2C] font-semibold uppercase text-sm tracking-wide"
          >
            Logout
          </button>
        </div>
      </header>

      {/* =====================================================
          MOBILE / TABLET SIDEBAR DRAWER
      ===================================================== */}

      {/* Backdrop overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-[60] bg-black/60 transition-opacity duration-300 lg:hidden ${
          sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Sliding panel */}
      <aside
        className={`fixed top-0 left-0 z-[70] h-full w-[280px] max-w-[80%] bg-[#1B2620] border-r border-white/20 flex flex-col transition-transform duration-300 lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-white/20">
          <span className="text-[#C08B2C] font-bold uppercase tracking-wide text-sm">
            Ghure Livestock
          </span>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
            className="text-white/80 hover:text-[#C08B2C] p-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar nav links */}
        <nav className="flex flex-col gap-1 px-3 py-4">
          {NAV.map((item) => (
            <a
              href={`#${item.key}`}
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              className={`font-semibold uppercase tracking-wide duration-200 p-3 rounded-md ${
                active === item.key
                  ? "text-[#C08B2C] bg-gradient-to-r from-[#C08B2C]/20 to-[#C08B2C]/5 border-l-[5px] border-[#C08B2C]"
                  : "text-white/60 hover:text-[#C08B2C] hover:bg-[#C08B2C]/10 border-l-[5px] border-transparent"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Sidebar filters */}
        <div className="flex flex-col gap-3 px-4 py-4 border-t border-white/20">
          <label className="text-white/50 text-xs font-semibold uppercase tracking-wide">
            Month
          </label>

          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="bg-white text-black rounded-md p-2 border border-black outline-none text-sm font-semibold w-full"
          >
            <option value="all">All Months</option>

            {monthOptions.map((key) => (
              <option key={key} value={key}>
                {formatMonthLabel(key)}
              </option>
            ))}
          </select>

          <label className="text-white/50 text-xs font-semibold uppercase tracking-wide mt-2">
            Stock
          </label>

          <select
            value={selectedStock}
            onChange={(e) => setSelectedStock(e.target.value)}
            className="bg-white text-black rounded-md p-2 border border-black outline-none text-sm font-semibold w-full"
          >
            <option value="all">All Stock</option>

            {stockOptions.map((stockName) => (
              <option key={stockName} value={stockName}>
                {stockName}
              </option>
            ))}
          </select>
        </div>

        {/* Sidebar footer — logout */}
        <div className="mt-auto px-4 py-4 border-t border-white/20">
          <button
            onClick={() => {
              setSidebarOpen(false);
              handleLogout();
            }}
            className="w-full text-left text-white/60 hover:text-[#C08B2C] font-semibold uppercase text-sm tracking-wide p-2"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="p-4 sm:p-6 lg:p-10">
        {/* ===================================================
            OVERVIEW
        =================================================== */}

        {active === "overview" && (
          <section className="flex flex-col w-full pt-32">
            <p className="text-white/20">SUMMARY</p>

            <h1 className="text-white text-[30px] font-bold tracking-wide">
              Overview
            </h1>

            <p className="text-white/50 mb-6">
              A running snapshot of sales, expenses, and livestock capital tied
              up in the herd.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {DASHBOARD.map((item) => {
                const data = DASHBOARD_DATA[item.key];

                return (
                  <div
                    className="border border-white/20 rounded-md bg-transparent border-l-[5px] border-l-[#33453C] flex flex-col py-4 px-5"
                    key={item.key}
                  >
                    <p className="text-white/50">{item.label}</p>

                    <p className="text-white/90 text-[20px] font-semibold">
                      Ksh {data.value.toLocaleString()}
                    </p>

                    <p className="text-white/50">
                      {data.count} {data.count === 1 ? "Entry" : "Entries"}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ===================================================
            SALES
        =================================================== */}

        {active === "sales" && (
          <section className="w-full pt-32 flex flex-col lg:flex-row gap-6 items-start">
            {/* FORM DIV */}

            <div className="w-full lg:w-1/2">
              <form
                onSubmit={handleSalesSubmit}
                className="w-full flex flex-col gap-5 bg-[#DEE3D5] rounded-md"
              >
                <div className="bg-white/90 p-5 border-b rounded-t-md">
                  <h1 className="text-black font-bold tracking-wide">
                    New Sale Entry
                  </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      CUSTOMER / PERSON
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={salesForm.name}
                      onChange={handleSalesChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      WEIGHT (KG)
                    </label>

                    <input
                      type="text"
                      name="weight"
                      value={salesForm.weight}
                      onChange={handleSalesChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      UNIT PRICE (KSH)
                    </label>

                    <input
                      type="text"
                      name="unitPrice"
                      value={salesForm.unitPrice}
                      onChange={handleSalesChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      STOCK
                    </label>

                    <select
                      name="stock"
                      value={salesForm.stock}
                      onChange={handleSalesChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    >
                      <option value="">Select Stock</option>

                      {assets.map((asset) => (
                        <option key={asset._id} value={asset._id}>
                          {asset.stockName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      DATE
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={salesForm.date}
                      onChange={handleSalesChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="p-5">
                    <button
                      type="submit"
                      className="p-2 text-[#C08B2C] bg-black w-full rounded-md font-bold"
                    >
                      ENTER SALE
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* TABLE + TOTAL DIV */}

            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="bg-[#DEE3D5] rounded-md shadow-sm border border-black/20 w-full overflow-x-auto">
                <table className="border-collapse text-sm w-full min-w-[700px]">
                  <thead>
                    <tr className="bg-black text-[#C08B2C] border-b border-black">
                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Date
                      </th>

                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Customer
                      </th>

                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Stock Name
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Kg
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Unit Price
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Total
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredSales.length === 0 ? (
                      <tr>
                        <td
                          colSpan={7}
                          className="text-center text-black/40 py-8 italic whitespace-nowrap px-4"
                        >
                          No sales recorded yet
                        </td>
                      </tr>
                    ) : (
                      filteredSales.map((sale, i) => (
                        <tr
                          key={sale._id}
                          className={`border-b border-black/20 last:border-none transition-colors hover:bg-black/5 ${
                            i % 2 === 0 ? "bg-white/40" : "bg-transparent"
                          }`}
                        >
                          <td className="text-black/70 py-2.5 px-4 text-left whitespace-nowrap border-r border-black/10">
                            {new Date(sale.date).toLocaleDateString()}
                          </td>

                          <td className="text-black py-2.5 px-4 text-left font-medium border-r border-black/10 whitespace-nowrap">
                            {sale.name}
                          </td>

                          <td className="text-black py-2.5 px-4 text-left font-medium border-r border-black/10 whitespace-nowrap">
                            {sale.stock?.stockName || "—"}
                          </td>

                          <td className="text-black/70 py-2.5 px-4 text-right border-r border-black/10 whitespace-nowrap">
                            {sale.weight}
                          </td>

                          <td className="text-black/70 py-2.5 px-4 text-right border-r border-black/10 whitespace-nowrap">
                            Ksh {Number(sale.unitPrice).toLocaleString()}
                          </td>

                          <td className="text-black py-2.5 px-4 text-right font-semibold whitespace-nowrap border-r border-black/10">
                            Ksh{" "}
                            {(
                              Number(sale.weight) * Number(sale.unitPrice)
                            ).toLocaleString()}
                          </td>

                          <td className="py-2.5 px-4 text-right whitespace-nowrap flex gap-2 justify-end">
                            <button
                              type="button"
                              className="bg-green-500 hover:bg-green-600 text-white border border-green-600 rounded-md py-1 px-3 text-xs font-semibold transition-colors"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteSale(sale._id)}
                              className="bg-red-500 hover:bg-red-600 text-white border border-red-600 rounded-md py-1 px-3 text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#DEE3D5] rounded-md p-3 flex justify-between items-center w-full">
                <h1>Grand Total</h1>

                <h1 className="font-bold tracking-wide">
                  Ksh {totalSalesValue.toLocaleString()}
                </h1>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================
            LIVESTOCK ASSETS
        =================================================== */}

        {active === "livestock-assets" && (
          <section className="w-full pt-32 flex flex-col lg:flex-row gap-6 items-start">
            {/* FORM DIV */}

            <div className="w-full lg:w-1/2">
              <form
                onSubmit={handleAssetsSubmit}
                className="w-full flex flex-col gap-5 bg-[#DEE3D5] rounded-md"
              >
                <div className="bg-white/90 p-5 border-b rounded-t-md">
                  <h1 className="text-black font-bold tracking-wide">
                    New Livestock Entry
                  </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      HEADS
                    </label>

                    <input
                      type="text"
                      name="animal"
                      value={assetsForm.animal}
                      onChange={handleAssetsChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      PRICE (KSH)
                    </label>

                    <input
                      type="text"
                      name="unitPrice"
                      value={assetsForm.unitPrice}
                      onChange={handleAssetsChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      DATE
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={assetsForm.date}
                      onChange={handleAssetsChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      STOCK NAME
                    </label>

                    <input
                      type="text"
                      name="stockName"
                      value={assetsForm.stockName}
                      onChange={handleAssetsChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="p-5">
                    <button
                      type="submit"
                      className="p-2 text-[#C08B2C] bg-black w-full rounded-md font-bold"
                    >
                      ADD LIVESTOCK
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* TABLE + TOTAL DIV */}

            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="bg-[#DEE3D5] rounded-md shadow-sm border border-black/20 w-full overflow-x-auto">
                <table className="border-collapse text-sm w-full min-w-[600px]">
                  <thead>
                    <tr className="bg-black text-[#C08B2C] border-b border-black">
                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Date
                      </th>

                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Stock Name
                      </th>

                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Heads
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Unit Price
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredAssets.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center text-black/40 py-8 italic whitespace-nowrap px-4"
                        >
                          No livestock recorded yet
                        </td>
                      </tr>
                    ) : (
                      filteredAssets.map((asset, i) => (
                        <tr
                          key={asset._id}
                          className={`border-b border-black/20 last:border-none transition-colors hover:bg-black/5 ${
                            i % 2 === 0 ? "bg-white/40" : "bg-transparent"
                          }`}
                        >
                          <td className="text-black/70 py-2.5 px-4 text-left whitespace-nowrap border-r border-black/10">
                            {new Date(asset.date).toLocaleDateString()}
                          </td>

                          <td className="text-black py-2.5 px-4 text-left font-medium border-r border-black/10 whitespace-nowrap">
                            {asset.stockName}
                          </td>

                          <td className="text-black py-2.5 px-4 text-left font-medium border-r border-black/10 whitespace-nowrap">
                            {asset.animal}
                          </td>

                          <td className="text-black/70 py-2.5 px-4 text-right whitespace-nowrap">
                            Ksh {Number(asset.unitPrice).toLocaleString()}
                          </td>

                          <td className="text-black/70 py-2.5 px-4 text-right whitespace-nowrap flex gap-2 justify-end">
                            <button
                              type="button"
                              className="bg-green-500 hover:bg-green-600 text-white border border-green-600 rounded-md py-1 px-3 text-xs font-semibold transition-colors"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteAsset(asset._id)}
                              className="bg-red-500 hover:bg-red-600 text-white border border-red-600 rounded-md py-1 px-3 text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#DEE3D5] rounded-md p-3 flex justify-between items-center w-full">
                <h1>Grand Total</h1>

                <h1 className="font-bold tracking-wide">
                  Ksh {totalAssetsValue.toLocaleString()}
                </h1>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================
            EXPENSES
        =================================================== */}

        {active === "expenses" && (
          <section className="w-full pt-32 flex flex-col lg:flex-row gap-6 items-start">
            {/* FORM DIV */}

            <div className="w-full lg:w-1/2">
              <form
                onSubmit={handleExpensesSubmit}
                className="w-full flex flex-col gap-5 bg-[#DEE3D5] rounded-md"
              >
                <div className="bg-white/90 p-5 border-b rounded-t-md">
                  <h1 className="text-black font-bold tracking-wide">
                    New Expense Entry
                  </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      ITEM / DESCRIPTION
                    </label>

                    <input
                      type="text"
                      name="item"
                      value={expensesForm.item}
                      onChange={handleExpensesChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      AMOUNT (KSH)
                    </label>

                    <input
                      type="text"
                      name="amount"
                      value={expensesForm.amount}
                      onChange={handleExpensesChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      DATE
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={expensesForm.date}
                      onChange={handleExpensesChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="p-5">
                    <button
                      type="submit"
                      className="p-2 text-[#C08B2C] bg-black w-full rounded-md font-bold"
                    >
                      ENTER EXPENSE
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* TABLE + TOTAL DIV */}

            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="bg-[#DEE3D5] rounded-md shadow-sm border border-black/20 w-full overflow-x-auto">
                <table className="border-collapse text-sm w-full min-w-[500px]">
                  <thead>
                    <tr className="bg-black text-[#C08B2C] border-b border-black">
                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Date
                      </th>

                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Item
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Amount
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredExpenses.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center text-black/40 py-8 italic whitespace-nowrap px-4"
                        >
                          No expenses recorded yet
                        </td>
                      </tr>
                    ) : (
                      filteredExpenses.map((expense, i) => (
                        <tr
                          key={expense._id}
                          className={`border-b border-black/20 last:border-none transition-colors hover:bg-black/5 ${
                            i % 2 === 0 ? "bg-white/40" : "bg-transparent"
                          }`}
                        >
                          <td className="text-black/70 py-2.5 px-4 text-left whitespace-nowrap border-r border-black/10">
                            {new Date(expense.date).toLocaleDateString()}
                          </td>

                          <td className="text-black py-2.5 px-4 text-left font-medium border-r border-black/10 whitespace-nowrap">
                            {expense.item}
                          </td>

                          <td className="text-black py-2.5 px-4 text-right font-semibold whitespace-nowrap">
                            Ksh {Number(expense.amount).toLocaleString()}
                          </td>

                          <td className="text-black/70 py-2.5 px-4 text-right whitespace-nowrap flex gap-2 justify-end">
                            <button
                              type="button"
                              className="bg-green-500 hover:bg-green-600 text-white border border-green-600 rounded-md py-1 px-3 text-xs font-semibold transition-colors"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteExpense(expense._id)}
                              className="bg-red-500 hover:bg-red-600 text-white border border-red-600 rounded-md py-1 px-3 text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#DEE3D5] rounded-md p-3 flex justify-between items-center w-full">
                <h1>Grand Total</h1>

                <h1 className="font-bold tracking-wide">
                  Ksh {totalExpensesValue.toLocaleString()}
                </h1>
              </div>
            </div>
          </section>
        )}

        {/* ===================================================
            DEBTS
        =================================================== */}

        {active === "debts" && (
          <section className="w-full pt-32 flex flex-col lg:flex-row gap-6 items-start">
            {/* FORM DIV */}

            <div className="w-full lg:w-1/2">
              <form
                onSubmit={handleDebtsSubmit}
                className="w-full flex flex-col gap-5 bg-[#DEE3D5] rounded-md"
              >
                <div className="bg-white/90 p-5 border-b rounded-t-md">
                  <h1 className="text-black font-bold tracking-wide">
                    New Debt Entry
                  </h1>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      NAME
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={debtsForm.name}
                      onChange={handleDebtsChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      AMOUNT (KSH)
                    </label>

                    <input
                      type="text"
                      name="amount"
                      value={debtsForm.amount}
                      onChange={handleDebtsChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="flex flex-col gap-2 p-5">
                    <label className="text-black/60 font-semibold tracking-wide">
                      DATE
                    </label>

                    <input
                      type="date"
                      name="date"
                      value={debtsForm.date}
                      onChange={handleDebtsChange}
                      className="w-full bg-white rounded-md outline-none p-2 border border-black"
                    />
                  </div>

                  <div className="p-5">
                    <button
                      type="submit"
                      className="p-2 text-[#C08B2C] bg-black w-full rounded-md font-bold"
                    >
                      ENTER DEBT
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* TABLE + TOTAL DIV */}

            <div className="w-full lg:w-1/2 flex flex-col gap-4">
              <div className="bg-[#DEE3D5] rounded-md shadow-sm border border-black/20 w-full overflow-x-auto">
                <table className="border-collapse text-sm w-full min-w-[500px]">
                  <thead>
                    <tr className="bg-black text-[#C08B2C] border-b border-black">
                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Date
                      </th>

                      <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Name
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 border-r border-white/10 whitespace-nowrap">
                        Amount
                      </th>

                      <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4 whitespace-nowrap">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredDebts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={4}
                          className="text-center text-black/40 py-8 italic whitespace-nowrap px-4"
                        >
                          No debts recorded yet
                        </td>
                      </tr>
                    ) : (
                      filteredDebts.map((debt, i) => (
                        <tr
                          key={debt._id}
                          className={`border-b border-black/20 last:border-none transition-colors hover:bg-black/5 ${
                            i % 2 === 0 ? "bg-white/40" : "bg-transparent"
                          }`}
                        >
                          <td className="text-black/70 py-2.5 px-4 text-left whitespace-nowrap border-r border-black/10">
                            {new Date(debt.date).toLocaleDateString()}
                          </td>

                          <td className="text-black py-2.5 px-4 text-left font-medium border-r border-black/10 whitespace-nowrap">
                            {debt.name}
                          </td>

                          <td className="text-black py-2.5 px-4 text-right font-semibold whitespace-nowrap">
                            Ksh {Number(debt.amount).toLocaleString()}
                          </td>

                          <td className="text-black/70 py-2.5 px-4 text-right whitespace-nowrap flex gap-2 justify-end">
                            <button
                              type="button"
                              className="bg-green-500 hover:bg-green-600 text-white border border-green-600 rounded-md py-1 px-3 text-xs font-semibold transition-colors"
                            >
                              Edit
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteDebt(debt._id)}
                              className="bg-red-500 hover:bg-red-600 text-white border border-red-600 rounded-md py-1 px-3 text-xs font-semibold transition-colors"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              <div className="bg-[#DEE3D5] rounded-md p-3 flex justify-between items-center w-full">
                <h1>Grand Total</h1>

                <h1 className="font-bold tracking-wide">
                  Ksh {totalDebtsValue.toLocaleString()}
                </h1>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}