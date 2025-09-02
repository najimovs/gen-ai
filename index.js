import "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import express from "express";
import cors from "cors";

const server = express();
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

server.use(cors());
server.use(express.json());

server.get("/", (req, res) => res.send("Please use POST /prompt"));

server.post("/prompt", async (req, res) => {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: req.body.prompt,
    });

    res.send(result.response.text());
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating content");
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});
