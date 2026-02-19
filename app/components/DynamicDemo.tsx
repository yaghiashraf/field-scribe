"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Image as ImageIcon, Mic } from "lucide-react";
import Image from "next/image";

export function DynamicDemo() {
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden max-w-4xl mx-auto my-16">
      <div className="flex border-b border-slate-200">
        <button
          onClick={() => setActiveTab("input")}
          className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${
            activeTab === "input" ? "bg-slate-50 text-indigo-600 border-b-2 border-indigo-600" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <ImageIcon className="w-4 h-4" /> Raw Input
          </span>
        </button>
        <button
          onClick={() => setActiveTab("output")}
          className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${
            activeTab === "output" ? "bg-slate-50 text-indigo-600 border-b-2 border-indigo-600" : "text-slate-500 hover:text-slate-700"
          }`}
        >
          <span className="flex items-center justify-center gap-2">
            <FileText className="w-4 h-4" /> FieldScribe Output
          </span>
        </button>
      </div>

      <div className="p-8 min-h-[400px] bg-slate-50">
        {activeTab === "input" ? (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              {/* Real inspection photo — water damage under bathroom sink */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                <div className="relative aspect-video rounded-lg overflow-hidden mb-3">
                  <Image
                    src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=640&h=360&fit=crop&crop=center"
                    alt="Older bathroom sink showing potential water damage and staining"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized
                  />
                  {/* Overlay label */}
                  <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] font-mono px-2 py-1 rounded backdrop-blur-sm">
                    IMG_2024_0847.jpg
                  </div>
                </div>
                <p className="text-xs text-slate-500 text-center">
                  Site photo — master bathroom
                </p>
              </div>
              <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 shadow-sm">
                <div className="flex items-center gap-2 mb-2 text-indigo-700 font-semibold text-sm">
                  <Mic className="w-4 h-4" /> Voice Note
                </div>
                <p className="text-sm text-slate-700 italic">
                  &quot;Uh, check the master bath... looks like there&apos;s some, uh, significant water staining under the sink. Might be a slow leak from the P-trap. Also, no GFCI outlet near the vanity.&quot;
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center text-slate-400 text-sm">
              <p>← This is what you capture on site.</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="prose prose-sm max-w-none bg-white p-8 rounded-xl border border-slate-200 shadow-sm font-mono text-slate-800 text-left"
          >
            <h3 className="text-indigo-900 mt-0">Master Bathroom Inspection</h3>
            <hr className="border-slate-200 my-4" />

            <h4 className="flex items-center gap-2 text-red-600">
              <AlertIcon /> 1. Moisture Intrusion (Plumbing)
            </h4>
            <p>
              <strong>Observation:</strong> Active moisture staining and water damage observed on the cabinet base interior below the sink. Visual evidence suggests a slow leak originating from the P-trap assembly.
            </p>
            <p>
              <strong>Implication:</strong> Potential for microbial growth (mold) and structural deterioration of cabinetry if left unaddressed.
            </p>
            <p>
              <strong>Recommendation:</strong> Qualified Plumber to evaluate and repair drain line; Cabinet Specialist to assess wood integrity.
            </p>

            <h4 className="flex items-center gap-2 text-orange-600 mt-6">
               <AlertIcon /> 2. Electrical Safety Hazard
            </h4>
            <p>
              <strong>Observation:</strong> Vanity receptacle lacks Ground Fault Circuit Interrupter (GFCI) protection.
            </p>
            <p>
              <strong>Recommendation:</strong> Licensed Electrician to install GFCI protection as per current safety standards.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function AlertIcon() {
  return (
    <svg className="w-4 h-4 inline-block" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
    </svg>
  );
}
