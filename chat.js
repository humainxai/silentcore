import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    try {
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: message }],
        model: "gpt-4"
      });
      res.status(200).json({ result: completion.choices[0].message.content });
    } catch (error) {
      res.status(500).json({ error: 'Failed to generate response' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}