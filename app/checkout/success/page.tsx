'use client';

import { Suspense, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { CheckCircle, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const planId = searchParams.get('plan') || 'pro';
  const planName = planId === 'team' ? 'Team Pro' : 'Shop.AI Pro';
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setOrderNumber(`#ORD-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`);
    }, 10);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white max-w-md w-full rounded-3xl shadow-xl p-8 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="w-10 h-10 text-green-600" />
        </motion.div>
        
        <h1 className="text-3xl font-display font-medium text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-8">
          Thank you for subscribing to <span className="font-semibold text-gray-900">{planName}</span>. Your account has been upgraded and you now have access to all premium features.
        </p>

        <div className="bg-gray-50 rounded-xl p-4 mb-8 text-left border border-gray-100">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">Order Number</span>
            <span className="font-medium text-gray-900">{orderNumber || 'Generating...'}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Date</span>
            <span className="font-medium text-gray-900">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <Link 
          href="/dashboard/chat" 
          className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Go to Dashboard <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>}>
      <SuccessContent />
    </Suspense>
  );
}
