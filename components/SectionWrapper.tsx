import React, { useState, useEffect, useRef } from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  children: React.ReactNode;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({ id, title, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id={id} ref={ref} className="py-20 md:py-28">
      <div className={`text-center mb-16 reveal-initial ${isVisible ? 'reveal-visible' : ''}`}>
        <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
};

export default SectionWrapper;