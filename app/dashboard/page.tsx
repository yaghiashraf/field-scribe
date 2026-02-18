"use client";

import { useState, useEffect, useCallback } from "react";
import { PhotoUploader } from "../components/PhotoUploader";
import { VoiceRecorder } from "../components/VoiceRecorder";
import { ReportGenerator } from "../components/ReportGenerator";
import { InspectionDetails, InspectionDetailsData } from "../components/InspectionDetails";
import { Trash2, RefreshCw, FileText, Save, CheckCircle2, X } from "lucide-react";
import Link from "next/link";

const STORAGE_KEY = "fieldscribe_draft";

interface DraftData {
  notes: NoteEntry[];
  imageAnalyses: ImageEntry[];
  details: InspectionDetailsData;
  lastSaved: string;
}

export interface NoteEntry {
  id: string;
  text: string;
  timestamp: string;
}

export interface ImageEntry {
  id: string;
  description: string;
  filename: string;
  timestamp: string;
}

const defaultDetails: InspectionDetailsData = {
  inspectorName: "",
  companyName: "",
  companyAddress: "",
  clientName: "",
  propertyAddress: "",
  date: new Date().toISOString().split("T")[0],
};

/** Read stored draft once at component initialisation (avoids setState-in-effect). */
function loadDraft(): DraftData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as DraftData) : null;
  } catch {
    return null;
  }
}

function DashboardInner() {
  // All state is lazily initialised from localStorage — no setState inside effects.
  const [notes, setNotes] = useState<NoteEntry[]>(() => loadDraft()?.notes ?? []);
  const [imageAnalyses, setImageAnalyses] = useState<ImageEntry[]>(
    () => loadDraft()?.imageAnalyses ?? []
  );
  const [details, setDetails] = useState<InspectionDetailsData>(
    () => loadDraft()?.details ?? defaultDetails
  );
  const [lastSaved, setLastSaved] = useState<string | null>(
    () => loadDraft()?.lastSaved ?? null
  );
  // Read Stripe success param directly from the URL at mount — no effect needed.
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return new URLSearchParams(window.location.search).get("success") === "true";
  });

  // Auto-save: debounced write to localStorage, no setState in the effect body.
  const saveDraft = useCallback(() => {
    const now = new Date().toLocaleTimeString();
    const draft: DraftData = { notes, imageAnalyses, details, lastSaved: now };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
      setLastSaved(now);
    } catch {
      // Storage full or unavailable
    }
  }, [notes, imageAnalyses, details]);

  // The only side-effect: schedule a debounced save whenever data changes.
  useEffect(() => {
    const timer = setTimeout(saveDraft, 800);
    return () => clearTimeout(timer);
  }, [saveDraft]);

  const handleAddNote = (text: string) => {
    setNotes((prev) => [
      ...prev,
      { id: crypto.randomUUID(), text, timestamp: new Date().toLocaleTimeString() },
    ]);
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleAddImage = (description: string, filename: string) => {
    setImageAnalyses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        description,
        filename,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleDeleteImage = (id: string) => {
    setImageAnalyses((prev) => prev.filter((img) => img.id !== id));
  };

  const handleNewInspection = () => {
    if (
      !confirm(
        "Start a new inspection? This will clear all current data (downloaded reports are not affected)."
      )
    )
      return;
    setNotes([]);
    setImageAnalyses([]);
    setDetails({ ...defaultDetails, date: new Date().toISOString().split("T")[0] });
    localStorage.removeItem(STORAGE_KEY);
    setLastSaved(null);
  };

  const noteTexts = notes.map((n) => n.text);
  const imageDescriptions = imageAnalyses.map((img) => img.description);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Purchase success banner */}
      {showSuccessBanner && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-800 text-sm font-medium">
            <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
            Welcome! Your purchase was successful. You now have lifetime access to FieldScribe.
          </div>
          <button
            onClick={() => setShowSuccessBanner(false)}
            className="text-green-600 hover:text-green-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold text-slate-900 flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="bg-indigo-600 text-white p-1.5 rounded-lg">
              <FileText className="w-4 h-4" />
            </span>
            FieldScribe
          </Link>

          <div className="flex items-center gap-3">
            {lastSaved && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400">
                <Save className="w-3 h-3" />
                <span>Auto-saved {lastSaved}</span>
              </div>
            )}
            <button
              onClick={handleNewInspection}
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              New
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1 – Inspection Details */}
          <InspectionDetails details={details} onChange={setDetails} />

          {/* Step 2 – Site Photos */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 font-bold">
                2
              </span>
              Site Photos
              {imageAnalyses.length > 0 && (
                <span className="ml-auto text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {imageAnalyses.length} analyzed
                </span>
              )}
            </h2>
            <PhotoUploader onAnalysisComplete={handleAddImage} />

            {/* Analysis results */}
            {imageAnalyses.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Analysis Results
                </p>
                {imageAnalyses.map((img) => (
                  <div
                    key={img.id}
                    className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 mb-0.5">
                        {img.filename} · {img.timestamp}
                      </p>
                      <p className="text-slate-700 leading-relaxed">{img.description}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteImage(img.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors shrink-0 mt-0.5 opacity-0 group-hover:opacity-100"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Step 3 – Voice Notes */}
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 font-bold">
                3
              </span>
              Voice Notes
              {notes.length > 0 && (
                <span className="ml-auto text-xs font-normal text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  {notes.length} {notes.length === 1 ? "note" : "notes"}
                </span>
              )}
            </h2>
            <VoiceRecorder onTranscriptionComplete={handleAddNote} />

            {notes.length > 0 && (
              <div className="mt-4 space-y-2">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100 text-sm group"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 mb-0.5">{note.timestamp}</p>
                      <p className="text-slate-700 italic">&ldquo;{note.text}&rdquo;</p>
                    </div>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      className="text-slate-300 hover:text-red-500 transition-colors shrink-0 mt-0.5 opacity-0 group-hover:opacity-100"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column – Sticky Report Generator */}
        <div className="lg:col-span-5">
          <div className="sticky top-20">
            <section className="bg-white rounded-xl shadow-lg border border-indigo-100 p-6 ring-1 ring-indigo-50">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3 font-bold">
                    4
                  </span>
                  Final Report
                </div>
                <span className="text-xs font-normal text-slate-400 uppercase tracking-wide">
                  AI Generated
                </span>
              </h2>
              <ReportGenerator
                notes={noteTexts}
                imageAnalyses={imageDescriptions}
                details={details}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardInner />;
}
