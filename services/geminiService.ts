
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from "../constants";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY for Gemini is not set in environment variables.");
  // In a real app, you might want to disable AI features or show a persistent error.
  // For this example, we'll let it try and fail if the key is missing at runtime.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Use non-null assertion as we handle the check above

const model = 'gemini-2.5-flash-preview-04-17';

export const askGrimorioAI = async (userQuestion: string): Promise<string> => {
  if (!API_KEY) {
    return "Error: La clave API para el servicio de IA no está configurada. Por favor, contacta al administrador.";
  }

  try {
    const fullPrompt = {
      contents: [{role: "user", parts: [{text: userQuestion}]}],
      systemInstruction: { parts: [{text: GEMINI_SYSTEM_INSTRUCTION}]}
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      ...fullPrompt,
      config: {
        // Default thinkingConfig for higher quality
        // For low latency if needed: thinkingConfig: { thinkingBudget: 0 }
        temperature: 0.5, // Slightly more deterministic for factual Q&A
        topP: 0.9,
        topK: 40,
      }
    });
    
    const text = response.text;
    if (text) {
      return text;
    } else {
      // This case should ideally be handled by Gemini's response structure,
      // but as a fallback:
      return "No se pudo obtener una respuesta del asistente. Inténtalo de nuevo.";
    }

  } catch (error: any) {
    console.error("Error calling Gemini API:", error);
    let errorMessage = "Ocurrió un error al contactar al asistente de IA. ";
    if (error.message) {
      errorMessage += error.message;
    }
    // Check for specific API error types if available from the SDK, e.g., auth errors.
    if (error.toString().includes("API key not valid")) {
        errorMessage = "Error de autenticación con el servicio de IA. Verifica la configuración.";
    }
    return errorMessage;
  }
};