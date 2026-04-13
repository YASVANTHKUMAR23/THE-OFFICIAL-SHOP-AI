'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { useStore } from '@/store/useStore';
import { MessageSquare, Plus, Search, Settings, PanelLeftClose, PanelLeftOpen, LogOut, MoreVertical, Trash2, Edit2, Share2, Check, X } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isLoggedIn, currentUser, chatHistory, activeChat, setActiveChat, sidebarOpen, toggleSidebar, setSidebarOpen, logout, deleteChatSession, renameChatSession } = useStore();
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

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
                  <div
                    key={chat.id}
                    className={`group relative w-full text-left px-3 py-3 rounded-lg transition-all flex flex-col gap-1 ${
                      activeChat === chat.id 
                        ? 'bg-gray-200 text-gray-900 font-medium' 
                        : 'hover:bg-gray-100 text-gray-600'
                    }`}
                  >
                    {editingChatId === chat.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="flex-1 bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:border-gray-500"
                          autoFocus
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              renameChatSession(chat.id, editTitle);
                              setEditingChatId(null);
                            } else if (e.key === 'Escape') {
                              setEditingChatId(null);
                            }
                          }}
                        />
                        <button onClick={() => { renameChatSession(chat.id, editTitle); setEditingChatId(null); }} className="text-green-600 hover:text-green-700">
                          <Check className="w-4 h-4" />
                        </button>
                        <button onClick={() => setEditingChatId(null)} className="text-red-600 hover:text-red-700">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => {
                            setActiveChat(chat.id);
                            router.push(`/dashboard/chat/${chat.id}`);
                          }}
                          className="text-sm truncate pr-6 text-left"
                        >
                          {chat.title}
                        </button>
                        <span className="text-xs opacity-50">{chat.timestamp}</span>
                        
                        <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenDropdownId(openDropdownId === chat.id ? null : chat.id);
                            }}
                            className="p-1 hover:bg-gray-200 rounded text-gray-500"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          
                          {openDropdownId === chat.id && (
                            <div className="absolute right-0 top-full mt-1 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setEditTitle(chat.title);
                                  setEditingChatId(chat.id);
                                  setOpenDropdownId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                              >
                                <Edit2 className="w-3 h-3" /> Rename
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setShareLink(`${window.location.origin}/dashboard/chat/${chat.id}`);
                                  setShareModalOpen(true);
                                  setOpenDropdownId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 text-gray-700"
                              >
                                <Share2 className="w-3 h-3" /> Share
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteChatSession(chat.id);
                                  if (activeChat === chat.id) router.push('/dashboard/chat');
                                  setOpenDropdownId(null);
                                }}
                                className="w-full text-left px-3 py-2 text-sm hover:bg-red-50 flex items-center gap-2 text-red-600"
                              >
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
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
          <>
            <div 
              className="absolute left-0 top-0 bottom-0 w-4 z-20 cursor-e-resize"
              onMouseEnter={() => setSidebarOpen(true)}
            />
            <button 
              onClick={toggleSidebar} 
              className="absolute top-4 left-4 z-10 p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 transition-colors shadow-sm"
            >
              <PanelLeftOpen className="w-5 h-5" />
            </button>
          </>
        )}
        {children}
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {shareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-display font-medium text-gray-900">Share Chat</h3>
                  <button 
                    onClick={() => { setShareModalOpen(false); setCopied(false); }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mb-4">Anyone with this link will be able to view this chat session.</p>
                <div className="flex items-center gap-2">
                  <input 
                    type="text" 
                    readOnly 
                    value={shareLink} 
                    className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-600 focus:outline-none"
                  />
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(shareLink);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                      copied ? 'bg-green-100 text-green-700' : 'bg-black text-white hover:bg-gray-800'
                    }`}
                  >
                    {copied ? <><Check className="w-4 h-4" /> Copied</> : 'Copy'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
