"use client";

import { useState, useRef, useEffect } from "react";
import { Mic, Square, Loader2, AlertCircle, Plus, X } from "lucide-react";
import { transcribeAudio } from "../actions/transcribe-audio";

interface Props {
  onTranscriptionComplete: (text: string) => void;
}

export function VoiceRecorder({ onTranscriptionComplete }: Props) {
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [manualText, setManualText] = useState("");
  const [showManual, setShowManual] = useState(false);

  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopStream = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      stopStream();
    };
  }, []);

  const startRecording = async () => {
    setErrorMessage(null);
    setElapsed(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Prefer webm/opus, fallback to browser default
      const mimeType = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/webm")
        ? "audio/webm"
        : "";

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorder.current = recorder;
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = async () => {
        stopStream();
        if (timerRef.current) clearInterval(timerRef.current);

        if (chunks.length === 0) {
          setIsProcessing(false);
          setErrorMessage("No audio captured. Please try again.");
          return;
        }

        setIsProcessing(true);
        const finalMime = mimeType || "audio/webm";
        const blob = new Blob(chunks, { type: finalMime });

        // Warn if file is over 20MB (HF limit is ~25MB)
        if (blob.size > 20 * 1024 * 1024) {
          setIsProcessing(false);
          setErrorMessage("Recording is too long. Please keep recordings under 5 minutes.");
          return;
        }

        const file = new File([blob], "recording.webm", { type: finalMime });
        const formData = new FormData();
        formData.append("file", file);

        const res = await transcribeAudio(formData);

        if (res.success && res.text) {
          onTranscriptionComplete(res.text);
        } else {
          setErrorMessage(res.error || "Transcription failed. Try the manual entry below.");
          setShowManual(true);
        }
        setIsProcessing(false);
      };

      // Collect data every 250ms for reliability
      recorder.start(250);
      setIsRecording(true);

      // Start timer
      timerRef.current = setInterval(() => {
        setElapsed((s) => s + 1);
      }, 1000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("Permission") || msg.includes("denied") || msg.includes("NotAllowed")) {
        setErrorMessage("Microphone access denied. Please allow microphone access in your browser.");
      } else if (msg.includes("NotFound")) {
        setErrorMessage("No microphone found. Connect a microphone or use manual entry.");
        setShowManual(true);
      } else {
        setErrorMessage("Could not start recording: " + msg);
      }
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorder.current?.stop();
  };

  const handleManualAdd = () => {
    const text = manualText.trim();
    if (!text) return;
    onTranscriptionComplete(text);
    setManualText("");
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  return (
    <div className="space-y-3">
      {/* Main recorder bar */}
      <div className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          disabled={isProcessing}
          className={`p-3 rounded-full transition-all shrink-0 ${
            isProcessing
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : isRecording
              ? "bg-red-100 text-red-600 hover:bg-red-200 animate-pulse ring-2 ring-red-300"
              : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200 hover:scale-105"
          }`}
          title={isRecording ? "Stop recording" : "Start recording"}
        >
          {isRecording ? (
            <Square className="h-5 w-5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          {isProcessing ? (
            <div className="flex items-center gap-2 text-sm text-indigo-600">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              <span>Transcribing with AI Whisper…</span>
            </div>
          ) : isRecording ? (
            <div>
              <p className="text-sm font-semibold text-red-600 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                Recording — {formatTime(elapsed)}
              </p>
              <p className="text-xs text-slate-500">
                Describe what you see. Tap stop when finished.
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium text-slate-800">Voice Notes</p>
              <p className="text-xs text-slate-500">
                Tap the mic, walk the site, and speak observations.
              </p>
            </div>
          )}
        </div>

        {/* Manual note toggle */}
        {!isRecording && !isProcessing && (
          <button
            onClick={() => setShowManual((v) => !v)}
            className="text-xs text-slate-400 hover:text-indigo-600 flex items-center gap-1 transition-colors shrink-0"
            title="Type a note instead"
          >
            {showManual ? (
              <X className="w-3.5 h-3.5" />
            ) : (
              <Plus className="w-3.5 h-3.5" />
            )}
            {showManual ? "Close" : "Type note"}
          </button>
        )}
      </div>

      {/* Error */}
      {errorMessage && (
        <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-100 rounded-lg text-sm text-red-700">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Manual text entry */}
      {showManual && (
        <div className="flex gap-2">
          <textarea
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleManualAdd();
              }
            }}
            placeholder="Type your observation note here… (Enter to add)"
            rows={2}
            className="flex-1 text-sm border border-slate-200 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 text-slate-800 placeholder:text-slate-400"
          />
          <button
            onClick={handleManualAdd}
            disabled={!manualText.trim()}
            className="px-3 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors self-end"
          >
            Add
          </button>
        </div>
      )}
    </div>
  );
}
