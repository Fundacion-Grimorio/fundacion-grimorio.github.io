
import React from 'react';

export const GrimorioLogoIcon = ({ className = "w-8 h-8" }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Path for the outer shape of the open book */}
    <path d="M4 6 L4 18 L12 15 L20 18 L20 6 L12 9 L4 6 Z" />
    {/* Path for the central spine of the book */}
    <path d="M12 9 L12 15" />
  </svg>
);