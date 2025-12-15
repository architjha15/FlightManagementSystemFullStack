import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Plane,
  ArrowLeft,
  Armchair,
  Briefcase,
  CheckCircle,
  Clock,
} from "lucide-react";

export default function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const { flight } = location.state || {};

  const [ticketClass, setTicketClass] = useState("economy");

  useEffect(() => {
    if (flight) console.log("🔍 FLIGHT DATA:", flight);
  }, [flight]);

  if (!flight) return null;

  // TIME: Check 'departureTime' OR 'depart'
  const departTime = flight.departureTime || flight.depart || "--:--";
  const arriveTime = flight.arrivalTime || flight.arrive || "--:--";

  // STOPS: Check 'layoverInfo.stops' OR just 'stops'
  const stopCount =
    flight.layoverInfo?.stops !== undefined
      ? flight.layoverInfo.stops
      : flight.stops || 0;

  // SEATS: Check 'seatInfo' object OR top-level fields
  const ecoCount = flight.seatInfo?.ecoSeats || flight.ecoSeats || 0;
  const businessCount =
    flight.seatInfo?.businessSeats || flight.businessSeats || 0;

  // PRICES & TOTALS
  const basePrice = parseInt(flight.price || 0);
  const finalPrice =
    ticketClass === "business" ? Math.floor(basePrice * 2.5) : basePrice;
  const tax = 750;
  const availableSeats = ticketClass === "business" ? businessCount : ecoCount;

  // Add this inside your Booking() function, before the return
  const handleProceedToPay = () => {
    navigate("/passenger-details", {
      state: {
        flight: flight,
        ticketClass: ticketClass,
        totalPrice: finalPrice + tax,
        travelers: 1,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] pt-8 pb-20 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Search
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* --- LEFT COLUMN --- */}
          <div className="lg:col-span-2 space-y-6">
            {/* 🌟 FLIGHT SUMMARY CARD 🌟 */}
            <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
              {/* HEADER: Title + Stops in Corner */}
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                  <Plane className="text-emerald-400 fill-current" /> Flight
                  Summary
                </h1>

                {/* STOPS BADGE (Now using 'stopCount' variable) */}
                <span
                  className={`text-sm font-bold px-3 py-1 rounded-full border ${stopCount > 0
                      ? "text-amber-400 border-amber-500/30 bg-amber-500/10"
                      : "text-emerald-400 border-emerald-500/30 bg-emerald-500/10"
                    }`}
                >
                  {stopCount > 0 ? `${stopCount} Stop` : "Non-stop"}
                </span>
              </div>

              {/* MAIN CONTENT: Time - Line - Time */}
              <div className="bg-[#0f172a]/50 p-8 rounded-2xl border border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                {/* LEFT: Departure Time (Using 'departTime') */}
                <div className="text-center md:text-left min-w-[100px]">
                  <div className="text-3xl font-black text-white tracking-tight">
                    {departTime}
                  </div>
                  <div className="text-sm text-slate-400 mt-1 font-medium">
                    {flight.source || flight.from}
                  </div>
                </div>

                {/* CENTER: The Graphical Line */}
                <div className="flex-1 w-full flex flex-col items-center relative px-4">
                  <div className="text-xs text-slate-400 mb-3 flex items-center gap-1 bg-[#1e293b] px-2 py-1 rounded-md border border-white/5">
                    <Clock size={12} /> {flight.duration}
                  </div>

                  <div className="w-full h-[2px] bg-slate-600 relative flex justify-center items-center">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full absolute left-0 shadow-[0_0_10px_#10b981]"></div>

                    <div className="bg-[#0f172a] px-2 z-10">
                      <Plane className="text-slate-500 rotate-90" size={20} />
                    </div>

                    {/* Layover Dot */}
                    {stopCount > 0 && (
                      <div
                        className="w-3 h-3 bg-amber-500 rounded-full absolute z-20 border-2 border-[#0f172a]"
                        title="Layover"
                      ></div>
                    )}

                    <div className="w-3 h-3 bg-emerald-500 rounded-full absolute right-0 shadow-[0_0_10px_#10b981]"></div>
                  </div>

                  <span className="text-[10px] text-slate-500 mt-3 uppercase tracking-widest font-bold">
                    {flight.airline}
                  </span>
                </div>

                {/* RIGHT: Arrival Time (Using 'arriveTime') */}
                <div className="text-center md:text-right min-w-[100px]">
                  <div className="text-3xl font-black text-white tracking-tight">
                    {arriveTime}
                  </div>
                  <div className="text-sm text-slate-400 mt-1 font-medium">
                    {flight.destination || flight.to}
                  </div>
                </div>
              </div>
            </div>

            {/* 🌟 SEAT SELECTION 🌟 */}
            <div className="bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-white mb-6">
                Select Class
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Economy Card */}
                <div
                  onClick={() => setTicketClass("economy")}
                  className={`cursor-pointer relative p-6 rounded-2xl border-2 transition-all duration-300 group ${ticketClass === "economy"
                      ? "bg-emerald-500/10 border-emerald-500"
                      : "bg-[#0f172a]/50 border-transparent hover:border-slate-600"
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-full ${ticketClass === "economy" ? "bg-emerald-500 text-black" : "bg-slate-800 text-slate-400"}`}
                    >
                      <Armchair size={24} />
                    </div>
                    {ticketClass === "economy" && (
                      <CheckCircle className="text-emerald-500" size={24} />
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-white">Economy</h4>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-sm text-slate-400">Availability</span>
                    <span className="text-emerald-400 font-mono font-bold bg-emerald-500/10 px-3 py-1 rounded text-lg">
                      {ecoCount} Seats
                    </span>
                  </div>
                </div>

                {/* Business Card */}
                <div
                  onClick={() => setTicketClass("business")}
                  className={`cursor-pointer relative p-6 rounded-2xl border-2 transition-all duration-300 group ${ticketClass === "business"
                      ? "bg-amber-500/10 border-amber-500"
                      : "bg-[#0f172a]/50 border-transparent hover:border-slate-600"
                    }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div
                      className={`p-3 rounded-full ${ticketClass === "business" ? "bg-amber-500 text-black" : "bg-slate-800 text-slate-400"}`}
                    >
                      <Briefcase size={24} />
                    </div>
                    {ticketClass === "business" && (
                      <CheckCircle className="text-amber-500" size={24} />
                    )}
                  </div>
                  <h4 className="text-lg font-bold text-white">Business</h4>
                  <div className="mt-4 pt-4 border-t border-white/5 flex justify-between items-center">
                    <span className="text-sm text-slate-400">Availability</span>
                    <span className="text-amber-400 font-mono font-bold bg-amber-500/10 px-3 py-1 rounded text-lg">
                      {businessCount} Seats
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: PRICES --- */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 bg-[#1e293b]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-6">
                Price Details
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-300">
                  <span>
                    Base Fare{" "}
                    <span className="text-xs text-slate-500">
                      ({ticketClass})
                    </span>
                  </span>
                  <span className="font-mono">₹{finalPrice}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Taxes & Surcharges</span>
                  <span className="font-mono">₹{tax}</span>
                </div>
                <div className="h-[1px] bg-slate-700 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-black text-emerald-400">
                    ₹{finalPrice + tax}
                  </span>
                </div>
              </div>
              <button
                onClick={handleProceedToPay} // <--- Link the function here
                className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-lg font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                Proceed to Pay
              </button>
              <p className="text-xs text-center text-slate-500 mt-4">
                {availableSeats} seats remaining
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
