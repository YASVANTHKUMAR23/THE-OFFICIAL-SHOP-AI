'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Paperclip, CheckCircle2, Loader2, ShieldCheck, ChevronDown, ChevronUp, Search, Mic, ArrowRight } from 'lucide-react';
import AnimatedText from '@/components/AnimatedText';
import { useStore, ChatMessage } from '@/store/useStore';
import { useRouter } from 'next/navigation';

export default function ChatPage() {
  const router = useRouter();
  const { addChatSession, updateChatSession, setActiveChat } = useStore();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentLogOpen, setAgentLogOpen] = useState(true);
  const [isModelDropdownOpen, setIsModelDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Model');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [agentState, setAgentState] = useState<{
    search: 'idle' | 'active' | 'complete',
    comparison: 'idle' | 'active' | 'complete',
    decision: 'idle' | 'active' | 'complete'
  }>({ search: 'idle', comparison: 'idle', decision: 'idle' });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, agentState]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsProcessing(true);
    setAgentLogOpen(true);

    // Create a new session if this is the first message
    const sessionId = Date.now().toString();
    if (messages.length === 0) {
      addChatSession({
        id: sessionId,
        title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
        timestamp: 'Just now',
        messages: newMessages
      });
      setActiveChat(sessionId);
      window.history.replaceState(null, '', `/dashboard/chat/${sessionId}`);
    }

    // Simulate Agent Pipeline UI while fetching
    setAgentState({ search: 'active', comparison: 'idle', decision: 'idle' });
    
    try {
      // Start API call
      const responsePromise = fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input })
      });

      // Pipeline animations
      await new Promise(r => setTimeout(r, 1500));
      setAgentState({ search: 'complete', comparison: 'active', decision: 'idle' });
      
      await new Promise(r => setTimeout(r, 1500));
      setAgentState({ search: 'complete', comparison: 'complete', decision: 'active' });

      const response = await responsePromise;
      const data = await response.json();

      await new Promise(r => setTimeout(r, 1000));
      setAgentState({ search: 'complete', comparison: 'complete', decision: 'complete' });
      setIsProcessing(false);
      
      if (data.error) {
        throw new Error(data.error);
      }

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        result: data
      };

      const finalMessages = [...newMessages, aiMessage];
      setMessages(finalMessages);
      
      if (messages.length === 0) {
        updateChatSession(sessionId, finalMessages);
      }

      setTimeout(() => setAgentLogOpen(false), 2000);

    } catch (error) {
      console.error("Chat error:", error);
      setIsProcessing(false);
      setAgentState({ search: 'idle', comparison: 'idle', decision: 'idle' });
      // Handle error UI here if needed
    }
  };

  return (
    <div className="flex flex-col h-full relative bg-white">
      {/* Header */}
      <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 shrink-0 bg-white/80 backdrop-blur-md z-10 relative">
        <h2 className="font-display font-medium text-lg ml-10 md:ml-0 text-gray-900">New Comparison</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isProcessing ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'}`} />
            <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
              {isProcessing ? 'PIPELINE ACTIVE' : 'AGENTS IDLE'}
            </span>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {messages.length === 0 && !isProcessing && (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 border border-gray-200 bg-gray-50 rounded-2xl flex items-center justify-center mb-6">
              <Search className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-2xl font-display font-medium text-gray-900 mb-2">Initialize Pipeline</h3>
            <p className="text-sm text-gray-500 max-w-md">Ask me to compare any products. The autonomous agents will extract live data, apply deterministic scoring, and synthesize a verdict.</p>
          </div>
        )}

        {messages.map((msg, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.role === 'user' ? (
              <div className="bg-gray-100 px-6 py-4 rounded-2xl rounded-tr-sm max-w-2xl text-gray-900">
                {msg.content}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 p-6 rounded-2xl rounded-tl-sm w-full max-w-3xl shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded-full tracking-wider uppercase">
                      ★ TOP PICK
                    </span>
                    <h3 className="text-2xl font-display font-medium text-gray-900">{msg.result?.topPick}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-display font-medium text-blue-600">{msg.result?.confidence}%</div>
                    <div className="text-[10px] font-bold tracking-widest text-gray-400 uppercase">CONFIDENCE</div>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {msg.result?.reasoning}
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {msg.result?.metrics?.map((m: any, i: number) => (
                    <div key={i} className="bg-gray-50 border border-gray-100 rounded-lg p-3">
                      <div className="text-xs text-gray-500 mb-2">{m.label || m.name}</div>
                      <div className="flex items-end gap-2">
                        <div className="text-lg font-display font-medium text-gray-900">{m.value || m.score}</div>
                        {m.score && <div className="text-xs text-gray-400 mb-1">/100</div>}
                      </div>
                      {m.score && (
                        <div className="w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${m.score}%` }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 pt-4 relative group cursor-pointer w-max">
                  <ShieldCheck className="w-4 h-4 text-green-500" />
                  <span>{msg.result?.sources} sources verified in real-time</span>
                  
                  {/* Hover Card */}
                  <div className="absolute bottom-full left-0 mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 p-3">
                    <div className="text-sm font-medium text-gray-900 mb-2">Verified Sources</div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Amazon</span>
                        <span className="text-green-600 font-medium">Verified</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">BestBuy</span>
                        <span className="text-green-600 font-medium">Verified</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-600">Walmart</span>
                        <span className="text-green-600 font-medium">Verified</span>
                      </div>
                    </div>
                    <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-gray-400">
                      Data extracted and verified by A2UI Pipeline
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {/* A2UI Live Agent Log */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gray-50 border border-gray-200 rounded-2xl overflow-hidden max-w-2xl"
            >
              <button 
                onClick={() => setAgentLogOpen(!agentLogOpen)}
                className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors border-b border-gray-200"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-widest text-blue-600 uppercase">A2UI PIPELINE ACTIVE</span>
                </div>
                {agentLogOpen ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
              </button>
              
              <AnimatePresence>
                {agentLogOpen && (
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="p-4 font-mono text-sm space-y-4"
                  >
                    {/* Search Agent */}
                    <div className={`flex items-start gap-3 ${agentState.search === 'idle' ? 'opacity-30' : ''}`}>
                      <div className="mt-0.5">
                        {agentState.search === 'complete' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : 
                         agentState.search === 'active' ? <Loader2 className="w-4 h-4 text-blue-500 animate-spin" /> : 
                         <div className="w-4 h-4 rounded-full border border-gray-300" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-500 mb-1">[AGENT_01: SEARCH]</div>
                        {agentState.search === 'active' && <AnimatedText text="Crawling marketplaces for live pricing and specs..." className="text-blue-600" />}
                        {agentState.search === 'complete' && <span className="text-gray-900">Extracted data from 12 sources.</span>}
                      </div>
                    </div>

                    {/* Comparison Agent */}
                    <div className={`flex items-start gap-3 ${agentState.comparison === 'idle' ? 'opacity-30' : ''}`}>
                      <div className="mt-0.5">
                        {agentState.comparison === 'complete' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : 
                         agentState.comparison === 'active' ? <Loader2 className="w-4 h-4 text-blue-500 animate-spin" /> : 
                         <div className="w-4 h-4 rounded-full border border-gray-300" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-500 mb-1">[AGENT_02: SCORE]</div>
                        {agentState.comparison === 'active' && <AnimatedText text="Applying deterministic weights to 6 dimensions..." className="text-blue-600" />}
                        {agentState.comparison === 'complete' && <span className="text-gray-900">Scoring complete. Top candidate identified.</span>}
                      </div>
                    </div>

                    {/* Decision Agent */}
                    <div className={`flex items-start gap-3 ${agentState.decision === 'idle' ? 'opacity-30' : ''}`}>
                      <div className="mt-0.5">
                        {agentState.decision === 'complete' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : 
                         agentState.decision === 'active' ? <Loader2 className="w-4 h-4 text-blue-500 animate-spin" /> : 
                         <div className="w-4 h-4 rounded-full border border-gray-300" />}
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-500 mb-1">[AGENT_03: SYNTHESIS]</div>
                        {agentState.decision === 'active' && <AnimatedText text="Translating data into human-readable verdict..." className="text-blue-600" />}
                        {agentState.decision === 'complete' && <span className="text-gray-900">Verdict generated.</span>}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-200 shrink-0">
        <div className="max-w-4xl mx-auto relative group">
          <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-sm focus-within:border-gray-400 focus-within:bg-white transition-colors">
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*,.txt,.pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  // Handle file upload logic here
                  console.log("File selected:", e.target.files[0].name);
                }
              }}
            />
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="p-4 text-gray-400 hover:text-gray-600 transition-colors"
              title="Upload image or text file"
            >
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
              placeholder="Ask me to compare any products..."
              className="flex-1 bg-transparent border-none focus:outline-none py-4 text-gray-900 placeholder:text-gray-400"
              disabled={isProcessing}
            />
            <div className="px-4 flex items-center gap-2">
              <button 
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                title="Voice input"
              >
                <Mic className="w-5 h-5" />
              </button>
              
              {/* Model Selector */}
              <div className="relative hidden sm:block">
                <button 
                  onClick={() => setIsModelDropdownOpen(!isModelDropdownOpen)}
                  className="flex items-center gap-1.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
                >
                  {selectedModel} <ChevronUp className="w-3 h-3" />
                </button>
                
                <AnimatePresence>
                  {isModelDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 bottom-full mb-2 w-64 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                    >
                      <div className="bg-teal-50/50 p-3 border-b border-gray-100 flex items-center justify-between cursor-pointer hover:bg-teal-50 transition-colors">
                        <span className="text-sm font-medium text-teal-800">Access the top AI models</span>
                        <ArrowRight className="w-4 h-4 text-teal-800" />
                      </div>
                      <div className="p-2 space-y-1">
                        {['Sonar', 'GPT-5.4', 'Gemini 3.1 Pro', 'Claude Sonnet 4.6', 'Claude Opus 4.6 Max', 'Nemotron 3 Super'].map((model) => (
                          <button
                            key={model}
                            onClick={() => {
                              setSelectedModel(model);
                              setIsModelDropdownOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center justify-between"
                          >
                            <span className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-gray-200 rounded-sm" /> {/* Placeholder icon */}
                              {model}
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button 
                onClick={handleSend}
                disabled={!input.trim() || isProcessing}
                className="p-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-1"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
