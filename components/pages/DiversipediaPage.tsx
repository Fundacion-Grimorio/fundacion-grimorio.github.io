
import React, { useState, useEffect, useMemo } from 'react';
import { DiversipediaItem, ProjectContentSection, DiversipediaCategoryId } from '../../types'; 
import { DiversipediaCard } from '../resources/DiversipediaCard'; 
import { Spinner } from '../common/Spinner';
import toast from 'react-hot-toast';
import { DIVERSIPEDIA_CATEGORIES } from '../../constants'; 

interface DiversipediaPageProps { 
  openDiversipediaItemView: (item: DiversipediaItem) => void; 
}

interface DiversipediaManifestEntry { 
  id: string;
  name: string;
  basePath: string; 
}

interface DiversipediaConfig { 
  title: string;
  imageUrl?: string;
  summary: string;
  tags: string[];
  date: string;
  category: DiversipediaCategoryId; 
}

const slugify = (text: string): string => {
  return text.toString().toLowerCase().trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

const DiversipediaPage: React.FC<DiversipediaPageProps> = ({ openDiversipediaItemView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DiversipediaCategoryId | 'todos'>('todos'); 
  const [loadedItems, setLoadedItems] = useState<DiversipediaItem[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const manifestResponse = await fetch('/diversipedia-manifest.json'); 
        if (!manifestResponse.ok) throw new Error(`Error al cargar manifiesto de Diversipedia: ${manifestResponse.statusText}`);
        const manifestEntries: DiversipediaManifestEntry[] = await manifestResponse.json();
        
        const itemsPromises = manifestEntries.map(async (entry) => {
          try {
            const configPath = `${entry.basePath}config.json`;
            const contentPath = `${entry.basePath}content.md`;

            console.log(`Attempting to fetch config: ${configPath}`); // DEBUG
            const configResponse = await fetch(configPath);
            if (!configResponse.ok) throw new Error(`Error al cargar config.json para ${entry.name}: ${configResponse.statusText} (path: ${configPath})`);
            
            console.log(`Attempting to fetch content: ${contentPath}`); // DEBUG
            const contentResponse = await fetch(contentPath);
            if (!contentResponse.ok) throw new Error(`Error al cargar content.md para ${entry.name}: ${contentResponse.statusText} (path: ${contentPath})`);
            
            const configData: DiversipediaConfig = await configResponse.json();
            const markdownContent: string = await contentResponse.text();

            const itemSections: ProjectContentSection[] = [];
            const lines = markdownContent.split('\n');
            let currentSection: ProjectContentSection | null = null;
            lines.forEach(line => {
              if (line.startsWith('## ')) {
                if (currentSection) itemSections.push(currentSection);
                const title = line.substring(3).trim();
                currentSection = { id: slugify(title), title: title, content: '' };
              } else if (currentSection) {
                currentSection.content += line + '\n';
              }
            });
            if (currentSection) {
                currentSection.content = currentSection.content.trimEnd();
                itemSections.push(currentSection);
            }
             if (itemSections.length === 0 && markdownContent.trim() !== '') {
                itemSections.push({
                    id: 'main-content',
                    title: 'Información General',
                    content: markdownContent.trim(),
                });
            }

            return { id: entry.id, ...configData, fullContent: itemSections };
          } catch (loadError: any) {
            console.error(`Error cargando datos del ítem ${entry.name}:`, loadError.message); // Log full error message
            toast.error(`Fallo al cargar ítem: ${entry.name}`);
            return null;
          }
        });

        const results = await Promise.all(itemsPromises);
        setLoadedItems(results.filter(r => r !== null) as DiversipediaItem[]);
      } catch (e: any) {
        console.error("Error cargando ítems de Diversipedia:", e);
        setError(e.message || "Ocurrió un error desconocido al cargar los ítems.");
        toast.error("Error general al cargar Diversipedia.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchItems();
  }, []);

  const filteredItems = useMemo(() => { 
    return loadedItems.filter(item => { 
      const matchesCategory = selectedCategory === 'todos' || item.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!searchTerm.trim()) return true;
      const lowerSearch = searchTerm.toLowerCase();
      return (
        item.title.toLowerCase().includes(lowerSearch) ||
        item.summary.toLowerCase().includes(lowerSearch) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerSearch))
      );
    });
  }, [searchTerm, selectedCategory, loadedItems]);
  
  const getCategoryName = (categoryId: DiversipediaCategoryId | 'todos') => { 
    if (categoryId === 'todos') return 'Todos';
    const category = DIVERSIPEDIA_CATEGORIES.find(cat => cat.id === categoryId); 
    return category ? category.name : categoryId;
  };

  return (
    <section className="diversipedia-theme py-16 md:py-20 min-h-[calc(100vh-var(--header-height,64px)-var(--footer-height,64px))]"> {/* Added theme class */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--dp-text-primary)]">
            Diversipedia
          </h1>
          <p className="mt-3 text-md sm:text-lg text-[var(--dp-text-secondary)] max-w-xl mx-auto">
            Un espacio de conocimiento y apoyo para la diversidad.
          </p>
        </div>
        
        <div className="mb-8 md:mb-10 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Buscar en Diversipedia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--dp-bg-medium)] text-[var(--dp-text-primary)] placeholder-[var(--dp-text-secondary)] border border-[var(--dp-border-color)] rounded-lg py-3 px-4 focus:ring-2 focus:ring-[var(--dp-accent-primary)] focus:border-[var(--dp-accent-primary)] outline-none transition-colors duration-200 shadow-md"
              aria-label="Buscar en Diversipedia"
            />
          </div>
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as DiversipediaCategoryId | 'todos')} 
              className="w-full appearance-none bg-[var(--dp-bg-medium)] text-[var(--dp-text-primary)] border border-[var(--dp-border-color)] rounded-lg py-3 px-4 pr-10 focus:ring-2 focus:ring-[var(--dp-accent-primary)] focus:border-[var(--dp-accent-primary)] outline-none transition-colors duration-200 shadow-md"
              aria-label="Filtrar por categoría"
            >
              {DIVERSIPEDIA_CATEGORIES.map(cat => ( 
                <option key={cat.id} value={cat.id} style={{backgroundColor: 'var(--dp-bg-light)', color: 'var(--dp-text-primary)'}}>{cat.name}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[var(--dp-text-secondary)]">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="text-center py-20"><Spinner size="lg" color="text-[var(--dp-accent-primary)]" /><p className="mt-4 text-[var(--dp-text-secondary)]">Cargando Diversipedia...</p></div>
        )}
        {error && !isLoading && (
          <div className="text-center py-20 bg-[var(--dp-bg-medium)] p-8 rounded-lg border border-[var(--dp-accent-primary)]">
            <p className="text-xl text-[var(--dp-accent-primary)] mb-2">Error al Cargar Diversipedia</p>
            <p className="text-[var(--dp-text-secondary)]">{error}</p>
          </div>
        )}

        {!isLoading && !error && (
          <div className="bg-[var(--dp-bg-dark)] p-0 rounded-lg">
            {filteredItems.length > 0 ? ( 
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filteredItems.map((item) => ( 
                  <DiversipediaCard 
                    key={item.id} 
                    resource={item} 
                    onClick={() => openDiversipediaItemView(item)}
                    categoryName={getCategoryName(item.category)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-[var(--dp-bg-medium)] rounded-lg p-6">
                <p className="text-xl text-[var(--dp-text-secondary)]">
                  {loadedItems.length === 0 ? "Diversipedia está vacía actualmente." : `No se encontraron ítems para "${searchTerm}" en la categoría "${getCategoryName(selectedCategory)}".`}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default DiversipediaPage; 
