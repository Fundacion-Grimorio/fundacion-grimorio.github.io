
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroAsPage from './components/pages/HeroAsPage';
import AboutUsPage from './components/pages/AboutUsPage';
import ProjectsPage from './components/pages/ProjectsPage';
import AIAssistantPage from './components/pages/AIAssistantPage';
import DiversipediaPage from './components/pages/DiversipediaPage';
import { ScrollToTopButton } from './components/common/ScrollToTopButton';
import { ProjectFullView } from './components/projects/ProjectFullView';
import { Project, DiversipediaItem, ProjectContentSection } from './types';
import toast from 'react-hot-toast';
import { Spinner } from './components/common/Spinner';

export type PageName = 'home' | 'about' | 'projects' | 'diversipedia' | 'ai';

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

interface FetchedItemDetails {
  config: any; // ProjectConfig or DiversipediaConfig
  fullContent: ProjectContentSection[];
  id: string; // Add id to the return type for constructing the final object
  // Add category for Diversipedia items if it's part of the config
  category?: string; 
}


async function fetchItemDataFromManifest(
  manifestPath: string,
  itemId: string,
  viewType: 'project' | 'diversipedia_item',
  itemSlugify: (text: string) => string
): Promise<FetchedItemDetails | null> {
  try {
    const manifestResponse = await fetch(manifestPath);
    if (!manifestResponse.ok) throw new Error(`Failed to load manifest ${manifestPath}: ${manifestResponse.statusText}`);
    const manifestEntries: Array<{ id: string; basePath: string; name: string }> = await manifestResponse.json();

    const entry = manifestEntries.find(e => e.id === itemId);
    if (!entry) {
      toast.error(`Ítem con ID "${itemId}" no encontrado en ${manifestPath}.`);
      console.warn(`Item with ID "${itemId}" not found in ${manifestPath}.`);
      return null;
    }

    const configPath = `${entry.basePath}config.json`;
    const contentPath = `${entry.basePath}content.md`;

    const [configResponse, contentResponse] = await Promise.all([
      fetch(configPath),
      fetch(contentPath),
    ]);

    if (!configResponse.ok) throw new Error(`Error cargando config.json para ${entry.name} (${configPath}): ${configResponse.statusText}`);
    if (!contentResponse.ok) throw new Error(`Error cargando content.md para ${entry.name} (${contentPath}): ${contentResponse.statusText}`);
    
    const configData = await configResponse.json();
    const markdownContent: string = await contentResponse.text();

    const itemSections: ProjectContentSection[] = [];
    const lines = markdownContent.split('\n');
    let currentSection: ProjectContentSection | null = null;

    lines.forEach(line => {
      if (line.startsWith('## ')) {
        if (currentSection) itemSections.push(currentSection);
        const title = line.substring(3).trim();
        currentSection = { id: itemSlugify(title), title: title, content: '' };
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
        title: viewType === 'project' ? 'Descripción General' : 'Información General',
        content: markdownContent.trim(),
      });
    }
    
    return { id: entry.id, config: configData, fullContent: itemSections, category: configData.category };

  } catch (error: any) {
    console.error(`Error cargando ítem ${itemId} desde ${manifestPath}:`, error);
    toast.error(error.message || `No se pudo cargar el ítem ${itemId}.`);
    return null;
  }
}


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [viewingDiversipediaItem, setViewingDiversipediaItem] = useState<DiversipediaItem | null>(null);
  const [isAppLoading, setIsAppLoading] = useState(true); // For initial URL parsing and data load

  const updateUrl = (page: PageName, viewId?: string, replace = false) => {
    let path = `/?page=${page}`;
    if (viewId) {
      path += `&view=${viewId}`;
    }
    if (replace) {
      window.history.replaceState({ page, view: viewId }, '', path);
    } else {
      window.history.pushState({ page, view: viewId }, '', path);
    }
  };
  
  const loadViewItem = useCallback(async (page: PageName, itemId: string) => {
    setIsAppLoading(true);
    setViewingProject(null);
    setViewingDiversipediaItem(null);

    let itemData: FetchedItemDetails | null = null;

    if (page === 'projects') {
      itemData = await fetchItemDataFromManifest('/projects-manifest.json', itemId, 'project', slugify);
      if (itemData) {
        const project: Project = {
          id: itemData.id,
          title: itemData.config.title,
          imageUrl: itemData.config.imageUrl,
          summary: itemData.config.summary,
          tags: itemData.config.tags,
          date: itemData.config.date,
          fullContent: itemData.fullContent,
        };
        setViewingProject(project);
      } else {
         toast.error(`Proyecto "${itemId}" no encontrado.`);
         navigateTo('projects', true); // Navigate to projects list if item not found
      }
    } else if (page === 'diversipedia') {
      itemData = await fetchItemDataFromManifest('/diversipedia-manifest.json', itemId, 'diversipedia_item', slugify);
      if (itemData) {
        const diversipediaItem: DiversipediaItem = {
          id: itemData.id,
          title: itemData.config.title,
          imageUrl: itemData.config.imageUrl,
          summary: itemData.config.summary,
          tags: itemData.config.tags,
          date: itemData.config.date,
          category: itemData.config.category,
          fullContent: itemData.fullContent,
        };
        setViewingDiversipediaItem(diversipediaItem);
      } else {
        toast.error(`Artículo de Diversipedia "${itemId}" no encontrado.`);
        navigateTo('diversipedia', true); // Navigate to diversipedia list if item not found
      }
    }
    setIsAppLoading(false);
  }, []);


  const handleUrlChange = useCallback((initialLoad = false) => {
    const params = new URLSearchParams(window.location.search);
    const pageParam = params.get('page') as PageName | null;
    const viewParam = params.get('view');

    const targetPage = pageParam || 'home';
    setCurrentPage(targetPage);

    if (viewParam) {
      if ((targetPage === 'projects' && (!viewingProject || viewingProject.id !== viewParam)) ||
          (targetPage === 'diversipedia' && (!viewingDiversipediaItem || viewingDiversipediaItem.id !== viewParam))) {
        loadViewItem(targetPage, viewParam);
      } else if (!viewingProject && !viewingDiversipediaItem) {
        // This case can happen if the state was cleared but URL still has view.
        loadViewItem(targetPage, viewParam);
      } else {
        setIsAppLoading(false); // Already viewing or loaded
      }
    } else {
      setViewingProject(null);
      setViewingDiversipediaItem(null);
      setIsAppLoading(false);
    }
  }, [loadViewItem, viewingProject, viewingDiversipediaItem]);

  useEffect(() => {
    handleUrlChange(true); // Initial load
    window.addEventListener('popstate', () => handleUrlChange());
    return () => {
      window.removeEventListener('popstate', () => handleUrlChange());
    };
  }, [handleUrlChange]);


  const navigateTo = (page: PageName, replace = false) => {
    setViewingProject(null);
    setViewingDiversipediaItem(null);
    setCurrentPage(page);
    updateUrl(page, undefined, replace);
    if (!replace) window.scrollTo(0, 0);
  };

  const openProjectView = (project: Project) => {
    setViewingProject(project);
    setViewingDiversipediaItem(null);
    setCurrentPage('projects'); // Ensure currentPage is projects
    updateUrl('projects', project.id);
  };

  const closeProjectView = () => {
    setViewingProject(null);
    // navigateTo('projects', true); // Use replace to not add to history
    updateUrl('projects', undefined, true); 
    setCurrentPage('projects'); // Explicitly set, in case of direct load
     window.scrollTo(0, 0);
  };

  const openDiversipediaItemView = (item: DiversipediaItem) => {
    setViewingDiversipediaItem(item);
    setViewingProject(null);
    setCurrentPage('diversipedia'); // Ensure currentPage is diversipedia
    updateUrl('diversipedia', item.id);
  };

  const closeDiversipediaItemView = () => {
    setViewingDiversipediaItem(null);
    // navigateTo('diversipedia', true); // Use replace to not add to history
    updateUrl('diversipedia', undefined, true);
    setCurrentPage('diversipedia'); // Explicitly set
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (viewingProject || viewingDiversipediaItem) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [viewingProject, viewingDiversipediaItem]);


  if (isAppLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[var(--tech-bg-dark)]">
        <Spinner size="lg" />
      </div>
    );
  }

  if (viewingProject) {
    return <ProjectFullView projectOrResource={viewingProject} onClose={closeProjectView} viewType="project" />;
  }
  if (viewingDiversipediaItem) {
    return <ProjectFullView projectOrResource={viewingDiversipediaItem} onClose={closeDiversipediaItemView} viewType="diversipedia_item" />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HeroAsPage navigateTo={navigateTo} />;
      case 'about':
        return <AboutUsPage />;
      case 'projects':
        // ProjectsPage will still fetch its own list for display.
        // The openProjectView function is used for card clicks.
        // Direct URL loading of a project is handled by App.tsx's loadViewItem.
        return <ProjectsPage openProjectView={openProjectView} />;
      case 'diversipedia':
        return <DiversipediaPage openDiversipediaItemView={openDiversipediaItemView} />;
      case 'ai':
        return <AIAssistantPage />;
      default:
        // Attempt to navigate to home if page is unrecognized, or show a 404
        navigateTo('home', true);
        return <HeroAsPage navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="bg-[var(--tech-bg-dark)] min-h-screen text-[var(--tech-text-primary)] flex flex-col">
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default App;
