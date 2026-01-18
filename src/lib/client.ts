import { treaty } from "@elysiajs/eden";
import type { App } from "../app/api/[[...slugs]]/route";

// .api to enter /api prefix
export const client =
  // process is defined on server side and build time
  typeof process !== "undefined"
    ? treaty<App>(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000")
        .api
    : treaty<App>(
        typeof window !== "undefined"
          ? window.location.origin
          : "http://localhost:3000",
      ).api;
