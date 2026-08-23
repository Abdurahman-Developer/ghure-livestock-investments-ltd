import { useState } from "react";

export default function Login({ onLoginSuccess }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Signin failed");
        return;
      }
      localStorage.setItem("token", data.token);
      onLoginSuccess(data.token);
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-[#1B2620] flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[400px] flex flex-col gap-5 bg-[#DEE3D5] rounded-md"
      >
        <div className="bg-white/90 p-5 border-b rounded-t-md">
          <h1 className="text-black font-bold tracking-wide">Admin Login</h1>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col gap-2">
            <label className="text-black/60 font-semibold tracking-wide">
              EMAIL
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-white rounded-md outline-none p-2 border border-black"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-black/60 font-semibold tracking-wide">
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="bg-white rounded-md outline-none p-2 border border-black"
            />
          </div>
          {error && (
            <p className="text-red-600 text-sm font-semibold">{error}</p>
          )}
          <button
            type="submit"
            className="p-2 text-[#C08B2C] bg-black rounded-md font-bold"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}
