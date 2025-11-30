import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { User, Mail, Phone, CreditCard, ArrowRight, ArrowLeft } from "lucide-react";

export default function PassengerDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Get the data passed from the Booking Page
  const { flight, ticketClass, totalPrice } = location.state || {};

  // 2. State for form fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    age: ""
  });

  if (!flight) return null; // Safety check

  const handleSubmit = (e) => {
    e.preventDefault();
    // 3. Navigate to Payment Page (We will build this later)
    // We pass ALL data: Flight + Class + Price + Passenger Info
    console.log("Processing Payment for:", formData);
    navigate("/payment", { 
      state: { ...location.state, passenger: formData } 
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-8 pb-20 px-4 font-sans text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-white mb-8">
          <ArrowLeft size={20} /> Back to Selection
        </button>

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <User className="text-emerald-400" /> Passenger Details
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* --- LEFT: PASSENGER FORM --- */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl space-y-6">
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-500" size={20} />
                  <input 
                    required
                    type="text" 
                    placeholder="As per government ID"
                    className="w-full pl-12 p-4 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-all"
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-4 text-slate-500" size={20} />
                    <input 
                      required
                      type="email" 
                      placeholder="ticket@example.com"
                      className="w-full pl-12 p-4 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 outline-none transition-all"
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-4 text-slate-500" size={20} />
                    <input 
                      required
                      type="tel" 
                      placeholder="+91 98765 43210"
                      className="w-full pl-12 p-4 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 outline-none transition-all"
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              
              <button type="submit" className="w-full py-4 mt-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-lg font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex justify-center items-center gap-2">
                Continue to Payment <ArrowRight size={20} />
              </button>

            </form>
          </div>

          {/* --- RIGHT: ORDER SUMMARY --- */}
          <div className="md:col-span-1">
            <div className="bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl sticky top-6">
              <h3 className="text-xl font-bold mb-6 text-emerald-400">Order Summary</h3>
              
              <div className="space-y-4 text-sm">
                <div className="flex justify-between text-white">
                  <span className="font-bold">{flight.airline}</span>
                  <span className="text-slate-400">{ticketClass.toUpperCase()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>{flight.source}</span>
                  <span>➜</span>
                  <span>{flight.destination}</span>
                </div>
                <div className="h-[1px] bg-slate-700 my-4"></div>
                <div className="flex justify-between items-center text-xl font-bold text-white">
                  <span>Total Pay</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}