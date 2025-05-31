import React from 'react';
import { Project } from '../../types';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  // Effect to handle Escape key to close modal
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 bg-[var(--tech-bg-dark)]/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      onClick={onClose} // Click on overlay to close
    >
      <div 
        className="bg-[var(--tech-bg-medium)] text-[var(--tech-text-primary)] rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden border border-[var(--tech-border-color)]"
        onClick={(e) => e.stopPropagation()} // Prevent close on content click
      >
        {/* Modal Header */}
        <div className="flex-shrink-0 flex items-center justify-between p-4 md:p-5 border-b border-[var(--tech-border-light)]">
          <h2 id="project-modal-title" className="font-heading text-lg md:text-xl font-semibold text-[var(--tech-text-primary)] truncate">
            {project.title}
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-[var(--tech-text-secondary)] hover:text-[var(--tech-text-primary)] hover:bg-[var(--tech-bg-light)] transition-colors focus:outline-none focus:ring-2 ring-inset ring-[var(--tech-accent-blue)]"
            aria-label="Cerrar modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 md:p-5 overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-[var(--tech-bg-light)] scrollbar-track-[var(--tech-bg-medium)]">
          <img 
            src={project.imageUrl} 
            alt={`Imagen de ${project.title}`}
            className="w-full h-auto max-h-72 object-cover rounded-md mb-4 border border-[var(--tech-border-light)] shadow-md" 
          />
          <p className="text-sm text-[var(--tech-text-secondary)] mb-3 leading-relaxed whitespace-pre-line">
            {project.summary}
          </p>
          
          <div className="my-4">
            <h4 className="text-xs text-[var(--tech-text-secondary)] uppercase font-semibold mb-2">Etiquetas</h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map(tag => (
                <span key={tag} className="bg-[var(--tech-bg-light)] text-[var(--tech-accent-cyan)] text-xs px-2.5 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
           <p className="text-xs text-[var(--tech-text-secondary)]/80">
            Archivado: {new Date(project.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Modal Footer */}
        <div className="flex-shrink-0 p-4 md:p-5 border-t border-[var(--tech-border-light)] flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="bg-transparent hover:bg-[var(--tech-bg-light)] border border-[var(--tech-border-color)] text-[var(--tech-text-secondary)] hover:text-[var(--tech-text-primary)] font-medium py-2 px-4 rounded-md text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[var(--tech-bg-medium)] focus:ring-[var(--tech-accent-blue)]"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};