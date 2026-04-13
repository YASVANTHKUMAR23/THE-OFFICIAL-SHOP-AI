'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronDown, Search, ShieldCheck, Zap, BarChart3, Cpu, Check, ArrowRight, Play, ArrowDown, MousePointer2 } from 'lucide-react';
import AnimatedCounter from '@/components/AnimatedCounter';
import { GlowingEffect } from '@/components/ui/glowing-effect';

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState('ai');
  const [isYearly, setIsYearly] = useState(true);
  const [activeSection, setActiveSection] = useState('chat');
  const featuresRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: featuresRef,
    offset: ["start start", "end end"]
  });
  
  const arrowY = useTransform(scrollYProgress, [0, 1], ["0%", "calc(100% - 32px)"]);

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col overflow-x-hidden">
      {/* Navbar (Lynq style) */}
      <nav className="w-full px-6 py-4 flex items-center justify-between z-50 relative">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="Shop.AI Logo" className="h-8 w-auto object-contain" />
          <span className="font-display font-bold text-xl tracking-tight">Shop.AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="#pricing" className="hover:text-black transition-colors">Pricing</Link>
          <Link href="#security" className="hover:text-black transition-colors">Security</Link>
          <Link href="#compare" className="hover:text-black transition-colors">Compare</Link>
          <Link href="#docs" className="hover:text-black transition-colors">Docs</Link>
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/auth/signin" className="text-gray-600 hover:text-black transition-colors hover:scale-105 active:scale-95">Sign in</Link>
          <Link href="/auth/signup" className="bg-black text-white px-5 py-2.5 rounded-full hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section (Lynq style) */}
      <section className="relative pt-20 pb-32 px-6 flex flex-col items-center text-center">
        <div className="mb-6">
          <span className="text-gray-500 font-medium tracking-wide text-sm flex items-center gap-2 justify-center">
            AI Shopping Assistant
          </span>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} viewport={{ once: true }}
          className="text-6xl md:text-8xl font-display font-medium tracking-tight text-gray-900 mb-6 leading-[1.1] max-w-4xl"
        >
          Stop Searching<span className="text-blue-500 align-super text-4xl">*</span><br />
          Start Deciding
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }} viewport={{ once: true }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10"
        >
          Connect your accounts in 30 seconds and let Shop.AI triage products, compare prices, and find the best deals automatically—so you can focus on what matters.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }} viewport={{ once: true }}
          className="flex flex-col items-center gap-6 mb-16"
        >
          <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
            Works with 
            <div className="flex gap-2">
              <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-xs font-bold text-orange-500 border border-gray-100">a</div>
              <div className="w-8 h-8 bg-white rounded-full shadow-sm flex items-center justify-center text-xs font-bold text-blue-500 border border-gray-100">f</div>
            </div>
          </div>
          
          <Link href="/auth/signup" className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-black/20 active:scale-95">
            Start Your 7-Day Free Trial ($19)
          </Link>
        </motion.div>

        {/* Hero Image Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.3, ease: "easeOut" }} viewport={{ once: true }}
          className="w-full max-w-6xl mx-auto relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 rounded-[2.5rem] blur-2xl opacity-40 transform scale-95 translate-y-8" />
          <div className="relative bg-gradient-to-br from-orange-400 via-pink-400 to-purple-500 p-2 md:p-4 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row gap-8 shadow-inner min-h-[500px]">
              {/* Mockup Sidebar */}
              <div className="w-full md:w-64 shrink-0 flex flex-col gap-6">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                  <span className="font-medium text-sm">Inbox</span>
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">4</span>
                </div>
                <div className="space-y-1">
                  {['Starred', 'Snoozed', 'Sent', 'Drafts'].map((item) => (
                    <div key={item} className="flex items-center gap-3 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                      <div className="w-4 h-4 border-2 border-gray-300 rounded-sm" />
                      {item}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-3">Labels</div>
                  <div className="space-y-1">
                    {[
                      { name: 'Needs Reply', color: 'bg-green-500', count: 8 },
                      { name: 'Action', color: 'bg-red-500', count: 12 },
                      { name: 'FYI', color: 'bg-blue-500', count: 18 },
                      { name: 'Calendar', color: 'bg-yellow-500', count: 4 },
                    ].map((label) => (
                      <div key={label.name} className="flex items-center justify-between px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${label.color}`} />
                          {label.name}
                        </div>
                        <span className="text-xs text-gray-400">{label.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Mockup Main Area */}
              <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm p-8 flex flex-col relative overflow-hidden">
                {/* Animated Cursor */}
                <motion.div
                  className="absolute top-4 left-4 z-50 pointer-events-none drop-shadow-md"
                  animate={{
                    x: [0, 600, 100, 700, 250, 0],
                    y: [0, 150, 400, 100, 350, 0],
                    scale: [1, 0.8, 1, 0.8, 1, 1]
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <MousePointer2 className="w-8 h-8 text-black fill-black" />
                </motion.div>

                <div className="flex items-center justify-center gap-4 mb-8">
                  <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm font-medium flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-gray-400" /> Private & Secure
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm font-medium">
                    SOC2 Certified
                  </div>
                  <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100 text-sm font-medium">
                    GDPR Certified
                  </div>
                </div>
                
                <div className="flex-1 flex flex-col gap-6">
                  <div className="h-8 bg-gray-50 rounded-lg w-3/4 animate-pulse" />
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-50 rounded w-full animate-pulse" />
                    <div className="h-4 bg-gray-50 rounded w-5/6 animate-pulse" />
                    <div className="h-4 bg-gray-50 rounded w-4/6 animate-pulse" />
                  </div>
                  <div className="mt-auto">
                    <div className="bg-blue-100 text-blue-600 px-6 py-2 rounded-full w-max text-sm font-medium cursor-pointer">
                      Send
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features Section (Secoda style) */}
      <section className="bg-white py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-medium text-gray-900 mb-4">
              Meet the AI-first shopping platform
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Search and AI built from the ground up with intelligence at its core. Shop.AI enables secure data access and decisions across your purchases.
            </p>
          </motion.div>

          {/* Top 4 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {[
              { icon: <Search className="w-5 h-5 text-purple-500" />, title: 'Discover', desc: 'AI powered search across your entire shopping landscape.' },
              { icon: <BarChart3 className="w-5 h-5 text-orange-500" />, title: 'Catalog', desc: 'Single source of truth for all product specs and reviews.' },
              { icon: <Zap className="w-5 h-5 text-green-500" />, title: 'Monitor', desc: 'Track price drops and ensure the integrity of your deals.' },
              { icon: <ShieldCheck className="w-5 h-5 text-blue-500" />, title: 'Govern', desc: 'Enforce budget policies and enable secure purchasing at scale.' }
            ].map((card, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.1 }} viewport={{ once: true, margin: "-50px" }}
                key={i} className="relative h-full rounded-2xl border border-gray-200 p-2 md:rounded-3xl md:p-3 cursor-pointer group"
              >
                <GlowingEffect
                  blur={0}
                  borderWidth={3}
                  spread={80}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                />
                <div className="relative flex h-full flex-col gap-4 overflow-hidden rounded-xl p-6 bg-white shadow-md border border-gray-100 group-hover:shadow-2xl group-hover:border-blue-500/30 transition-all duration-500 group-hover:-translate-y-2 z-10">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all duration-500">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Interactive Area */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}
            className="bg-[#f4f4f5] rounded-3xl p-8 md:p-12 flex flex-col md:flex-row gap-12 items-start"
          >
            {/* Accordion */}
            <div className="w-full md:w-1/3 space-y-2">
              {[
                { id: 'ai', title: 'AI', desc: 'Let Shop.AI take the grunt work out of your day. Uncover insights, automate repetitive tasks, and focus on what really matters.' },
                { id: 'search', title: 'Search', desc: 'Find exactly what you need across thousands of retailers instantly.' },
                { id: 'lineage', title: 'Lineage', desc: 'Trace price history and product evolution over time.' },
                { id: 'extension', title: 'Chrome extension', desc: 'Bring the power of Shop.AI directly to your browser.' }
              ].map((item) => (
                <div key={item.id} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                  <button 
                    onClick={() => setActiveFeature(item.id)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                  >
                    <span className={`text-xl font-bold transition-colors duration-300 ${activeFeature === item.id ? 'text-blue-600' : 'text-gray-900 group-hover:text-blue-500'}`}>{item.title}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${activeFeature === item.id ? 'rotate-180 text-blue-600' : 'text-gray-400 group-hover:text-blue-500'}`} />
                  </button>
                  <AnimatePresence>
                    {activeFeature === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {item.desc}
                        </p>
                        <button className="bg-white border border-gray-200 text-gray-900 px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-50 transition-colors">
                          Learn more
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Mockup Image Area */}
            <div className="w-full md:w-2/3 bg-black rounded-xl p-4 shadow-2xl relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20" />
              <div className="relative bg-white rounded-lg h-full p-6 flex flex-col">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-sm font-medium text-gray-500">Shop.AI Insights</div>
                </div>
                
                {activeFeature === 'ai' && (
                  <div className="flex-1 flex flex-col gap-6">
                    <h4 className="font-bold text-gray-900">Key Insights:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
                      <li>The data covers the period from September 2022 to August 2023.</li>
                      <li>Our analysis shows a strong upward trend over this period.</li>
                      <li>Peak value was achieved in July 2023.</li>
                    </ul>
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 flex items-end justify-between p-4 gap-2">
                      {[40, 60, 30, 80, 50, 90, 70, 40, 60, 30].map((h, i) => (
                        <div key={i} className="w-full bg-blue-500 rounded-t-sm" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                )}

                {activeFeature === 'search' && (
                  <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <div className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm text-gray-900 font-medium">
                        best noise cancelling headphones under $300
                      </div>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 p-4 space-y-3 overflow-hidden">
                      <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Top Results</div>
                      {[
                        { price: "$249", width1: "w-3/4", width2: "w-1/2" },
                        { price: "$298", width1: "w-5/6", width2: "w-2/3" },
                        { price: "$199", width1: "w-2/3", width2: "w-1/3" }
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-3 rounded-md shadow-sm border border-gray-100 flex gap-3 items-center hover:border-blue-300 transition-colors cursor-pointer">
                          <div className="w-12 h-12 bg-gray-100 rounded-md flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className={`h-2.5 bg-gray-200 rounded ${item.width1}`} />
                            <div className={`h-2 bg-gray-100 rounded ${item.width2}`} />
                          </div>
                          <div className="text-sm font-bold text-gray-900">{item.price}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeFeature === 'lineage' && (
                  <div className="flex-1 flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-gray-900">Price History</h4>
                      <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded-full border border-green-200">Lowest in 30 days</span>
                    </div>
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 p-4 flex flex-col justify-end relative overflow-hidden">
                      <svg className="w-full h-40 absolute bottom-0 left-0" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0,30 L20,25 L40,35 L60,15 L80,20 L100,5" fill="none" stroke="#3b82f6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        <path d="M0,30 L20,25 L40,35 L60,15 L80,20 L100,5 L100,40 L0,40 Z" fill="url(#gradient)" opacity="0.2" />
                        <defs>
                          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="transparent" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute top-4 right-4 bg-white shadow-md rounded-lg p-3 border border-gray-100 z-10">
                        <div className="text-xs text-gray-500 mb-1">Current Price</div>
                        <div className="text-xl font-bold text-gray-900">$249.99</div>
                        <div className="text-[10px] text-green-600 font-medium mt-1">↓ $50 from average</div>
                      </div>
                      
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[10px] text-gray-400 font-medium">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeFeature === 'extension' && (
                  <div className="flex-1 flex gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* Fake Webpage */}
                    <div className="flex-1 bg-gray-50 rounded-lg border border-gray-100 p-4 flex flex-col gap-4 opacity-50">
                      <div className="h-4 bg-gray-200 rounded w-1/3" />
                      <div className="h-32 bg-gray-200 rounded w-full" />
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded w-full" />
                        <div className="h-2 bg-gray-200 rounded w-5/6" />
                        <div className="h-2 bg-gray-200 rounded w-4/6" />
                      </div>
                    </div>
                    {/* Fake Extension Sidebar */}
                    <div className="w-2/5 bg-white rounded-lg border border-gray-200 shadow-xl flex flex-col overflow-hidden transform -translate-x-4 translate-y-4">
                      <div className="bg-black p-3 flex items-center gap-2 text-white">
                        <div className="w-4 h-4 bg-white rounded-sm flex items-center justify-center">
                          <div className="w-2 h-2 border border-black rounded-sm" />
                        </div>
                        <span className="text-xs font-bold tracking-wide">Shop.AI</span>
                      </div>
                      <div className="p-4 flex flex-col flex-1">
                        <div className="text-sm font-bold text-gray-900 mb-2">Better deal found!</div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                          <div className="text-xs text-green-700 font-bold mb-1">Save $50.00</div>
                          <div className="text-[10px] text-green-600">Available at BestBuy</div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-gray-500">Current Site</span>
                            <span className="text-gray-900 font-medium">$299.99</span>
                          </div>
                          <div className="flex justify-between text-[10px]">
                            <span className="text-gray-500">BestBuy</span>
                            <span className="text-green-600 font-bold">$249.99</span>
                          </div>
                        </div>
                        <button className="w-full bg-black text-white text-xs py-2 rounded-md mt-auto font-medium hover:bg-gray-800 transition-colors">
                          Go to Deal
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Sidebar Section (Realm style) */}
      <section ref={featuresRef} className="bg-[#f9f8f6] py-32 px-6 border-t border-gray-200 relative">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 relative">
          <div className="w-full md:w-64 shrink-0 order-1 md:order-2">
            <div className="sticky top-32">
              <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 border border-gray-200 px-2 py-1 rounded w-max bg-white">MAIN FEATURES</div>
              <h2 className="text-3xl font-display font-medium text-gray-900 mb-12">
                Accelerate decision-making work with AI
              </h2>
              
              <div className="relative flex gap-6 h-[240px]">
                {/* Progress Line with Arrow */}
                <div className="relative w-1 bg-gray-200 rounded-full flex-shrink-0 my-2">
                  <motion.div 
                    className="absolute left-1/2 -translate-x-1/2 text-blue-500 z-10"
                    style={{ top: arrowY }}
                  >
                    <div className="bg-white rounded-full p-1.5 shadow-lg border border-gray-100">
                      <ArrowDown className="w-4 h-4" />
                    </div>
                  </motion.div>
                </div>

                {/* Menu Items */}
                <div className="space-y-12 text-lg font-medium py-2 flex-1">
                  <div className={`transition-all duration-500 ${activeSection === 'chat' ? 'text-gray-900 scale-110 origin-left font-bold' : 'text-gray-400'}`}>Chat</div>
                  <div className={`transition-all duration-500 ${activeSection === 'questionnaires' ? 'text-gray-900 scale-110 origin-left font-bold' : 'text-gray-400'}`}>Questionnaires</div>
                  <div className={`transition-all duration-500 ${activeSection === 'assistants' ? 'text-gray-900 scale-110 origin-left font-bold' : 'text-gray-400'}`}>Assistants</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 pb-32 relative order-2 md:order-1">
            {/* Feature Block 1: Chat */}
            <motion.div 
              onViewportEnter={() => setActiveSection('chat')}
              viewport={{ margin: "-50% 0px -50% 0px" }}
              className="sticky top-32 pt-8 mb-[15vh] transition-all duration-700"
            >
              <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 border border-gray-200 px-2 py-1 rounded w-max bg-white">CHAT</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Instant product insights</h3>
              <p className="text-gray-600 mb-8 max-w-2xl">
                Find trustworthy answers from across thousands of reviews and specs. Equip yourself with the technical baseline to make the right purchase.
              </p>
              <div className="bg-gradient-to-br from-teal-800 to-teal-600 rounded-2xl p-8 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="bg-white rounded-xl p-6 shadow-2xl relative z-10 max-w-lg mx-auto transform rotate-1">
                  <div className="font-bold text-gray-900 mb-4">Which has better ANC: Sony XM5 or Bose QC45?</div>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <Check className="w-4 h-4 text-green-500" /> Analyzing 4,500+ verified reviews
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 p-2 rounded">
                      <Check className="w-4 h-4 text-green-500" /> Comparing Rtings.com isolation scores
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 leading-relaxed">
                    Based on consensus, the Sony WH-1000XM5 offers slightly superior active noise cancellation, particularly in the lower frequencies (engine noise), while the Bose QC45 provides a more comfortable clamping force for long sessions.
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Block 2: Questionnaires */}
            <motion.div 
              onViewportEnter={() => setActiveSection('questionnaires')}
              viewport={{ margin: "-50% 0px -50% 0px" }}
              className="sticky top-40 pt-8 mb-[15vh] transition-all duration-700"
            >
              <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 border border-gray-200 px-2 py-1 rounded w-max bg-white">QUESTIONNAIRES</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Preferences</h3>
              <p className="text-gray-600 mb-8 max-w-2xl">
                Fill out a quick questionnaire about your needs, and Shop.AI will automatically filter and rank products based on your unique criteria.
              </p>
              <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl p-8 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="bg-white rounded-xl p-6 shadow-2xl relative z-10 max-w-lg mx-auto transform -rotate-1">
                  <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                    <div className="font-bold text-gray-900 flex items-center gap-2">
                      <div className="w-4 h-4 bg-blue-500 rounded-sm" /> Laptop Finder Preferences
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-1.5 rounded text-sm font-medium">Save</button>
                  </div>
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2 text-sm border-b border-gray-50 pb-4">
                      <div className="text-gray-900 font-medium">Primary Use Case</div>
                      <div className="flex gap-2">
                        <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium border border-blue-100">Video Editing</span>
                        <span className="bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs border border-gray-200">Gaming</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm border-b border-gray-50 pb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-900 font-medium">Budget Range</span>
                        <span className="text-blue-600 font-medium">$1,000 - $1,500</span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mt-1">
                        <div className="h-full bg-blue-500 w-1/2 ml-[25%]" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-900 font-medium">Importance of Battery Life</span>
                        <span className="text-gray-500">High</span>
                      </div>
                      <div className="flex gap-1 mt-1">
                        <div className="flex-1 h-1.5 bg-blue-500 rounded-l-full" />
                        <div className="flex-1 h-1.5 bg-blue-500" />
                        <div className="flex-1 h-1.5 bg-blue-500" />
                        <div className="flex-1 h-1.5 bg-gray-200 rounded-r-full" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature Block 3: Assistants */}
            <motion.div 
              onViewportEnter={() => setActiveSection('assistants')}
              viewport={{ margin: "-50% 0px -50% 0px" }}
              className="sticky top-48 pt-8 transition-all duration-700"
            >
              <div className="text-xs font-bold tracking-widest text-gray-400 uppercase mb-4 border border-gray-200 px-2 py-1 rounded w-max bg-white">ASSISTANTS</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Autonomous Price Agents</h3>
              <p className="text-gray-600 mb-8 max-w-2xl">
                Deploy specialized AI agents to monitor prices, analyze new reviews, and alert you when the perfect buying conditions are met.
              </p>
              <div className="bg-gradient-to-br from-purple-600 to-purple-400 rounded-2xl p-8 shadow-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                <div className="bg-white rounded-xl p-6 shadow-2xl relative z-10 max-w-lg mx-auto transform rotate-1">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Deal Hunter Agent</div>
                      <div className="text-xs text-green-600 font-medium">Active • Monitoring 3 items</div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-sm font-bold text-gray-900">LG C3 65&quot; OLED TV</div>
                        <div className="text-xs text-gray-500">Target: Under $1,400</div>
                      </div>
                      <div className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">
                        PRICE DROP
                      </div>
                    </div>
                    <div className="flex items-end gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900">$1,398</span>
                      <span className="text-sm text-gray-400 line-through mb-1">$1,599</span>
                    </div>
                    <button className="w-full bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                      Review Deal
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section (Raycast style) */}
      <section id="pricing" className="bg-[#0a0a0a] py-32 px-6 text-white">
        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
              Level up with Shop.AI Pro.
            </h2>
            <p className="text-gray-400 text-lg">
              Use the core product for free, forever.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, margin: "-100px" }}
            className="flex justify-center mb-16"
          >
            <div className="bg-[#1a1a1a] p-1 rounded-full flex items-center relative">
              <div className="absolute -top-3 -right-4 bg-white text-black text-[10px] font-bold px-2 py-0.5 rounded-full z-10">
                -20%
              </div>
              <button 
                onClick={() => setIsYearly(false)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${!isYearly ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsYearly(true)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${isYearly ? 'bg-[#2a2a2a] text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Yearly
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Free Tier */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-full rounded-2xl border border-[#2a2a2a] p-2 md:rounded-3xl md:p-3"
            >
              <GlowingEffect blur={0} borderWidth={3} spread={80} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative bg-[#0a0a0a] rounded-xl p-6 h-[500px] flex flex-col">
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-1">Shop.AI</h3>
                  <p className="text-sm text-gray-400">Free, forever.</p>
                </div>
                <div className="flex items-end gap-2 mb-8">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-sm text-gray-500 mb-1">/ month</span>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-start gap-3 text-sm">
                    <Check className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <span className="text-gray-300">Core features, including: <br/><span className="text-gray-500 text-xs">Search, Basic Comparison, History</span></span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-300">Thousands of products</span>
                  </div>
                </div>
                <button className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 mt-auto flex items-center justify-center gap-2">
                  Download
                </button>
              </div>
            </motion.div>

            {/* Pro Tier */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0 }}
              viewport={{ once: true }}
              className="relative h-full rounded-2xl border border-[#333] p-2 md:rounded-3xl md:p-3 transform md:-translate-y-4 z-10"
            >
              <GlowingEffect blur={0} borderWidth={3} spread={80} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative bg-[#111] rounded-xl p-6 h-[540px] flex flex-col shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                <div className="absolute top-6 right-6 text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-1">Shop.AI Pro</h3>
                  <p className="text-sm text-gray-400">AI at your fingertips</p>
                </div>
                <div className="flex items-end gap-2 mb-2 relative">
                  <span className="text-5xl font-bold">${isYearly ? '8' : '10'}</span>
                  <span className="text-sm text-gray-500 mb-1">/ month</span>
                  {isYearly && (
                    <span className="absolute -top-6 left-0 bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded">
                      SAVE 20%
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mb-8 text-center border-b border-[#222] pb-4">
                  {isYearly ? '$96 billed annually' : 'Billed monthly'}
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-white shrink-0" />
                    <span className="text-gray-200">Shop.AI Advanced</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-white shrink-0" />
                    <span className="text-gray-200">Cloud Sync</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-white shrink-0" />
                    <span className="text-gray-200">Custom Themes</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-white shrink-0" />
                    <span className="text-gray-200">Unlimited History</span>
                  </div>
                </div>
                <button className="w-full bg-white hover:bg-gray-200 text-black py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 mt-auto">
                  Start Free Trial
                </button>
              </div>
            </motion.div>

            {/* Team Tier */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative h-full rounded-2xl border border-[#2a2a2a] p-2 md:rounded-3xl md:p-3"
            >
              <GlowingEffect blur={0} borderWidth={3} spread={80} glow={true} disabled={false} proximity={64} inactiveZone={0.01} />
              <div className="relative bg-[#0a0a0a] rounded-xl p-6 h-[500px] flex flex-col">
                <div className="absolute top-6 right-6 text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-1">Team Pro</h3>
                  <p className="text-sm text-gray-400">AI for your whole team</p>
                </div>
                <div className="flex items-end gap-2 mb-2 relative">
                  <span className="text-5xl font-bold">${isYearly ? '12' : '15'}</span>
                  <div className="flex flex-col text-sm text-gray-500 mb-1">
                    <span>/ month</span>
                    <span>/ user</span>
                  </div>
                  {isYearly && (
                    <span className="absolute -top-6 left-0 bg-blue-500/20 text-blue-400 text-xs font-bold px-2 py-1 rounded">
                      SAVE 20%
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mb-8 text-center border-b border-[#222] pb-4">
                  {isYearly ? '$144 billed annually' : 'Billed monthly'}
                </div>
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-300">Everything in Pro</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-300">Unlimited Shared Commands</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-gray-300">Unlimited Team Members</span>
                  </div>
                </div>
                <button className="w-full bg-[#1a1a1a] hover:bg-[#2a2a2a] text-white py-3 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 mt-auto">
                  Select Plan
                </button>
              </div>
            </motion.div>
          </div>
          
          <div className="mt-12 text-center">
            <Link href="#" className="text-sm text-gray-400 hover:text-white flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4" /> More about Pro <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (Primer style) */}
      <footer className="bg-white pt-24 pb-12 px-6 border-t border-gray-200">
        <motion.div 
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-24">
            <div>
              <h4 className="font-medium text-gray-900 mb-6 flex items-center gap-1">Accept <ArrowRight className="w-3 h-3" /></h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-black">Universal checkout</Link></li>
                <li><Link href="#" className="hover:text-black">Agnostic 3DS</Link></li>
                <li><Link href="#" className="hover:text-black">Centralized vault</Link></li>
                <li><Link href="#" className="hover:text-black">Payments API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-6 flex items-center gap-1">Optimize <ArrowRight className="w-3 h-3" /></h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-black">Network tokenization</Link></li>
                <li><Link href="#" className="hover:text-black">Fallbacks</Link></li>
                <li><Link href="#" className="hover:text-black">Adaptive 3DS</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-6 flex items-center gap-1">Manage <ArrowRight className="w-3 h-3" /></h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-black">Observability</Link></li>
                <li><Link href="#" className="hover:text-black">Monitors</Link></li>
                <li><Link href="#" className="hover:text-black">Reconciliation</Link></li>
                <li><Link href="#" className="hover:text-black">Disputes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-black">Apps & integrations</Link></li>
                <li><Link href="#" className="hover:text-black">Unified payment infrastructure</Link></li>
                <li><Link href="#" className="hover:text-black">Careers</Link></li>
                <li><Link href="#" className="hover:text-black">Our vision</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-gray-600">
                <li><Link href="#" className="hover:text-black">Resource hub</Link></li>
                <li><Link href="#" className="hover:text-black">Customer stories</Link></li>
                <li><Link href="#" className="hover:text-black">Primer docs</Link></li>
                <li><Link href="#" className="hover:text-black">API reference</Link></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-t border-gray-200 pt-12">
            <div className="flex items-center gap-6 text-gray-400">
              <Link href="#" className="hover:text-black transition-colors"><div className="w-5 h-5 bg-current rounded-sm" /></Link>
              <Link href="#" className="hover:text-black transition-colors"><div className="w-5 h-5 bg-current rounded-full" /></Link>
              <Link href="#" className="hover:text-black transition-colors"><div className="w-5 h-5 bg-current rounded-full" /></Link>
            </div>

            <div className="w-full md:w-auto max-w-md">
              <h4 className="font-medium text-gray-900 mb-4">Stay up to date</h4>
              <div className="flex gap-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:border-black"
                />
                <button className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2">
                  Signup <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500">
                By submitting this form I have read and acknowledged the <Link href="#" className="text-blue-500 hover:underline">Privacy Policy</Link>
              </p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-24 text-sm text-gray-500">
            <div className="flex items-center gap-6">
              <span>© Shop.AI 2026</span>
              <Link href="#" className="hover:text-black">Terms</Link>
              <Link href="#" className="hover:text-black">Privacy</Link>
            </div>
            <div className="flex items-center gap-8 font-display font-bold text-gray-400">
              <span>Balderton.</span>
              <span>Accel</span>
              <span>ICONIQ</span>
              <span>Tencent</span>
            </div>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}
