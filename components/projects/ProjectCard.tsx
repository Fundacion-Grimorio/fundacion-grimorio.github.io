import React from 'react';
import { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group bg-[var(--tech-bg-medium)] rounded-md shadow-lg hover:shadow-2xl border border-[var(--tech-border-light)] 
                 transition-all duration-300 ease-in-out 
                 flex flex-col text-left 
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--tech-bg-dark)] focus:ring-[var(--tech-accent-cyan)] 
                 transform hover:-translate-y-1.5 hover:scale-[1.02] hover:shadow-[0_0_25px_var(--tech-accent-cyan_/_0.3)]
                 h-full min-h-[380px] max-h-[420px] sm:min-h-[400px] sm:max-h-[450px] " // Taller aspect ratio
      aria-label={`Abrir el tomo: ${project.title}`}
    >
      <div className="relative w-full h-48 sm:h-56 overflow-hidden rounded-t-md">
        <img 
          src={project.imageUrl} 
          alt={`Portada del proyecto ${project.title}`} 
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 border-b border-[var(--tech-border-light)]" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10 group-hover:from-black/10 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow">
        <h3 
          className="font-heading text-md sm:text-lg font-semibold text-[var(--tech-text-primary)] mb-1.5 
                     group-hover:text-[var(--tech-accent-cyan)] transition-colors duration-200 line-clamp-2"
        >
          {project.title}
        </h3>
        <p className="text-[var(--tech-text-secondary)] text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3 flex-grow">
          {project.summary}
        </p>
        
        <div className="mt-auto pt-2 border-t border-[var(--tech-border-color)]/50">
          <p className="text-[var(--tech-text-secondary)]/70 text-xs mb-2">
            Archivado: {new Date(project.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' })}
          </p>
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 2).map(tag => ( 
              <span 
                key={tag} 
                className="bg-[var(--tech-bg-light)]/70 text-[var(--tech-accent-cyan)]/90 text-[0.65rem] sm:text-xs px-1.5 py-0.5 rounded-sm"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 2 && (
              <span className="bg-[var(--tech-bg-light)]/70 text-[var(--tech-accent-cyan)]/90 text-[0.65rem] sm:text-xs px-1.5 py-0.5 rounded-sm">
                +{project.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
};