
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import HeroAsPage from './components/pages/HeroAsPage';
import AboutUsPage from './components/pages/AboutUsPage';
import ProjectsPage from './components/pages/ProjectsPage';
import AIAssistantPage from './components/pages/AIAssistantPage';
import ContactPage from './components/pages/ContactPage';
import DiversipediaPage from './components/pages/DiversipediaPage'; // Renamed from CommunityResourcesPage
import { ScrollToTopButton } from './components/common/ScrollToTopButton';
import { ProjectFullView } from './components/projects/ProjectFullView'; 
import { Project, DiversipediaItem } from './types'; // Renamed CommunityResource to DiversipediaItem

export type PageName = 'home' | 'about' | 'projects' | 'diversipedia' | 'ai' | 'contact'; // Renamed 'resources' to 'diversipedia'

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageName>('home');
  const [viewingProject, setViewingProject] = useState<Project | null>(null);
  const [viewingDiversipediaItem, setViewingDiversipediaItem] = useState<DiversipediaItem | null>(null); // Renamed state

  const navigateTo = (page: PageName) => {
    setViewingProject(null); 
    setViewingDiversipediaItem(null); // Close any open item
    setCurrentPage(page);
    window.scrollTo(0, 0); 
  };

  const openProjectView = (project: Project) => {
    setViewingProject(project);
    setViewingDiversipediaItem(null);
  };

  const closeProjectView = () => {
    setViewingProject(null);
    if (currentPage === 'projects') {
        window.scrollTo(0, 0); 
    }
  };

  const openDiversipediaItemView = (item: DiversipediaItem) => { // Renamed function
    setViewingDiversipediaItem(item);
    setViewingProject(null);
  };

  const closeDiversipediaItemView = () => { // Renamed function
    setViewingDiversipediaItem(null);
    if (currentPage === 'diversipedia') {
        window.scrollTo(0, 0);
    }
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


  if (viewingProject) {
    return <ProjectFullView projectOrResource={viewingProject} onClose={closeProjectView} viewType="project" />;
  }
  if (viewingDiversipediaItem) { // Changed condition
    return <ProjectFullView projectOrResource={viewingDiversipediaItem} onClose={closeDiversipediaItemView} viewType="diversipedia_item" />; // Pass new viewType
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HeroAsPage navigateTo={navigateTo} />;
      case 'about':
        return <AboutUsPage />;
      case 'projects':
        return <ProjectsPage openProjectView={openProjectView} />;
      case 'diversipedia': // Renamed case
        return <DiversipediaPage openDiversipediaItemView={openDiversipediaItemView} />; // Pass renamed function
      case 'ai':
        return <AIAssistantPage />;
      case 'contact':
        return <ContactPage />;
      default:
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
