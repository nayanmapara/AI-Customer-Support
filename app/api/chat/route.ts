import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
 
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const generationConfig = {
    stopSequences: ["red"],
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain", 
  };
 
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig});

export async function POST(request: NextRequest) {
 const {messages} = await request.json();
 const prompt = messages[messages.length - 1].content;
 const result = await model.generateContent(prompt);

 return NextResponse.json(result.response.text() , { status: 200 });
}