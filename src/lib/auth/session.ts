import { cookies } from "next/headers";
import { verifyToken } from "./jwt";

const AUTH_COOKIE_NAME = "auth_token";

export async function getCurrentUserId() {
  const cookieStore = await cookies();

  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const payload = await verifyToken(token);

  return payload?.userId ?? null;
}

export function getAuthCookieName() {
  return AUTH_COOKIE_NAME;
}