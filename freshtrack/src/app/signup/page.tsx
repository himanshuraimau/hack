'use client'

import { useAtom } from 'jotai';
import { signupFormDataAtom } from '@/atoms/dataAtoms';
import { loadingAtom, errorAtom } from '@/atoms/uiAtoms';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useAtom(signupFormDataAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);

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
      const response = await fetch('http://localhost:8000/api/v1/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Signup failed. Please try again.');
      }

      await response.json();
      
      // Show success toast
      toast.success('Signup successful! Redirecting to login...');
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
      });

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Something went wrong';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen " initial={{ backgroundColor: "#0b1d35" }}
    animate={{ backgroundColor: "#0f6a92" }}
    transition={{ duration: 10 , repeat: Infinity}}>
      <Toaster position="top-right" />
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-2xl font-bold text-blue-600 hover:text-blue-800 transition-colors">Freshtrack</Link>
            </div>
            <div className="flex-shrink-0 flex items-center">
            <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium ml-3">
              Log In
            </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-36 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-20">
          <motion.div className="md:w-2/3 mb-8 md:mb-0 px-4 "
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 50 }}>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Optimize Your Supply Chain with Freshtrack
            </h2>
            <p className="text-xl text-white mb-6">
              Join Freshtrack today and experience the future of supply chain management. Our cutting-edge technology ensures:
            </p>
            <ul className="list-disc list-inside text-lg text-white space-y-2">
              <li>Real-time tracking of your goods</li>
              <li>Temperature and humidity monitoring</li>
              <li>Instant notifications for critical events</li>
              <li>Advanced analytics to optimize your operations</li>
            </ul>
            <p className="text-xl text-white mt-6">
              Sign up now and take control of your supply chain like never before!
            </p>
          </motion.div>

          <motion.div className="md:w-2/3 bg-white bg-opacity-90 p-8 rounded-lg shadow-md"
           initial={{ x: "-100vw" }}
           animate={{ x: 0 }}
           transition={{ type: "spring", stiffness: 50 }}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="fullName" className="block font-medium text-xl text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-xl font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phoneNumber" className="block text-xl font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
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
                {error && (
                  <p className="text-red-500 text-sm mb-4">{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? 'Signing up...' : 'Sign Up'}
                </button>
              </div>
            </form>
            <p className="mt-4 text-center text-l text-gray-600">
              Already signed in?{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login
              </Link>
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

