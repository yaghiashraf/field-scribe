"use client";

import { useState } from "react";
import { Upload, X, Loader2, FileText } from "lucide-react";
import { analyzeImage } from "../actions/analyze-image";

interface ImageResult {
  file: File;
  preview: string;
  analysis: string;
}

export function PhotoUploader({ onAnalysisComplete }: { onAnalysisComplete: (result: string) => void }) {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);

    setIsAnalyzing(true);
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      
      const preview = URL.createObjectURL(file);
      const res = await analyzeImage(formData);
      
      if (res.success) {
        setImages(prev => [...prev, { file, preview, analysis: res.description }]);
        onAnalysisComplete(res.description);
      }
    }
    setIsAnalyzing(false);
  };

  return (
    <div className="space-y-4 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="image-upload"
      />
      <label htmlFor="image-upload" className="cursor-pointer block">
        <Upload className="mx-auto h-12 w-12 text-slate-400 mb-2" />
        <h3 className="text-lg font-medium text-slate-900">Upload Site Photos</h3>
        <p className="text-sm text-slate-500">Drag and drop or click to upload</p>
      </label>

      {isAnalyzing && (
        <div className="flex items-center justify-center space-x-2 text-blue-600">
          <Loader2 className="animate-spin h-4 w-4" />
          <span className="text-sm">Analyzing images with AI Vision...</span>
        </div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {images.map((img, i) => (
          <div key={i} className="relative group aspect-square bg-slate-100 rounded-md overflow-hidden">
            <img src={img.preview} alt="Upload" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <p className="text-xs text-white truncate w-full">{img.analysis}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
