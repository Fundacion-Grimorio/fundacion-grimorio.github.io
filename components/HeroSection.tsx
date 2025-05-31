
import React from 'react';
import { GrimorioLogoIcon } from './icons/GrimorioLogoIcon';
import { SubtleTechPattern } from './common/SubtleTechPattern';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative bg-[var(--codex-dark-purple)] text-white py-24 md:py-32 lg:py-48 overflow-hidden">
      {/* Layer 1: Base Gradient Blurs (Deep Background) */}
      <div aria-hidden="true" className="absolute inset-0 z-0">
        <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40"> {/* Increased opacity */}
          <div className="blur-[120px] h-72 bg-gradient-to-br from-[var(--codex-cyan)]/40 to-[var(--codex-pink)]/30"></div>
          <div className="blur-[120px] h-56 bg-gradient-to-r from-[var(--codex-pink)]/40 to-purple-700/30"></div>
        </div>
      </div>

      {/* Layer 2: Subtle Tech Pattern Overlay */}
      <SubtleTechPattern className="absolute inset-0 z-[1] text-[var(--codex-cyan)]/15" />

      {/* Layer 3: Decorative Geometric Shapes */}
      <div aria-hidden="true" className="absolute inset-0 z-[2] overflow-hidden">
        <div className="absolute -top-1/3 -left-1/3 w-3/4 h-3/4 border-2 border-[var(--codex-cyan)]/20 rounded-full opacity-30 animate-pulse-glow-blue" style={{ animationDuration: '10s' }}></div>
        <div className="absolute -bottom-1/2 -right-1/3 w-full h-full border-l-2 border-t-2 border-[var(--codex-pink)]/20 rounded-full opacity-25 transform rotate-45 animate-pulse-glow-blue" style={{ animationDuration: '12s', animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3 border border-purple-500/20 rounded-full opacity-20 animate-pulse-glow-blue" style={{ animationDuration: '8s', animationDelay: '0.5s' }}></div>
      </div>
      
      {/* Layer 4: Darkening Overlay for Text Contrast (Reduced opacity as base is darker) */}
      <div className="absolute inset-0 bg-[var(--codex-dark-purple)]/50 z-[3]"></div>

      {/* Layer 5: Content */}
      <div className="relative container mx-auto px-6 lg:px-8 text-center z-[4]">
        <div className="flex justify-center mb-10">
          <GrimorioLogoIcon className="w-28 h-28 md:w-36 md:h-36 text-[var(--codex-cyan)] animate-pulse-glow-blue" />
        </div>
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6">
          Fundación <span className="text-[var(--codex-cyan)] text-glow-blue text-glitch-subtle">Grimorio</span>
        </h1>
        <p className="font-mono text-xl md:text-2xl lg:text-3xl text-[var(--codex-light-gray)] mb-12 max-w-3xl mx-auto">
          Innovación con Propósito Humano
        </p>
        <div className="space-y-5 sm:space-y-0 sm:space-x-6">
          <a
            href="#quienes-somos"
            className="inline-block bg-[var(--codex-cyan)] text-[var(--codex-dark-purple)] font-heading font-semibold py-3 px-10 rounded-md text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-[var(--codex-cyan)]/30 hover:shadow-[var(--codex-cyan)]/50 hover:bg-white focus:outline-none focus:ring-4 focus:ring-[var(--codex-cyan)]/50"
          >
            Conócenos
          </a>
          <a
            href="#grimorio-ai"
            className="inline-block bg-transparent text-[var(--codex-cyan)] font-heading font-semibold py-3 px-10 border-2 border-[var(--codex-cyan)] rounded-md text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-[var(--codex-cyan)]/20 hover:shadow-[var(--codex-cyan)]/40 hover:bg-[var(--codex-cyan)]/20 hover:text-white focus:outline-none focus:ring-4 focus:ring-[var(--codex-cyan)]/50"
          >
            Pregunta a la IA
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;