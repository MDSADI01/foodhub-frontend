import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";


export const env = createEnv({
    server:{
        BACKEND_API:z.url(),
        FRONT_API:z.url(),
        API_URL: z.url(),
        AUTH_URL:z.url()

    },
    client: {
        NEXT_PUBLIC_API_URL: z.string()  
    },

    runtimeEnv:{
        BACKEND_API:process.env.BACKEND_URL,
        FRONT_API:process.env.FRONTEND_URL,
        API_URL: process.env.API_URL,
        AUTH_URL:process.env.AUTH_URL,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    }
})
