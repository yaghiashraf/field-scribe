"use client";

import { useState } from "react";
import { PhotoUploader } from "../components/PhotoUploader";
import { VoiceRecorder } from "../components/VoiceRecorder";
import { ReportGenerator } from "../components/ReportGenerator";

export default function Dashboard() {
  const [notes, setNotes] = useState<string[]>([]);
  const [imageAnalyses, setImageAnalyses] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900">New Inspection</h1>
          <div className="text-sm text-slate-500">
            Draft saved just now
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">1</span>
              Site Photos
            </h2>
            <PhotoUploader onAnalysisComplete={(text) => setImageAnalyses(prev => [...prev, text])} />
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
              Voice Notes
            </h2>
            <VoiceRecorder onTranscriptionComplete={(text) => setNotes(prev => [...prev, text])} />
            
            {/* Notes List */}
            {notes.length > 0 && (
              <div className="mt-4 space-y-2">
                {notes.map((note, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-md text-sm text-slate-700 border border-slate-100">
                    "{note}"
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Preview & Generate */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 space-y-6">
             <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
                <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
                Report Preview
              </h2>
              <ReportGenerator notes={notes} imageAnalyses={imageAnalyses} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
