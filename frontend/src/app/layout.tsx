import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Shield, Lock, Trash2, PhoneCall } from "lucide-react";

export const metadata: Metadata = {
  title: "LifeEvent AI — Financial Journeys in Medical Emergencies",
  description: "One guided financial journey connecting insurance, lending, and payments for Indian families in medical crises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-paytm-sky text-paytm-text antialiased">
        <main className="flex-grow">{children}</main>

        {/* Global Empathetic Footer */}
        <footer className="bg-paytm-navyDark text-slate-400 text-xs py-8 border-t border-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="col-span-1 md:col-span-2">
                <div className="flex items-center gap-2 text-white font-bold text-sm mb-2">
                  <div className="w-5 h-5 rounded bg-paytm-cyan text-paytm-navy flex items-center justify-center font-black text-xs">
                    L
                  </div>
                  LifeEvent AI — Built for India
                </div>
                <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                  Empowering families standing at the hospital counter. We bridge insurance coverage,
                  transparent gap estimates, and emergency payment plans with verified citations and zero slop.
                </p>
                <div className="flex items-center gap-2 mt-3 text-[11px] text-amber-300">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Server-side Aadhaar masking & consent-governed document processing</span>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Platform</h4>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/intake" className="hover:text-paytm-cyan transition-colors">
                      Start Emergency Journey
                    </Link>
                  </li>
                  <li>
                    <Link href="/counselor" className="hover:text-paytm-cyan transition-colors">
                      Hospital Counselor View
                    </Link>
                  </li>
                  <li>
                    <Link href="/for-hospitals" className="hover:text-paytm-cyan transition-colors">
                      For Hospitals (Pilot)
                    </Link>
                  </li>
                  <li>
                    <Link href="/how-it-works" className="hover:text-paytm-cyan transition-colors">
                      How It Works
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-2">Trust & Safety</h4>
                <ul className="space-y-1.5">
                  <li>
                    <Link href="/privacy" className="hover:text-paytm-cyan transition-colors flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-paytm-cyan" />
                      Privacy & Data Rights
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy" className="hover:text-red-400 transition-colors flex items-center gap-1">
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete My Data
                    </Link>
                  </li>
                  <li className="text-[11px] text-slate-500 pt-1">
                    Paytm AI Hackathon, Pune (PS-2)
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
              <p>
                © 2026 LifeEvent AI (Team Crazy Coders). Guidance platform only — not medical, legal, or financial advice.
              </p>
              <p className="flex items-center gap-1 text-slate-400">
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                Hospital Insurance Desk Coordination
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
