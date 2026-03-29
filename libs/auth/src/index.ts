import { atom } from "nanostores";
import { useStore } from "@nanostores/react";
import type { AuthContext } from "./types";

export { type AuthContext, type User } from "./types";

export const authStore = atom<AuthContext>({
  user: null,
  isAuthenticated: false,
  token: null,
});

export function useAuth(): AuthContext {
  return useStore(authStore);
}
