import React, { useState, useEffect, useMemo } from 'react';
import { Project, ProjectContentSection } from '../../types';
import { ProjectCard } from '../projects/ProjectCard';
import { Spinner } from '../common/Spinner'; // For loading state
import toast from 'react-hot-toast';

interface ProjectsPageProps {
  openProjectView: (project: Project) => void;
}

interface ProjectManifestEntry {
  id: string;
  name: string; // Name for display, can be different from title in config.json
  basePath: string; // e.g., "/projects_data/project-alpha/"
}

interface ProjectConfig {
  title: string;
  imageUrl: string;
  summary: string;
  tags: string[];
  date: string;
}

// Helper function to create a slug from a title string
const slugify = (text: string): string => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-'); // Replace multiple - with single -
};

const ProjectsPage: React.FC<ProjectsPageProps> = ({ openProjectView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loadedProjects, setLoadedProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const manifestResponse = await fetch('/projects-manifest.json');
        if (!manifestResponse.ok) {
          throw new Error(`Error al cargar el manifiesto: ${manifestResponse.statusText}`);
        }
        const manifestEntries: ProjectManifestEntry[] = await manifestResponse.json();
        
        const projectsPromises = manifestEntries.map(async (entry) => {
          try {
            const configPath = `${entry.basePath}config.json`;
            const contentPath = `${entry.basePath}content.md`;

            const [configResponse, contentResponse] = await Promise.all([
              fetch(configPath),
              fetch(contentPath),
            ]);

            if (!configResponse.ok) throw new Error(`Error al cargar config.json para ${entry.name}: ${configResponse.statusText}`);
            if (!contentResponse.ok) throw new Error(`Error al cargar content.md para ${entry.name}: ${contentResponse.statusText}`);
            
            const configData: ProjectConfig = await configResponse.json();
            const markdownContent: string = await contentResponse.text();

            // Process markdown content to extract sections
            const projectSections: ProjectContentSection[] = [];
            const lines = markdownContent.split('\n');
            let currentSection: ProjectContentSection | null = null;

            lines.forEach(line => {
              if (line.startsWith('## ')) { // H2 for section titles
                if (currentSection) {
                  projectSections.push(currentSection);
                }
                const title = line.substring(3).trim();
                currentSection = {
                  id: slugify(title),
                  title: title,
                  content: '', // Raw Markdown content for this section
                };
              } else if (currentSection) {
                currentSection.content += line + '\n';
              }
            });
            if (currentSection) {
                 // Trim trailing newline from the last section's content
                currentSection.content = currentSection.content.trimEnd();
                projectSections.push(currentSection);
            }
            
            // If no H2 headings found, treat entire content as one section
            if (projectSections.length === 0 && markdownContent.trim() !== '') {
                projectSections.push({
                    id: 'main-content',
                    title: 'Descripción General', // Default title
                    content: markdownContent.trim(),
                });
            }


            return {
              id: entry.id,
              ...configData,
              fullContent: projectSections,
            };
          } catch (projectLoadError: any) {
            console.error(`Error cargando datos del proyecto ${entry.name}:`, projectLoadError);
            toast.error(`Fallo al cargar proyecto: ${entry.name}`);
            return null; // Return null for projects that failed to load
          }
        });

        const results = await Promise.all(projectsPromises);
        setLoadedProjects(results.filter(p => p !== null) as Project[]);

      } catch (e: any) {
        console.error("Error cargando proyectos:", e);
        setError(e.message || "Ocurrió un error desconocido al cargar los proyectos.");
        toast.error("Error general al cargar proyectos.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) {
      return loadedProjects;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return loadedProjects.filter(project => 
      project.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.summary.toLowerCase().includes(lowerCaseSearchTerm) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowerCaseSearchTerm))
    );
  }, [searchTerm, loadedProjects]);

  return (
    <section className="py-16 md:py-20 bg-[var(--tech-bg-dark)] min-h-[calc(100vh-var(--header-height,10vh)-var(--footer-height,10vh))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--tech-text-primary)]">
            Archivo de Proyectos
          </h1>
          <p className="mt-3 text-md sm:text-lg text-[var(--tech-text-secondary)] max-w-xl mx-auto">
            Explora los tomos de conocimiento y las iniciativas de Fundación Grimorio.
          </p>
        </div>
        
        <div className="mb-10 md:mb-12 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Buscar en el archivo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[var(--tech-bg-medium)] text-[var(--tech-text-primary)] placeholder-[var(--tech-text-secondary)] border border-[var(--tech-border-color)] rounded-lg py-3 px-4 focus:ring-2 focus:ring-[var(--tech-accent-blue)] focus:border-[var(--tech-accent-blue)] outline-none transition-colors duration-200 shadow-md"
            aria-label="Buscar proyectos en el archivo"
          />
        </div>

        {isLoading && (
          <div className="text-center py-20">
            <Spinner size="lg" />
            <p className="mt-4 text-[var(--tech-text-secondary)]">Cargando archivo de proyectos...</p>
          </div>
        )}

        {error && !isLoading && (
          <div className="text-center py-20 bg-[var(--tech-bg-medium)] p-8 rounded-lg border border-[var(--tech-error)]">
            <p className="text-xl text-[var(--tech-error)] mb-2">Error al Cargar Proyectos</p>
            <p className="text-[var(--tech-text-secondary)]">{error}</p>
            <p className="text-sm text-[var(--tech-text-secondary)]/70 mt-4">Por favor, intenta recargar la página o contacta al administrador.</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bookshelf-bg p-4 sm:p-6 md:p-8 rounded-lg shadow-inner border border-[var(--tech-border-light)]">
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard 
                    key={project.id} 
                    project={project} 
                    onClick={() => openProjectView(project)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-xl text-[var(--tech-text-secondary)]">
                  {loadedProjects.length === 0 ? "El archivo de proyectos está vacío actualmente." : `No se encontraron "tomos" que coincidan con "${searchTerm}".`}
                </p>
                {loadedProjects.length > 0 && <p className="text-[var(--tech-text-secondary)]/80 mt-2">Prueba con otros términos de búsqueda en nuestro archivo.</p>}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsPage;