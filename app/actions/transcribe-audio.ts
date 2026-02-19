"use server";

// Whisper via the new HF router endpoint (api-inference.huggingface.co returns 410)
// Confirmed working: https://router.huggingface.co/hf-inference/models/{model}
const ASR_MODELS = [
  "openai/whisper-large-v3-turbo",
  "openai/whisper-large-v3",
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
  if (!file) return { success: false, error: "No audio file provided." };

  const audioBuffer = await file.arrayBuffer();

  for (const model of ASR_MODELS) {
    try {
      console.log(`[FieldScribe] Transcription → ${model}`);

      // Use the new HF router endpoint — the legacy api-inference endpoint returns 410
      const res = await fetch(
        `https://router.huggingface.co/hf-inference/models/${model}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": file.type || "audio/webm",
          },
          body: audioBuffer,
        }
      );

      if (!res.ok) {
        const errBody = await res.text();
        console.warn(`[FieldScribe] ASR ${model} HTTP ${res.status}: ${errBody.slice(0, 120)}`);
        continue;
      }

      const data = (await res.json()) as { text?: string };
      const text = data.text?.trim();

      if (text && text.length > 0) {
        console.log(`[FieldScribe] ✓ Transcription success → ${model}`);
        return { success: true, text };
      }
    } catch (err) {
      console.warn(`[FieldScribe] ASR failed (${model}):`, err instanceof Error ? err.message : err);
    }
  }

  return {
    success: false,
    error: "Transcription service busy. Please wait 30 seconds and try again, or type notes manually.",
  };
}
