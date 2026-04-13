'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useStore } from '@/store/useStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = useStore();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4' : 'py-6'
      }`}
    >
      <div className={`mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between transition-all duration-300 ${
        scrolled ? 'bg-white/80 backdrop-blur-md rounded-full py-3 px-6 mx-4 md:mx-auto shadow-sm border border-gray-200' : ''
      }`}>
        <Link href="/" className="text-2xl font-logo text-gray-900 tracking-wider">
          Shop.AI
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#how-it-works" className="hover:text-black transition-colors">How It Works</Link>
          <Link href="#intelligence" className="hover:text-black transition-colors">Intelligence</Link>
          <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
          <Link href="#about" className="hover:text-black transition-colors">About</Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <Link href="/dashboard/chat" className="text-sm font-medium text-gray-600 hover:text-black transition-colors">
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/auth/signin" className="text-sm font-medium text-gray-600 hover:text-black transition-colors hidden sm:block">
                Sign In
              </Link>
              <Link
                href="/auth/signup"
                className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all hover:scale-105 active:scale-95"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
