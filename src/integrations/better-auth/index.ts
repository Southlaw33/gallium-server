import { betterAuth } from "better-auth";
import {
  serverUrl,
  webClientUrl,
  betterAuthSecret,
} from "../../utils/environment";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaClient } from "../prisma";

export const betterAuthServerClient = betterAuth({
  baseURL: serverUrl,
  trustedOrigins: [webClientUrl],
  secret: betterAuthSecret,
  database: prismaAdapter(prismaClient, {
    provider: "postgresql",
  }),
  user: {
    modelName: "User",
  },
  session: {
    modelName: "Session",
  },
  account: {
    modelName: "Account",
  },
  verification: {
    modelName: "Verification",
  },
});

export default betterAuthServerClient;
