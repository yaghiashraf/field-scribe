"use client";

import { useState } from "react";
import { Loader2, FileText, Download, Wand2 } from "lucide-react";
import { generateReport } from "../actions/generate-report";

interface ReportGeneratorProps {
  notes: string[];
  imageAnalyses: string[];
}

export function ReportGenerator({ notes, imageAnalyses }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<string>("");

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Use explicit newline character to avoid parsing issues
    const combinedNotes = notes.join("\n");
    const res = await generateReport(combinedNotes, imageAnalyses);
    if (res.success) {
      setReport(res.report || "No report generated.");
    }
    setIsGenerating(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
          <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm mr-3">3</span>
          Report Preview
        </h2>
        <button
          onClick={handleGenerate}
          disabled={isGenerating || (notes.length === 0 && imageAnalyses.length === 0)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? <Loader2 className="animate-spin h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
          <span>Generate Report</span>
        </button>
      </div>

      {report ? (
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm min-h-[400px]">
          <div className="prose prose-slate max-w-none whitespace-pre-wrap font-mono text-sm">
            {report}
          </div>
          <div className="mt-4 flex justify-end">
             <button className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
             </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center text-slate-400">
          <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
          <p>Upload photos and record notes to generate your report.</p>
        </div>
      )}
    </div>
  );
}
