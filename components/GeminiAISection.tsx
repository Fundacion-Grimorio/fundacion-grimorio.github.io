
import React, { useState, useRef, useEffect } from 'react';
import { askGrimorioAI } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Spinner } from './common/Spinner';
import { GrimorioLogoIcon } from './icons/GrimorioLogoIcon';
import toast from 'react-hot-toast';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
  </svg>
);

const GeminiAISection: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const initialMessage: ChatMessage = {
    id: 'initial-ai-message',
    text: 'SYSTEM ONLINE. Soy el asistente virtual de Fundación Grimorio. ¿Consulta?',
    sender: 'ai',
    timestamp: new Date(),
  };

  useEffect(() => {
    setMessages([initialMessage]);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: userInput,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const aiResponseText = await askGrimorioAI(userMessage.text);
      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        text: aiResponseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
      toast.error("AI_RESPONSE_ERROR: No se pudo obtener respuesta.");
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: "KERNEL_PANIC: No pude procesar tu solicitud.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-[var(--codex-dark-compliment)] shadow-2xl shadow-[var(--codex-cyan)]/10 rounded-lg overflow-hidden border border-[var(--codex-cyan)]/30">
      <div 
        ref={chatContainerRef} 
        className="h-96 p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-[var(--codex-dark-compliment)]"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end space-x-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}
          >
            {msg.sender === 'ai' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--codex-cyan)] flex items-center justify-center text-[var(--codex-dark-purple)]">
                <GrimorioLogoIcon className="w-5 h-5" />
              </div>
            )}
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg shadow-md ${
                msg.sender === 'user'
                  ? 'bg-[var(--codex-pink)] text-white rounded-br-none'
                  : 'bg-gray-800 text-[var(--codex-gray)] rounded-bl-none' 
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono">{msg.text}</p>
              <p className={`font-mono text-xs mt-1 ${msg.sender === 'user' ? 'text-pink-200 text-right' : 'text-gray-500'}`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </p>
            </div>
             {msg.sender === 'user' && (
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--codex-pink)] flex items-center justify-center text-white border-2 border-pink-300">
                <UserIcon />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end space-x-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--codex-cyan)] flex items-center justify-center text-[var(--codex-dark-purple)]">
               <GrimorioLogoIcon className="w-5 h-5" />
            </div>
            <div className="max-w-xs lg:max-w-md px-4 py-3 rounded-lg bg-gray-800 text-[var(--codex-gray)] rounded-bl-none">
              <Spinner size="sm" color="text-[var(--codex-cyan)]" />
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="p-4 border-t border-[var(--codex-cyan)]/30 bg-[var(--codex-dark-compliment)]/50 flex items-center space-x-3">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="INPUT QUERY :::"
          className="flex-grow bg-gray-700 text-[var(--codex-gray)] placeholder-gray-500 border border-gray-600 rounded-md py-2.5 px-4 focus:ring-2 focus:ring-[var(--codex-pink)] focus:border-[var(--codex-pink)] outline-none transition-colors font-mono"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !userInput.trim()}
          className="bg-[var(--codex-cyan)] hover:bg-teal-300 disabled:bg-gray-600 disabled:text-gray-400 text-[var(--codex-dark-purple)] font-heading font-semibold py-2.5 px-5 rounded-md transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-white"
        >
          {isLoading ? <Spinner size="sm" color="text-[var(--codex-dark-purple)]" /> : 
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path d="M3.105 3.105a1.5 1.5 0 0 1 2.122-.001L19.43 14.282c.39.39.39 1.023 0 1.414L14.283 19.43a1.5 1.5 0 0 1-2.122-.001L3.105 5.222a1.5 1.5 0 0 1 .001-2.122Zm1.696-.212L4.59 3.105l-.001.002 9.192 9.192.212.212 1.061-1.06L4.801 2.893Z" />
            </svg>
          }
        </button>
      </form>
    </div>
  );
};

export default GeminiAISection;