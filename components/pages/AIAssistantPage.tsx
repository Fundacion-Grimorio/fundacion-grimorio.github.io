
import React, { useState, useRef, useEffect } from 'react';
import { askGrimorioAI } from '../../services/geminiService';
import { ChatMessage } from '../../types';
import { Spinner } from '../common/Spinner';
import { GrimorioLogoIcon } from '../icons/GrimorioLogoIcon';
import toast from 'react-hot-toast';

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
    <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
  </svg>
);

const AIAssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const initialMessage: ChatMessage = {
    id: 'initial-ai-message',
    text: 'Hola, soy el asistente virtual de Fundación Grimorio. ¿En qué puedo ayudarte hoy sobre la fundación?',
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
      toast.error("No se pudo obtener respuesta del asistente.");
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        text: "Lo siento, no pude procesar tu solicitud en este momento.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-[var(--tech-bg-dark)]">
      <div className="container mx-auto px-6 lg:px-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-4 text-[var(--tech-text-primary)]">
          Asistente AI Grimorio
        </h1>
        <p className="text-center text-[var(--tech-text-secondary)] mb-10 max-w-xl mx-auto">
          Consulta información sobre Fundación Grimorio. Nuestra IA utiliza el dossier institucional para responder.
        </p>
        <div className="max-w-2xl mx-auto bg-[var(--tech-bg-medium)] shadow-xl rounded-lg overflow-hidden border border-[var(--tech-border-color)]">
          <div 
            ref={chatContainerRef} 
            className="h-[30rem] p-4 md:p-6 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--tech-bg-light)] scrollbar-track-[var(--tech-bg-medium)]"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-end space-x-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
              >
                {msg.sender === 'ai' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tech-accent-blue)] flex items-center justify-center text-white">
                    <GrimorioLogoIcon className="w-5 h-5" />
                  </div>
                )}
                <div
                  className={`max-w-[70%] md:max-w-[65%] px-3.5 py-2.5 rounded-xl shadow ${
                    msg.sender === 'user'
                      ? 'bg-[var(--tech-accent-blue)] text-white rounded-br-lg'
                      : 'bg-[var(--tech-bg-light)] text-[var(--tech-text-primary)] rounded-bl-lg' 
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                  <p className={`text-xs mt-1.5 ${msg.sender === 'user' ? 'text-blue-100 text-right' : 'text-[var(--tech-text-secondary)]/80'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                 {msg.sender === 'user' && (
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tech-accent-cyan)] flex items-center justify-center text-white">
                    <UserIcon />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex items-end space-x-2.5">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--tech-accent-blue)] flex items-center justify-center text-white">
                   <GrimorioLogoIcon className="w-5 h-5" />
                </div>
                <div className="max-w-xs px-3.5 py-2.5 rounded-xl bg-[var(--tech-bg-light)] text-[var(--tech-text-primary)]">
                  <Spinner size="sm" color="text-[var(--tech-accent-blue)]" />
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-3 md:p-4 border-t border-[var(--tech-border-color)] bg-[var(--tech-bg-medium)]/70 flex items-center space-x-2.5">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Escribe tu pregunta aquí..."
              className="flex-grow bg-[var(--tech-bg-light)] text-[var(--tech-text-primary)] placeholder-[var(--tech-text-secondary)] border border-[var(--tech-border-color)] rounded-lg py-2.5 px-3.5 focus:ring-2 focus:ring-[var(--tech-accent-blue)] focus:border-[var(--tech-accent-blue)] outline-none transition-colors"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="bg-[var(--tech-accent-blue)] hover:bg-blue-600 disabled:bg-[var(--tech-bg-light)] disabled:text-[var(--tech-text-secondary)] text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--tech-bg-medium)] focus:ring-[var(--tech-accent-blue)]"
            >
              {isLoading ? <Spinner size="sm" color="text-white" /> : 
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path d="M3.105 3.105a1.5 1.5 0 0 1 2.122-.001L19.43 14.282c.39.39.39 1.023 0 1.414L14.283 19.43a1.5 1.5 0 0 1-2.122-.001L3.105 5.222a1.5 1.5 0 0 1 .001-2.122Z" />
                </svg>
              }
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AIAssistantPage;