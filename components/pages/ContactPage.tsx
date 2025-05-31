
import React from 'react';
import { CONTACTO_TEXT, CONTACTO_SLOGAN } from '../../constants';

const ContactPage: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-[var(--tech-bg-medium)]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-10 text-[var(--tech-text-primary)]">
            Contacto y Alianzas
          </h1>
          <p className="text-lg text-[var(--tech-text-secondary)] leading-relaxed mb-8 whitespace-pre-line">
            {CONTACTO_TEXT}
          </p>
          <p className="text-xl md:text-2xl text-[var(--tech-accent-cyan)] font-semibold italic mb-10">
            {CONTACTO_SLOGAN}
          </p>
          <div className="mt-8">
            <a 
              href="mailto:contacto@fundaciongrimorio.org" // Replace with actual contact email
              className="inline-block bg-[var(--tech-accent-blue)] hover:bg-blue-600 text-white font-semibold py-3 px-10 rounded-md text-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--tech-bg-medium)] focus:ring-[var(--tech-accent-blue)] shadow-md hover:shadow-lg"
            >
              Escríbenos
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;