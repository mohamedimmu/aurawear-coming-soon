import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const envClient = createEnv({
  server: {
    SITE_ID: z.string().min(1),
    API_KEY: z.string().min(1),
    ACCOUNT_ID: z.string().min(1),
    MEASUREMENT_ID: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_CLIENT_ID: z.string().min(1),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_CLIENT_ID: process.env.NEXT_PUBLIC_CLIENT_ID,
  },
});
