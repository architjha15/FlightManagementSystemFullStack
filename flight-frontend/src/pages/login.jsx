import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }
    localStorage.setItem("fm_token", "demo-token");
    navigate("/search");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-mesh p-6">
      {/* Added animate-slide-in class here */}
      <div className="w-full max-w-md glass card animate-slide-in">
        <h2 className="text-2xl font-bold mb-2">Sign in</h2>
        <p className="text-sm text-slate-300 mb-4">
          Welcome back — sign in to continue
        </p>
        
        {error && <div className="text-sm text-red-400 mb-2 bg-red-400/10 p-2 rounded">{error}</div>}
        
       
<form onSubmit={submit} className="space-y-4"> {/* Increased space slightly */}
  <input
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
    // CHANGED: rounded-md -> rounded-xl
    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/50 outline-none transition-colors"
  />
  <input
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    type="password"
    // CHANGED: rounded-md -> rounded-xl
    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:border-emerald-400/50 outline-none transition-colors"
  />
  <button className="w-full bg-emerald-400 hover:bg-emerald-300 text-black p-4 rounded-xl font-bold transition-colors cursor-pointer shadow-lg shadow-emerald-400/20">
    Sign in
  </button>
</form>

        <div className="mt-4 text-sm text-slate-300 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-300 hover:text-emerald-200 font-medium transition-colors">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}