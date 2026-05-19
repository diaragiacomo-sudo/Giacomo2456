import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages
        }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Scusa, si è verificato un errore. Riprova più tardi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="chatbot-container" className="fixed bottom-6 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] h-[500px] glass rounded-2xl flex flex-col shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Bot size={18} className="text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Giacomo assistant</h3>
                  <p className="text-[10px] text-accent font-medium">Online</p>
                </div>
              </div>
              <button
                id="close-chat"
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/10 rounded-full transition-colors text-neutral-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div
              id="chat-messages"
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-white/10"
            >
              {messages.length === 0 && (
                <div className="text-center py-10 space-y-2">
                  <Bot size={32} className="mx-auto text-white/20" />
                  <p className="text-sm text-neutral-400 px-6">
                    Ciao! Sono l'assistente di Giacomo. Chiedimi pure qualsiasi cosa sul suo lavoro!
                  </p>
                </div>
              )}
              {messages.map((message, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    message.role === 'user' ? "ml-auto items-end" : "mr-auto items-start"
                  )}
                >
                  <div
                    className={cn(
                      "px-4 py-2 rounded-2xl text-sm",
                      message.role === 'user'
                        ? "bg-accent text-neutral-900 rounded-tr-none"
                        : "bg-white/10 text-white rounded-tl-none"
                    )}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none flex gap-1">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-1.5 h-1.5 bg-accent/60 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                      className="w-1.5 h-1.5 bg-accent/60 rounded-full"
                    />
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                      className="w-1.5 h-1.5 bg-accent/60 rounded-full"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-white/5">
              <div className="relative">
                <input
                  id="chat-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Scrivi un messaggio..."
                  className="w-full bg-white/10 border border-white/10 rounded-full py-2 pl-4 pr-12 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                />
                <button
                  id="send-message"
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1 top-1/2 -translate-y-1/2 p-2 text-accent hover:bg-white/5 rounded-full disabled:opacity-50 transition-all"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="toggle-chat"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-accent text-neutral-900 rounded-full flex items-center justify-center shadow-lg shadow-accent/20 hover:shadow-accent/40 transition-all relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
           <span className="absolute -top-1 -right-1 flex h-3 w-3">
           <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
           <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
         </span>
        )}
      </motion.button>
    </div>
  );
}
