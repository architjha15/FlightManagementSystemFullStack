import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CreditCard, Lock, Calendar, CheckCircle, Plane } from "lucide-react";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 1. Get ALL the accumulated data
  const { flight, ticketClass, totalPrice, passenger } = location.state || {};
  
  const [isProcessing, setIsProcessing] = useState(false);

  // Safety check
  if (!flight || !passenger) return null;

  // ... inside Payment.jsx component

const handlePayment = async (e) => {
  e.preventDefault();
  setIsProcessing(true);

  try {
    // 1. Call the Backend API
    const response = await fetch("http://localhost:3000/api/bookings/create", { // Check your port
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        flightID: flight.flightID,
        passenger: passenger,
        ticketClass: ticketClass,
        price: totalPrice,
        flightDetails: {
            source: flight.source,
            destination: flight.destination,
            flightDate: flight.flightDate
        }
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // 2. Success! Navigate to Success Page with the REAL Booking ID
      navigate("/success", { 
        state: { 
          bookingId: data.bookingID,
          passenger: passenger 
        } 
      });
    } else {
      alert("Payment Failed: " + data.message);
      setIsProcessing(false);
    }

  } catch (error) {
    console.error("Booking Error", error);
    alert("Network Error. Please try again.");
    setIsProcessing(false);
  }
};

  return (
    <div className="min-h-screen bg-[#0f172a] pt-8 pb-20 px-4 font-sans text-white">
      <div className="max-w-4xl mx-auto">
        
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          <CreditCard className="text-emerald-400" /> Payment Gateway
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* --- LEFT: PAYMENT FORM --- */}
          <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Card Details</h3>
              <div className="flex gap-2">
                 <div className="w-8 h-5 bg-white/10 rounded"></div>
                 <div className="w-8 h-5 bg-white/10 rounded"></div>
              </div>
            </div>

            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-4 text-slate-500" size={18} />
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full pl-12 p-3 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 outline-none font-mono" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">Expiry</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-4 text-slate-500" size={18} />
                    <input required type="text" placeholder="MM/YY" className="w-full pl-12 p-3 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 outline-none font-mono" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase">CVV</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-4 text-slate-500" size={18} />
                    <input required type="password" placeholder="123" maxLength="3" className="w-full pl-12 p-3 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 outline-none font-mono" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-400 uppercase">Card Holder Name</label>
                 <input required type="text" defaultValue={passenger.fullName} className="w-full p-3 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 outline-none uppercase" />
              </div>

              <button disabled={isProcessing} className="w-full py-4 mt-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-lg font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex justify-center items-center gap-2">
                {isProcessing ? "Processing..." : `Pay ₹${totalPrice}`}
              </button>
            </form>
          </div>

          {/* --- RIGHT: FINAL INVOICE --- */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h3 className="text-lg font-bold mb-4 text-slate-300">Invoice Summary</h3>
              
              {/* Flight Strip */}
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-white/5">
                <div className="bg-emerald-500/20 p-3 rounded-full text-emerald-400">
                  <Plane size={24} />
                </div>
                <div>
                  <div className="font-bold text-white text-lg">{flight.source} ➔ {flight.destination}</div>
                  <div className="text-sm text-slate-400">{flight.flightDate?.split('T')[0]} • {ticketClass.toUpperCase()}</div>
                </div>
              </div>

              {/* Passenger Strip */}
              <div className="mb-6 pb-6 border-b border-white/5">
                <div className="text-xs text-slate-500 uppercase mb-1">Passenger</div>
                <div className="font-bold text-white">{passenger.fullName}</div>
                <div className="text-sm text-slate-400">{passenger.email}</div>
              </div>

              {/* Price Strip */}
              <div className="flex justify-between items-end">
                <div className="text-slate-400">Total Amount</div>
                <div className="text-3xl font-black text-white">₹{totalPrice}</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
              <CheckCircle className="text-emerald-500 shrink-0" size={20} />
              <p className="text-sm text-emerald-200">
                Your payment is secured with 256-bit SSL encryption. We do not store your card details.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}