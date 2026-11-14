"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { VoiceRecorder } from "@/components/VoiceRecorder";
import { Language, translations } from "@/lib/translations";
import {
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Building2,
  User,
  HeartPulse,
  Lock,
  Loader2
} from "lucide-react";

export default function IntakePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  const [patientName, setPatientName] = useState("");
  const [relation, setRelation] = useState("father");
  const [hospitalName, setHospitalName] = useState("");
  const [condition, setCondition] = useState("");
  const [estimatedAmount, setEstimatedAmount] = useState("420000");
  const [knownInsurer, setKnownInsurer] = useState("Sample Health Insurance Co.");
  const [isLoading, setIsLoading] = useState(false);

  // One-click demo emergency loader
  const handleLoadSample = (type: "cardiac" | "orthopedic") => {
    if (type === "cardiac") {
      setPatientName("Ramesh Kulkarni");
      setRelation("father");
      setHospitalName("Sample City Hospital");
      setCondition("Acute chest pain, diagnosed with acute coronary syndrome, immediate angioplasty recommended.");
      setEstimatedAmount("420000");
      setKnownInsurer("Sample Health Insurance Co.");
    } else {
      setPatientName("Sunita Patil");
      setRelation("mother");
      setHospitalName("Sample Metropolitan Hospital");
      setCondition("Compound fracture left femur following slip, internal fixation surgery required.");
      setEstimatedAmount("185000");
      setKnownInsurer("Sample Care Health");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        patient_name: patientName || "Ramesh Kulkarni",
        relation: relation || "father",
        hospital_name: hospitalName || "Sample City Hospital",
        city: "Pune",
        condition_description: condition || "Emergency hospital admission with critical care needs.",
        urgency: "critical",
        language: lang,
        known_insurer: knownInsurer || "Sample Health Insurance Co.",
        estimated_amount: parseFloat(estimatedAmount) || 420000,
        is_demo: true,
      };

      const res = await fetch("http://127.0.0.1:8000/api/journey/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/journey/${data.id || "demo-journey-cardiac-01"}`);
      } else {
        // Fallback for offline demo
        router.push("/journey/demo-journey-cardiac-01");
      }
    } catch (err) {
      console.warn("Backend offline or network error, loading local demo journey:", err);
      router.push("/journey/demo-journey-cardiac-01");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 w-full flex-grow">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-paytm-navy px-2.5 py-0.5 rounded text-xs font-bold uppercase mb-2">
            <HeartPulse className="w-3.5 h-3.5 text-paytm-cyan" />
            <span>Emergency Intake // Step 1 of 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Tell us about the medical situation
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Speak naturally or type. We will analyze your coverage, identify required documents, and calculate your out-of-pocket range.
          </p>
        </div>

        {/* Demo Fast-Track Card */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gradient-to-r from-blue-50/60 to-white">
          <div>
            <span className="text-xs font-bold text-paytm-navy flex items-center gap-1.5 uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-paytm-cyan" />
              <span>Hackathon Presentation Mode</span>
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              Load a pre-configured sample emergency to test the complete living pipeline instantly.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => handleLoadSample("cardiac")}
              className="px-3 py-1.5 bg-paytm-navy text-white text-xs font-bold rounded hover:bg-paytm-navyDark transition-colors shadow-sm flex-1 sm:flex-none text-center"
            >
              Sample: Cardiac (₹4.2L)
            </button>
            <button
              type="button"
              onClick={() => handleLoadSample("orthopedic")}
              className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded hover:bg-slate-200 transition-colors border border-slate-200 flex-1 sm:flex-none text-center"
            >
              Sample: Ortho (₹1.85L)
            </button>
          </div>
        </div>

        {/* Intake Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl p-5 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          {/* Voice Component */}
          <div>
            <VoiceRecorder
              language={lang}
              onTranscriptChange={(text) => setCondition(text)}
              initialText={condition}
            />
          </div>

          {/* Structured Fields */}
          <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-paytm-cyan" />
                <span>Patient Full Name</span>
              </label>
              <input
                type="text"
                required
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Ramesh Kulkarni"
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:border-paytm-cyan focus:ring-1 focus:ring-paytm-cyan bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Relation to Patient
              </label>
              <select
                value={relation}
                onChange={(e) => setRelation(e.target.value)}
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:border-paytm-cyan focus:ring-1 focus:ring-paytm-cyan bg-white text-slate-900"
              >
                <option value="father">Father (पिता / वडील)</option>
                <option value="mother">Mother (माता / आई)</option>
                <option value="spouse">Spouse (पति/पत्नी / जोडीदार)</option>
                <option value="child">Child (बेटा/बेटी / मुलगा/मुलगी)</option>
                <option value="self">Self (स्वयं / स्वतः)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-paytm-cyan" />
                <span>Admitting Hospital</span>
              </label>
              <input
                type="text"
                required
                value={hospitalName}
                onChange={(e) => setHospitalName(e.target.value)}
                placeholder="e.g. Sample City Hospital"
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:border-paytm-cyan focus:ring-1 focus:ring-paytm-cyan bg-white text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Estimated Hospital Cost (INR ₹)
              </label>
              <input
                type="number"
                value={estimatedAmount}
                onChange={(e) => setEstimatedAmount(e.target.value)}
                placeholder="420000"
                className="w-full p-2.5 text-sm rounded-lg border border-slate-300 focus:border-paytm-cyan focus:ring-1 focus:ring-paytm-cyan bg-white text-slate-900 font-mono"
              />
            </div>
          </div>

          {/* Privacy Note */}
          <div className="p-3 bg-slate-50 rounded-lg text-slate-600 text-[11px] leading-relaxed flex items-start gap-2 border border-slate-200">
            <Lock className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <span>
              <strong>Privacy Protection:</strong> All government identifiers (such as Aadhaar) are masked server-side using the Verhoeff algorithm before storage. You can permanently delete this journey anytime.
            </span>
          </div>

          {/* Submit */}
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3.5 bg-paytm-navy text-white hover:bg-paytm-navyDark font-bold text-sm rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-paytm-cyan" />
                  <span>Processing Emergency Life-Event...</span>
                </>
              ) : (
                <>
                  <span>Proceed to Document Verification</span>
                  <ArrowRight className="w-4 h-4 text-paytm-cyan" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
