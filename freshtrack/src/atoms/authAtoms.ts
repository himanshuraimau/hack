import { atom } from 'jotai';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: { id: string; name: string; email: string } | null;
}

export const authAtom = atom<AuthState>({
  isAuthenticated: false,
  token: null,
  user: null,
});
