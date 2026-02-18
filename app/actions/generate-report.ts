"use server";

import { HfInference } from "@huggingface/inference";

// Fallback logic for build time when env vars might be missing
const token = process.env.HF_ACCESS_TOKEN || "hf_placeholder";
const hf = new HfInference(token);

interface ReportParams {
  notes: string;
  imageDescriptions: string[];
  details: {
    inspectorName: string;
    companyName: string;
    companyAddress: string;
    clientName: string;
    propertyAddress: string;
    date: string;
  };
}

export async function generateReport({ notes, imageDescriptions, details }: ReportParams) {
  // Use explicit newline for joining descriptions to avoid build issues
  const formattedDescriptions = imageDescriptions.map((desc, i) => `  ${i + 1}. ${desc}`).join("\n");

  const prompt = `
You are an expert Home Inspector. Write a professional inspection report based on the provided details.

**Inspection Details:**
- Inspector: ${details.inspectorName}
- Company: ${details.companyName} (${details.companyAddress})
- Client: ${details.clientName}
- Property: ${details.propertyAddress}
- Date: ${details.date}

**Input Data:**
- Inspector's Voice Notes: "${notes}"
- Image Findings: 
${formattedDescriptions}

**Instructions:**
1. Start with a header incorporating the Inspection Details.
2. Organize findings by room/system (e.g., Electrical, Plumbing, Exterior).
3. Use professional, objective language ("Observed", "Noted").
4. For each defect, clearly state: Observation, Implication, Recommendation.
5. Format strictly in Markdown. Do not include conversational filler like "Here is the report".

**Report:**
`;

  try {
    const response = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.3",
      inputs: prompt,
      parameters: {
        max_new_tokens: 1500,
        temperature: 0.3,
        return_full_text: false,
      },
    });

    return { success: true, report: response.generated_text };
  } catch (error) {
    console.error("Generation Error:", error);
    return {
      success: false,
      error: "Failed to generate report. Please try again.",
    };
  }
}
