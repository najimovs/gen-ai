import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";

const server = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
  model: "gemini-1.5-flash",
});

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

server.use(express.json());

server.get("/", (req, res) => res.send("Please use POST /prompt"));

server.post("/prompt", async (req, res) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: req.body.prompt }],
        },
      ],
    });

    // Default javob
    let aiResponse = "❌ Javob topilmadi (API bo‘sh qaytardi)";

    if (
      result &&
      result.candidates &&
      result.candidates.length > 0 &&
      result.candidates[0].content &&
      result.candidates[0].content.parts &&
      result.candidates[0].content.parts.length > 0
    ) {
      aiResponse = result.candidates[0].content.parts[0].text;
    }

    res.send(aiResponse);
  } catch (error) {
    console.error("Gemini API error:", error);
    res.status(500).send("❌ Server xatolik berdi: " + error.message);
  }
});


const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.info(`✅ Server running on http://localhost:${PORT}`);
});
