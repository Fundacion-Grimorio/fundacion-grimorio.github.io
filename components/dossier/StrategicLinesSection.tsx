
import React from 'react';
import { LINEAS_ESTRATEGICAS_LIST } from '../../constants';

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-[var(--tech-accent-cyan)]">
    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
  </svg>
);

const StrategicLinesContent: React.FC = () => {
  return (
    <div className="max-w-2xl mx-auto bg-[var(--tech-bg-light)]/50 p-6 md:p-8 rounded-lg border border-[var(--tech-border-color)]">
      <ul className="space-y-4">
        {LINEAS_ESTRATEGICAS_LIST.map((linea, index) => (
          <li key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <CheckIcon />
            </div>
            <span className="text-[var(--tech-text-secondary)] text-base md:text-lg">{linea}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StrategicLinesContent;