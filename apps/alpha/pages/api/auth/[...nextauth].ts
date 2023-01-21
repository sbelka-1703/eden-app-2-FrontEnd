// eslint-disable-next-line camelcase
import jwt_decode from "jwt-decode";
import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";

type decodedType = {
  exp: number;
  iat: number;
  _id: string;
  discordName: string;
  accessLevel: number;
};

type edenTokenType = {
  edenToken: string;
  error: string;
};

async function getEdenToken(accessToken: string) {
  const NEXT_PUBLIC_AUTH_URL = process.env.NEXT_PUBLIC_AUTH_URL;
  const res = await fetch(`${NEXT_PUBLIC_AUTH_URL}/auth/token`, {
    method: "POST",
    body: JSON.stringify({ accessToken }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  // console.log("FETCH TOKEN API DATA", data);

  return data;
}

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
      authorization: { params: { scope: "identify guilds" } },
    }),
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid as string;
      }
      session.error = token.error as string;
      if (token.edenToken) {
        const edenToken = token.edenToken as edenTokenType;
        let decoded: decodedType;

        if (edenToken.error) {
          session.error = edenToken.error;
          session.accessLevel = null;
        }

        if (edenToken.edenToken) {
          decoded = jwt_decode<decodedType>(edenToken.edenToken);
          session.accessLevel = decoded.accessLevel;
        }
      }

      return session;
    },
    jwt: async ({ user, token, account }) => {
      // Initial sign in
      if (account && user) {
        return {
          uid: user.id,
          accessToken: account.access_token as string,
          accessTokenExpires:
            account.expires_at && ((account.expires_at * 1000) as number),
          edenToken: await getEdenToken(account.access_token as string),
        };
      }
      const accessTokenExpires = token.accessTokenExpires as number;

      // Discord and Eden tokens expire after 7 days, this will help force the user to re-authenticate within the getServerSideProps
      if (accessTokenExpires && Date.now() < accessTokenExpires) {
        return {
          ...token,
          error: null,
        };
      } else {
        return {
          ...token,
          error: "RefreshAccessTokenError",
        };
      }
    },
  },
  session: {
    strategy: "jwt",
  },
});
