import React from 'react';

const Hero: React.FC = () => {
  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.slice(1);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center text-center py-20">
      <div className="max-w-4xl">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-[#1d1d1f] leading-tight mb-6 opacity-0 animate-fade-in">
          Innovación con Propósito Humano.
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10 opacity-0 animate-fade-in animate-delay-200">
          Como una fuerza para transformar la realidad.
        </p>
        <a 
          href="#quienes-somos"
          onClick={(e) => handleScrollClick(e, '#quienes-somos')}
          className="cursor-pointer inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 opacity-0 animate-fade-in animate-delay-400"
        >
          Conoce Más
        </a>
      </div>
    </section>
  );
};

export default Hero;