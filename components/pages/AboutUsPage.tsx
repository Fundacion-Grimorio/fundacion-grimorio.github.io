
import React from 'react';
import AboutSectionContent from '../dossier/AboutSection';
import MissionVisionContent from '../dossier/MissionVisionSection';
import ValuesContent from '../dossier/ValuesSection';
import StrategicLinesContent from '../dossier/StrategicLinesSection';
import GoalsContent from '../dossier/GoalsSection';
import FundingModelContent from '../dossier/FundingModelSection';

const PageTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h1 className="font-heading text-3xl md:text-4xl font-bold text-center mb-12 md:mb-16 text-[var(--tech-text-primary)]">
    {children}
  </h1>
);

const SectionWrapper: React.FC<{ title?: string; children: React.ReactNode; className?: string, bgClassName?: string }> = ({ title, children, className = '', bgClassName = 'bg-[var(--tech-bg-medium)]' }) => (
  <section className={`py-12 md:py-16 ${bgClassName} ${className}`}>
    <div className="container mx-auto px-6 lg:px-8">
      {title && (
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-10 text-[var(--tech-accent-blue)]">
          {title}
        </h2>
      )}
      {children}
    </div>
  </section>
);


const AboutUsPage: React.FC = () => {
  return (
    <div className="bg-[var(--tech-bg-dark)]">
      <SectionWrapper bgClassName="bg-[var(--tech-bg-dark)] pt-12 md:pt-16">
         <PageTitle>Sobre Fundación Grimorio</PageTitle>
         <AboutSectionContent />
      </SectionWrapper>
      
      <SectionWrapper title="Misión y Visión">
        <MissionVisionContent />
      </SectionWrapper>

      <SectionWrapper title="Nuestros Valores" bgClassName="bg-[var(--tech-bg-dark)]">
        <ValuesContent />
      </SectionWrapper>
      
      <SectionWrapper title="Líneas Estratégicas de Acción">
        <StrategicLinesContent />
      </SectionWrapper>

      <SectionWrapper title="¿Qué Queremos Lograr?" bgClassName="bg-[var(--tech-bg-dark)]">
        <GoalsContent />
      </SectionWrapper>

      <SectionWrapper title="Modelo de Financiamiento">
        <FundingModelContent />
      </SectionWrapper>
    </div>
  );
};

export default AboutUsPage;