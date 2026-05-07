import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    const prompt = `
You are an autonomous shopping intelligence agent. The user is asking for a product comparison or recommendation.
Analyze the request and provide a structured JSON response with the following fields:
- topPick: The name of the best product recommendation.
- confidence: A number between 0 and 100 representing your confidence in this pick.
- sources: A number representing how many sources you "analyzed" (make up a realistic number between 5 and 20).
- reasoning: A short paragraph explaining why this is the best pick.
- metrics: An array of objects, each with a 'label' (e.g., "Battery Life", "Price", "Performance") and a 'value' (e.g., "18 hours", "$999", "9/10"). Include 3-4 metrics.

User Query: "${query}"

Return ONLY valid JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    const result = JSON.parse(text);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
  }
}
