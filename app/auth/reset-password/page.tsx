'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { updatePassword } from '../actions';
import { calculatePasswordStrength, StrengthResult } from '@/lib/password-strength';

export default function ResetPassword() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [strength, setStrength] = useState<StrengthResult | null>(null);

  useEffect(() => {
    setStrength(calculatePasswordStrength(formData.password));
  }, [formData.password]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Strict Enforcement: Good (3) or Strong (4)
    if (strength && strength.score < 3) {
      setError('Password must be "Good" or higher.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    const formDataObj = new FormData();
    formDataObj.append('password', formData.password);

    const result = await updatePassword(formDataObj);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      router.push(result.redirectTo || '/dashboard');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <h1 className="text-2xl font-medium text-gray-500 mb-12 text-center">Set New Password</h1>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="relative">
          <label className="text-xs text-gray-400 mb-1 block">New Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 focus:outline-none focus:border-gray-500 transition-colors placeholder:text-gray-800 tracking-widest"
            required
            disabled={loading}
          />
          
          {/* Password Strength Meter */}
          {formData.password && strength && (
            <div className="mt-2">
              <div className="flex gap-1 h-1 mb-1">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={i} 
                    className={`h-full flex-1 rounded-full transition-colors duration-500 ${
                      i <= strength.score - 1 ? '' : 'bg-gray-100'
                    }`}
                    style={{ backgroundColor: i <= strength.score - 1 ? strength.color : undefined }}
                  />
                ))}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: strength.color }}>
                  {strength.label}
                </span>
                {strength.score < 3 && (
                  <span className="text-[10px] text-gray-400">Target: Good</span>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <label className="text-xs text-gray-400 mb-1 block">Confirm New Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
            className="w-full bg-transparent border-b border-gray-200 py-2 text-gray-800 focus:outline-none focus:border-gray-500 transition-colors placeholder:text-gray-800 tracking-widest"
            required
            disabled={loading}
          />
        </div>

        <div className="flex justify-center mt-12">
          <button 
            type="submit"
            disabled={loading}
            className="bg-[#6b6b6b] text-white font-medium py-3 px-12 rounded-full hover:bg-gray-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
