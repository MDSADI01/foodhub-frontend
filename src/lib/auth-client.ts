import { createAuthClient } from "better-auth/react"; // make sure to import from better-auth/react

// BetterAuth requires an absolute `baseURL`.
// - On the server: use the backend-provided `AUTH_URL`.
// - On the browser: use same-origin (Next rewrites `/api/auth` to the backend).
const baseURL =
  typeof window !== "undefined"
    ? `${window.location.origin}/api/auth`
    : process.env.AUTH_URL ??
      (process.env.NEXT_PUBLIC_API_URL
        ? `${process.env.NEXT_PUBLIC_API_URL}/auth`
        : undefined);

if (!baseURL) {
  throw new Error(
    "BetterAuth: Missing baseURL. Provide `AUTH_URL` (server) or `NEXT_PUBLIC_API_URL`."
  );
}

export const authClient = createAuthClient({
  //you can pass client configuration here
  // baseURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth`,
  baseURL,
  fetchOptions: { credentials: "include" },

  plugins: [
    {
      id: "next-cookies-request",
      fetchPlugins: [
        {
          id: "next-cookies-request-plugin",
          name: "next-cookies-request-plugin",
          hooks: {
            async onRequest(ctx) {
              if (typeof window === "undefined") {
                const { cookies } = await import("next/headers");
                const headers = await cookies();
                ctx.headers.set("cookie", headers.toString());
              }
            },
          },
        },
      ],
    },
  ],
});

export const signInWithGoogle = async () => {
  const callbackURL =
    typeof window !== "undefined"
      ? `${window.location.origin}/private`
      : process.env.FRONTEND_URL
        ? `${process.env.FRONTEND_URL}/private`
        : undefined;

  if (!callbackURL) {
    throw new Error(
      "BetterAuth: Missing callbackURL for Google sign-in (set FRONTEND_URL or use a client callbackURL)."
    );
  }

  return await authClient.signIn.social({
    provider: "google",
    callbackURL,
  });
};