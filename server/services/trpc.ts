import superjson from 'superjson';
import { httpBatchLink } from '@trpc/client';
import { createTRPCNext } from '@trpc/next';
import type { AppRouter } from '@/server';

const getBaseUrl = () => {
    if (typeof window !== 'undefined')
        // browser should use relative path
        return '';
    if (process.env.VERCEL_URL)
        // reference for vercel.com
        return `${process.env.VERCEL_URL}`;
    // assume localhost
    return `http://localhost:${process.env.PORT ?? 3000}`;
}

export const trpc = createTRPCNext<AppRouter>({
    transformer: superjson,
    config() {
        return {
            links: [
                httpBatchLink({
                    /**
                     * If you want to use SSR, you need to use the server's full URL
                     * @see https://trpc.io/docs/v11/ssr
                    **/
                    transformer: superjson,
                    url: `${getBaseUrl()}/api/trpc`,
                    // You can pass any HTTP headers you wish here
                    async headers() {
                        return {
                            // authorization: getAuthCookie(),
                        };
                    },
                }),
            ],
        };
    },
    /**
     * @see https://trpc.io/docs/v11/ssr
     **/
    ssr: false,
});
