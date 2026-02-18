"use server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

// List of models to try in order of preference/quality
const ASR_MODELS = [
  "openai/whisper-large-v3",
  "openai/whisper-large-v3-turbo",
  "openai/whisper-medium",
  "openai/whisper-tiny.en" // Ultimate fallback, very fast and widely available
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
      ? `All models failed. Last error: ${lastError.message}` 
      : "Failed to transcribe audio with all available models.",
  };
}
