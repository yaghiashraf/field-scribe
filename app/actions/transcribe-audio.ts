"use server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export async function transcribeAudio(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No audio file uploaded");
  }

  const arrayBuffer = await file.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: file.type });

  try {
    const response = await hf.automaticSpeechRecognition({
      model: "openai/whisper-large-v3-turbo",
      data: blob,
    });

    return { success: true, text: response.text };
  } catch (error) {
    console.error("Transcription Error:", error);
    return {
      success: false,
      error: "Failed to transcribe audio. Please try again.",
    };
  }
}
