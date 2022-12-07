import type { DefaultUser } from "next-auth";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
  }
}
