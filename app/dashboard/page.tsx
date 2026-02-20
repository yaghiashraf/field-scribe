"use client";

import { useState } from "react";
import { PhotoUploader, ImageResult } from "../components/PhotoUploader";
import { VoiceRecorder } from "../components/VoiceRecorder";
import { ReportGenerator } from "../components/ReportGenerator";
import { InspectionDetails, InspectionDetailsData } from "../components/InspectionDetails";

export default function Dashboard() {
  const [notes, setNotes] = useState<string[]>([]);
  const [images, setImages] = useState<ImageResult[]>([]); // Store full image objects
  const [details, setDetails] = useState<InspectionDetailsData>({
    inspectorName: "",
    companyName: "",
    companyAddress: "",
    clientName: "",
    propertyAddress: "",
    date: new Date().toISOString().split('T')[0],
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="bg-indigo-600 text-white p-1 rounded">FS</span>
            New Inspection
          </h1>
          <div className="text-sm font-medium text-slate-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Draft Mode
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs */}
        <div className="lg:col-span-7 space-y-8">
          <InspectionDetails details={details} onChange={setDetails} />

          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">2</span>
              Site Photos
            </h2>
            {/* Pass state setter to PhotoUploader */}
            <PhotoUploader onImagesChange={setImages} />
          </section>

          <section className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center">
              <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
              Voice Notes
            </h2>
            <VoiceRecorder onTranscriptionComplete={(text) => setNotes(prev => [...prev, text])} />
            
            {notes.length > 0 && (
              <div className="mt-4 space-y-2">
                {notes.map((note, i) => (
                  <div key={i} className="p-3 bg-slate-50 rounded-md text-sm text-slate-700 border border-slate-100 italic">
                    &quot;{note}&quot;
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Preview */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-6">
             <section className="bg-white rounded-xl shadow-lg border border-indigo-100 p-6 ring-1 ring-indigo-50">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Final Report
                </div>
                <span className="text-xs font-normal text-slate-400 uppercase tracking-wide">Preview Mode</span>
              </h2>
              {/* Pass full image objects to ReportGenerator */}
              <ReportGenerator notes={notes} images={images} details={details} />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
