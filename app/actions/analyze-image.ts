"use server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export async function analyzeImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const arrayBuffer = await file.arrayBuffer();
  // Convert to native Blob for HF client
  const blob = new Blob([arrayBuffer], { type: file.type });
  // For chatCompletion with base64
  const buffer = Buffer.from(arrayBuffer);
  const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

  // Try high-quality VLM first, then fallback to standard image captioning
  try {
    // 1. Try Qwen2.5-VL (Best for details)
    console.log("Attempting vision analysis with Qwen/Qwen2.5-VL-7B-Instruct");
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-VL-7B-Instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Describe this image for a home inspection. Mention any defects, materials, or conditions visible. Concise.",
            },
            {
              type: "image_url",
              image_url: {
                url: base64Image,
              },
            },
          ],
        },
      ],
      max_tokens: 200,
    });
    return { success: true, description: response.choices[0].message.content };
  } catch (qwenError) {
    console.warn("Qwen vision failed, trying fallback BLIP:", qwenError);
    
    try {
      // 2. Try BLIP (Very reliable, simple caption)
      // Note: hf.imageToText expects 'data' as Blob or ArrayBuffer
      const response = await hf.imageToText({
        model: "Salesforce/blip-image-captioning-large",
        data: blob,
      });
      return { success: true, description: response.generated_text };
    } catch (blipError) {
      console.error("All vision models failed:", blipError);
      return {
        success: false,
        error: "Unable to analyze image. AI services are currently unavailable.",
      };
    }
  }
}
