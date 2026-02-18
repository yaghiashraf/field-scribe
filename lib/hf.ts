// Hugging Face client configuration
// Each server action creates its own HfInference instance
// to ensure the token is read at request time, not at module load.

export const MODELS = {
  // Image analysis — best open VLMs via HF routing
  VISION_PRIMARY: "meta-llama/Llama-3.2-11B-Vision-Instruct",
  VISION_FALLBACK: "Qwen/Qwen2.5-VL-7B-Instruct",

  // Audio transcription — confirmed active on hf-inference provider
  ASR_PRIMARY: "openai/whisper-large-v3-turbo",
  ASR_FALLBACK: "openai/whisper-large-v3",

  // Report text generation
  TEXT_PRIMARY: "mistralai/Mistral-7B-Instruct-v0.3",
  TEXT_FALLBACK: "meta-llama/Llama-3.2-8B-Instruct",
};
