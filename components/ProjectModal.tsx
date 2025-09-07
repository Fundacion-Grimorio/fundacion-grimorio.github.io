import React, { useState } from 'react';
import { XMarkIcon, ArrowLeftIcon, BookOpenIcon } from './Icons';

interface Project {
  icon: React.ReactNode;
  title: string;
  description: string;
  url: string;
  content: string[];
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, projects }) => {
  const [view, setView] = useState<'library' | 'reader'>('library');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!isOpen) return null;

  const handleBookClick = (project: Project) => {
    setSelectedProject(project);
    setView('reader');
  };

  const handleBackToLibrary = () => {
    setView('library');
    // We delay clearing the selected project to allow for a smoother exit animation if we add one
    setTimeout(() => {
        setSelectedProject(null);
    }, 300);
  };

  const handleCloseModal = () => {
    handleBackToLibrary();
    onClose();
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm animate-modal-backdrop"
      onClick={handleCloseModal}
    >
      <div 
        className="relative bg-[#F5F5F7] rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col m-4 animate-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleCloseModal}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-20"
          aria-label="Cerrar modal"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>

        {view === 'library' && (
          <div className="p-8 h-full flex flex-col">
            <h2 className="text-4xl font-bold text-[#1d1d1f] text-center mb-8">
              Biblioteca de Proyectos
            </h2>
            <div className="flex-grow overflow-y-auto pr-4 -mr-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {projects.map((project) => (
                    <button
                        key={project.title}
                        onClick={() => handleBookClick(project)}
                        className="aspect-[3/4] p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 transform hover:-translate-y-2 flex flex-col justify-center items-center text-center group"
                    >
                        <div className="text-blue-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                            {React.cloneElement(project.icon as React.ReactElement, { className: "w-12 h-12" })}
                        </div>
                        <h3 className="text-lg font-semibold text-[#1d1d1f]">{project.title}</h3>
                    </button>
                ))}
                </div>
            </div>
          </div>
        )}
        
        {view === 'reader' && selectedProject && (
           <div className="p-8 h-full flex flex-col">
             <div className="flex items-center mb-6">
                <button 
                    onClick={handleBackToLibrary}
                    className="p-2 rounded-full hover:bg-gray-200 transition-colors mr-4"
                    aria-label="Volver a la biblioteca"
                >
                    <ArrowLeftIcon />
                </button>
                <div className="flex items-center text-blue-600">
                    <BookOpenIcon />
                    <h2 className="text-3xl font-bold text-[#1d1d1f] ml-3">{selectedProject.title}</h2>
                </div>
             </div>
             <div className="flex-grow overflow-y-auto prose prose-lg max-w-none pr-4 text-gray-700">
                {selectedProject.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
                <a href={selectedProject.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-6 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-blue-700 transition-colors no-underline">
                    Ver Proyecto
                </a>
             </div>
           </div>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;