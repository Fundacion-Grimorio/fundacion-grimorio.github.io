
import React from 'react';

interface CardProps {
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  contentClassName?: string;
}

export const Card: React.FC<CardProps> = ({ title, children, icon, className = '', titleClassName = '', contentClassName = '' }) => {
  return (
    <div 
      className={`bg-[var(--tech-bg-medium)] p-6 rounded-lg shadow-lg border border-[var(--tech-border-color)] transition-shadow duration-300 hover:shadow-xl hover:border-[var(--tech-accent-blue)]/50 ${className}`}
    >
      {icon && <div className="text-[var(--tech-accent-cyan)] mb-4 flex justify-center">{icon}</div>}
      <h3 className={`font-heading text-xl font-semibold text-[var(--tech-text-primary)] mb-3 text-center ${titleClassName}`}>{title}</h3>
      <div className={`text-[var(--tech-text-secondary)] text-sm leading-relaxed ${contentClassName}`}>{children}</div>
    </div>
  );
};