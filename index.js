import "dotenv/config"
import { GoogleGenAI } from "@google/genai"
import express from "express"

// added fisrt line commit to backend side

const ai = new GoogleGenAI( {} )
const server = express()
server.use( express.json() )

server.get( "/", ( req, res ) => res.send( "Please use POST /prompt" ) )

server.post( "/prompt", async ( req, res ) => {

	const response = await ai.models.generateContent( {
		model: "gemini-2.5-flash",
		contents: req.body.prompt,
	} )

	res.send( response.text )
} )

server.listen( 3_000, () => {

	console.info( 3_000 )
} )
