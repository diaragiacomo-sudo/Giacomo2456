import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Gemini API setup
  const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // API route for chatbot
  app.post("/api/chat", async (req: express.Request, res: express.Response) => {
    try {
      const { message, history } = req.body;
      
      const chat = ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          ...history.map((h: any) => ({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.content }]
          })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction: `Sei l'assistente AI del portfolio di Giacomo Diara. 
          Giacomo è un Social Media Manager Junior. 
          Informazioni su Giacomo:
          - Lavoro come Social Media Manager Junior.
          - Gestisce profili social e canali YouTube (creazione contenuti, pubblicazione, organizzazione).
          - Stile di lavoro: Segue i progetti passo dopo passo, stile riconoscibile e naturale.
          - AI: Utilizza strumenti di intelligenza artificiale per idee, immagini, testi e format.
          - Esperienza: Calcio, intrattenimento, social network, progetti digitali creativi.
          - Competenze: Facebook, Instagram, YouTube, comunicazione visiva, copertine grafiche, post, video brevi.
          - Obiettivo: Trasformare idee semplici in contenuti coinvolgenti.
          Sii professionale, cordiale e conciso. Rispondi in italiano.`,
        }
      });

      const response = await chat;
      res.json({ content: response.text });
    } catch (error) {
      console.error("Error in Gemini API:", error);
      res.status(500).json({ error: "Failed to generate response" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
