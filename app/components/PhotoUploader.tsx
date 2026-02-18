"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, Loader2, AlertCircle, CheckCircle2, X } from "lucide-react";
import { analyzeImage } from "../actions/analyze-image";

interface ImageResult {
  id: string;
  file: File;
  preview: string;
  analysis: string;
  status: "pending" | "success" | "error";
}

interface Props {
  onAnalysisComplete: (description: string, filename: string) => void;
}

export function PhotoUploader({ onAnalysisComplete }: Props) {
  const [images, setImages] = useState<ImageResult[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFiles = async (files: File[]) => {
    const validFiles = files.filter(
      (f) => f.type.startsWith("image/") && f.size < 20 * 1024 * 1024
    );

    if (validFiles.length === 0) return;

    const newImages: ImageResult[] = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      analysis: "Analyzing…",
      status: "pending",
    }));

    setImages((prev) => [...prev, ...newImages]);

    await Promise.all(
      newImages.map(async (img) => {
        const formData = new FormData();
        formData.append("file", img.file);

        try {
          const res = await analyzeImage(formData);

          if (res.success && res.description) {
            setImages((prev) =>
              prev.map((p) =>
                p.id === img.id
                  ? { ...p, status: "success", analysis: res.description! }
                  : p
              )
            );
            onAnalysisComplete(res.description, img.file.name);
          } else {
            const errMsg = res.error || "Analysis failed";
            setImages((prev) =>
              prev.map((p) =>
                p.id === img.id ? { ...p, status: "error", analysis: errMsg } : p
              )
            );
          }
        } catch {
          setImages((prev) =>
            prev.map((p) =>
              p.id === img.id
                ? { ...p, status: "error", analysis: "Network error. Add observation manually." }
                : p
            )
          );
        }
      })
    );

    if (inputRef.current) inputRef.current.value = "";
  };

  const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await processFiles(Array.from(e.target.files));
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    await processFiles(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeImage = (id: string) => {
    setImages((prev) => {
      const img = prev.find((i) => i.id === id);
      if (img) URL.revokeObjectURL(img.preview);
      return prev.filter((i) => i.id !== id);
    });
  };

  const pendingCount = images.filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-4">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileInput}
        className="hidden"
        id="image-upload"
      />

      {/* Drop Zone */}
      <label
        htmlFor="image-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`block cursor-pointer border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
          isDragging
            ? "border-indigo-400 bg-indigo-50"
            : "border-slate-200 hover:border-indigo-300 hover:bg-slate-50/50"
        }`}
      >
        <Upload
          className={`mx-auto h-10 w-10 mb-3 transition-colors ${
            isDragging ? "text-indigo-500" : "text-slate-300"
          }`}
        />
        <p className="text-sm font-medium text-slate-700">
          {isDragging ? "Drop photos here" : "Drop photos or click to upload"}
        </p>
        <p className="text-xs text-slate-400 mt-1">
          JPEG, PNG, HEIC · Up to 20 MB each
        </p>
        {pendingCount > 0 && (
          <div className="mt-3 flex items-center justify-center gap-2 text-xs text-indigo-600">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            Analyzing {pendingCount} photo{pendingCount > 1 ? "s" : ""}…
          </div>
        )}
      </label>

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img) => (
            <div
              key={img.id}
              className="relative group rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 aspect-square"
            >
              <Image
                src={img.preview}
                alt={img.file.name}
                fill
                className="object-cover"
                unoptimized
              />

              {/* Status overlay */}
              <div className="absolute inset-0">
                {img.status === "pending" && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}

                {img.status === "error" && (
                  <div className="absolute bottom-0 inset-x-0 bg-red-600/90 px-2 py-1.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 text-white shrink-0" />
                    <p className="text-white text-[10px] truncate">
                      {img.analysis}
                    </p>
                  </div>
                )}

                {img.status === "success" && (
                  <>
                    <div className="absolute top-1.5 right-1.5">
                      <CheckCircle2 className="w-4 h-4 text-green-400 drop-shadow" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
                      <p className="text-white text-[10px] leading-tight line-clamp-4">
                        {img.analysis}
                      </p>
                    </div>
                  </>
                )}
              </div>

              {/* Remove button */}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  removeImage(img.id);
                }}
                className="absolute top-1.5 left-1.5 bg-black/60 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
