import { streamText } from 'ai';

export async function POST(req: Request) {
  try {
    const { prompt, language }: { prompt: string, language: string } = await req.json();

    if (!prompt) {
      return new Response('Please fill the text area', { status: 400 });
    }

    const result = streamText({
      model: 'openai/gpt-oss-20b',
      system: `Act as a senior frontend engineer. Analyze this ${language} code for frontend issues. Format response as:
                Brief summary(1 sentence)
                Key findings(bulleted list)
                Most critical recommendation Avoid markdown.Be technical but concise.`,
      prompt,
    });

    return result.toUIMessageStreamResponse();
  } catch (err) {
    return new Response(err instanceof Error ? err.message : 'Server error', {
      status: 500
    })
  }
}

