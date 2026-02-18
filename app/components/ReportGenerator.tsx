"use client";

import { useState } from "react";
import { Loader2, FileText, Download, Wand2, FileType } from "lucide-react";
import { generateReport } from "../actions/generate-report";
import { InspectionDetailsData } from "./InspectionDetails";
import { jsPDF } from "jspdf";

interface ReportGeneratorProps {
  notes: string[];
  imageAnalyses: string[];
  details: InspectionDetailsData;
}

export function ReportGenerator({ notes, imageAnalyses, details }: ReportGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<string>("");

  const handleGenerate = async () => {
    // Basic validation
    if (!details.inspectorName || !details.propertyAddress) {
      alert("Please fill in at least the Inspector Name and Property Address.");
      return;
    }

    setIsGenerating(true);
    // Use explicit newline character to avoid parsing issues
    const combinedNotes = notes.join("\n");
    
    const res = await generateReport({
      notes: combinedNotes, 
      imageDescriptions: imageAnalyses,
      details
    });

    if (res.success) {
      setReport(res.report || "No report generated.");
    } else {
      alert("Failed to generate report. Please try again.");
    }
    setIsGenerating(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(20);
    doc.text("Inspection Report", 20, 20);
    
    doc.setFontSize(12);
    doc.text(`Property: ${details.propertyAddress}`, 20, 30);
    doc.text(`Date: ${details.date}`, 20, 36);
    doc.text(`Inspector: ${details.inspectorName}`, 20, 42);
    
    // Content
    // Split text to fit page width
    const splitText = doc.splitTextToSize(report, 170);
    let cursorY = 55;
    
    // Add text line by line, handling page breaks
    splitText.forEach((line: string) => {
      if (cursorY > 280) {
        doc.addPage();
        cursorY = 20;
      }
      doc.text(line, 20, cursorY);
      cursorY += 6;
    });
    
    doc.save(`Inspection-Report-${details.propertyAddress.replace(/\s+/g, '-')}.pdf`);
  };

  const handleDownloadText = () => {
    const element = document.createElement("a");
    const file = new Blob([report], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Inspection-Report-${details.propertyAddress.replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(element); // Required for this to work in FireFox
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        {/* We removed the duplicate header here */}
        <div /> 
        <button
          onClick={handleGenerate}
          disabled={isGenerating || (notes.length === 0 && imageAnalyses.length === 0)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
        >
          {isGenerating ? <Loader2 className="animate-spin h-4 w-4" /> : <Wand2 className="h-4 w-4" />}
          <span>Generate Report</span>
        </button>
      </div>

      {report ? (
        <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm min-h-[400px] flex flex-col">
          <div className="prose prose-slate max-w-none whitespace-pre-wrap font-mono text-sm flex-grow mb-6">
            {report}
          </div>
          <div className="mt-auto pt-4 border-t border-slate-100 flex justify-end space-x-3">
             <button 
               onClick={handleDownloadText}
               className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
             >
                <FileType className="h-4 w-4" />
                <span>Text File</span>
             </button>
             <button 
               onClick={handleDownloadPDF}
               className="flex items-center space-x-2 px-4 py-2 bg-slate-900 text-white rounded-md hover:bg-slate-800 transition-colors shadow-sm"
             >
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
             </button>
          </div>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-200 rounded-lg p-12 text-center text-slate-400 bg-slate-50/50">
          <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
          <p>Fill in details, upload photos, and record notes above to generate your report.</p>
        </div>
      )}
    </div>
  );
}
