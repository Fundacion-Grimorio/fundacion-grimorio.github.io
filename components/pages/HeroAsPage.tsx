
import React from 'react';
import { GrimorioLogoIcon } from '../icons/GrimorioLogoIcon';
import { PageName } from '../../App';

interface HeroAsPageProps {
  navigateTo: (page: PageName) => void;
}

const HeroAsPage: React.FC<HeroAsPageProps> = ({ navigateTo }) => {
  return (
    <section className="relative bg-[var(--tech-bg-dark)] text-[var(--tech-text-primary)] py-20 md:py-28 lg:py-32">
      {/* Subtle Background Elements */}
      <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute blur-[100px] h-64 w-64 rounded-full bg-gradient-to-br from-[var(--tech-accent-blue)]/30 to-[var(--tech-accent-cyan)]/20 top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute blur-[100px] h-72 w-72 rounded-full bg-gradient-to-tl from-[var(--tech-accent-cyan)]/30 to-[var(--tech-accent-blue)]/10 bottom-0 right-0 transform translate-x-1/4 translate-y-1/4"></div>
        </div>
         {/* Faint grid pattern */}
        <svg width="100%" height="100%" className="absolute inset-0 z-[1]">
          <defs>
            <pattern id="heroGridPattern" patternUnits="userSpaceOnUse" width="50" height="50">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--tech-border-color)" strokeWidth="0.5" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGridPattern)" />
        </svg>
      </div>
      
      <div className="relative container mx-auto px-6 lg:px-8 text-center z-[2]">
        <div className="flex justify-center mb-8">
          <GrimorioLogoIcon className="w-20 h-20 md:w-24 md:h-24 text-[var(--tech-accent-blue)]" />
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 text-[var(--tech-text-primary)]">
          Fundación Grimorio
        </h1>
        <p className="text-lg md:text-xl text-[var(--tech-text-secondary)] mb-10 max-w-2xl mx-auto">
          Innovación con Propósito Humano: Aplicando la tecnología para transformar la realidad.
        </p>
        <div className="space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => navigateTo('about')}
            className="inline-block bg-[var(--tech-accent-blue)] text-white font-semibold py-3 px-8 rounded-md text-base md:text-lg transition-colors duration-300 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--tech-bg-dark)] focus:ring-[var(--tech-accent-blue)]"
          >
            Conócenos Más
          </button>
          <button
            onClick={() => navigateTo('ai')}
            className="inline-block bg-transparent text-[var(--tech-accent-cyan)] font-semibold py-3 px-8 border-2 border-[var(--tech-accent-cyan)] rounded-md text-base md:text-lg transition-all duration-300 hover:bg-[var(--tech-accent-cyan)]/10 hover:text-[var(--tech-text-primary)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--tech-bg-dark)] focus:ring-[var(--tech-accent-cyan)]"
          >
            Asistente AI
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroAsPage;