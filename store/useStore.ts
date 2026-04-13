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
  deleteChatSession: (id: string) => void;
  renameChatSession: (id: string, newTitle: string) => void;
}

const MOCK_USER: User = {
  name: "Yasvanth",
  email: "yasvanth@example.com",
  plan: "Free"
};

export const useStore = create<AppState>((set) => ({
  isLoggedIn: false,
  currentUser: null,
  activeChat: null,
  chatHistory: [],
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
  deleteChatSession: (id) => set((state) => ({
    chatHistory: state.chatHistory.filter(chat => chat.id !== id),
    activeChat: state.activeChat === id ? null : state.activeChat
  })),
  renameChatSession: (id, newTitle) => set((state) => ({
    chatHistory: state.chatHistory.map(chat =>
      chat.id === id ? { ...chat, title: newTitle } : chat
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
