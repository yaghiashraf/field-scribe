"use client";

import { useState } from "react";
import Image from "next/image";
import { Upload, Loader2, AlertCircle } from "lucide-react";
import { analyzeImage } from "../actions/analyze-image";

interface ImageResult {
  id: string;
  file: File;
  preview: string;
  analysis: string;
  status: "pending" | "success" | "error";
}

export function PhotoUploader({ onAnalysisComplete }: { onAnalysisComplete: (result: string) => void }) {
  const [images, setImages] = useState<ImageResult[]>([]);
  // Removed unused state: isUploading

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);

    // Process images concurrently

    // 1. Prepare all new images with "pending" status
    const newImages: ImageResult[] = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      preview: URL.createObjectURL(file),
      analysis: "Analyzing...",
      status: "pending"
    }));

    // 2. Add them to state immediately
    setImages(prev => [...prev, ...newImages]);

    // 3. Process each image individually
    await Promise.all(newImages.map(async (img) => {
      const formData = new FormData();
      formData.append("file", img.file);
      
      try {
        const res = await analyzeImage(formData);
        
        if (res.success) {
          const description = res.description || "No description available";
          
          setImages(prev => prev.map(pImg => 
            pImg.id === img.id 
              ? { ...pImg, status: "success", analysis: description } 
              : pImg
          ));
          onAnalysisComplete(description);
        } else {
          setImages(prev => prev.map(pImg => 
            pImg.id === img.id 
              ? { ...pImg, status: "error", analysis: res.error || "Analysis failed" } 
              : pImg
          ));
        }
      } catch {
        setImages(prev => prev.map(pImg => 
          pImg.id === img.id 
            ? { ...pImg, status: "error", analysis: "Network error" } 
            : pImg
        ));
      }
    }));

    e.target.value = ""; // Reset input
  };

  return (
    <div className="space-y-4 border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors relative min-h-[200px] flex flex-col items-center justify-center">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="image-upload"
      />
      
      {images.length === 0 ? (
        <label htmlFor="image-upload" className="cursor-pointer block w-full h-full py-8">
          <Upload className="mx-auto h-12 w-12 text-slate-400 mb-2" />
          <h3 className="text-lg font-medium text-slate-900">Upload Site Photos</h3>
          <p className="text-sm text-slate-500">Drag and drop or click to upload</p>
        </label>
      ) : (
        <div className="w-full">
            <div className="flex justify-end mb-4 w-full">
                <label htmlFor="image-upload" className="cursor-pointer text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center bg-indigo-50 px-3 py-1.5 rounded-full border border-indigo-100 transition-colors">
                <Upload className="w-4 h-4 mr-1.5" /> Add More Photos
                </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {images.map((img) => (
                <div key={img.id} className="relative group aspect-square bg-slate-100 rounded-lg overflow-hidden border border-slate-200 shadow-sm">
                    <Image 
                      src={img.preview} 
                      alt="Upload" 
                      fill
                      className="object-cover w-full h-full" 
                      unoptimized // Blob URLs cannot be optimized by Next.js server
                    />
                    
                    {/* Status Overlay */}
                    <div className={`absolute inset-0 flex flex-col justify-end p-2 transition-all duration-300
                    ${img.status === 'pending' ? 'bg-black/40 backdrop-blur-[1px]' : ''}
                    ${img.status === 'error' ? 'bg-red-900/40 backdrop-blur-[1px]' : 'bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100'}
                    `}>
                    {img.status === 'pending' && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Loader2 className="w-8 h-8 text-white/90 animate-spin" />
                        </div>
                    )}
                    
                    {img.status === 'error' && (
                        <div className="absolute inset-0 flex items-center justify-center flex-col text-white">
                        <AlertCircle className="w-8 h-8 mb-1 text-red-200" />
                        <span className="text-[10px] font-bold bg-red-600/90 px-2 py-0.5 rounded text-white">Failed</span>
                        </div>
                    )}

                    <p className="text-xs text-white truncate w-full font-medium drop-shadow-md">
                        {img.analysis}
                    </p>
                    </div>
                </div>
                ))}
            </div>
        </div>
      )}
    </div>
  );
}
