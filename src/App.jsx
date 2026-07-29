import { useEffect, useState } from "react";

const NAV = [
  { key: "overview", label: "Overview" },
  { key: "sales", label: "Sales" },
  { key: "expenses", label: "Expenses" },
  { key: "livestock-assets", label: "Livestock Assets" },
];
const DASHBOARD = [
  { key: "total-sales", label: "TOTAL SALES" },
  { key: "total-expenses", label: "TOTAL EXPENSES" },
  { key: "livestock-investments", label: "LIVESTOCK INVESTMENTS" },
  { key: "net-position", label: "NET POSITION" },
];
export default function App() {
  const [active, setActive] = useState("overview");
  const [page, setPage] = useState("overview");
  const [sales, setSales] = useState([]);
  useEffect(() => {
    const getSales = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/sales");

        if (!res.ok) {
          throw new Error("Failed to fetch sales");
        }

        const data = await res.json();
        console.log(data)
        setSales(data);
      } catch (err) {
        console.error(err);
      }
    };

    getSales();
  }, []);
  return (
    <div className="min-h-screen bg-[#1B2620]">
      <header className="fixed top-0 left-0 right-0 bg-[#1B2620]/20 border-b border-white backdrop-blur-sm flex items-center justify-center">
        <nav className="flex gap-10 py-4">
          {NAV.map((item) => (
            <a
              href="{#${item.key}}"
              key={item.key}
              onClick={() => {
                setActive(item.key);
                setPage(item.key);
              }}
              className={` font-semibold uppercase tracking-wide duration-200 p-2 px-3 rounded-md ${
                active === item.key
                  ? "text-[#C08B2C] bg-gradient-to-r from-[#C08B2C]/20 to-[#C08B2C]/5 border-#33453C border-l-[5px]"
                  : "text-white/60 hover:text-[#C08B2C] hover:bg-[#C08B2C]/20  border-#33453C hover:border-l-[5px]"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <main className="p-10">
        {active === "overview" && (
          <section className="flex flex-col w-full pt-20">
            <p className="text-white/20">SUMMARY</p>
            <h1 className="text-white text-[30px] font-bold tracking-wide">
              Overview
            </h1>
            <p className="text-white/50">
              A running snapshot of sales, expenses, and livestock capital tied
              up in the herd.
            </p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              {DASHBOARD.map((item) => (
                <div
                  className="border border-white/20 rounded-md bg-transparent border-l-[5px] border-l-[#33453C] flex flex-col py-3 px-4"
                  key={item.key}
                >
                  <p className="text-white/50">{item.label}</p>
                  <p className="text-white/90 text-[20px]">Ksh 0</p>
                  <p className="text-white/50">0 Entries</p>
                </div>
              ))}
            </div>
          </section>
        )}
        {active === "sales" && (
          <section className=" w-full pt-20 grid grid-cols-2 gap-6 justify-center">
            <form className="m-0 p-0 w-[600px] flex flex-col gap-5 bg-[#DEE3D5] rounded-md">
              <div className="bg-white/90 p-5 border-b rounded-t-md">
                <h1 className="text-black font-bold tracking-wide">
                  New Sale Entry
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-3.5 items-center justify-center">
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    CUSTOMER / PERSON
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    WEIGHT (KG)
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    UNIT PRICE(KSH)
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    DATE
                  </label>
                  <input
                    type="date"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 text-[#C08B2C] bg-black m-2 w-[200px] rounded-md font-bold"
                >
                  ENTER SALE
                </button>
              </div>
            </form>
            <div className="bg-[#DEE3D5] rounded-md overflow-hidden w-[500px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-[#C08B2C]">
                    <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Date
                    </th>
                    <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Customer
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Kg
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Unit Price
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr key={sale._id}>
                      <td className="text-black">{new Date(sale.date).toLocaleDateString()}</td>
                      <td>{sale.name}</td>
                      <td>{sale.weight}</td>
                      <td>Ksh {sale.unitPrice}</td>
                      <td>
                        Ksh {Number(sale.weight) * Number(sale.unitPrice)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-[#DEE3D5] rounded-md p-3 flex justify-between items-center w-[600px]">
              <h1>Grand Total</h1>
              <h1 className="font-bold tracking-wide">Ksh 0</h1>
            </div>
          </section>
        )}
        {active === "livestock-assets" && (
          <section className=" w-full pt-20 grid grid-cols-2 gap-6 justify-center">
            <form className="m-0 p-0 w-[600px] flex flex-col gap-5 bg-[#DEE3D5] rounded-md">
              <div className="bg-white/90 p-5 border-b rounded-t-md">
                <h1 className="text-black font-bold tracking-wide">
                  New Sale Entry
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-3.5 items-center justify-center">
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    CUSTOMER / PERSON
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    WEIGHT (KG)
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    UNIT PRICE(KSH)
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    DATE
                  </label>
                  <input
                    type="date"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 text-[#C08B2C] bg-black m-2 w-[200px] rounded-md font-bold"
                >
                  ENTER SALE
                </button>
              </div>
            </form>
            <div className="bg-[#DEE3D5] rounded-md overflow-hidden w-[500px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-[#C08B2C]">
                    <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Date
                    </th>
                    <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Customer
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Kg
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Unit Price
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Total
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="bg-[#DEE3D5] rounded-md p-3 flex justify-between items-center w-[600px]">
              <h1>Grand Total</h1>
              <h1 className="font-bold tracking-wide">Ksh 0</h1>
            </div>
          </section>
        )}
        {active === "expenses" && (
          <section className=" w-full pt-20 grid grid-cols-2 gap-6 justify-center">
            <form className="m-0 p-0 w-[600px] flex flex-col gap-5 bg-[#DEE3D5] rounded-md">
              <div className="bg-white/90 p-5 border-b rounded-t-md">
                <h1 className="text-black font-bold tracking-wide">
                  New Sale Entry
                </h1>
              </div>
              <div className="grid grid-cols-2 gap-3.5 items-center justify-center">
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    CUSTOMER / PERSON
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    WEIGHT (KG)
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    UNIT PRICE(KSH)
                  </label>
                  <input
                    type="text"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5">
                  <label
                    htmlFor="customer"
                    className="text-black/60 font-semibold tracking-wide"
                  >
                    DATE
                  </label>
                  <input
                    type="date"
                    className="w-[200px] bg-white rounded-md outline-none p-2 border border-black"
                  />
                </div>
                <button
                  type="submit"
                  className="p-2 text-[#C08B2C] bg-black m-2 w-[200px] rounded-md font-bold"
                >
                  ENTER SALE
                </button>
              </div>
            </form>
            <div className="bg-[#DEE3D5] rounded-md overflow-hidden w-[500px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-black text-[#C08B2C]">
                    <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Date
                    </th>
                    <th className="text-left font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Customer
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Kg
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Unit Price
                    </th>
                    <th className="text-right font-semibold tracking-wide text-xs uppercase py-3 px-4">
                      Total
                    </th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="bg-[#DEE3D5] rounded-md p-3 flex justify-between items-center w-[600px]">
              <h1>Grand Total</h1>
              <h1 className="font-bold tracking-wide">Ksh 0</h1>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
