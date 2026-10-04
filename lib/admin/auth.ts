import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "vento_admin_session";
const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 14;

function sessionSecret(): string | null {
  return process.env.VENTO_ADMIN_SESSION_SECRET || process.env.VENTO_ADMIN_PASSWORD || null;
}

function sign(payload: string): string {
  return createHmac("sha256", sessionSecret() as string).update(payload).digest("base64url");
}

export function isAdminConfigured(): boolean {
  return Boolean(process.env.VENTO_ADMIN_PASSWORD && sessionSecret());
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.VENTO_ADMIN_PASSWORD;
  if (!expected || !password) return false;
  const actualBuffer = Buffer.from(password);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export function createAdminSession(): string {
  if (!isAdminConfigured()) throw new Error("Admin authentication is not configured");
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `${expiresAt}.admin`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSession(token: string | undefined): boolean {
  if (!token || !sessionSecret()) return false;
  const [expiresAt, role, signature] = token.split(".");
  if (!expiresAt || role !== "admin" || !signature || Number(expiresAt) <= Date.now()) return false;
  const payload = `${expiresAt}.${role}`;
  const expected = sign(payload);
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  return actualBuffer.length === expectedBuffer.length && timingSafeEqual(actualBuffer, expectedBuffer);
}

export async function hasAdminSession(): Promise<boolean> {
  const cookieStore = await cookies();
  return verifyAdminSession(cookieStore.get(COOKIE_NAME)?.value);
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_MS / 1000
  };
}

export { COOKIE_NAME };
