import "dotenv/config"
import { GoogleGenAI } from "@google/genai"

const ai = new GoogleGenAI( {} )

main()

async function main() {

	const response = await ai.models.generateContent( {
		model: "gemini-2.5-flash",
		contents: "What is your favorite color?",
	} )

	console.log( response.text )
}
