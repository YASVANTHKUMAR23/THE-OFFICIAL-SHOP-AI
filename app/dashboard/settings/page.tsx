'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useStore } from '@/store/useStore';
import { User, Settings as SettingsIcon, Bell, Shield, CreditCard, Key, Check } from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { currentUser, login } = useStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (currentUser) {
      login({ ...currentUser, name, email });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'preferences', label: 'Preferences', icon: SettingsIcon },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'api', label: 'API Keys', icon: Key },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-display font-medium text-gray-900 mb-8">Settings</h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Settings Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm"
            >
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 mb-1">Profile Information</h2>
                    <p className="text-sm text-gray-500">Update your account&apos;s profile information and email address.</p>
                  </div>
                  
                  <div className="space-y-4 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-gray-400 focus:bg-white transition-colors"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex items-center gap-4">
                    <button
                      onClick={handleSave}
                      className="bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Save Changes
                    </button>
                    {saved && (
                      <span className="text-sm text-green-600 flex items-center gap-1">
                        <Check className="w-4 h-4" /> Saved successfully
                      </span>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-medium text-gray-900 mb-1">Billing & Plans</h2>
                    <p className="text-sm text-gray-500">Manage your subscription and payment methods.</p>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{currentUser?.plan || 'Free'} Plan</h3>
                        <p className="text-sm text-gray-500">You are currently on the {currentUser?.plan?.toLowerCase() || 'free'} plan.</p>
                      </div>
                      <span className="bg-gray-200 text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                        Current
                      </span>
                    </div>
                    
                    <div className="pt-4 border-t border-gray-200 flex gap-4">
                      {currentUser?.plan !== 'Pro' && (
                        <Link href="/checkout?plan=pro&billing=monthly" className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                          Upgrade to Pro
                        </Link>
                      )}
                      {currentUser?.plan !== 'Team' && (
                        <Link href="/checkout?plan=team&billing=monthly" className="bg-white border border-gray-200 text-gray-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                          Upgrade to Team
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab !== 'profile' && activeTab !== 'billing' && (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <SettingsIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Coming Soon</h3>
                  <p className="text-sm text-gray-500 max-w-sm">
                    The {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} settings are currently under development.
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
