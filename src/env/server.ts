import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// export const envServer = createEnv({
//   server: {
//     SITE_ID: z.string().min(1),
//     API_KEY: z.string().min(1),
//     ACCOUNT_ID: z.string().min(1),
//     MEASUREMENT_ID: z.string().min(1),
//     VERCEL_URL: z.string().optional(),
//   },
//   experimental__runtimeEnv: process.env,
// });

export const envServer = createEnv({
  server: {
    SITE_ID: z.string().min(1),
    API_KEY: z.string().min(1),
    ACCOUNT_ID: z.string().min(1),
    MEASUREMENT_ID: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
});
