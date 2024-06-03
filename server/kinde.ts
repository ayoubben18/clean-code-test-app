import {
  createKindeServerClient,
  GrantType,
  type SessionManager,
  type UserType,
} from "@kinde-oss/kinde-typescript-sdk";
import { createMiddleware } from "hono/factory";

import type { Context } from "hono";
import { deleteCookie, getCookie, setCookie } from "hono/cookie";
import { pinoLogger } from "./logger";

export const kindeClient = createKindeServerClient(
  GrantType.AUTHORIZATION_CODE,
  {
    authDomain: process.env.KINDE_DOMAIN!,
    clientId: process.env.KINDE_CLIENT_ID!,
    clientSecret: process.env.KINDE_CLIENT_SECRET!,
    redirectURL: process.env.KINDE_REDIRECT_URI!,
    logoutRedirectURL: process.env.KINDE_LOGOUT_REDIRECT_URI!,
  }
);

let store: Record<string, unknown> = {};

export const sessionManager = (c: Context): SessionManager => ({
  async getSessionItem(key: string) {
    const result = getCookie(c, key);
    return result;
  },
  async setSessionItem(key: string, value: unknown) {
    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSize: "Lax",
    } as const;
    if (typeof value === "string") {
      setCookie(c, key, value, cookieOptions);
    } else {
      setCookie(c, key, JSON.stringify(value), cookieOptions);
    }
  },
  async removeSessionItem(key: string) {
    deleteCookie(c, key);
  },
  async destroySession() {
    ["id_token", "access_token", "user", "refresh_token"].forEach((key) => {
      deleteCookie(c, key);
    });
  },
});

type Env = {
  Variables: {
    user: UserType;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const isAuthenticated = await kindeClient.isAuthenticated(
      sessionManager(c)
    ); // Boolean: true or false
    if (isAuthenticated) {
      pinoLogger.info("User is authenticated");
      const user = await kindeClient.getUser(sessionManager(c));
      c.set("user", user);
      await next();
    } else {
      pinoLogger.error("User is not authenticated");
      return c.text("User is not authenticated", 401);
    }
  } catch (error) {
    pinoLogger.error(error);
    return c.text("User is not authenticated", 401);
  }
});
