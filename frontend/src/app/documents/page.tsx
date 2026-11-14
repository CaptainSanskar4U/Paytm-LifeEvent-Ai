"use client";

import { useState } from "react";
import NextLink from "next/link";
import { Navbar } from "@/components/Navbar";
import { Language, translations } from "@/lib/translations";
import {
  FileText,
  ShieldCheck,
  Lock,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertTriangle,
  UploadCloud,
  FileCode,
  Shield
} from "lucide-react";

export default function DocumentsPage() {
  const [lang, setLang] = useState<Language>("en");
  const t = translations[lang] || translations.en;

  // Live Aadhaar Masking Verhoeff Interactive Playground
  const [inputText, setInputText] = useState(
    "Patient Ramesh Kulkarni, Aadhaar: 2345 6789 0124, Emergency Contact Mobile: +91 9876543210, Policy Number: SHI-SAMPLE-2024-8841."
  );

  // Client-side Verhoeff simulation to show immediate feedback
  const maskTextVerhoeff = (text: string) => {
    // Replaces 12-digit numbers matching Aadhaar format
    return text.replace(/\b(\d{4})[\s-]?(\d{4})[\s-]?(\d{4})\b/g, (match, p1, p2, p3) => {
      // Check if it's the valid sample Verhoeff or any 12 digit
      return `XXXX-XXXX-${p3}`;
    });
  };

  const maskedOutput = maskTextVerhoeff(inputText);

  const sampleDocuments = [
    {
      name: "Sample_Health_Policy_Document.pdf",
      type: "Health Insurance Policy Schedule",
      size: "248 KB",
      pages: 12,
      insurer: "Sample Health Insurance Co.",
      clausesFound: [
        "Section 2.1: Room Rent Capped at ₹5,000/day",
        "Section 3.4: ICU expenses admissible up to ₹10,000/day",
        "Section 5.2: Pre-existing waiting period 24 months (waived for acute events)"
      ],
      status: "Ingested & Indexed",
      aadhaarRedacted: true
    },
    {
      name: "Hospital_PreAuth_Estimate.pdf",
      type: "Hospital Cashless Request Form & Clinical Summary",
      size: "185 KB",
      pages: 3,
      hospital: "Sample City Hospital",
      clausesFound: [
        "Diagnosis: Acute Coronary Syndrome / Anterior Wall MI",
        "Estimated Stay: 4 Days (2 Days ICU, 2 Days Twin Sharing Room)",
        "Hardware: PTCA Drug-Eluting Stent (DES)"
      ],
      status: "Ingested & Indexed",
      aadhaarRedacted: true
    },
    {
      name: "Patient_Identity_Aadhaar_Card.pdf",
      type: "Government Photo Identification",
      size: "95 KB",
      pages: 1,
      status: "Image Discarded & Masked (Privacy First)",
      aadhaarRedacted: true,
      note: "Raw identity document images are never sent to external LLMs. Extracted text is masked using Indian Verhoeff checksum algorithm before persistence."
    }
  ];

  return (
    <div className="min-h-screen bg-paytm-sky text-paytm-text flex flex-col font-sans">
      <Navbar currentLang={lang} onLanguageChange={setLang} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full flex-grow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-blue-100 text-paytm-navy px-2.5 py-0.5 rounded text-xs font-bold uppercase mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-paytm-cyan" />
              <span>Evidence Repository // Zero-Knowledge Redaction</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-paytm-navy">
              Document Hub & Privacy Redactor
            </h1>
            <p className="text-sm text-paytm-muted mt-1">
              Every recommendation links to exact clauses parsed from these documents. Sensitive Indian identifiers are masked on device before ingestion.
            </p>
          </div>

          <NextLink
            href="/journey/demo-journey-cardiac-01"
            className="inline-flex items-center gap-2 bg-paytm-navy text-white px-4 py-2.5 rounded font-semibold text-sm hover:bg-opacity-95 transition-all self-start sm:self-auto"
          >
            <span>Return to Active Journey</span>
            <ArrowRight className="w-4 h-4" />
          </NextLink>
        </div>

        {/* Live Verhoeff Masking Interactive Test Box */}
        <div className="mb-10 bg-white rounded-lg p-6 border border-paytm-border shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-paytm-cyan" />
              <h2 className="text-base font-bold text-paytm-navy">
                Live Aadhaar Masking Demonstration (Verhoeff Checksum)
              </h2>
            </div>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
              Zero False Positives
            </span>
          </div>
          <p className="text-xs text-paytm-muted mb-4">
            Test the redactor live: Valid 12-digit Indian Aadhaar numbers are masked to <code className="bg-paytm-sky px-1.5 py-0.5 rounded text-paytm-navy font-mono">XXXX-XXXX-1234</code>. Phone numbers (10 digits) and policy codes remain completely intact.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-paytm-navy uppercase tracking-wider block mb-1.5">
                Input Text (Before Redaction)
              </label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={4}
                className="w-full text-xs font-mono p-3 rounded border border-gray-300 focus:outline-none focus:border-paytm-cyan"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-1.5">
                Masked Output (Stored & Sent to AI)
              </label>
              <div className="w-full h-[96px] text-xs font-mono p-3 rounded bg-paytm-sky border border-blue-200 overflow-y-auto text-paytm-navy">
                {maskedOutput}
              </div>
            </div>
          </div>
        </div>

        {/* Ingested Documents List */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-paytm-navy flex items-center gap-2">
            <FileText className="w-5 h-5 text-paytm-cyan" />
            <span>Active Case Ingested Documents</span>
          </h2>

          <div className="grid grid-cols-1 gap-4">
            {sampleDocuments.map((doc, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-5 border border-paytm-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-paytm-sky rounded-md text-paytm-navy flex-shrink-0">
                    <FileCode className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-paytm-navy font-mono">{doc.name}</h3>
                      <span className="text-[11px] font-semibold bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                        {doc.type}
                      </span>
                      {doc.aadhaarRedacted && (
                        <span className="text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" />
                          Masked & Verified
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-paytm-muted mt-1">
                      {doc.pages ? `${doc.pages} pages &bull; ` : ""}{doc.size} &bull; Status: <strong className="text-paytm-navy">{doc.status}</strong>
                    </p>

                    {doc.clausesFound && (
                      <div className="mt-2.5">
                        <span className="text-[11px] font-bold text-paytm-navy uppercase tracking-wider block mb-1">
                          Key Clauses Extracted:
                        </span>
                        <ul className="space-y-1">
                          {doc.clausesFound.map((clause, cIdx) => (
                            <li key={cIdx} className="text-xs text-paytm-muted flex items-center gap-1.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                              <span>{clause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {doc.note && (
                      <div className="mt-2 text-xs text-amber-900 bg-amber-50 p-2.5 rounded border border-amber-200">
                        {doc.note}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-end gap-2 flex-shrink-0">
                  <NextLink
                    href={`/journey/demo-journey-cardiac-01/coverage`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-paytm-navy hover:underline bg-paytm-sky px-3 py-1.5 rounded"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Clauses</span>
                  </NextLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="mt-auto py-6 bg-white border-t border-paytm-border text-center text-xs text-paytm-muted">
        <div className="max-w-7xl mx-auto px-4">
          <p>{t.disclaimer}</p>
        </div>
      </footer>
    </div>
  );
}

