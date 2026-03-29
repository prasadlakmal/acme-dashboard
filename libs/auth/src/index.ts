import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';
import type { AuthContext } from './types';

export type { AuthContext, User } from './types';

export const authStore = atom<AuthContext>({
  user: null,
  isAuthenticated: false,
  token: null,
});

export function useAuth(): AuthContext {
  return useStore(authStore);
}
