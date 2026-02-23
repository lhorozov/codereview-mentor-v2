import { z } from 'zod';
import { prisma } from "@/lib/prisma";
import { TRPCError } from '@trpc/server';
import { LanguageSchema } from '@/shared/schemas/submission';
import { getOpenAIFeedback } from '@/server/services/openai';
import { publicProcedure, router } from '@/server/trps';

export const appRouter = router({
    create: publicProcedure
        .input(
            z.object({
                code: z.string().min(30).max(500),
                language: LanguageSchema,
            }),
        )
        .mutation(async ({ input: { code, language } }) => {
            let feedback: string;
            try {
                feedback = await getOpenAIFeedback({ code, language });
            } catch (error) {
                const message = error instanceof Error ? error.message : 'OpenAI request failed';
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Failed to generate feedback: ${message}`,

                });
            }

            try {
                const submission = await prisma.submission.create({
                    data: {
                        code,
                        language,
                        feedback,
                    },
                });

                return submission;
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Database write failed';
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Failed to save submission: ${message}`,
                });
            }
        }),
    getAll: publicProcedure
        .query(async () => {
            try {
                return await prisma.submission.findMany({ orderBy: { createdAt: 'desc' } });
            } catch (error) {
                const message = error instanceof Error ? error.message : 'Database read failed';
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: `Failed to get submissions: ${message}`,
                });
            }
        }),
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
