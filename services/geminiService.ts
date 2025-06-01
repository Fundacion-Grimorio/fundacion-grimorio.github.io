
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { GEMINI_SYSTEM_INSTRUCTION } from "../constants";

// API_KEY related code has been removed as per user request.
// This means the AI functionality is effectively disabled.
// The GoogleGenAI instance ('ai') and 'model' are no longer initialized here.

export const askGrimorioAI = async (userQuestion: string): Promise<string> => {
  // Since the API_KEY usage is removed, the AI service cannot be initialized or used
  // as the GoogleGenAI SDK requires an API key.
  // Return a message indicating the service is unavailable.
  console.warn(
    "Gemini AI service call was attempted, but it is unavailable because API key usage has been removed from the client-side configuration. " +
    "The AI assistant will not provide responses from the Gemini API."
  );
  return "El servicio de Asistente AI no está disponible actualmente debido a cambios en la configuración. Por favor, contacta al administrador para más información.";

  // The original code that attempts to use the Gemini API is now unreachable and has been removed
  // as it would cause errors without a valid API key and 'ai' instance.
};
