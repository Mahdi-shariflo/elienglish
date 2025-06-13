import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }),
  ],
  callbacks: {
    // @ts-expect-error error
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token; // اضافه شد
      }
      return token;
    },
    // @ts-expect-error error
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.idToken = token.idToken; // اضافه شد
      return session;
    },
  },
  // Optional: Configure JWT to store the access token
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
