import "dotenv/config";
import { Request, Response } from "express";
import { openai } from "@ai-sdk/openai";
import { StreamData, streamText } from "ai";

const summarizeEmail = async (req: Request, res: Response) => {
  const { email } = req.body;

  try {
    const result = await streamText({
        model: openai("gpt-4o"),
        system: "You are a helpful assistant that summarizes emails.",
        prompt: `Summarize the following email: ${email}`,
      });
    
      result.pipeDataStreamToResponse(res);
  } catch (error) {
    res.status(400).json(`Error: \n ${error}`); 
  }
};

export { summarizeEmail }