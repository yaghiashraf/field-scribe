"use server";

import { HfInference } from "@huggingface/inference";

// Vision models confirmed working on HF router (Feb 2026)
const VISION_MODELS = [
  "Qwen/Qwen2.5-VL-7B-Instruct",   // Fast, confirmed working
  "Qwen/Qwen2.5-VL-72B-Instruct",  // Higher quality fallback
];

const INSPECTION_PROMPT = `You are a professional field inspector writing an inspection report. Analyze this site photo and provide a concise professional observation.

Identify and describe:
• Primary subject and location within the structure
• Any visible defects, damage, or deterioration (cracks, corrosion, water staining, mold, missing components, excessive wear)
• Materials and construction elements visible
• Overall condition rating: Good / Fair / Poor / Critical

Write 2–4 sentences using objective inspection language ("Observed", "Noted", "Visible"). Be specific. Do not speculate beyond what is visible.`;

export async function analyzeImage(formData: FormData) {
  const token = process.env.HF_ACCESS_TOKEN;

  if (!token || token === "hf_placeholder") {
    return {
      success: false,
      error: "AI service not configured. Set HF_ACCESS_TOKEN in environment.",
    };
  }

  const file = formData.get("file") as File;
  if (!file) return { success: false, error: "No file provided." };
  if (!file.type.startsWith("image/")) return { success: false, error: "File must be an image." };

  const arrayBuffer = await file.arrayBuffer();
  const base64Image = `data:${file.type || "image/jpeg"};base64,${Buffer.from(arrayBuffer).toString("base64")}`;

  const hf = new HfInference(token);

  for (const model of VISION_MODELS) {
    try {
      console.log(`[FieldScribe] Vision analysis → ${model}`);

      const response = await hf.chatCompletion({
        model,
        messages: [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: { url: base64Image } },
              { type: "text", text: INSPECTION_PROMPT },
            ],
          },
        ],
        max_tokens: 600,
        temperature: 0.2,
      });

      const raw = response.choices?.[0]?.message?.content;
      const description = typeof raw === "string" ? raw.trim() : null;

      if (description && description.length > 15) {
        console.log(`[FieldScribe] ✓ Vision success → ${model}`);
        return { success: true, description };
      }
    } catch (err) {
      console.warn(`[FieldScribe] Vision failed (${model}):`, err instanceof Error ? err.message : err);
    }
  }

  return {
    success: false,
    error: "Image analysis unavailable. Enter observations manually.",
  };
}
