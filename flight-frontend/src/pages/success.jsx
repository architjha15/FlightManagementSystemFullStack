import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, Home, Mail, Loader } from "lucide-react";

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get bookingId. Default to null if state is missing.
  const { bookingId } = location.state || {};

  const [loading, setLoading] = useState(false);

  const handleEmailTicket = async () => {
    if (!bookingId) return alert("Booking ID not found!");

    setLoading(true);
    try {
      // Replace with your actual backend URL
      const response = await fetch("http://localhost:3000/api/bookings/resend-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookingID: bookingId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Success! The ticket has been sent to your email.");
      } else {
        alert(data.message || "Failed to send email.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1e293b]/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center">

        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_#10b981]">
          <CheckCircle size={40} className="text-white" />
        </div>

        <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
        <p className="text-slate-400 mb-8">Your ticket has been booked successfully.</p>

        <div className="bg-[#0f172a] rounded-xl p-6 mb-8 border border-white/5 border-dashed">
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Booking Reference</p>
          <p className="text-4xl font-mono font-bold text-emerald-400">{bookingId || "ERROR"}</p>
        </div>

        <div className="space-y-3">
          {/* Email Ticket Button */}
          <button
            onClick={handleEmailTicket}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold border border-white/10 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader size={18} className="animate-spin" /> Sending...
              </>
            ) : (
              <>
                {/* Visual change: Using Mail icon since we are emailing, not downloading a file */}
                <Mail size={18} /> Email Me Ticket
              </>
            )}
          </button>

          <button onClick={() => navigate("/")} className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex justify-center items-center gap-2">
            Go to Home <Home size={18} />
          </button>
        </div>

      </div>
    </div>
  );
}