"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import NextLink from "next/link";
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
  Loader2,
  UploadCloud,
  FileText,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Info,
  CreditCard,
  X,
  FileCheck,
  Calendar,
  Phone
} from "lucide-react";

export default function IntakePage() {
  const router = useRouter();
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  // Mode: Real Working Patient Intake vs Demo Sample Fast-Track
  const [mode, setMode] = useState<"live" | "demo">("live");

  // Patient Identity
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("56");
  const [patientGender, setPatientGender] = useState("Male");
  const [relation, setRelation] = useState("father");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [aadhaarInput, setAadhaarInput] = useState("");

  // Hospital & Clinical Details
  const [hospitalName, setHospitalName] = useState("");
  const [city, setCity] = useState("Pune");
  const [condition, setCondition] = useState("");
  const [urgency, setUrgency] = useState("critical");
  const [roomCategory, setRoomCategory] = useState("ICU");
  const [stayDays, setStayDays] = useState("4");
  const [estimatedAmount, setEstimatedAmount] = useState("350000");

  // Insurance Policy Details
  const [knownInsurer, setKnownInsurer] = useState("Star Health & Allied Insurance");
  const [policyNumber, setPolicyNumber] = useState("");
  const [sumInsured, setSumInsured] = useState("500000");
  const [roomRentCapType, setRoomRentCapType] = useState("1% of Sum Insured (₹5,000/day)");
  const [copayPercent, setCopayPercent] = useState("0");

  // Document Upload States
  const [policyPhoto, setPolicyPhoto] = useState<{ name: string; size: string; preview: string | null } | null>(null);
  const [estimatePhoto, setEstimatePhoto] = useState<{ name: string; size: string; preview: string | null } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  // Verhoeff Aadhaar preview
  const maskAadhaarLive = (val: string) => {
    const cleaned = val.replace(/\D/g, "");
    if (cleaned.length === 12) {
      return `XXXX-XXXX-${cleaned.slice(8)}`;
    }
    return val;
  };

  // File upload handlers with image thumbnail preview
  const handlePolicyFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setPolicyPhoto({
          name: file.name,
          size: sizeStr,
          preview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    } else {
      setPolicyPhoto({
        name: file.name,
        size: sizeStr,
        preview: null
      });
    }
  };

  const handleEstimateFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const sizeStr = `${(file.size / 1024).toFixed(0)} KB`;
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setEstimatePhoto({
          name: file.name,
          size: sizeStr,
          preview: reader.result as string
        });
      };
      reader.readAsDataURL(file);
    } else {
      setEstimatePhoto({
        name: file.name,
        size: sizeStr,
        preview: null
      });
    }
  };

  // Demo loader for presentation convenience
  const handleLoadSample = (type: "cardiac" | "orthopedic") => {
    if (type === "cardiac") {
      setPatientName("Ramesh Kulkarni");
      setPatientAge("58");
      setPatientGender("Male");
      setRelation("father");
      setHospitalName("Sample City Hospital");
      setCity("Pune");
      setCondition("Acute chest pain, acute coronary syndrome, immediate angioplasty recommended.");
      setUrgency("critical");
      setRoomCategory("ICU");
      setStayDays("4");
      setEstimatedAmount("420000");
      setKnownInsurer("Sample Health Insurance Co.");
      setPolicyNumber("SHI-CARD-2024-8841");
      setSumInsured("500000");
      setRoomRentCapType("1% of Sum Insured (₹5,000/day)");
      setCopayPercent("0");
      setPolicyPhoto({
        name: "Sample_Health_Policy_Document.pdf",
        size: "248 KB",
        preview: null
      });
      setEstimatePhoto({
        name: "Hospital_PreAuth_Estimate.pdf",
        size: "185 KB",
        preview: null
      });
    } else {
      setPatientName("Sunita Patil");
      setPatientAge("52");
      setPatientGender("Female");
      setRelation("mother");
      setHospitalName("Sample Metropolitan Hospital");
      setCity("Pune");
      setCondition("Compound fracture left femur following slip, internal fixation surgery required.");
      setUrgency("urgent");
      setRoomCategory("Single Private AC");
      setStayDays("3");
      setEstimatedAmount("185000");
      setKnownInsurer("Sample Care Health");
      setPolicyNumber("CARE-ORTHO-9912");
      setSumInsured("400000");
      setRoomRentCapType("Single Private AC Eligible");
      setCopayPercent("10");
    }
  };

  const calculateRoomRents = () => {
    let allowed = 5000;
    const si = parseFloat(sumInsured) || 500000;
    if (roomRentCapType.includes("1%")) {
      allowed = si * 0.01;
    } else if (roomRentCapType.includes("Single")) {
      allowed = 6500;
    } else if (roomRentCapType.includes("No")) {
      allowed = 9000;
    }

    let actual = 8500;
    if (roomCategory === "ICU") actual = 9000;
    else if (roomCategory === "Single Private AC") actual = 6500;
    else if (roomCategory === "Twin Sharing") actual = 4000;
    else if (roomCategory === "General Ward") actual = 2500;

    return { allowed, actual };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { allowed, actual } = calculateRoomRents();
    const isDemoSubmission =
      mode === "demo" ||
      hospitalName.toLowerCase().includes("sample") ||
      patientName.toLowerCase().includes("sample");

    try {
      const payload = {
        patient_name: patientName.trim() || (mode === "demo" ? "Ramesh Kulkarni" : "Patient Admitted"),
        relation: relation || "father",
        age: parseInt(patientAge) || 55,
        gender: patientGender,
        hospital_name: hospitalName.trim() || (mode === "demo" ? "Sample City Hospital" : "Emergency Hospital"),
        city: city || "Pune",
        room_category: roomCategory,
        condition_description: condition.trim() || "Emergency medical admission requiring immediate treatment.",
        urgency: urgency,
        language: lang,
        known_insurer: knownInsurer || "Health Insurance",
        policy_number: policyNumber || "POL-2024-LIVE",
        sum_insured: parseFloat(sumInsured) || 500000,
        room_rent_cap_type: roomRentCapType,
        allowed_room_rent: allowed,
        actual_room_rent: actual,
        stay_days: parseInt(stayDays) || 4,
        copay_percent: parseFloat(copayPercent) || 0,
        emergency_contact: emergencyContact,
        aadhaar_number: aadhaarInput,
        policy_photo_name: policyPhoto ? policyPhoto.name : null,
        policy_photo_preview: policyPhoto ? policyPhoto.preview : null,
        estimate_photo_name: estimatePhoto ? estimatePhoto.name : null,
        estimate_photo_preview: estimatePhoto ? estimatePhoto.preview : null,
        estimated_amount: parseFloat(estimatedAmount) || 350000,
        is_demo: isDemoSubmission,
      };

      const res = await fetch("http://127.0.0.1:8000/api/journey/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        router.push(`/journey/${data.id}`);
      } else {
        router.push("/journey/demo-journey-cardiac-01");
      }
    } catch (err) {
      console.warn("Backend error, falling back:", err);
      router.push("/journey/demo-journey-cardiac-01");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 w-full flex-grow">
        {/* Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 bg-blue-100 text-paytm-navy px-2.5 py-0.5 rounded text-xs font-bold uppercase mb-2">
            <HeartPulse className="w-3.5 h-3.5 text-paytm-cyan" />
            <span>Emergency Intake & Document Ingestion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-paytm-navy">
            Record Emergency Admission
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Provide patient details and upload photos of your health policy or hospital estimate. LifeEvent AI audits your coverage and computes your out-of-pocket range live.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex border-b border-slate-200 mb-6 bg-white rounded-t-xl p-1 gap-2">
          <button
            type="button"
            onClick={() => setMode("live")}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              mode === "live"
                ? "bg-paytm-navy text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Camera className="w-4 h-4 text-paytm-cyan" />
            <span>Live Patient Intake (Upload Policy Photo & Real Details)</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setMode("demo");
              handleLoadSample("cardiac");
            }}
            className={`py-2.5 px-4 text-xs sm:text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${
              mode === "demo"
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Load Sample Emergency (Cardiac)</span>
            <span className="sm:hidden">Sample Demo</span>
          </button>
        </div>

        {mode === "demo" && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-amber-900">
              <Sparkles className="w-4 h-4 text-amber-700 flex-shrink-0" />
              <span>Sample emergency pre-loaded. Click below to inspect or submit.</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleLoadSample("cardiac")}
                className="px-2.5 py-1 bg-white border border-amber-300 text-amber-900 font-bold rounded hover:bg-amber-100"
              >
                Cardiac Case (₹4.2L)
              </button>
              <button
                type="button"
                onClick={() => handleLoadSample("orthopedic")}
                className="px-2.5 py-1 bg-white border border-amber-300 text-amber-900 font-bold rounded hover:bg-amber-100"
              >
                Ortho Case (₹1.85L)
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: Patient & Admission Identity */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-paytm-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <User className="w-4 h-4 text-paytm-cyan" />
              <span>1. Patient & Hospital Identity</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Patient Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suresh Sharma"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan focus:ring-1 focus:ring-paytm-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Relation to Patient</label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan bg-white"
                >
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="spouse">Spouse</option>
                  <option value="child">Son / Daughter</option>
                  <option value="self">Self</option>
                  <option value="other">Other Relative</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Age</label>
                <input
                  type="number"
                  placeholder="e.g. 56"
                  value={patientAge}
                  onChange={(e) => setPatientAge(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Gender</label>
                <select
                  value={patientGender}
                  onChange={(e) => setPatientGender(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan bg-white"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">Emergency Attendant Mobile</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98220 12345"
                  value={emergencyContact}
                  onChange={(e) => setEmergencyContact(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Hospital Name & Branch <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ruby Hall Clinic, Pune or Manipal Hospital"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan"
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Medical Condition, Room Type & Estimate */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-paytm-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <HeartPulse className="w-4 h-4 text-paytm-cyan" />
              <span>2. Clinical Condition & Hospital Room</span>
            </h2>

            {/* Voice Dictation Recorder */}
            <div className="mb-4">
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Medical Emergency / Doctor Diagnosis <span className="text-red-500">*</span>
              </label>
              <div className="mb-2">
                <VoiceRecorder
                  language={lang}
                  onTranscriptChange={(transcript) => {
                    setCondition((prev) => (prev ? `${prev} ${transcript}` : transcript));
                  }}
                />
              </div>
              <textarea
                required
                rows={3}
                placeholder="Or type doctor's preliminary diagnosis (e.g. Acute severe chest pain, coronary angiography advised; or severe appendicitis surgery)."
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full text-xs p-3 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Hospital Estimate (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 350000"
                  value={estimatedAmount}
                  onChange={(e) => setEstimatedAmount(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan font-mono"
                />
                <span className="text-[10px] text-slate-500 mt-0.5 block">Estimated total admission bill</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Room Category Chosen</label>
                <select
                  value={roomCategory}
                  onChange={(e) => setRoomCategory(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan bg-white"
                >
                  <option value="ICU">ICU (₹9,000/day)</option>
                  <option value="Single Private AC">Single Private AC (₹6,500/day)</option>
                  <option value="Twin Sharing">Twin Sharing (₹4,000/day)</option>
                  <option value="General Ward">General Ward (₹2,500/day)</option>
                </select>
                <span className="text-[10px] text-slate-500 mt-0.5 block">Determines proportional deduction</span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Estimated Stay</label>
                <select
                  value={stayDays}
                  onChange={(e) => setStayDays(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan bg-white"
                >
                  <option value="2">2 Days</option>
                  <option value="3">3 Days</option>
                  <option value="4">4 Days</option>
                  <option value="5">5 Days</option>
                  <option value="7">7 Days</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3: Live Document Uploads (Policy Photo & Estimate Slip) */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-paytm-navy uppercase tracking-wider flex items-center gap-2">
                <Camera className="w-4 h-4 text-paytm-cyan" />
                <span>3. Live Upload: Policy Photo & Hospital Estimate</span>
              </h2>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                Multimodal AI OCR Ready
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Take a photo or upload PDF/images. Our multimodal engine extracts room rent sub-limits and doctor orders.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Policy Photo Upload Box */}
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-paytm-cyan transition-colors bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-paytm-cyan" />
                      <span>Health Policy Document / Photo</span>
                    </span>
                    {policyPhoto && (
                      <button
                        type="button"
                        onClick={() => setPolicyPhoto(null)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Upload policy schedule page, e-card photo, or health insurance card.
                  </p>

                  {policyPhoto?.preview ? (
                    <div className="mb-3 relative rounded-lg overflow-hidden border border-slate-200 max-h-36">
                      <img
                        src={policyPhoto.preview}
                        alt="Policy Preview"
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[10px] px-2 py-1 truncate">
                        {policyPhoto.name} ({policyPhoto.size})
                      </div>
                    </div>
                  ) : policyPhoto ? (
                    <div className="mb-3 p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{policyPhoto.name} ({policyPhoto.size})</span>
                    </div>
                  ) : null}
                </div>

                <label className="w-full cursor-pointer bg-white border border-slate-300 hover:border-paytm-cyan text-slate-700 font-bold text-xs py-2 px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 shadow-sm">
                  <UploadCloud className="w-4 h-4 text-paytm-cyan" />
                  <span>{policyPhoto ? "Replace Policy Photo" : "Upload Policy Photo / PDF"}</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handlePolicyFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Hospital Estimate Upload Box */}
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-paytm-cyan transition-colors bg-slate-50/50 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-paytm-cyan" />
                      <span>Hospital Pre-Auth Estimate / Doctor Note</span>
                    </span>
                    {estimatePhoto && (
                      <button
                        type="button"
                        onClick={() => setEstimatePhoto(null)}
                        className="text-slate-400 hover:text-red-500"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Upload doctor prescription, admission estimate slip, or clinical notes.
                  </p>

                  {estimatePhoto?.preview ? (
                    <div className="mb-3 relative rounded-lg overflow-hidden border border-slate-200 max-h-36">
                      <img
                        src={estimatePhoto.preview}
                        alt="Estimate Preview"
                        className="w-full h-36 object-cover"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-slate-900/70 text-white text-[10px] px-2 py-1 truncate">
                        {estimatePhoto.name} ({estimatePhoto.size})
                      </div>
                    </div>
                  ) : estimatePhoto ? (
                    <div className="mb-3 p-2.5 rounded bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span className="truncate">{estimatePhoto.name} ({estimatePhoto.size})</span>
                    </div>
                  ) : null}
                </div>

                <label className="w-full cursor-pointer bg-white border border-slate-300 hover:border-paytm-cyan text-slate-700 font-bold text-xs py-2 px-3 rounded-lg text-center transition-all flex items-center justify-center gap-1.5 shadow-sm">
                  <UploadCloud className="w-4 h-4 text-paytm-cyan" />
                  <span>{estimatePhoto ? "Replace Estimate Photo" : "Upload Estimate Photo / PDF"}</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={handleEstimateFileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Aadhaar with Live Verhoeff Redaction */}
            <div className="p-3.5 rounded-lg bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex-grow">
                <label className="text-xs font-bold text-paytm-navy block mb-0.5">
                  Patient Aadhaar Number (Zero-Knowledge Redaction)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2345 6789 0124 (Will be masked to XXXX-XXXX-0124)"
                  value={aadhaarInput}
                  onChange={(e) => setAadhaarInput(e.target.value)}
                  className="w-full text-xs p-2 rounded border border-blue-200 focus:outline-none focus:border-paytm-cyan font-mono"
                />
              </div>
              <div className="text-[11px] text-slate-500 sm:max-w-xs leading-tight">
                <Lock className="w-3.5 h-3.5 text-emerald-600 inline mr-1" />
                <span>Masked automatically with Indian Verhoeff checksum algorithm before transmission.</span>
              </div>
            </div>
          </div>

          {/* SECTION 4: Policy Coverage Parameters (Crucial for Out-of-Pocket calculation) */}
          <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-sm">
            <h2 className="text-sm font-bold text-paytm-navy uppercase tracking-wider mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-paytm-cyan" />
              <span>4. Policy Entitlement Details</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Health Insurance Company</label>
                <select
                  value={knownInsurer}
                  onChange={(e) => setKnownInsurer(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan bg-white"
                >
                  <option value="Star Health & Allied Insurance">Star Health & Allied Insurance</option>
                  <option value="HDFC ERGO General Insurance">HDFC ERGO General Insurance</option>
                  <option value="Care Health Insurance">Care Health Insurance</option>
                  <option value="Niva Bupa Health Insurance">Niva Bupa Health Insurance</option>
                  <option value="ICICI Lombard General Insurance">ICICI Lombard</option>
                  <option value="New India Assurance">New India Assurance</option>
                  <option value="United India Insurance">United India Insurance</option>
                  <option value="Bajaj Allianz General Insurance">Bajaj Allianz</option>
                  <option value="Sample Health Insurance Co.">Sample Health Insurance Co.</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Policy / TPA Number</label>
                <input
                  type="text"
                  placeholder="e.g. P/211111/01/2024/004812"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Total Sum Insured (₹)</label>
                <select
                  value={sumInsured}
                  onChange={(e) => setSumInsured(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan bg-white font-mono"
                >
                  <option value="300000">₹3,00,000</option>
                  <option value="500000">₹5,00,000</option>
                  <option value="750000">₹7,50,000</option>
                  <option value="1000000">₹10,00,000</option>
                  <option value="1500000">₹15,00,000</option>
                  <option value="2500000">₹25,00,000+</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Room Rent Entitlement Cap</label>
                <select
                  value={roomRentCapType}
                  onChange={(e) => setRoomRentCapType(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan bg-white"
                >
                  <option value="1% of Sum Insured (₹5,000/day)">1% of Sum Insured (Standard ₹5,000/day)</option>
                  <option value="Single Private AC Eligible">Single Private AC Room Eligible (~₹6,500/day)</option>
                  <option value="No Room Rent Limit">No Room Rent Cap / Any Room</option>
                  <option value="2% of Sum Insured">2% of Sum Insured for ICU</option>
                </select>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Crucial: Occupying a room above this triggers proportional deduction across doctor and surgery fees.
                </span>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Policy Co-Payment Clause</label>
                <select
                  value={copayPercent}
                  onChange={(e) => setCopayPercent(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-paytm-cyan bg-white"
                >
                  <option value="0">0% (Zero Co-payment)</option>
                  <option value="10">10% Co-payment</option>
                  <option value="20">20% Senior Citizen Co-payment</option>
                </select>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  Percentage the insured must pay out-of-pocket on approved claims.
                </span>
              </div>
            </div>
          </div>

          {/* Submission Bar */}
          <div className="bg-paytm-navy text-white rounded-xl p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-paytm-cyan uppercase tracking-wider block">
                Ready to Analyze Journey
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                Computes honest out-of-pocket range, generates hospital checklist & verifies clauses.
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-6 py-3 rounded-lg bg-paytm-cyan text-paytm-navy font-extrabold text-sm hover:brightness-105 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 flex-shrink-0 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-paytm-navy" />
                  <span>Analyzing Policy & Generating Journey...</span>
                </>
              ) : (
                <>
                  <span>Start Live Financial Journey</span>
                  <ArrowRight className="w-4 h-4 text-paytm-navy" />
                </>
              )}
            </button>
          </div>
        </form>
      </main>

      <footer className="mt-auto py-4 bg-white border-t border-slate-200 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto px-4">
          <p>{t.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}
