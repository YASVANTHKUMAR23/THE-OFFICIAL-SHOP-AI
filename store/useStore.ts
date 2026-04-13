import { create } from 'zustand';

export type Plan = 'Free' | 'Pro' | 'Enterprise';

export interface User {
  name: string;
  email: string;
  plan: Plan;
  avatar?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  result?: {
    topPick: string;
    confidence: number;
    sources: number;
    reasoning: string;
    metrics: { label: string; value: string }[];
  };
}

export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  messages: ChatMessage[];
}

export type AgentStatus = 'idle' | 'active' | 'complete';

interface AppState {
  isLoggedIn: boolean;
  currentUser: User | null;
  activeChat: string | null;
  chatHistory: ChatSession[];
  agentStatus: {
    search: AgentStatus;
    comparison: AgentStatus;
    decision: AgentStatus;
  };
  activeFeaturesTab: string;
  sidebarOpen: boolean;

  // Actions
  login: (user: User) => void;
  logout: () => void;
  setActiveChat: (id: string | null) => void;
  addChatSession: (session: ChatSession) => void;
  updateChatSession: (id: string, messages: ChatMessage[]) => void;
  setAgentStatus: (agent: 'search' | 'comparison' | 'decision', status: AgentStatus) => void;
  resetAgents: () => void;
  setActiveFeaturesTab: (tab: string) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
}

const MOCK_USER: User = {
  name: "Yasvanth",
  email: "yasvanth@example.com",
  plan: "Free"
};

const MOCK_HISTORY: ChatSession[] = [
  { id: '1', title: "iPhone 15 vs 14 Pro Comparison", timestamp: "2 hours ago", messages: [] },
  { id: '2', title: "Best Budget Laptops Under ₹50K", timestamp: "Yesterday", messages: [] },
  { id: '3', title: "Sony WH-1000XM5 vs Bose QC45", timestamp: "3 days ago", messages: [] },
  { id: '4', title: "Gaming Monitors 2024 Rankings", timestamp: "1 week ago", messages: [] },
  { id: '5', title: "Noise-Cancelling Earbuds — Final Pick", timestamp: "2 weeks ago", messages: [] },
];

export const useStore = create<AppState>((set) => ({
  isLoggedIn: false,
  currentUser: null,
  activeChat: null,
  chatHistory: MOCK_HISTORY,
  agentStatus: {
    search: 'idle',
    comparison: 'idle',
    decision: 'idle',
  },
  activeFeaturesTab: 'A2UI Pipeline',
  sidebarOpen: true,

  login: (user) => set({ isLoggedIn: true, currentUser: user }),
  logout: () => set({ isLoggedIn: false, currentUser: null, activeChat: null }),
  setActiveChat: (id) => set({ activeChat: id }),
  addChatSession: (session) => set((state) => ({ chatHistory: [session, ...state.chatHistory] })),
  updateChatSession: (id, messages) => set((state) => ({
    chatHistory: state.chatHistory.map(chat => 
      chat.id === id ? { ...chat, messages } : chat
    )
  })),
  setAgentStatus: (agent, status) => set((state) => ({
    agentStatus: { ...state.agentStatus, [agent]: status }
  })),
  resetAgents: () => set({
    agentStatus: { search: 'idle', comparison: 'idle', decision: 'idle' }
  }),
  setActiveFeaturesTab: (tab) => set({ activeFeaturesTab: tab }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
