"use server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

// Expanded list of models to try
const ASR_MODELS = [
  "openai/whisper-large-v3-turbo",
  "distil-whisper/distil-large-v3", 
  "openai/whisper-small",
  "openai/whisper-tiny.en",
  "facebook/wav2vec2-large-960h-lv60-self" // Non-Whisper fallback
];

export async function transcribeAudio(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No audio file uploaded");
  }

  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: file.type });

  let lastError: unknown;

  for (const model of ASR_MODELS) {
    try {
      console.log(`Attempting transcription with model: ${model}`);
      const response = await hf.automaticSpeechRecognition({
        model: model,
        data: blob,
      });

      if (response && response.text) {
        console.log(`Success with ${model}`);
        return { success: true, text: response.text };
      }
    } catch (error) {
      console.warn(`Model ${model} failed:`, error);
      lastError = error;
      // Continue to next model
    }
  }

  console.error("All transcription models failed.");
  return {
    success: false,
    error: lastError instanceof Error 
      ? `AI Busy: ${lastError.message}` 
      : "Failed to transcribe audio. Please try again.",
  };
}
