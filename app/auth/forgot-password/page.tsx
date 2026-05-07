'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { requestPasswordReset } from '../actions';

export default function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);

    const result = await requestPasswordReset(formData);

    if (result?.error) {
      setError(result.error);
    } else if (result?.success) {
      setSuccess(result.success);
    }
    
    setLoading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h1 className="text-2xl font-medium text-gray-500 mb-8 text-center">Reset Password</h1>
      <p className="text-sm text-gray-400 mb-12 text-center max-w-xs mx-auto">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-6">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 text-green-600 text-sm p-3 rounded-lg border border-green-100 mb-6">
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <label className="text-xs text-gray-400 mb-1 block">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="david@example.com"
            className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 focus:outline-none focus:border-gray-500 transition-colors placeholder:text-gray-800"
            required
            disabled={loading || !!success}
          />
        </div>

        <div className="flex justify-center mt-12">
          {!success ? (
            <button 
              type="submit"
              disabled={loading}
              className="bg-[#6b6b6b] text-white font-medium py-3 px-12 rounded-full hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
            </button>
          ) : (
            <Link 
              href="/auth/signin"
              className="text-[#6b6b6b] border border-[#6b6b6b] font-medium py-3 px-12 rounded-full hover:bg-gray-50 transition-all"
            >
              Back to Sign In
            </Link>
          )}
        </div>
      </form>
    </motion.div>
  );
}
