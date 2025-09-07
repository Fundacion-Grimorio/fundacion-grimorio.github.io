import React, { useState, useEffect, useRef } from 'react';

interface CardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  animationIndex?: number;
}

const Card: React.FC<CardProps> = ({ icon, title, description, animationIndex = 0 }) => {
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
    <div 
      ref={ref}
      className={`bg-white/60 rounded-2xl p-8 text-center transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-2 reveal-initial ${isVisible ? 'reveal-visible' : ''}`}
      style={{ transitionDelay: `${animationIndex * 100}ms` }}
    >
      <div className="flex justify-center items-center mb-6 text-blue-600">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default Card;