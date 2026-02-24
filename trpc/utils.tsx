import { TRPCClientError } from "@trpc/client";

export function errorHandler(error: unknown): string {
  if (error instanceof TRPCClientError) {
    const zodErrors = error.data?.zodError?.fieldErrors;
    if (zodErrors) {
      const firstMessage = Object.values(zodErrors)
        .flat()
        .filter(Boolean)[0];

        console.log(firstMessage);
    }

    if (error.shape?.message) {
      try {
        const parsed = JSON.parse(error.shape.message);
        if (Array.isArray(parsed) && parsed[0]?.message) {
          return parsed[0].message;
        }
      } catch {
        return error.shape.message;
      }
    }

    return error.message;
  }

  if (error instanceof Error) return error.message;

  return 'Something went wrong!';
}