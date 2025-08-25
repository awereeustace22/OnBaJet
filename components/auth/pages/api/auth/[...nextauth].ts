import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";

function appleProviderIfReady() {
  const { APPLE_CLIENT_ID, APPLE_TEAM_ID, APPLE_KEY_ID, APPLE_PRIVATE_KEY } = process.env;
  if (!APPLE_CLIENT_ID || !APPLE_TEAM_ID || !APPLE_KEY_ID || !APPLE_PRIVATE_KEY) return null;

  return AppleProvider({
    clientId: APPLE_CLIENT_ID,
    // NextAuth can accept a clientSecret object; it generates the JWT under the hood.
    clientSecret: {
      teamId: APPLE_TEAM_ID,
      privateKey: APPLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      keyId: APPLE_KEY_ID,
    } as any,
  });
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    // Only add Apple if env vars are present
    ...(appleProviderIfReady() ? [appleProviderIfReady()!] : []),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.provider = account.provider;
        token.name = token.name ?? (profile as any).name;
        token.email = token.email ?? (profile as any).email;
      }
      return token;
    },
    async session({ session, token }) {
      (session as any).provider = (token as any).provider;
      return session;
    },
  },
  pages: {
    signIn: "/", // send users to your homepage for auth
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
