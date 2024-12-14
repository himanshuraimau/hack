'use client'

import { useAtom } from 'jotai';
import { loginFormDataAtom } from '@/atoms/dataAtoms';
import { loadingAtom, errorAtom } from '@/atoms/uiAtoms';
import { useAuth } from '@/hooks/useAuth';
import Link from 'next/link';
import {motion} from 'framer-motion'
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useAtom(loginFormDataAtom);
  const [, setLoading] = useAtom(loadingAtom);
  const [, setError] = useAtom(errorAtom);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.emailOrPhone,
          phoneNumber: formData.emailOrPhone,
          password: formData.password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        login(data.token, data.user);
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        throw new Error(data.message || 'Login failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen "  initial={{ backgroundColor: "#0b1d35" }}
    animate={{ backgroundColor: "#0f6a92" }}
    transition={{ duration: 10 , repeat: Infinity}}>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600">Freshtrack</Link>
            </div>
            <div className="flex-shrink-0 flex items-center">
            <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-3">
              Sign Up
            </Link>
            </div>
          </div>
        </div>
      </nav>

      <motion.div className="max-w-md mx-auto mt-60 bg-white p-8 rounded-lg shadow-md" 
      initial={{ x: "-100vw" }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 50 }}>
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Login to Freshtrack</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="emailOrPhone" className="block text-xl font-medium text-gray-700">Email or Phone Number</label>
            <input
              type="text"
              id="emailOrPhone"
              name="emailOrPhone"
              value={formData.emailOrPhone}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-xl font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="mt-4 text-center text-l text-gray-600">
          New to Freshtrack?{' '}
          <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </p>
      </ motion.div>
    </motion.div>
  );
}

