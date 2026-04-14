'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'motion/react';
import { CreditCard, ShieldCheck, CheckCircle2, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';

const MOCK_CARDS = [
  { id: 'visa', name: 'Visa', number: '4242 4242 4242 4242', cvc: '123', exp: '12/25', icon: '💳', color: 'bg-blue-600' },
  { id: 'mastercard', name: 'Mastercard', number: '5454 5454 5454 5454', cvc: '123', exp: '12/25', icon: '💳', color: 'bg-red-500' },
  { id: 'amex', name: 'American Express', number: '3782 822463 10005', cvc: '1234', exp: '12/25', icon: '💳', color: 'bg-cyan-700' },
  { id: 'discover', name: 'Discover', number: '6011 0000 0000 0000', cvc: '123', exp: '12/25', icon: '💳', color: 'bg-orange-500' },
  { id: 'diners', name: 'Diners Club', number: '3051 2736 9810', cvc: '123', exp: '12/25', icon: '💳', color: 'bg-slate-600' },
  { id: 'jcb', name: 'JCB', number: '3528 0000 0000 0000', cvc: '123', exp: '12/25', icon: '💳', color: 'bg-green-600' },
];

const PLANS = {
  pro: { name: 'Shop.AI Pro', monthly: 10, yearly: 96 },
  team: { name: 'Team Pro', monthly: 15, yearly: 144 },
};

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn, currentUser, login } = useStore();
  const planId = searchParams.get('plan') as keyof typeof PLANS || 'pro';
  const billing = searchParams.get('billing') || 'monthly';
  
  useEffect(() => {
    if (!isLoggedIn) {
      const redirectUrl = encodeURIComponent(`/checkout?plan=${planId}&billing=${billing}`);
      router.push(`/auth/signin?redirect=${redirectUrl}`);
    }
  }, [isLoggedIn, router, planId, billing]);

  const plan = PLANS[planId] || PLANS.pro;
  const price = billing === 'yearly' ? plan.yearly : plan.monthly;

  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleCardSelect = (card: typeof MOCK_CARDS[0]) => {
    setCardNumber(card.number);
    setExpiry(card.exp);
    setCvc(card.cvc);
    setCardName(currentUser?.name || 'John Doe');
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc || !cardName) {
      setError('Please fill in all payment details.');
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Update user plan
    if (currentUser) {
      login({ ...currentUser, plan: planId === 'team' ? 'Team' : 'Pro' });
    }

    // Redirect to success page
    router.push(`/checkout/success?plan=${planId}&billing=${billing}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link href="/#pricing" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Pricing
        </Link>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Order Summary */}
          <div className="bg-gray-900 text-white p-8 md:w-1/3 flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-display font-medium mb-6">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-gray-700 pb-4">
                  <div>
                    <p className="font-medium">{plan.name}</p>
                    <p className="text-sm text-gray-400 capitalize">{billing} billing</p>
                  </div>
                  <p className="font-medium">${price}</p>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-gray-400">Subtotal</p>
                  <p>${price}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-gray-400">Tax</p>
                  <p>$0.00</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <div className="flex justify-between items-end border-t border-gray-700 pt-6">
                <p className="text-lg font-medium">Total due today</p>
                <p className="text-3xl font-bold">${price}</p>
              </div>
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                Secure 256-bit SSL encryption
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-display font-medium text-gray-900 mb-6">Payment Details</h2>
            
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-700 mb-3">Test Cards (Click to auto-fill)</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MOCK_CARDS.map(card => (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => handleCardSelect(card)}
                    className={`flex items-center gap-2 p-2 rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all text-left group`}
                  >
                    <div className={`w-8 h-6 rounded flex items-center justify-center text-white text-xs ${card.color}`}>
                      {card.icon}
                    </div>
                    <div className="text-xs font-medium text-gray-700 group-hover:text-blue-700">
                      {card.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-white border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="123"
                    className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-black text-white py-3.5 rounded-xl font-medium hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Pay $${price}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-500" /></div>}>
      <CheckoutContent />
    </Suspense>
  );
}
