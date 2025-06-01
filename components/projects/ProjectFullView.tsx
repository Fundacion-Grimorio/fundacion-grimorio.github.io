
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Project, DiversipediaItem } from '../../types'; // Renamed CommunityResource to DiversipediaItem

declare global {
  interface Window {
    marked: {
      parse: (markdownString: string, options?: any) => string;
    };
  }
}

interface ProjectFullViewProps {
  projectOrResource: Project | DiversipediaItem; // Union type
  onClose: () => void;
  viewType: 'project' | 'diversipedia_item'; // To differentiate display logic and theme
}

export const ProjectFullView: React.FC<ProjectFullViewProps> = ({ projectOrResource, onClose, viewType }) => {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(
    projectOrResource.fullContent.length > 0 ? projectOrResource.fullContent[0].id : null
  );
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});
  const [isTocOpenOnMobile, setIsTocOpenOnMobile] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const [headerHeight, setHeaderHeight] = useState(0);


  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
      if (isTocOpenOnMobile) setIsTocOpenOnMobile(false); // Close TOC too
    }
  }, [onClose, isTocOpenOnMobile]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
    // Re-calculate on window resize for responsiveness, if needed, though title length is main factor
    const handleResize = () => {
      if (headerRef.current) {
        setHeaderHeight(headerRef.current.offsetHeight);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [projectOrResource.title]); // Recalculate if title changes, affecting header height

  useEffect(() => {
    // Prevent body scroll when mobile TOC is open
    if (isTocOpenOnMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to restore body scroll
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isTocOpenOnMobile]);
  
  const scrollToSection = (sectionId: string) => {
    const sectionElement = document.getElementById(`section-${sectionId}`);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSectionId(sectionId);
    }
  };

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id.replace('section-', '');
            if (entry.intersectionRatio >= 0.8) { 
                setActiveSectionId(id);
            } else if (entry.intersectionRatio >= 0.1 && activeSectionId !== id) { 
                const currentActiveElement = document.querySelector(`#toc-btn-${activeSectionId}`);
                const newElement = document.querySelector(`#toc-btn-${id}`);
                if (currentActiveElement && newElement) {
                    const currentRect = currentActiveElement.getBoundingClientRect();
                    const newRect = newElement.getBoundingClientRect();
                    if (newRect.top < currentRect.top) {
                         setActiveSectionId(id);
                    }
                } else {
                    setActiveSectionId(id);
                }
            }
        }
      });
    };
    
    const observerOptions = {
      root: mainContentRef.current, 
      rootMargin: '0px 0px -50% 0px', 
      threshold: [0.1, 0.5, 0.8, 1.0] 
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    projectOrResource.fullContent.forEach(section => {
      const el = document.getElementById(`section-${section.id}`);
      if (el) {
        observer.observe(el);
        sectionRefs.current[section.id] = el;
      }
    });

    return () => {
      projectOrResource.fullContent.forEach(section => {
        const el = document.getElementById(`section-${section.id}`);
        if (el) observer.unobserve(el);
      });
    };
  }, [projectOrResource.fullContent, activeSectionId]);


  const tocTitle = "Contenido"; 
  const closeButtonLabel = "Cerrar Vista";
  const themeClass = viewType === 'diversipedia_item' ? 'diversipedia-fullview-theme' : '';

  const TocToggleButton = () => (
    <button
      onClick={() => setIsTocOpenOnMobile(!isTocOpenOnMobile)}
      className={`toc-toggle-button p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-inset
                  ${viewType === 'diversipedia_item' ? 'text-[var(--dp-text-primary)] hover:bg-[var(--dp-bg-light)] focus:ring-[var(--dp-accent-secondary)]' : 'text-[var(--tech-text-primary)] hover:bg-[var(--tech-bg-light)] focus:ring-[var(--tech-accent-blue)]'}`}
      aria-label={isTocOpenOnMobile ? "Cerrar contenido" : "Abrir contenido"}
      aria-expanded={isTocOpenOnMobile}
      aria-controls="toc-sidebar-mobile"
    >
      {isTocOpenOnMobile ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      )}
    </button>
  );

  return (
    <div className={`fixed inset-0 bg-[var(--tech-bg-dark)] z-[100] flex flex-col text-[var(--tech-text-primary)] font-sans ${themeClass}`}>
      {isTocOpenOnMobile && (
        <div 
          className="toc-backdrop open"
          onClick={() => setIsTocOpenOnMobile(false)}
          aria-hidden="true"
        />
      )}
      <div ref={headerRef} className={`fullview-header flex-shrink-0 bg-[var(--tech-bg-medium)] border-b border-[var(--tech-border-color)] px-4 py-3 md:px-6 md:py-3.5 shadow-md flex items-center justify-between`}>
        <div className="flex items-center">
          <TocToggleButton />
          <h1 className="font-heading text-lg md:text-xl font-semibold text-[var(--tech-text-primary)] truncate pl-1 md:pl-0">
            {projectOrResource.title}
          </h1>
        </div>
        <button
          onClick={onClose}
          className={`font-semibold py-1.5 px-4 rounded-md text-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 
                      ${viewType === 'diversipedia_item' ? 'bg-[var(--dp-accent-primary)] hover:bg-[var(--dp-accent-secondary)] text-white hover:text-[var(--dp-bg-dark)] focus:ring-offset-[var(--dp-bg-medium)] focus:ring-[var(--dp-accent-secondary)]' 
                                                        : 'bg-[var(--tech-accent-blue)] hover:bg-blue-600 text-white focus:ring-offset-[var(--tech-bg-medium)] focus:ring-[var(--tech-accent-blue)]'}`}
          aria-label={closeButtonLabel}
        >
          {closeButtonLabel}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside 
          id="toc-sidebar-mobile"
          className={`toc-sidebar w-64 md:w-72 flex-shrink-0 bg-[var(--tech-bg-medium)] border-r border-[var(--tech-border-color)] 
                     overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--tech-bg-light)] scrollbar-track-[var(--tech-bg-medium)]
                     ${isTocOpenOnMobile ? 'open' : ''}
                     ${viewType === 'diversipedia_item' ? '' : ''} `} // themeClass on parent handles specific TOC colors
        >
          <div 
            className="toc-nav-scroll-area scrollbar-thin scrollbar-thumb-[var(--tech-bg-light)] scrollbar-track-[var(--tech-bg-medium)]"
             style={{ paddingTop: isTocOpenOnMobile ? `${headerHeight + 16}px` : '1rem', paddingBottom: '1rem', paddingLeft: '1rem', paddingRight: '1rem' }} // 16px is approx 1rem
          >
            <h2 className="toc-title font-semibold text-sm text-[var(--tech-text-secondary)] uppercase tracking-wider mb-4">{tocTitle}</h2>
            <nav>
              <ul>
                {projectOrResource.fullContent.map((section) => (
                  <li key={section.id} className="mb-1">
                    <button
                      id={`toc-btn-${section.id}`}
                      onClick={() => {
                        scrollToSection(section.id);
                        if (isTocOpenOnMobile) setIsTocOpenOnMobile(false);
                      }}
                      className={`toc-button w-full text-left text-sm px-3 py-1.5 rounded-md transition-colors duration-150 focus:outline-none focus:ring-1 
                                  ${activeSectionId === section.id
                                    ? (viewType === 'diversipedia_item' ? 'toc-button-active bg-[var(--dp-accent-primary)] text-white font-semibold' : 'toc-button-active bg-[var(--tech-accent-blue)] text-white font-semibold')
                                    : (viewType === 'diversipedia_item' ? 'text-[var(--dp-text-secondary)] hover:text-[var(--dp-text-primary)] hover:bg-[var(--dp-bg-light)] focus:ring-[var(--dp-accent-secondary)]' : 'text-[var(--tech-text-secondary)] hover:text-[var(--tech-text-primary)] hover:bg-[var(--tech-bg-light)] focus:ring-[var(--tech-accent-blue)]')}
                                `}
                    >
                      {section.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main ref={mainContentRef} className="content-main flex-1 p-6 md:p-8 lg:p-10 overflow-y-auto scrollbar-thin scrollbar-thumb-[var(--tech-bg-light)] scrollbar-track-[var(--tech-bg-dark)]">
          <div className="max-w-3xl mx-auto">
            {projectOrResource.imageUrl && (
              <div className="mb-8">
                <img 
                  src={projectOrResource.imageUrl} 
                  alt={`Visual principal de ${projectOrResource.title}`}
                  className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg border border-[var(--tech-border-light)]"
                />
              </div>
            )}
            
            <div className="mb-6 pb-4 border-b border-[var(--tech-border-color)]">
                <h1 className="font-heading text-3xl md:text-4xl font-bold text-[var(--tech-text-primary)] mb-2">{projectOrResource.title}</h1>
                 <p className="metadata-text text-sm text-[var(--tech-text-secondary)]">
                    Publicado: {new Date(projectOrResource.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                 <div className="mt-3 flex flex-wrap gap-2">
                    {projectOrResource.tags.map(tag => (
                        <span key={tag} className={`tag-item text-xs px-2.5 py-1 rounded-full
                                                  ${viewType === 'diversipedia_item' ? 'bg-[var(--dp-bg-light)] text-[var(--dp-accent-secondary)]' 
                                                                                    : 'bg-[var(--tech-bg-light)] text-[var(--tech-accent-cyan)]'}`}>
                        {tag}
                        </span>
                    ))}
                </div>
            </div>

            {projectOrResource.fullContent.map((section) => (
              <section 
                key={section.id} 
                id={`section-${section.id}`} 
                className="mb-10 scroll-mt-20 md:scroll-mt-24" 
                aria-labelledby={`heading-${section.id}`}
              >
                <h2 
                    id={`heading-${section.id}`}
                    className={`section-heading font-heading text-xl md:text-2xl font-semibold mb-4 pb-2 border-b 
                                ${viewType === 'diversipedia_item' ? 'text-[var(--dp-accent-primary)] border-[var(--dp-border-color)]' 
                                                                  : 'text-[var(--tech-accent-blue)] border-[var(--tech-border-light)]'}`}
                >
                    {section.title}
                </h2>
                <div 
                  className={`prose prose-sm sm:prose-base max-w-none leading-relaxed
                              ${viewType === 'diversipedia_item' ? 'prose-invert text-[var(--dp-reader-text-primary)]' 
                                                                : 'prose-invert text-[var(--tech-text-primary)]'}`}
                  dangerouslySetInnerHTML={{ __html: window.marked && typeof window.marked.parse === 'function' ? window.marked.parse(section.content) : section.content.replace(/\n/g, '<br />') }}
                >
                </div>
              </section>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};