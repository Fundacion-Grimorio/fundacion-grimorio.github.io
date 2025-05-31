
import React from 'react';
import { APP_NAME } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--tech-bg-medium)] border-t border-[var(--tech-border-color)]">
      <div className="container mx-auto px-6 lg:px-8 py-6 text-center">
        <p className="text-sm text-[var(--tech-text-secondary)]">
          &copy; {new Date().getFullYear()} {APP_NAME}. Todos los derechos reservados.
        </p>
        <p className="text-xs text-[var(--tech-text-secondary)]/70 mt-1">
          Innovación con propósito humano.
        </p>
      </div>
    </footer>
  );
};

export default Footer;