import { createAuthClient } from "better-auth/client";
import { inferAdditionalFields } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.DEV 
      ? "http://localhost:3001" 
      : import.meta.env.VITE_BACKEND_URL,
  fetchOptions: {
      credentials: "include",
  },
  plugins: [
      inferAdditionalFields({
          user: {
              role: { type: "string" },
          },
      }),
  ],
});

export const { signIn, signUp, signOut, getSession } = authClient;