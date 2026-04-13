'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { useStore } from '@/store/useStore';
import Navbar from '@/components/Navbar';
import { User, Shield, Bell, AlertTriangle, Camera, Save } from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { isLoggedIn, currentUser } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/auth/signin');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !currentUser) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'preferences', label: 'Preferences', icon: <Bell className="w-4 h-4" /> },
    { id: 'danger', label: 'Danger Zone', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 pt-32 pb-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <h1 className="text-3xl font-display font-medium text-gray-900 mb-8">Settings</h1>
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id 
                    ? tab.id === 'danger' 
                      ? 'bg-red-50 text-red-600' 
                      : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white border border-gray-200 rounded-2xl p-8 md:p-12 shadow-sm"
          >
            {activeTab === 'profile' && (
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-display font-medium text-gray-900 mb-1">Public Profile</h2>
                    <p className="text-gray-500 text-sm">Manage your personal information.</p>
                  </div>
                  <button 
                    onClick={() => setIsEditing(!isEditing)}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm"
                  >
                    {isEditing ? <><Save className="w-4 h-4" /> Save</> : 'Edit'}
                  </button>
                </div>

                <div className="flex items-center gap-6 pb-8 border-b border-gray-100">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-3xl font-medium border border-gray-200">
                      {currentUser.name.charAt(0)}
                    </div>
                    {isEditing && (
                      <button className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="w-6 h-6 text-white" />
                      </button>
                    )}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{currentUser.plan} PLAN</div>
                    <div className="text-sm text-gray-500">JPG, GIF or PNG. Max size of 800K</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Display Name</label>
                      <input 
                        type="text" 
                        defaultValue={currentUser.name}
                        disabled={!isEditing}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 focus:bg-white transition-colors disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-600">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={currentUser.email}
                        disabled={!isEditing}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 focus:bg-white transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-medium text-gray-900 mb-1">Security</h2>
                  <p className="text-gray-500 text-sm">Manage your password and authentication.</p>
                </div>
                
                <div className="space-y-6 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Current Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 focus:bg-white transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">New Password</label>
                    <input type="password" placeholder="••••••••" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:border-gray-400 focus:bg-white transition-colors" />
                  </div>
                  <button className="px-6 py-3 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-medium text-gray-900 mb-1">Preferences</h2>
                  <p className="text-gray-500 text-sm">Customize your Shop.AI experience.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Dark Mode</div>
                      <div className="text-sm text-gray-500">Shop.AI is currently optimized for light mode only.</div>
                    </div>
                    <div className="w-12 h-6 bg-gray-300 rounded-full relative cursor-not-allowed opacity-50">
                      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900 mb-1">Email Notifications</div>
                      <div className="text-sm text-gray-500">Receive weekly comparison digests.</div>
                    </div>
                    <div className="w-12 h-6 bg-blue-500 rounded-full relative cursor-pointer">
                      <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'danger' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-display font-medium mb-1 text-red-600">Danger Zone</h2>
                  <p className="text-gray-500 text-sm">Irreversible actions for your account.</p>
                </div>
                
                <div className="p-6 border border-red-200 bg-red-50 rounded-xl">
                  <h3 className="font-medium text-red-600 mb-2">Delete Account</h3>
                  <p className="text-sm text-red-500/80 mb-6">
                    Once you delete your account, there is no going back. Please be certain. All your comparison history and saved data will be permanently erased.
                  </p>
                  <button className="px-6 py-3 bg-white text-red-600 border border-red-200 rounded-lg font-medium hover:bg-red-50 transition-colors shadow-sm">
                    Delete Account
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}
