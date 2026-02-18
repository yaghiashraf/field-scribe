"use server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export async function analyzeImage(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const base64Image = `data:${file.type};base64,${buffer.toString("base64")}`;

  try {
    // Using Qwen2.5-VL-7B-Instruct via Chat Completion API
    const response = await hf.chatCompletion({
      model: "Qwen/Qwen2.5-VL-7B-Instruct",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image for a home inspection report. Identify any visible defects, safety hazards, or maintenance issues. Be specific about materials and condition. Keep it concise.",
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
      max_tokens: 300,
    });

    return { success: true, description: response.choices[0].message.content };
  } catch (error) {
    console.error("Vision AI Error:", error);
    return {
      success: false,
      error: "Failed to analyze image. Please try again.",
    };
  }
}
