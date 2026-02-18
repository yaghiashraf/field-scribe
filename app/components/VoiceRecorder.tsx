"use client";

import { useState, useRef } from "react";
import { Mic, Square, Loader2 } from "lucide-react";
import { transcribeAudio } from "../actions/transcribe-audio";

export function VoiceRecorder({ onTranscriptionComplete }: { onTranscriptionComplete: (text: string) => void }) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  const startRecording = async () => {
    setErrorMessage(null); // Clear previous errors
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorder.current = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.current.onstop = async () => {
        setIsProcessing(true);
        const blob = new Blob(chunks, { type: "audio/webm" });
        const file = new File([blob], "recording.webm", { type: "audio/webm" });
        const formData = new FormData();
        formData.append("file", file);

        const res = await transcribeAudio(formData);
        if (res.success) {
          onTranscriptionComplete(res.text || "No transcription available");
        } else {
          setErrorMessage(res.error || "Transcription failed");
        }
        setIsProcessing(false);
      };

      mediaRecorder.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Microphone access denied:", err);
      setErrorMessage("Microphone access denied. Please allow permissions.");
    }
  };

  const stopRecording = () => {
    mediaRecorder.current?.stop();
    setIsRecording(false);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white border border-slate-200 rounded-lg shadow-sm">
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className={`p-3 rounded-full transition-colors ${
          isRecording ? "bg-red-100 text-red-600 animate-pulse" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
        }`}
      >
        {isRecording ? <Square className="h-6 w-6" /> : <Mic className="h-6 w-6" />}
      </button>
      
      <div className="flex-1">
        <h3 className="font-medium text-slate-900">Voice Notes</h3>
        {isProcessing ? (
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span>Transcribing audio...</span>
          </div>
        ) : (
          <div>
            <p className="text-sm text-slate-500">
              {isRecording ? "Recording... Describe the room and defects." : "Click microphone to start recording observations."}
            </p>
            {errorMessage && (
              <p className="text-xs text-red-500 mt-1">{errorMessage}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
