
import { GoogleGenAI } from "@google/genai";
import { Book } from "./types";

/**
 * Service to handle AI-powered book assistant features.
 * Provides recommendations based on the current book catalog.
 */
export const askAiAssistant = async (message: string, books: Book[]) => {
  // Defensive check for API_KEY
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : undefined;

  if (!apiKey) {
    return "Layanan AI asisten saat ini belum dikonfigurasi. Mohon hubungi administrator.";
  }

  const ai = new GoogleGenAI({ apiKey });

  // Prepare a brief context from the available books
  const catalogContext = books.slice(0, 15).map(b => 
    `- ${b.title} by ${b.author} (${b.category}): ${b.synopsis.substring(0, 150)}...`
  ).join('\n');

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: message,
      config: {
        systemInstruction: `Anda adalah asisten AI cerdas untuk Ganesa Mas, distributor buku eksklusif di Bali. 
Tugas Anda adalah membantu pengunjung menemukan buku yang tepat dari katalog kami.
Berikut adalah beberapa buku di katalog kami:
${catalogContext}

Berikan saran yang personal, ramah, dan profesional dalam bahasa Indonesia. 
Jika pengguna menanyakan hal di luar buku, arahkan mereka kembali ke topik literasi atau hubungi admin.`,
        temperature: 0.7,
      },
    });

    return response.text || "Maaf, saya tidak dapat memberikan jawaban saat ini.";
  } catch (error) {
    console.error("Gemini AI Error:", error);
    return "Maaf, layanan asisten AI sedang mengalami gangguan teknis. Silakan coba lagi nanti.";
  }
};
