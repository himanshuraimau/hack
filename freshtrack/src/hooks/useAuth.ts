import { useAtom } from 'jotai';
import { authAtom } from '@/atoms/authAtoms';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [auth, setAuth] = useAtom(authAtom);
  const router = useRouter();

  const login = (token: string, user: { id: string; name: string; email: string }) => {
    setAuth({ isAuthenticated: true, token, user });
    localStorage.setItem('token', token);
    document.cookie = `token=${token}; path=/`;
  };

  const logout = () => {
    setAuth({ isAuthenticated: false, token: null, user: null });
    localStorage.removeItem('token');
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/login');
  };

  return { auth, login, logout };
};
