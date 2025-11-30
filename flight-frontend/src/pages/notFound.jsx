import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-4xl font-bold">404</h2>
        <p className="text-slate-300">Page not found</p>
        <Link
          to="/"
          className="mt-3 inline-block bg-emerald-400 text-black px-4 py-2 rounded-md"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}
