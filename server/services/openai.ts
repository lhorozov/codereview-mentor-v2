import { generateText } from 'ai';
import { Language } from '@/shared/schemas/submission';

export const getOpenAIFeedback = async ({ code, language }: { code: string, language: Language }): Promise<string> => {
    const { text } = await generateText({
        model: 'openai/gpt-oss-20b',
        system: `Act as a senior frontend engineer. Analyze this ${language} code for frontend issues. Format response as:
                Brief summary(1 sentence)
                Key findings(bulleted list)
                Most critical recommendation Avoid markdown.Be technical but concise.`,
        prompt: code,
    });

    return text;
}