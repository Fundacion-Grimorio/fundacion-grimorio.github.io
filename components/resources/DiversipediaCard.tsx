
import React from 'react';
import { DiversipediaItem } from '../../types'; 

interface DiversipediaCardProps { 
  resource: DiversipediaItem; 
  onClick: () => void;
  categoryName?: string; 
}

export const DiversipediaCard: React.FC<DiversipediaCardProps> = ({ resource, onClick, categoryName }) => {
  const displayCategory = categoryName || resource.category.replace(/_/g, ' ');

  return (
    <button
      onClick={onClick}
      className="group bg-[var(--dp-bg-medium)] rounded-lg shadow-lg hover:shadow-2xl border border-[var(--dp-border-color)] 
                 transition-all duration-300 ease-in-out 
                 flex flex-col text-left 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--dp-bg-dark)] focus:ring-[var(--dp-accent-primary)] 
                 transform hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--dp-accent-secondary_/_0.3)]
                 p-5 h-full" 
      aria-label={`Abrir: ${resource.title}`}
    >
      <div className="flex flex-col flex-grow">
        {displayCategory && (
          <p className="text-xs font-semibold text-[var(--dp-accent-primary)] mb-2 uppercase tracking-wider group-hover:text-[var(--dp-accent-secondary)] transition-colors">
            {displayCategory}
          </p>
        )}
        <h3 
          className="font-heading text-lg font-semibold text-[var(--dp-text-primary)] mb-2 
                     group-hover:text-[var(--dp-accent-secondary)] transition-colors duration-200 line-clamp-3" 
        >
          {resource.title}
        </h3>
        <p className="text-[var(--dp-text-secondary)] text-sm leading-relaxed mb-4 line-clamp-4 flex-grow"> 
          {resource.summary}
        </p>
        
        <div className="mt-auto pt-3 border-t border-[var(--dp-border-color)]/50">
          <div className="flex flex-wrap gap-1.5">
            {resource.tags.slice(0, 3).map(tag => ( 
              <span 
                key={tag} 
                className="bg-[var(--dp-bg-light)] text-[var(--dp-accent-secondary)] text-xs px-2 py-1 rounded-sm"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="bg-[var(--dp-bg-light)] text-[var(--dp-accent-secondary)] text-xs px-2 py-1 rounded-sm">
                +{resource.tags.length - 3} más
              </span>
            )}
          </div>
           <p className="text-[var(--dp-text-secondary)]/70 text-xs mt-2.5">
            Actualizado: {new Date(resource.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
          </p>
        </div>
      </div>
    </button>
  );
};
