import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { mockFlights } from "../data/mock";
import { ArrowLeft } from "lucide-react"; // Make sure to install/import this

export default function Results() {
  const [q] = useSearchParams();
  const from = q.get("from") || "DEL";
  const to = q.get("to") || "BOM";
  const navigate = useNavigate();

  // FIX: logic changed to && (AND) and removed "|| true"
  // Added .toLowerCase() to make it case-insensitive
  const flights = mockFlights.filter(
    (f) => 
      f.from.toLowerCase() === from.toLowerCase() && 
      f.to.toLowerCase() === to.toLowerCase()
  );

  return (
    // Added wrapper to match your theme
    <div className="min-h-screen bg-slate-900 text-white p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
           <button 
             onClick={() => navigate("/search")}
             className="flex items-center text-slate-400 hover:text-white transition-colors text-sm cursor-pointer"
           >
             <ArrowLeft size={18} className="mr-2" /> Back to Search
           </button>
           <h3 className="font-semibold text-xl">
            {from} <span className="text-slate-500">→</span> {to}
           </h3>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 gap-4">
          {flights.length > 0 ? (
            flights.map((f) => (
              <div
                key={f.id}
                className="glass p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-white/5 hover:border-emerald-400/30 transition-all"
              >
                {/* Flight Details */}
                <div className="flex-1 w-full sm:w-auto">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-white/10 px-2 py-1 rounded text-xs font-bold text-emerald-300">
                      {f.airline}
                    </span>
                    <span className="text-xs text-slate-400">{f.id}</span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div>
                      <div className="font-bold text-xl">{f.depart.split("T")[1]}</div>
                      <div className="text-xs text-slate-400">{f.from}</div>
                    </div>
                    
                    {/* Duration Line */}
                    <div className="flex flex-col items-center px-4">
                      <span className="text-[10px] text-slate-500">{f.duration}</span>
                      <div className="w-16 h-[1px] bg-slate-600 my-1 relative"></div>
                    </div>

                    <div>
                      <div className="font-bold text-xl">{f.arrive?.split("T")[1]}</div>
                      <div className="text-xs text-slate-400">{f.to}</div>
                    </div>
                  </div>
                </div>

                {/* Price & Book */}
                <div className="text-right w-full sm:w-auto border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                  <div className="font-bold text-2xl text-emerald-300">₹{f.price}</div>
                  <button
                    className="mt-2 w-full sm:w-auto bg-emerald-400 hover:bg-emerald-300 text-black px-6 py-2 rounded-lg font-semibold transition-colors cursor-pointer"
                    onClick={() => navigate("/booking")}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))
          ) : (
             // No Results State
             <div className="glass p-8 rounded-xl text-center">
               <p className="text-slate-400">No flights found for this route.</p>
               <button onClick={() => navigate("/search")} className="text-emerald-400 mt-2 hover:underline">Try another search</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}