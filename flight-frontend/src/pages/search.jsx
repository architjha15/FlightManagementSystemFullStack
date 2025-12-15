import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Plane, Calendar, Search as SearchIcon, MapPin } from "lucide-react";
import SwapButton from "./swapButton";

// --- 1. City Dropdown (Kept mostly the same, ensuring it works seamlessly) ---
const CityInput = ({
  label,
  value,
  onChange,
  cities,
  placeholder,
  icon: Icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target))
        setIsOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredCities = cities.filter(
    (c) =>
      c.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cityCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (city) => {
    // UI keeps the Code (e.g., DEL) because it looks cleaner in the input
    setSearchTerm(city.cityCode);
    onChange(city.cityCode);
    setIsOpen(false);
  };


  return (
    <div className="relative space-y-2 group" ref={wrapperRef}>
      <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider ml-1 flex items-center gap-2">
        {Icon && <Icon size={12} />} {label}
      </label>
      <div className="relative z-50">
        <input
          type="text"
          value={searchTerm}
          autoComplete="off"
          onClick={() => setIsOpen(true)}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            onChange(e.target.value);
          }}
          className="w-full p-4 rounded-xl bg-[#1e293b]/80 border border-slate-700 text-white font-bold text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all placeholder:text-slate-600 uppercase"
          placeholder={placeholder}
        />
        {isOpen && filteredCities.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 max-h-60 overflow-y-auto bg-[#0f172a] border border-slate-700 rounded-xl shadow-2xl z-[100]">
            {filteredCities.map((city) => (
              <div
                key={city._id || city.cityCode}
                onClick={() => handleSelect(city)}
                className="px-4 py-3 hover:bg-emerald-500/10 cursor-pointer border-b border-slate-800 flex justify-between items-center group/item"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-slate-200">
                    {city.cityName}
                  </span>
                </div>
                <span className="text-sm font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded-md">
                  {city.cityCode}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};


// --- 2. Main Search Component ---
export default function Search() {
  const [from, setFrom] = useState("DEL"); // Stores "DEL"
  const [to, setTo] = useState("BOM"); // Stores "BOM"
  const [date, setDate] = useState("2025-12-01");
  const [cities, setCities] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate();

  const handleSwap = () => {
    if (!from || !to) return;
    setFrom(to);
    setTo(from);
  };

  const isSwapDisabled = !from || !to;

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await fetch("/api/city/fetch");
        const data = await res.json();
        if (res.ok) setCities(data.message || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCities();
  }, []);

  // This helper function translates "DEL" -> "New Delhi"
  const getCityName = (inputCodeOrName) => {
    if (!inputCodeOrName) return "";

    const lowerInput = inputCodeOrName.toLowerCase().trim();

    const foundCity = cities.find(
      (c) =>
        c.cityCode.toLowerCase() === lowerInput ||
        c.cityName.toLowerCase() === lowerInput
    );

    return foundCity ? foundCity.cityName : inputCodeOrName;
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setHasSearched(true);

    // 1. Convert Frontend Codes ("DEL") to Backend Names ("New Delhi")
    const sourceName = getCityName(from);
    const destName = getCityName(to);

    console.log("Searching DB for:", sourceName, "to", destName);

    try {
      // 2. Send the Full Names to the backend
      const response = await fetch(
        `/api/flights/search?from=${encodeURIComponent(sourceName)}&to=${encodeURIComponent(destName)}&date=${date}`
      );
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
      } else {
        setSearchResults([]);
      }
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto pt-4 pb-20">
      <div className="relative">
        <div className="relative bg-[#0f172a]/90 backdrop-blur-xl p-8 rounded-[1.5rem] border border-white/10 shadow-2xl">
          <h3 className="font-bold text-2xl mb-8 text-white flex items-center gap-2">
            <Plane className="text-emerald-400" /> Find your perfect flight
          </h3>

          <form
            onSubmit={submit}
            className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end relative z-10"
          >
            <div className="md:col-span-4 relative">
              <CityInput
                label="From"
                value={from}
                onChange={setFrom}
                cities={cities}
                icon={MapPin}
                placeholder="Origin"
              />

              <SwapButton
                onSwap={handleSwap}
                disabled={isSwapDisabled}
              />
            </div>

            <div className="md:col-span-4">
              <CityInput
                label="To"
                value={to}
                onChange={setTo}
                cities={cities}
                icon={MapPin}
                placeholder="Destination"
              />
            </div>

            <div className="md:col-span-2">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider ml-1 flex items-center gap-2">
                  <Calendar size={12} /> Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-4 rounded-xl bg-[#1e293b]/80 border border-slate-700 text-white font-bold text-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none [color-scheme:dark]"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[62px] bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <span className="animate-spin">⌛</span>
                ) : (
                  <>
                    Search <SearchIcon size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results Display */}
      <div className="space-y-4">
        {hasSearched && (
          <h3 className="text-xl font-semibold text-white pl-2">
            Available Flights{" "}
            <span className="text-sm font-normal text-slate-400">
              ({searchResults.length} found)
            </span>
          </h3>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchResults.map((f) => (
            <div
              key={f._id}
              className="glass p-6 rounded-2xl bg-[#0f172a]/60 border border-white/5 relative overflow-hidden group hover:border-emerald-500/50 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="bg-emerald-500/10 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/20">
                  {f.airline}
                </span>
                <span className="text-2xl font-bold text-white">
                  ₹{f.price}
                </span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-2xl font-black text-white">{f.from}</div>
                  <div className="text-xs text-slate-400 mt-1">{f.depart}</div>
                </div>
                <div className="flex flex-col items-center flex-1 px-4">
                  <div className="text-[10px] text-slate-400 mb-1">
                    {f.duration}
                  </div>
                  <div className="w-full h-[2px] bg-slate-700 relative flex justify-center items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full absolute left-0"></div>
                    <div className="w-2 h-2 bg-emerald-500 rounded-full absolute right-0"></div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-white">{f.to}</div>
                  <div className="text-xs text-slate-400 mt-1">{f.arrive}</div>
                </div>
              </div>
              {f.stops > 0 && (
                <div className="mb-4 text-xs text-slate-300">
                  🛑 {f.stops} stop{f.stops > 1 ? "s" : ""} — Layover:{" "}
                  {f.layoverDuration} min
                </div>
              )}

              <button
                onClick={() => navigate("/booking", { state: { flight: f } })}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-bold shadow-lg shadow-emerald-500/20 transition-all active:scale-95"
              >
                Book Now
              </button>
            </div>
          ))}
          {!loading && hasSearched && searchResults.length === 0 && (
            <div className="col-span-full text-center py-20 text-slate-400">
              No flights found for this route.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
