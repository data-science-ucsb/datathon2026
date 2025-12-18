
import { GoogleGenAI } from "@google/genai";
import { ChatMessage } from "../types";
import { SYSTEM_INSTRUCTION } from "../data";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async askQuestion(history: ChatMessage[]): Promise<string> {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: history.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }]
        })),
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      return response.text || "I'm sorry, I couldn't process that. Please try again.";
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "The AI assistant is currently recharging. Please try again later or check our FAQ below!";
    }
  }
}

export const geminiService = new GeminiService();
