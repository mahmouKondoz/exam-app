import { DecodingAuthToken } from "@/lib/util/auth.util";

export async function getAuthToken() {
  const jwt = await DecodingAuthToken();
  return jwt?.token;
}