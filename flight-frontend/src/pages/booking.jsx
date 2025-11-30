import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Calendar, MapPin, Search, ArrowRight, Home } from "lucide-react";

export default function MyBookings() {
  const [email, setEmail] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  // Helper to format dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
    });
  };

  // src/pages/MyBookings.jsx

// ... existing imports

const fetchBookings = async (e) => {
    e.preventDefault();
    
    // REMOVED the check "if(!email) return;" so you can search blank to get ALL tickets
    
    setLoading(true);
    setHasSearched(true);
    
    try {
      // Ensure the Port (5000) matches your backend
      const res = await fetch(`http://localhost:3000/api/bookings/my-bookings?email=${email}`);
      const data = await res.json();
      
      console.log("👉 Bookings Received from Backend:", data); // Check Console (F12)

      if (res.ok) {
        setBookings(data);
      } else {
        setBookings([]);
      }
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
};

// ... rest of the component

  return (
    <div className="min-h-screen bg-[#0f172a] pt-8 pb-20 px-4 font-sans text-white">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
            <Plane className="text-emerald-400" /> My Bookings
            </h1>
            <button onClick={() => navigate("/")} className="text-slate-400 hover:text-emerald-400 flex items-center gap-2 transition-colors">
                <Home size={18} /> Home
            </button>
        </div>

        {/* 1. Email Lookup Section */}
        <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl mb-10">
          <h2 className="text-xl font-bold mb-4">View your history</h2>
          <form onSubmit={fetchBookings} className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-4 text-slate-500" size={20} />
                <input 
                    type="email" 
                    placeholder="Enter the email used for booking" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 p-4 rounded-xl bg-[#0f172a] border border-slate-700 focus:border-emerald-500 outline-none transition-all text-white"
                />
            </div>
            <button disabled={loading} className="py-4 px-8 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold transition-all active:scale-95">
                {loading ? "Searching..." : "Find Tickets"}
            </button>
          </form>
        </div>

        {/* 2. Results List */}
        <div className="space-y-6">
            
            {hasSearched && bookings.length === 0 && !loading && (
                <div className="text-center py-10 text-slate-500">
                    No bookings found for this email.
                </div>
            )}

            {bookings.map((booking) => (
                <div key={booking._id} className="group relative bg-[#1e293b] rounded-2xl p-6 border border-white/5 hover:border-emerald-500/50 transition-all shadow-lg">
                    
                    {/* Top Row: Date & Status */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-2 text-slate-400 text-sm">
                            <Calendar size={16} />
                            <span>Booked on: {formatDate(booking.bookingDate)}</span>
                        </div>
                        <span className="bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-emerald-500/20">
                            Confirmed
                        </span>
                    </div>

                    {/* Middle Row: Flight Info */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
                        <div className="text-center md:text-left">
                            <div className="text-3xl font-black text-white">{booking.source}</div>
                            <div className="text-sm text-slate-500">Origin</div>
                        </div>

                        {/* Line Graphic */}
                        <div className="flex-1 w-full md:w-auto flex flex-col items-center px-4">
                             <div className="text-xs text-slate-400 mb-2">{formatDate(booking.flightDate)}</div>
                             <div className="w-full h-[2px] bg-slate-700 relative flex justify-center items-center">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full absolute left-0"></div>
                                <div className="bg-[#1e293b] px-2 z-10">
                                    <Plane className="text-slate-500 rotate-90" size={16} />
                                </div>
                                <div className="w-2 h-2 bg-emerald-500 rounded-full absolute right-0"></div>
                             </div>
                             <div className="text-xs text-emerald-400 mt-2 font-mono uppercase">{booking.ticketClass}</div>
                        </div>

                        <div className="text-center md:text-right">
                            <div className="text-3xl font-black text-white">{booking.destination}</div>
                            <div className="text-sm text-slate-500">Destination</div>
                        </div>
                    </div>

                    {/* Bottom Row: Details & ID */}
                    <div className="pt-6 border-t border-white/5 flex flex-wrap justify-between items-center gap-4">
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Passenger</p>
                            <p className="font-bold text-white">{booking.passengerName}</p>
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase">Booking ID</p>
                            <p className="font-mono font-bold text-white">{booking.bookingID}</p>
                        </div>
                         <div>
                            <p className="text-xs text-slate-500 uppercase text-right">Total Paid</p>
                            <p className="font-bold text-emerald-400 text-xl text-right">₹{booking.totalPrice}</p>
                        </div>
                    </div>

                </div>
            ))}
        </div>

      </div>
    </div>
  );
}