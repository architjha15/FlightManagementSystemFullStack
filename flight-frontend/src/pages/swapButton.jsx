import { ArrowLeftRight } from "lucide-react";

export default function SwapButton({ onSwap, disabled }) {
    return (
        <button
            onClick={onSwap}
            disabled={disabled}
            className="
    absolute
    right-[-33px]
    top-[64%]
    -translate-y-1/2
    z-[999]
    w-10 h-10
    rounded-full
    bg-emerald-500
    text-black
    flex items-center justify-center
    shadow-2xl
    ring-4 ring-[#0f172a]
    hover:bg-emerald-400
    transition-all
    disabled:opacity-40
    disabled:cursor-not-allowed
  "
        >

            <ArrowLeftRight size={16} />
        </button>
    );
}
