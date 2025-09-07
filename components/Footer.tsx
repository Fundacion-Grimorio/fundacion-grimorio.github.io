import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white/70 mt-20">
      <div className="container mx-auto px-6 md:px-8 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] mb-4">¿Quieres sumarte al Grimorio?</h2>
        <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-10">
          Buscamos alianzas, mentorías, financiamiento, mentes creadoras y soñadoras que creen en el poder de la tecnología al servicio de la humanidad.
        </p>
        <a 
          href="https://www.instagram.com/madelain.tv/" 
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          ¡Hablemos!
        </a>
      </div>
      <div className="border-t border-gray-200 py-6">
        <p className="text-center text-gray-500">
          En comunidad, escribiremos el futuro, página por página.
        </p>
      </div>
    </footer>
  );
};

export default Footer;