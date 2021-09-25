import { NextApiHandler } from "next";
import { withIronSession } from "next-iron-session";

export function withSession(handler: NextApiHandler) {
  return withIronSession(handler, {
    // password: process.env.SECRET_COOKIE_PASSWORD,
    password: "b468b8ff-037f-4bff-b5c2-42624a0ea80d",
    cookieName: "blog",
    cookieOptions: { secure: false },
  });
}
