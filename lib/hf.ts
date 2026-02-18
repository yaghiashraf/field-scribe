import { HfInference } from "@huggingface/inference";

// Initialize Hugging Face client
// Using server-side only env var for security, with fallback for build time
export const hf = new HfInference(process.env.HF_ACCESS_TOKEN || "hf_placeholder");

export const MODELS = {
  VISION: "Qwen/Qwen2.5-VL-7B-Instruct",
  AUDIO: "openai/whisper-large-v3-turbo", 
  TEXT: "mistralai/Mistral-7B-Instruct-v0.3",
};
