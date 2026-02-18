"use server";

import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_ACCESS_TOKEN);

export async function generateReport(notes: string, imageDescriptions: string[]) {
  const prompt = `
You are an expert Home Inspector. Your task is to write a professional, liability-proof inspection report section based on the provided raw notes and image findings.

**Input Data:**
- Inspector's Voice Notes: "${notes}"
- Image Findings: 
${imageDescriptions.map((desc, i) => `  ${i + 1}. ${desc}`).join("
")}

**Instructions:**
1. Organize the findings by room or system (e.g., Electrical, Plumbing, Roof).
2. Use professional, objective language. Avoid "I think" or "It looks like". Use "Observed", "Noted", "Evidence of".
3. For each defect, clearly state:
   - The Observation (What is wrong)
   - The Implication (Why it matters/Potential damage)
   - The Recommendation (Who should fix it, e.g., "Qualified Electrician").
4. Format the output in Markdown.

**Draft Report:**
`;

  try {
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.3, // Low temperature for factual reporting
        return_full_text: false,
      },
    });

    return { success: true, report: response.generated_text };
  } catch (error) {
    console.error("Generation Error:", error);
    return {
      success: false,
      error: "Failed to generate report.",
    };
  }
}
