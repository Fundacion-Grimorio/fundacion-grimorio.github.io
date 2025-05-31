
import React from 'react';

interface SubtleTechPatternProps {
  className?: string;
  dotColor?: string; 
  dotSize?: number;
  spacing?: number;
  opacity?: number;
}

// This pattern is now very subtle. Consider if it's needed for the "serious tech" look.
// It might be replaced by a static SVG background or removed from HeroAsPage.
export const SubtleTechPattern: React.FC<SubtleTechPatternProps> = ({ 
  className,
  dotColor = "var(--tech-border-color)", // Use a very subtle color from the theme
  dotSize = 0.3, // Made dots extremely small
  spacing = 25, // Increased spacing for a sparser pattern
  opacity = 0.2 // Very low opacity
}) => {
  return (
    <div aria-hidden="true" className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} style={{ opacity }}>
      <svg width="100%" height="100%">
        <defs>
          <pattern 
            id="verySubtleDotPattern" 
            patternUnits="userSpaceOnUse" 
            width={spacing} 
            height={spacing}
          >
            <circle cx={dotSize} cy={dotSize} r={dotSize} fill={dotColor} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#verySubtleDotPattern)" />
      </svg>
    </div>
  );
};