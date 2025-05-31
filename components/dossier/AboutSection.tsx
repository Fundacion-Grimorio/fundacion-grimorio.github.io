
import React from 'react';
import { QUIENES_SOMOS_TEXT } from '../../constants';

// This component now primarily returns the content, assuming layout is handled by parent.
const AboutSectionContent: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto text-center lg:text-left">
      <p className="text-lg md:text-xl text-[var(--tech-text-secondary)] leading-relaxed whitespace-pre-line">
        {QUIENES_SOMOS_TEXT}
      </p>
    </div>
  );
};

export default AboutSectionContent;