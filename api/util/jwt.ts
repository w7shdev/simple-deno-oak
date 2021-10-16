import { create } from "https://deno.land/x/djwt@v2.4/mod.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-512" },
  true,
  ["sign", "verify"],
);

export async function createJWT(payload: any) {
  return await create({ alg: "HS512", typ: "JWT" }, payload, key);
}
