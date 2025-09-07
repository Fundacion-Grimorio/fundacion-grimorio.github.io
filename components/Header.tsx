import React, { useState } from 'react';

interface HeaderProps {
  onProjectsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProjectsClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#quienes-somos', label: 'Quiénes Somos' },
    { href: '#proyectos', label: 'Proyectos', isModal: true },
    { href: '#modelo', label: 'Nuestro Modelo' },
    { href: '#ciencia', label: 'Fundación' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isModal?: boolean) => {
    e.preventDefault();
    if (isModal) {
      onProjectsClick();
    } else {
      const targetId = href.slice(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-lg bg-white/80 border-b border-gray-200/80">
      <nav className="container mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="text-2xl font-bold text-[#1d1d1f] tracking-wide">
          GRIMORIO
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={(e) => handleNavClick(e, link.href, link.isModal)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[#1d1d1f] focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col items-center px-4 pt-2 pb-4 space-y-4">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                onClick={(e) => handleNavClick(e, link.href, link.isModal)} 
                className="text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;