
import React, { useState } from 'react';
// NavItem might need href to be PageName in types.ts if we want to be strict, but page prop works
import { GrimorioLogoIcon } from './icons/GrimorioLogoIcon';
import { APP_NAME } from '../constants';
import { PageName } from '../App'; // Import PageName

interface HeaderProps {
  navigateTo: (page: PageName) => void;
  currentPage: PageName;
}

interface HeaderNavItem {
  name: string;
  page: PageName;
}

const navItems: HeaderNavItem[] = [
  { name: 'Inicio', page: 'home' },
  { name: 'Nosotros', page: 'about' },
  { name: 'Proyectos', page: 'projects' },
  { name: 'Diversipedia', page: 'diversipedia' }, // Renamed "Recursos" to "Diversipedia"
  { name: 'Asistente AI', page: 'ai' },
  { name: 'Contacto', page: 'contact' },
];

const Header: React.FC<HeaderProps> = ({ navigateTo, currentPage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageName) => {
    navigateTo(page);
    setMobileMenuOpen(false); // Close mobile menu on navigation
  };

  return (
    <header className="bg-[var(--tech-bg-medium)]/80 backdrop-blur-md sticky top-0 z-50 shadow-lg border-b border-[var(--tech-border-color)]">
      <nav className="container mx-auto px-6 lg:px-8 py-3.5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 group focus:outline-none"
            aria-label="Ir a la página de inicio"
          >
            <GrimorioLogoIcon className="w-9 h-9 text-[var(--tech-accent-blue)] animate-pulse-glow-tech" />
            <span className="font-heading text-xl font-bold text-[var(--tech-text-primary)] group-hover:text-[var(--tech-accent-blue)] transition-colors">{APP_NAME}</span>
          </button>
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className={`font-semibold px-4 py-2 rounded-md text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--tech-bg-medium)] focus:ring-[var(--tech-accent-blue)] ${
                  currentPage === item.page
                    ? 'text-[var(--tech-accent-blue)] bg-[var(--tech-bg-light)]'
                    : `text-[var(--tech-text-secondary)] hover:text-[var(--tech-text-primary)] hover:bg-[var(--tech-bg-light)] ${item.page === 'ai' && currentPage !== 'ai' ? 'animate-pulse-glow-tech' : ''}`
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-[var(--tech-text-secondary)] hover:text-[var(--tech-accent-blue)] focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 bg-[var(--tech-bg-light)] rounded-md p-2 shadow-md" id="mobile-menu">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.page)}
                className={`block w-full text-left font-semibold px-3 py-2.5 rounded-md text-base transition-colors duration-200 focus:outline-none ${
                  currentPage === item.page
                    ? 'text-[var(--tech-accent-blue)] bg-[var(--tech-bg-medium)]'
                    : `text-[var(--tech-text-secondary)] hover:text-[var(--tech-text-primary)] hover:bg-[var(--tech-bg-medium)] ${item.page === 'ai' && currentPage !== 'ai' ? 'animate-pulse-glow-tech' : ''}`
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
