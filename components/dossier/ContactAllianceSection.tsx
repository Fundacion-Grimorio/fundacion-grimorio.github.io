
import React from 'react';
import { CONTACTO_TEXT, CONTACTO_SLOGAN } from '../../constants';

const ContactAllianceSection: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <p className="text-lg md:text-xl text-[var(--codex-gray)] leading-relaxed mb-8 whitespace-pre-line font-mono">
        {CONTACTO_TEXT}
      </p>
      <p className="text-2xl md:text-3xl text-[var(--codex-cyan)] font-heading font-semibold italic text-glow-blue mb-10">
        {CONTACTO_SLOGAN}
      </p>
      <div className="mt-10">
        <a 
          href="mailto:contacto@fundaciongrimorio.org"
          className="bg-[var(--codex-pink)] hover:bg-fuchsia-500 text-white font-heading font-semibold py-3 px-8 rounded-md text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-[var(--codex-pink)]/30 hover:shadow-[var(--codex-pink)]/50 focus:outline-none focus:ring-4 focus:ring-[var(--codex-pink)]/50"
        >
          ¡Súmate Ahora!
        </a>
      </div>
    </div>
  );
};

export default ContactAllianceSection;