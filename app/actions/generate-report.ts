"use server";

import { HfInference } from "@huggingface/inference";

const REPORT_MODELS = [
  "meta-llama/Llama-3.1-8B-Instruct",
  "Qwen/Qwen2.5-72B-Instruct",
  "mistralai/Mistral-7B-Instruct-v0.2",
];

export interface ReportParams {
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
  const token = process.env.HF_ACCESS_TOKEN;

  if (!token || token === "hf_placeholder") {
    return {
      success: false,
      error: "AI service not configured. Set HF_ACCESS_TOKEN in environment.",
    };
  }

  const imageSection =
    imageDescriptions.length > 0
      ? imageDescriptions.map((d, i) => `  Photo ${i + 1}: ${d}`).join("\n")
      : "  No photos uploaded.";

  const notesSection = notes.trim() || "No voice notes recorded.";

  const systemPrompt = `You are a licensed home inspector writing detailed, official inspection reports. Write in professional, objective, third-person language. Use Markdown formatting. Do not include a title or footer. IMPORTANT: Analyze ALL provided data and ensure Findings by System covers EVERY distinct area or component mentioned in the input data. Do not summarize briefly; be comprehensive.`;

  const userPrompt = `Write a professional property inspection report using ONLY the information provided below. Do not invent findings not supported by the data, but expand thoroughly on the data provided.

## INSPECTION INFORMATION
- **Inspector:** ${details.inspectorName || "Not provided"}
- **Company:** ${details.companyName || "Not provided"} | ${details.companyAddress || ""}
- **Client:** ${details.clientName || "Not provided"}
- **Property:** ${details.propertyAddress || "Not provided"}
- **Date:** ${details.date || new Date().toLocaleDateString()}

## RAW FIELD DATA

### Voice Notes (verbatim):
${notesSection}

### Photo Analysis Results:
${imageSection}

---

## REPORT FORMAT REQUIREMENTS

Generate the report with these exact sections:

## Executive Summary
(2-3 sentences summarizing overall condition and key findings)

## Findings by System

For each finding observed in the data, use this structure. Group findings by major systems (e.g. Roofing, Plumbing, Electrical, Interior, etc.). Ensure EVERY defect mentioned in the notes or photos is included here.

**[System/Area Name]**
- **Observation:** Detailed description of what was seen.
- **Condition:** Good / Fair / Poor / Critical
- **Recommendation:** Specific action required (e.g. "Monitor", "Repair", "Replace", "Further Evaluation by Specialist").

## Priority Action Items
(Bulleted list of the most urgent items requiring immediate attention)

## Inspector Notes
(Any additional professional notes or disclaimers)`;

  const hf = new HfInference(token);

  for (const model of REPORT_MODELS) {
    try {
      console.log(`[FieldScribe] Report generation → ${model}`);

      const response = await hf.chatCompletion({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        max_tokens: 3000, // Increased token limit for more detailed reports
        temperature: 0.2,
      });

      const report = response.choices?.[0]?.message?.content;

      if (typeof report === "string" && report.trim().length > 100) {
        console.log(`[FieldScribe] ✓ Report generated → ${model}`);
        return { success: true, report: report.trim() };
      }
    } catch (err) {
      console.warn(`[FieldScribe] Report gen failed (${model}):`, err instanceof Error ? err.message : err);
    }
  }

  return {
    success: false,
    error: "Report generation failed. AI service is busy — please try again in a moment.",
  };
}
