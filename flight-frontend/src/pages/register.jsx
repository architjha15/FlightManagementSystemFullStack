import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    localStorage.setItem("fm_token", "demo-token");
    navigate("/search");
  };

  return (
    <div className="min-h-screen flex items-center justify-center gradient-mesh p-6">
      {/* Added animate-slide-in class here */}
      <div className="w-full max-w-md glass card animate-slide-in">
        <h2 className="text-2xl font-bold mb-2">Create account</h2>
        <p className="text-sm text-slate-300 mb-4">
          Join Fly Matrix today
        </p>
        
        <form onSubmit={submit} className="space-y-3">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-emerald-400/50 outline-none transition-colors"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            className="w-full p-3 rounded-md bg-white/5 border border-white/10 focus:border-emerald-400/50 outline-none transition-colors"
          />
          <button className="w-full bg-emerald-400 hover:bg-emerald-300 text-black p-3 rounded-md font-semibold transition-colors cursor-pointer">
            Register
          </button>
        </form>

        {/* Added Login Link Section */}
        <div className="mt-4 text-sm text-slate-300 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-emerald-300 hover:text-emerald-200 font-medium transition-colors">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}