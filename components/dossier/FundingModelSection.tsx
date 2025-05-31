
import React from 'react';
import { FINANCIAMIENTO_MODELO_TEXT, FINANCIAMIENTO_FUENTES_LIST, FINANCIAMIENTO_TRANSPARENCIA_TEXT } from '../../constants';

const BulletIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-[var(--tech-accent-cyan)]">
    <path fillRule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clipRule="evenodd" />
  </svg>
);

const FundingModelContent: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto bg-[var(--tech-bg-light)]/50 p-6 md:p-8 rounded-lg border border-[var(--tech-border-color)] text-center">
      <p className="text-[var(--tech-text-secondary)] text-lg mb-6">{FINANCIAMIENTO_MODELO_TEXT}</p>
      <ul className="space-y-3 mb-6 text-left inline-block">
        {FINANCIAMIENTO_FUENTES_LIST.map((fuente, index) => (
          <li key={index} className="flex items-center space-x-3">
            <BulletIcon />
            <span className="text-[var(--tech-text-secondary)] text-base">{fuente}</span>
          </li>
        ))}
      </ul>
      <p className="text-[var(--tech-accent-blue)] font-semibold italic text-md">{FINANCIAMIENTO_TRANSPARENCIA_TEXT}</p>
    </div>
  );
};

export default FundingModelContent;