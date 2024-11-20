import "dotenv/config";
import { Request, Response } from "express";
import { openai } from "@ai-sdk/openai";
import { tool, streamText } from "ai";
import z from "zod";

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
    res.status(400).json({ error: `Error: \n ${error}` }); 
  }
};

const composeEmail = async (req: Request, res: Response) => {
  const { prompt } = req.body;

  try {
    const result = await streamText({
        model: openai("gpt-4o"),
        system: "You are a helpful assistant that composes an email for a user based on the prompt.",
        tools: {
          composeEmail: tool({
            description: "Always use this tool when the user asks you to compose an email.",
            parameters: z.object({
              to: z.string().describe("The reveiver of the email. Actual email adress.").optional(),
              subject: z.string().describe("The subject of the email."),
              message: z.string().describe("The content of the email."),
            }),
            execute: async({ to, subject, message }) => ({ to, subject, message }),
          }),
        },
        prompt,
        toolChoice: "required",
        temperature: 0.5,
      });
    
      result.pipeDataStreamToResponse(res);
  } catch (error) {
    res.status(400).json({ error: `Error: \n ${error}` }); 
  }
};

export { summarizeEmail, composeEmail }