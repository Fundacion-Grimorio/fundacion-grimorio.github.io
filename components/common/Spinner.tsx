
import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string; 
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', color = 'text-[var(--tech-accent-blue)]' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2', // Slightly smaller sm spinner
    md: 'w-6 h-6 border-[3px]', // Slightly smaller md spinner
    lg: 'w-10 h-10 border-4',
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${color} border-t-transparent`}
        style={{ borderTopColor: 'transparent' }} 
      ></div>
    </div>
  );
};