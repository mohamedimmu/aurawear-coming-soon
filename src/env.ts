import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SITE_ID: z.string().min(1),
    API_KEY: z.string().min(1),
    ACCOUNT_ID: z.string().min(1),
    MEASUREMENT_ID: z.string().min(1),
    VERCEL_URL: z.string().url(),
  },
  client: {
    NEXT_PUBLIC_CLIENT_ID: z.string().min(1),
  },
  runtimeEnv: {
    SITE_ID: process.env.SITE_ID,
    API_KEY: process.env.API_KEY,
    ACCOUNT_ID: process.env.ACCOUNT_ID,
    MEASUREMENT_ID: process.env.MEASUREMENT_ID,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
  },
});
