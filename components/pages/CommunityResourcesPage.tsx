
import React, { useState, useEffect, useMemo } from 'react';
import { DiversipediaItem as CommunityResource, ProjectContentSection, DiversipediaCategoryId as ResourceCategoryId } from '../../types';
import { CommunityResourceCard } from '../resources/CommunityResourceCard';
import { Spinner } from '../common/Spinner';
import toast from 'react-hot-toast';
import { DIVERSIPEDIA_CATEGORIES as RESOURCE_CATEGORIES } from '../../constants';

interface CommunityResourcesPageProps {
  openResourceView: (resource: CommunityResource) => void;
}

interface ResourceManifestEntry {
  id: string;
  name: string;
  basePath: string; // e.g., "/community_resources_data/resource-alpha/"
}

interface ResourceConfig {
  title: string;
  imageUrl?: string;
  summary: string;
  tags: string[];
  date: string;
  category: ResourceCategoryId;
}

const slugify = (text: string): string => {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const CommunityResourcesPage: React.FC<CommunityResourcesPageProps> = ({ openResourceView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategoryId | 'todos'>('todos');
  const [loadedResources, setLoadedResources] = useState<CommunityResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const manifestResponse = await fetch('/resources-manifest.json');
        if (!manifestResponse.ok) throw new Error(`Error al cargar manifiesto de recursos: ${manifestResponse.statusText}`);
        const manifestEntries: ResourceManifestEntry[] = await manifestResponse.json();
        
        const resourcesPromises = manifestEntries.map(async (entry) => {
          try {
            const configPath = `${entry.basePath}config.json`;
            const contentPath = `${entry.basePath}content.md`;

            const [configResponse, contentResponse] = await Promise.all([fetch(configPath), fetch(contentPath)]);

            if (!configResponse.ok) throw new Error(`Error al cargar config.json para ${entry.name}`);
            if (!contentResponse.ok) throw new Error(`Error al cargar content.md para ${entry.name}`);
            
            const configData: ResourceConfig = await configResponse.json();
            const markdownContent: string = await contentResponse.text();

            const resourceSections: ProjectContentSection[] = [];
            const lines = markdownContent.split('\n');
            let currentSection: ProjectContentSection | null = null;
            lines.forEach(line => {
              if (line.startsWith('## ')) {
                if (currentSection) resourceSections.push(currentSection);
                const title = line.substring(3).trim();
                currentSection = { id: slugify(title), title: title, content: '' };
              } else if (currentSection) {
                currentSection.content += line + '\n';
              }
            });
            if (currentSection) {
                currentSection.content = currentSection.content.trimEnd();
                resourceSections.push(currentSection);
            }
             if (resourceSections.length === 0 && markdownContent.trim() !== '') {
                resourceSections.push({
                    id: 'main-content',
                    title: 'Información General',
                    content: markdownContent.trim(),
                });
            }

            return { id: entry.id, ...configData, fullContent: resourceSections };
          } catch (loadError: any) {
            console.error(`Error cargando datos del recurso ${entry.name}:`, loadError);
            toast.error(`Fallo al cargar recurso: ${entry.name}`);
            return null;
          }
        });

        const results = await Promise.all(resourcesPromises);
        setLoadedResources(results.filter(r => r !== null) as CommunityResource[]);
      } catch (e: any) {
        console.error("Error cargando recursos comunitarios:", e);
        setError(e.message || "Ocurrió un error desconocido al cargar los recursos.");
        toast.error("Error general al cargar recursos.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchResources();
  }, []);

  const filteredResources = useMemo(() => {
    return loadedResources.filter(resource => {
      const matchesCategory = selectedCategory === 'todos' || resource.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchTerm.trim()) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        resource.title.toLowerCase().includes(lowerSearch) ||
        resource.summary.toLowerCase().includes(lowerSearch) ||
        resource.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
      );
    });
  }, [searchTerm, selectedCategory, loadedResources]);
  
  const getCategoryName = (categoryId: ResourceCategoryId | 'todos') => {
    if (categoryId === 'todos') return 'Todos';
    const category = RESOURCE_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.name : categoryId;
  };

  return (
    <section className="py-16 md:py-20 bg-[var(--tech-bg-dark)] min-h-[calc(100vh-var(--header-height,10vh)-var(--footer-height,10vh))]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--tech-text-primary)]">
            Centro de Recursos Comunitarios
          </h1>
          <p className="mt-3 text-md sm:text-lg text-[var(--tech-text-secondary)] max-w-xl mx-auto">
            Información y apoyo para la comunidad. Encuentra guías, contactos y más.
          </p>
        </div>
        
        <div className="mb-8 md:mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--tech-bg-medium)] text-[var(--tech-text-primary)] placeholder-[var(--tech-text-secondary)] border border-[var(--tech-border-color)] rounded-lg py-3 px-4 focus:ring-2 focus:ring-[var(--tech-accent-blue)] focus:border-[var(--tech-accent-blue)] outline-none transition-colors duration-200 shadow-md"
              aria-label="Buscar recursos comunitarios"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ResourceCategoryId | 'todos')}
              className="w-full appearance-none bg-[var(--tech-bg-medium)] text-[var(--tech-text-primary)] border border-[var(--tech-border-color)] rounded-lg py-3 px-4 pr-10 focus:ring-2 focus:ring-[var(--tech-accent-blue)] focus:border-[var(--tech-accent-blue)] outline-none transition-colors duration-200 shadow-md"
              aria-label="Filtrar por categoría"
            >
              {RESOURCE_CATEGORIES.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--tech-text-secondary)]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-20"><Spinner size="lg" /><p className="mt-4 text-[var(--tech-text-secondary)]">Cargando recursos...</p></div>
        )}
        {error && !isLoading && (
          <div className="text-center py-20 bg-[var(--tech-bg-medium)] p-8 rounded-lg border border-[var(--tech-error)]">
            <p className="text-xl text-[var(--tech-error)] mb-2">Error al Cargar Recursos</p>
            <p className="text-[var(--tech-text-secondary)]">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-[var(--tech-bg-dark)] p-0 rounded-lg">
            {filteredResources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredResources.map((resource) => (
                  <CommunityResourceCard 
                    key={resource.id} 
                    resource={resource} 
                    onClick={() => openResourceView(resource)}
                    categoryName={getCategoryName(resource.category)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[var(--tech-bg-medium)] rounded-lg p-6">
                <p className="text-xl text-[var(--tech-text-secondary)]">
                  {loadedResources.length === 0 ? "No hay recursos disponibles actualmente." : `No se encontraron recursos para "${searchTerm}" en la categoría "${getCategoryName(selectedCategory)}".`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CommunityResourcesPage;
