"use server";

import { HfInference } from "@huggingface/inference";

// Only models confirmed active on hf-inference provider (as of 2025-2026)
const ASR_MODELS = [
  "openai/whisper-large-v3-turbo", // Fastest + near-identical accuracy to v3
  "openai/whisper-large-v3",       // Highest accuracy fallback
];

export async function transcribeAudio(formData: FormData) {
  const token = process.env.HF_ACCESS_TOKEN;

  if (!token || token === "hf_placeholder") {
    return {
      success: false,
      error: "AI service not configured. Set HF_ACCESS_TOKEN in environment.",
    };
  }

  const file = formData.get("file") as File;
  if (!file) {
    return { success: false, error: "No audio file provided." };
  }

  const arrayBuffer = await file.arrayBuffer();
  // Pass as ArrayBuffer – HfInference accepts ArrayBuffer for ASR
  const audioData = arrayBuffer;

  const hf = new HfInference(token);

  for (const model of ASR_MODELS) {
    try {
      console.log(`[FieldScribe] Transcription → ${model}`);

      const response = await hf.automaticSpeechRecognition({
        model,
        data: audioData,
      });

      const text = response?.text?.trim();

      if (text && text.length > 0) {
        console.log(`[FieldScribe] ✓ Transcription success → ${model}`);
        return { success: true, text };
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.warn(`[FieldScribe] ASR failed (${model}): ${msg}`);
      // Try next model
    }
  }

  return {
    success: false,
    error:
      "Transcription service busy. Please wait 30 seconds and try again, or type notes manually.",
  };
}
