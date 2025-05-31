
import React from 'react';
import { DiversipediaItem as CommunityResource } from '../../types'; // Assuming you have a CommunityResource type

interface CommunityResourceCardProps {
  resource: CommunityResource;
  onClick: () => void;
  categoryName?: string; // Optional: pass the display name of the category
}

// Simple default icon, you can replace this with category-specific icons later
const DefaultResourceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-full h-full">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);


export const CommunityResourceCard: React.FC<CommunityResourceCardProps> = ({ resource, onClick, categoryName }) => {
  const displayCategory = categoryName || resource.category;

  return (
    <button
      onClick={onClick}
      className="group bg-[var(--tech-bg-medium)] rounded-lg shadow-lg hover:shadow-2xl border border-[var(--tech-border-light)] 
                 transition-all duration-300 ease-in-out 
                 flex flex-col text-left 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--tech-bg-dark)] focus:ring-[var(--tech-accent-cyan)] 
                 transform hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_0_20px_var(--tech-accent-blue_/_0.25)]
                 h-full min-h-[320px] max-h-[360px] sm:min-h-[340px] sm:max-h-[380px]"
      aria-label={`Abrir recurso: ${resource.title}`}
    >
      {resource.imageUrl ? (
        <div className="relative w-full h-40 sm:h-44 overflow-hidden rounded-t-lg">
          <img 
            src={resource.imageUrl} 
            alt={`Imagen para ${resource.title}`} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 border-b border-[var(--tech-border-light)]" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 group-hover:from-black/10 transition-opacity duration-300"></div>
        </div>
      ) : (
        <div className="relative w-full h-20 sm:h-24 bg-[var(--tech-bg-light)]/50 rounded-t-lg flex items-center justify-center p-4 border-b border-[var(--tech-border-light)]">
           <div className="w-10 h-10 text-[var(--tech-accent-cyan)] opacity-70 group-hover:opacity-100 transition-opacity">
             <DefaultResourceIcon />
           </div>
        </div>
      )}
      
      <div className="p-4 flex flex-col flex-grow">
        {displayCategory && (
          <p className="text-xs font-semibold text-[var(--tech-accent-cyan)] mb-1 uppercase tracking-wider group-hover:text-[var(--tech-accent-blue)] transition-colors">
            {displayCategory.replace(/_/g, ' ')}
          </p>
        )}
        <h3 
          className="font-heading text-md sm:text-lg font-semibold text-[var(--tech-text-primary)] mb-1.5 
                     group-hover:text-[var(--tech-accent-blue)] transition-colors duration-200 line-clamp-2"
        >
          {resource.title}
        </h3>
        <p className="text-[var(--tech-text-secondary)] text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3 flex-grow">
          {resource.summary}
        </p>
        
        <div className="mt-auto pt-2 border-t border-[var(--tech-border-color)]/50">
          <p className="text-[var(--tech-text-secondary)]/70 text-xs mb-1.5">
            Actualizado: {new Date(resource.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' })}
          </p>
          <div className="flex flex-wrap gap-1">
            {resource.tags.slice(0, 2).map(tag => ( 
              <span 
                key={tag} 
                className="bg-[var(--tech-bg-light)]/70 text-[var(--tech-accent-cyan)]/80 text-[0.65rem] px-1.5 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 2 && (
              <span className="bg-[var(--tech-bg-light)]/70 text-[var(--tech-accent-cyan)]/80 text-[0.65rem] px-1.5 py-0.5 rounded-sm">
                +{resource.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};
