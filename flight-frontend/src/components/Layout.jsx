import React, { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Search as SearchIcon,
  Grid,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Layout() {
  const navigate = useNavigate();
  // Get user from localStorage, fallback to 'User'
  const user = localStorage.getItem("fm_user") || "User";
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const logout = () => {
    localStorage.removeItem("fm_user");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex gradient-mesh text-white">
      {/* Sidebar */}
      <aside className="hidden md:flex md:flex-col w-64 p-6 gap-6 border-r border-white/10 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center text-black font-bold shadow-lg shadow-emerald-500/20">
            FM
          </div>
          <div>
            <h3 className="font-bold text-lg tracking-wide">Fly Matrix</h3>
          </div>
        </div>

        <nav className="flex flex-col gap-2 mt-4">
          <NavLink
            to="/search"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? "bg-white/10 text-emerald-300 font-semibold" : "hover:bg-white/5 text-slate-300"}`
            }
          >
            <SearchIcon size={20} /> Search Flights
          </NavLink>
          <NavLink
            to="/booking"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? "bg-white/10 text-emerald-300 font-semibold" : "hover:bg-white/5 text-slate-300"}`
            }
          >
            <Grid size={20} /> Booking Status
          </NavLink>
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-xl transition-all ${isActive ? "bg-white/10 text-emerald-300 font-semibold" : "hover:bg-white/5 text-slate-300"}`
            }
          >
            <User size={20} /> Admin Panel
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-screen relative">
        {/* HEADER: Added 'relative z-50' to make sure dropdown appears ON TOP of everything */}
        <header className="flex items-center justify-between p-6 border-b border-white/10 bg-black/10 backdrop-blur-sm relative z-50">
          <h2 className="text-xl font-semibold">Welcome back, {user}</h2>

          <div className="flex items-center gap-6">
            <span
              onClick={() => navigate("/my-bookings")}
              className="cursor-pointer hover:text-emerald-400 transition-colors"
            >
              My Bookings
            </span>

            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 glass px-4 py-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-black font-bold text-xs">
                  {user.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{user}</span>
                <ChevronDown size={16} />
              </button>

              {/* Profile Dropdown */}
              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-[#1e1b4b] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                  <div className="px-4 py-3 border-b border-white/10">
                    <p className="text-xs text-slate-400">Signed in as</p>
                    <p className="text-sm font-bold truncate">{user}</p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm text-red-300 hover:bg-white/5 flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut size={16} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        {/* Given z-0 to ensure it stays behind the header */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
