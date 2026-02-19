"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Camera, Mic, FileText, Check, AlertTriangle, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// Inspection photo thumbnails for the drop-in step
const PHOTO_CARDS = [
  { emoji: "🏠", label: "Exterior", bg: "bg-orange-50", rotate: -14, dx: -72 },
  { emoji: "🚿", label: "Bathroom", bg: "bg-sky-50",    rotate: 4,   dx: 0   },
  { emoji: "⚡", label: "Electric", bg: "bg-slate-100", rotate: 12,  dx: 72  },
];

// Steps: 0=DropPhotos, 1=Scan, 2=Detect, 3=Record, 4=Generate, 5=Done
const TOTAL_STEPS = 6;

export function ProductShowcase() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % TOTAL_STEPS);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-lg mx-auto aspect-[4/5] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden font-sans">
      {/* Phone Header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-50 border-b border-slate-100 flex items-center justify-between px-6 z-20">
        <div className="text-sm font-semibold text-slate-900">FieldScribe</div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="pt-20 px-6 h-full flex flex-col">
        <AnimatePresence mode="wait">

          {/* Step 0 — Photos drop in */}
          {step === 0 && (
            <motion.div
              key="drop-photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center h-full space-y-6"
            >
              {/* Polaroid cards */}
              <div className="relative h-44 w-full flex items-center justify-center">
                {PHOTO_CARDS.map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ y: -180, x: card.dx, opacity: 0, rotate: card.rotate }}
                    animate={{ y: 0,    x: card.dx, opacity: 1, rotate: card.rotate }}
                    transition={{
                      type: "spring",
                      stiffness: 240,
                      damping: 22,
                      delay: i * 0.13,
                    }}
                    className={`absolute ${card.bg} border border-slate-200 rounded-xl shadow-lg p-2 w-24`}
                    style={{ zIndex: i }}
                  >
                    <div className="bg-slate-200/70 rounded-lg aspect-square flex items-center justify-center text-3xl mb-1.5">
                      {card.emoji}
                    </div>
                    <p className="text-[10px] text-center font-medium text-slate-500 truncate">
                      {card.label}
                    </p>
                  </motion.div>
                ))}
              </div>
              <p className="text-slate-500 font-medium">Uploading site photos…</p>
            </motion.div>
          )}

          {/* Step 1 — Scan */}
          {step === 1 && (
            <motion.div
              key="scan"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-full space-y-4"
            >
              <div className="relative w-48 h-48 bg-slate-100 rounded-xl overflow-hidden border-2 border-slate-200">
                <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                  <Camera className="w-16 h-16" />
                </div>
                {/* Scanning Line */}
                <motion.div
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)] z-10"
                />
              </div>
              <p className="text-slate-500 font-medium">Scanning site photo…</p>
            </motion.div>
          )}

          {/* Step 2 — Detect */}
          {step === 2 && (
            <motion.div
              key="detect"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              className="flex flex-col items-center justify-center h-full space-y-6"
            >
              <div className="relative">
                <div className="w-48 h-48 bg-slate-100 rounded-xl border-2 border-red-400 relative overflow-hidden">
                  <div className="absolute top-2 right-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-bold flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Defect Detected
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 p-2 rounded shadow-sm text-xs text-slate-700">
                    &quot;Cracked stucco exterior wall, approx 3 ft length.&quot;
                  </div>
                </div>
              </div>
              <p className="text-indigo-600 font-semibold">AI Vision Analysis Complete</p>
            </motion.div>
          )}

          {/* Step 3 — Record */}
          {step === 3 && (
            <motion.div
              key="record"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full space-y-8"
            >
              <div className="relative flex items-center justify-center">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }}
                    className="absolute inset-0 rounded-full border border-indigo-200"
                    style={{ width: 80 + i * 40, height: 80 + i * 40, margin: -(i * 20) }}
                  />
                ))}
                <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
                  <Mic className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="space-y-2 text-center">
                <p className="text-slate-900 font-medium">Recording Voice Note…</p>
                <p className="text-slate-400 text-sm">&quot;North wall shows significant water damage…&quot;</p>
              </div>
            </motion.div>
          )}

          {/* Step 4 — Generate */}
          {step === 4 && (
            <motion.div
              key="generate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full px-8"
            >
              <Loader2 className="w-10 h-10 text-indigo-600 animate-spin mb-6" />
              <p className="text-slate-900 font-medium mb-2">Generating Report</p>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2.5 }}
                  className="h-full bg-indigo-600"
                />
              </div>
              <p className="text-xs text-slate-400 mt-4">Merging photos &amp; transcribing audio…</p>
            </motion.div>
          )}

          {/* Step 5 — Done */}
          {step === 5 && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center h-full space-y-6"
            >
              <div className="bg-green-100 p-4 rounded-full">
                <Check className="w-12 h-12 text-green-600" />
              </div>
              <div className="bg-white border border-slate-200 shadow-lg rounded-xl p-4 w-full max-w-[280px]">
                <div className="flex items-center space-x-3 mb-3 pb-3 border-b border-slate-100">
                  <div className="bg-red-100 p-2 rounded">
                    <FileText className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900">Final Report.pdf</div>
                    <div className="text-[10px] text-slate-500">Ready to share • 2.4 MB</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-2 bg-slate-100 rounded w-3/4" />
                  <div className="h-2 bg-slate-100 rounded w-full" />
                  <div className="h-2 bg-slate-100 rounded w-5/6" />
                </div>
              </div>
              <p className="text-slate-900 font-bold">Done in seconds.</p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* Steps Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === i ? "w-6 bg-indigo-600" : "w-1.5 bg-slate-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
