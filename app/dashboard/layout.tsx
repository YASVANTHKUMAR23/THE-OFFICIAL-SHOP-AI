'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/store/useStore';
import { MessageSquare, Plus, Search, Settings, PanelLeftClose, PanelLeftOpen, LogOut } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, currentUser, chatHistory, activeChat, setActiveChat, sidebarOpen, toggleSidebar, logout } = useStore();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/signin');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !currentUser) return null;

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      {/* Sidebar */}
      <AnimatePresence initial={false}>
        {sidebarOpen && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-full border-r border-gray-200 bg-[#f9f8f6] flex flex-col shrink-0"
          >
            <div className="p-4 flex items-center justify-between">
              <Link href="/" className="text-2xl font-logo text-gray-900 tracking-wider">
                Shop.AI
              </Link>
              <button onClick={toggleSidebar} className="text-gray-500 hover:text-gray-900 transition-colors">
                <PanelLeftClose className="w-5 h-5" />
              </button>
            </div>

            <div className="px-4 mb-6">
              <button 
                onClick={() => { setActiveChat(null); router.push('/dashboard/chat'); }}
                className="w-full bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 transition-all rounded-xl py-3 flex items-center justify-center gap-2 font-medium shadow-sm"
              >
                <Plus className="w-4 h-4" /> New Chat
              </button>
            </div>

            <div className="px-4 mb-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search history..." 
                  className="w-full bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-gray-400 transition-colors placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 hide-scrollbar">
              <div className="space-y-1">
                {chatHistory.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => {
                      setActiveChat(chat.id);
                      router.push(`/dashboard/chat/${chat.id}`);
                    }}
                    className={`w-full text-left px-3 py-3 rounded-lg transition-all flex flex-col gap-1 ${
                      activeChat === chat.id 
                        ? 'bg-gray-200 text-gray-900 font-medium' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    <span className="text-sm truncate">{chat.title}</span>
                    <span className="text-xs opacity-50">{chat.timestamp}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-gray-900">{currentUser.name}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{currentUser.plan} PLAN</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/profile" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Settings className="w-4 h-4" />
                  </Link>
                  <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {!sidebarOpen && (
          <button 
            onClick={toggleSidebar} 
            className="absolute top-4 left-4 z-10 p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
          >
            <PanelLeftOpen className="w-5 h-5" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
