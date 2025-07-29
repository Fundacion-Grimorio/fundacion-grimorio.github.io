import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Tone from 'tone';
import { MenuIcon, DiscordIcon, InstagramIcon, TwitterIcon, GlobeIcon, CartIcon, CogIcon } from './components/Icons';

type View = 'home' | 'quienes-somos' | 'proyectos' | 'modelo';

const guidedNavItems: { name: string; description: string; view: View }[] = [
    { name: 'Inicio', description: 'Volver al principio', view: 'home' },
    { name: 'Quiénes Somos', description: 'Nuestra historia y propósito', view: 'quienes-somos' },
    { name: 'Proyectos', description: 'Iniciativas actuales en acción', view: 'proyectos' },
    { name: 'Nuestro Modelo', description: 'Cómo generamos impacto', view: 'modelo' },
];

const clickSound = new Tone.MetalSynth({
  envelope: { attack: 0.001, decay: 0.1, release: 0.01 },
  harmonicity: 3.1,
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1.5,
}).toDestination();

const menuOpenSound = new Tone.FMSynth({
    harmonicity: 3,
    modulationIndex: 10,
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.2 },
}).toDestination();

const menuCloseSound = new Tone.FMSynth({
    harmonicity: 3,
    modulationIndex: 10,
    envelope: { attack: 0.01, decay: 0.2, sustain: 0.1, release: 0.2 },
}).toDestination();


const playClickSound = () => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
    clickSound.triggerAttackRelease("C4", "8n");
};

const playMenuOpenSound = () => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
    menuOpenSound.triggerAttackRelease("C5", "8n");
};

const playMenuCloseSound = () => {
    if (Tone.context.state !== 'running') {
        Tone.start();
    }
    menuCloseSound.triggerAttackRelease("C4", "8n");
};

const Header = ({ activeSection, scrollToSection, onMenuClick }: { activeSection: View; scrollToSection: (view: View) => void; onMenuClick: () => void }) => (
    <header className="fixed top-0 left-0 right-0 p-8 z-20 bg-brand-light/80 backdrop-blur-sm transition-all duration-300">
        <div className="flex justify-between items-center max-w-[1400px] mx-auto">
            {/* Logo */}
            <button onClick={() => { playClickSound(); scrollToSection('home'); }} className="font-exo text-3xl font-bold tracking-tighter text-brand-dark">
                GRIMORIO
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-12">
                <nav className="flex items-center gap-8">
                    {guidedNavItems.filter(item => item.view !== 'home').map(item => (
                        <button
                            key={item.view}
                            onClick={() => {
                                playClickSound();
                                scrollToSection(item.view);
                            }}
                            className={`font-grotesk text-sm tracking-widest uppercase transition-colors duration-300 ${activeSection === item.view ? 'text-pink-500' : 'text-brand-dark hover:text-pink-500'}`}
                        >
                            {item.name}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={() => { playMenuOpenSound(); onMenuClick(); }} className="p-2 text-brand-dark" aria-label="Open menu">
                    <MenuIcon />
                </button>
            </div>
        </div>
    </header>
);

const HomeView = ({ scrollToSection }: { scrollToSection: (view: View) => void }) => (
    <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-8 w-full h-full">
        <h1 className="font-exo text-5xl md:text-7xl font-bold tracking-tighter text-brand-dark">
            Fundacion Grimorio
        </h1>
        <p className="font-grotesk text-lg md:text-xl mt-6 text-brand-dark/80 leading-relaxed max-w-3xl">
            Una fundación que nace del deseo de aplicar la tecnología como una fuerza positiva para transformar la realidad. Creemos en el poder de la innovación con propósito y en la capacidad del conocimiento para sanar, construir y empoderar.
        </p>
        <button 
            onClick={() => { playClickSound(); scrollToSection('quienes-somos'); }} 
            className="mt-12 bg-black text-white font-grotesk text-sm px-10 py-4 tracking-widest uppercase hover:bg-gray-800 transition-colors"
        >
            Conoce Más
        </button>
    </div>
);


const QuienesSomosView = () => (
    <div className="w-full flex flex-col items-center justify-start text-brand-dark p-8 max-w-6xl mx-auto">
        <h1 className="font-exo text-6xl md:text-8xl font-bold tracking-tighter mb-12 text-left w-full">¿Quiénes somos?</h1>
        <p className="font-grotesk text-lg mb-12 text-left w-full text-brand-dark/80">
            Buscamos reunir a mentes brillantes en un espacio de colaboración donde la creatividad se convierta en acción y las ideas en herramientas tangibles que mejoren la vida de las personas.
        </p>
        <div className="grid md:grid-cols-2 gap-8 font-grotesk text-left text-lg w-full">
            <div className="flex flex-col gap-4 border border-black/10 p-8">
                <h2 className="text-3xl font-bold font-exo">Nuestra Misión</h2>
                <p className="break-words">Desarrollar soluciones tecnológicas que atiendan problemáticas sociales reales, generando impacto positivo en la calidad de vida de comunidades vulnerables y fomentando un entorno de innovación inclusiva.</p>
            </div>
            <div className="flex flex-col gap-4 border border-black/10 p-8">
                 <h2 className="text-3xl font-bold font-exo">Nuestra Visión</h2>
                <p className="break-words">Ser una red de innovación reconocida por impulsar cambios sistémicos a través de la tecnología y la inteligencia colectiva, inspirando a una nueva generación de agentes de cambio.</p>
            </div>
        </div>
    </div>
);

const InfoCard = ({ title, items }: { title: string, items: string[] }) => (
    <div className="border border-black/10 p-8 h-full">
        <h3 className="font-exo text-3xl font-bold mb-6">{title}</h3>
        <ul className="font-grotesk text-md leading-relaxed list-disc list-inside flex flex-col gap-2">
            {items.map((item, index) => <li key={index} className="break-words">{item}</li>)}
        </ul>
    </div>
);

const ModeloView = () => (
     <div className="w-full flex flex-col items-center justify-start text-brand-dark p-8 max-w-6xl mx-auto">
        <h1 className="font-exo text-6xl md:text-8xl font-bold tracking-tighter mb-12 text-left w-full">Modelo Integral</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full text-left">
            <InfoCard title="Nuestros Valores" items={["Inclusión", "Innovación ética", "Colaboración", "Impacto social", "Empoderamiento"]} />
            <InfoCard title="Líneas Estratégicas" items={["Laboratorios de innovación social", "Programas de mentoría y formación", "Alianzas con sociedad civil y academia", "Proyectos tecnológicos aplicados", "Investigación con enfoque social"]} />
            <InfoCard title="¿Qué queremos lograr?" items={["Resolver problemáticas sociales", "Generar comunidad", "Crear herramientas útiles", "Fomentar la autonomía tecnológica"]} />
            <InfoCard title="Financiamiento" items={["Donaciones y crowdfunding", "Fondos públicos y privados", "Patrocinios y alianzas", "Servicios de consultoría", "Venta de productos sociales"]} />
            <div className="md:col-span-2 border border-black/10 p-8">
                <h3 className="font-exo text-3xl font-bold mb-4">Unidad de Producción Social y Tecnológica</h3>
                <p className="font-grotesk text-md leading-relaxed break-words mb-4">Desarrollamos y comercializamos productos útiles a bajo costo, fabricados con materiales reciclados o mediante innovación tecnológica. Esto permite empoderar económicamente a mujeres, personas trans y jóvenes, al tiempo que financia parte de la operación de Grimorio.</p>
                <p className="font-grotesk text-md font-bold">Líneas de producto:</p>
                <ul className="font-grotesk text-md list-disc list-inside ml-4">
                    <li>Tecnología accesible</li>
                    <li>Higiene y salud comunitaria</li>
                    <li>Impresión 3D y moda social</li>
                </ul>
            </div>
        </div>
    </div>
);


const ProyectoCard = ({ title, description }: { title: string, description: string }) => (
    <div className="border border-black/10 p-8 flex flex-col justify-start h-full">
        <h3 className="font-exo text-2xl font-bold mb-4">{title}</h3>
        <p className="font-grotesk text-lg leading-relaxed break-words">{description}</p>
    </div>
);

const DigitalizacionCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="border border-black/10 p-8 flex flex-col items-center text-center h-full bg-brand-light hover:bg-white transition-all duration-300 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-2">
        <div className="text-pink-500 mb-6">
            {icon}
        </div>
        <h3 className="font-exo text-2xl font-bold mb-3">{title}</h3>
        <p className="font-grotesk text-md leading-relaxed break-words">{description}</p>
    </div>
);

const ProyectosView = () => (
    <div className="w-full flex flex-col items-center justify-start text-brand-dark p-8 max-w-6xl mx-auto">
        {/* Current Projects */}
        <h1 className="font-exo text-6xl md:text-8xl font-bold tracking-tighter mb-12 text-left w-full">Proyectos Actuales</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full">
            <ProyectoCard title="Reciclaje y Revalorización" description="Tenemos los fundamentos para crear una línea de producción que transforme residuos en productos útiles y buscamos apoyo para hacerlo realidad." />
            <ProyectoCard title="IA para Justicia Social" description="Luchamos por implementar mecanismos de IA en las fiscalías de México para ayudar a comunidades vulnerables. Colaboramos con la Cámara de Diputados, líderes y activistas para integrar nuestro software, buscando mejorar el acceso a la justicia y la obtención de ayudas sociales." />
            <ProyectoCard title="Podcasts Educativos con IA" description="Utilizamos IA para transformar información compleja en podcasts educativos. Nuestro canal de YouTube democratiza el conocimiento, ofreciendo contenido digerible en formato de audio para facilitar el aprendizaje." />
        </div>

        {/* New Digitalization Catalog Section */}
        <div className="w-full mt-24 pt-16 border-t border-black/10">
            <h2 className="font-exo text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-center">Catálogo de Digitalización</h2>
            <p className="font-grotesk text-lg text-brand-dark/80 mb-12 text-center max-w-3xl mx-auto">Ofrecemos soluciones a medida para que pequeños negocios y emprendimientos den el salto al mundo digital.</p>
            <div className="grid md:grid-cols-3 gap-8 w-full">
                <DigitalizacionCard 
                    icon={<GlobeIcon />}
                    title="Presencia Web y Redes" 
                    description="Creamos tu sitio web y gestionamos tus redes sociales para que llegues a más clientes y fortalezcas tu marca." 
                />
                <DigitalizacionCard 
                    icon={<CartIcon />}
                    title="Tienda Online y Pagos" 
                    description="Implementamos tu e-commerce para que vendas tus productos en línea de forma segura y aceptes pagos digitales." 
                />
                <DigitalizacionCard 
                    icon={<CogIcon />}
                    title="Optimización de Procesos" 
                    description="Integramos herramientas digitales para la gestión de citas, inventario y comunicación, mejorando tu eficiencia." 
                />
            </div>
        </div>
    </div>
);

const CienciaInclusivaView = () => (
    <div className="w-full flex flex-col items-center justify-center text-brand-dark p-8 max-w-4xl mx-auto text-center">
        <h2 className="font-exo text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            Ciencia e Innovación Inclusiva
        </h2>
        <p className="font-grotesk text-lg leading-relaxed text-brand-dark/80">
            Nuestra base es un laboratorio de ciencia e innovación radicalmente inclusivo. Históricamente, las contribuciones de mujeres y personas LGBTQ+ a la ciencia han sido marginadas. Nosotros queremos reescribir esa historia, creando un espacio seguro donde todas las mentes, sin distinción de género u orientación, puedan investigar, crear y liderar el futuro tecnológico.
        </p>
    </div>
);


const Footer = () => (
    <footer className="bg-brand-dark text-brand-light w-full">
        <div className="max-w-6xl mx-auto p-12 text-center">
            <h2 className="font-exo text-4xl font-bold">¿Quieres sumarte al Grimorio?</h2>
            <p className="font-grotesk mt-4 max-w-2xl mx-auto">
                Buscamos alianzas, mentorías, financiamiento, mentes creadoras y soñadoras que creen en el poder de la tecnología al servicio de la humanidad.
            </p>
            <p className="font-grotesk mt-8 text-xl font-bold tracking-wider">
                &gt; En comunidad, escribiremos el futuro, página por página.
            </p>
            <div className="flex items-center justify-center gap-6 mt-10">
                <a href="#" onClick={playClickSound} className="hover:text-pink-500 transition-colors"><DiscordIcon /></a>
                <a href="#" onClick={playClickSound} className="hover:text-pink-500 transition-colors"><InstagramIcon /></a>
                <a href="#" onClick={playClickSound} className="hover:text-pink-500 transition-colors"><TwitterIcon /></a>
            </div>
        </div>
    </footer>
);


const menuVariants = {
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 }
    },
    closed: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
};

const menuItemVariants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

const MenuOverlay = ({ scrollToSection, closeMenu }: { scrollToSection: (view: View) => void, closeMenu: () => void }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={(e) => {
            if (e.target === e.currentTarget) {
                closeMenu();
            }
        }}
    >
        <motion.nav 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="flex flex-col items-center gap-12 text-center max-h-full overflow-y-auto"
        >
            {guidedNavItems.map(item => (
                <motion.button
                    key={item.view}
                    variants={menuItemVariants}
                    onClick={() => {
                        playClickSound();
                        scrollToSection(item.view);
                        closeMenu();
                    }}
                    className="group"
                >
                    <h2 className="font-exo text-6xl text-white group-hover:text-pink-500 transition-colors duration-300 leading-tight">{item.name}</h2>
                    <p className="font-grotesk text-lg text-white/60 mt-2 tracking-wider group-hover:text-pink-500/80 transition-colors duration-300">{item.description}</p>
                </motion.button>
            ))}
        </motion.nav>
    </motion.div>
);

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    if (isMobile) {
        return <div className="w-full">{children}</div>;
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState<View>('home');
    
    const homeRef = useRef<HTMLDivElement>(null);
    const quienesSomosRef = useRef<HTMLDivElement>(null);
    const proyectosRef = useRef<HTMLDivElement>(null);
    const modeloRef = useRef<HTMLDivElement>(null);

    const sectionRefs = {
        home: homeRef,
        'quienes-somos': quienesSomosRef,
        proyectos: proyectosRef,
        modelo: modeloRef,
    };
    
    const scrollToSection = (sectionId: View) => {
        sectionRefs[sectionId].current?.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    };

    const handleCloseMenu = () => {
        playMenuCloseSound();
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id as View);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        });

        Object.values(sectionRefs).forEach(ref => {
            if (ref.current) {
                observer.observe(ref.current);
            }
        });

        return () => {
             Object.values(sectionRefs).forEach(ref => {
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            });
        };
    }, []);

  return (
    <div className="font-grotesk bg-brand-light">
        
        <Header activeSection={activeSection} scrollToSection={scrollToSection} onMenuClick={() => setIsMenuOpen(true)} />
        
        <main>
            <section id="home" ref={homeRef} className="min-h-screen flex items-center pt-32 pb-16">
                <HomeView scrollToSection={scrollToSection} />
            </section>
            
            <section id="quienes-somos" ref={quienesSomosRef} className="py-24">
                <AnimatedSection><QuienesSomosView /></AnimatedSection>
            </section>
            
            <section id="proyectos" ref={proyectosRef} className="py-24 bg-black/5">
                <AnimatedSection><ProyectosView /></AnimatedSection>
            </section>

            <section id="modelo" ref={modeloRef} className="py-24">
                <AnimatedSection><ModeloView /></AnimatedSection>
            </section>
            
            <section id="ciencia-inclusiva" className="py-24 bg-brand-pink">
                <AnimatedSection><CienciaInclusivaView /></AnimatedSection>
            </section>
        </main>
        
        <Footer />
        
        <AnimatePresence>
            {isMenuOpen && <MenuOverlay scrollToSection={scrollToSection} closeMenu={handleCloseMenu} />}
        </AnimatePresence>
    </div>
  );
}