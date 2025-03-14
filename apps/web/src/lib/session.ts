import { SignJWT } from "jose";
import { cookies } from "next/headers";

export type SessionUser = {
  id?: string;
  name?: string;
  email?: string;
};
export type Session = {
  user: SessionUser;
  accessToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
// encode secret key into Uint8Array format
const encodedKey = new TextEncoder().encode(secretKey);

export const createSession = async (payload: Session) => {
  const session = await new SignJWT(payload)
    .setProtectedHeader({
      alg: "HS256",
    })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);

  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  (await cookies()).set("session", session, {
    expires: expiredAt,
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
  });
};
