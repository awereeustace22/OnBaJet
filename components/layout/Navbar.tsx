import * as React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <nav className="mx-auto max-w-6xl px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-slate-900">
          OnBaJet
        </Link>

        <div className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="text-slate-700 hover:text-slate-900">Home</Link>
          <a href="#" className="text-slate-400 cursor-not-allowed" aria-disabled>Deals</a>
          <a href="#" className="text-slate-400 cursor-not-allowed" aria-disabled>Account</a>
        </div>
      </nav>
    </header>
  );
}
