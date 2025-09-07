import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import SectionWrapper from './components/SectionWrapper';
import Card from './components/Card';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';

import { 
  UsersIcon, 
  EyeIcon, 
  ArrowsRightLeftIcon, 
  MicrophoneIcon,
  ComputerDesktopIcon,
  ShieldCheckIcon
} from './components/Icons';

const starProjects = [
  {
    icon: <ComputerDesktopIcon />,
    title: "Momo POS",
    description: "Un sistema de punto de venta de código abierto para ayudar a pequeños negocios a digitalizarse, enfocado en tiendas de conveniencia y negocios que necesitan terminales de bajo costo.",
    url: "#",
    content: [
      "Momo POS es una iniciativa de código abierto diseñada para democratizar el acceso a la tecnología en el sector minorista. Entendemos que los pequeños negocios, como las tiendas de conveniencia y los emprendimientos locales, a menudo operan con presupuestos ajustados, lo que les dificulta adquirir sistemas de punto de venta (POS) modernos y eficientes.",
      "Nuestra solución está construida sobre tecnologías de código abierto, lo que elimina los altos costos de licencia. Ofrece funcionalidades esenciales como gestión de inventario, registro de ventas, generación de reportes y procesamiento de pagos. Su interfaz es intuitiva y fácil de usar, reduciendo la curva de aprendizaje para los propietarios y sus empleados.",
      "El objetivo principal de Momo POS es proporcionar una herramienta robusta y de bajo costo que permita a estos negocios optimizar sus operaciones, mejorar la experiencia del cliente y competir en un mercado cada vez más digitalizado. Al ser de código abierto, también fomentamos una comunidad de desarrolladores que pueden contribuir a su mejora continua, adaptándolo a las necesidades específicas de diferentes mercados."
    ],
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Clasificación de Testimonios de Víctimas",
    description: "Utilizamos la IA de Gemini para clasificar testimonios de víctimas de violencia, ayudando a la atención de quienes se encuentran en riesgo y agilizando el apoyo.",
    url: "#",
    content: [
      "Este proyecto aborda una de las problemáticas más delicadas y urgentes: la violencia de género y el apoyo a las víctimas. Las fiscalías y organizaciones de ayuda a menudo reciben un volumen masivo de testimonios, y analizar cada uno para identificar los casos de mayor riesgo de manera oportuna es un desafío monumental.",
      "A través de una colaboración estratégica con activistas y la Cámara de Diputados, estamos implementando una solución basada en el modelo de IA Gemini de Google. Este sistema es capaz de analizar y clasificar testimonios de víctimas en tiempo real, identificando patrones, niveles de urgencia y tipos de violencia descritos. No busca reemplazar el juicio humano, sino potenciarlo.",
      "Al automatizar la clasificación inicial, el sistema permite a los profesionales (psicólogos, abogados, trabajadores sociales) priorizar los casos más críticos, agilizando la asignación de recursos, la obtención de ayudas sociales y la activación de protocolos de protección. Es una herramienta diseñada para salvar vidas, asegurando que ninguna petición de ayuda se pierda en un mar de datos y que las personas en mayor riesgo reciban atención inmediata."
    ]
  }
];

const otherProjects = [
  {
    icon: <ArrowsRightLeftIcon />,
    title: "Reciclaje y Revalorización",
    description: "Tenemos los fundamentos para crear una línea de producción que transforme residuos en productos útiles y buscamos apoyo para hacerlo realidad.",
    url: "#",
    content: [
        "El proyecto de Reciclaje y Revalorización nace de una doble necesidad: abordar la crisis ambiental generada por los residuos y crear oportunidades económicas para comunidades vulnerables. Nuestro enfoque va más allá del reciclaje tradicional; buscamos la 'revalorización', que consiste en transformar materiales de desecho en productos de mayor valor y utilidad.",
        "Hemos desarrollado los fundamentos técnicos para una línea de producción modular y de bajo costo. Esta línea puede procesar plásticos, textiles y otros materiales para convertirlos en bienes como mobiliario, materiales de construcción o incluso filamentos para impresión 3D. El diseño es adaptable, permitiendo que se implemente en diferentes contextos comunitarios.",
        "Actualmente, estamos en la fase de búsqueda de financiamiento y alianzas estratégicas para construir nuestro primer prototipo funcional. Este proyecto no solo contribuirá a un medio ambiente más limpio, sino que también será una fuente de empleo y desarrollo de habilidades para las personas que operen la línea de producción, cerrando el ciclo de la economía circular con un profundo impacto social."
    ]
  },
  {
    icon: <MicrophoneIcon />,
    title: "Canal de YouTube Educativo",
    description: "Un canal divertido liderado por un personaje virtual, diseñado para hacer que la ciencia y el conocimiento complejo sean fáciles y accesibles para todos.",
    url: "#",
    content: [
        "El conocimiento a menudo se siente intimidante y lejano. Para romper esa barrera, hemos creado un canal de YouTube educativo único, donde el aprendizaje es una aventura divertida y accesible.",
        "El corazón de nuestro canal es un carismático personaje virtual, creado para ser tu guía en el mundo de la ciencia y la tecnología. Este avatar traduce temas complejos en explicaciones sencillas y visualmente atractivas, utilizando un tono amigable y cercano para que cualquiera pueda entender y disfrutar.",
        "Nuestra misión es democratizar el conocimiento de una manera que inspire curiosidad y elimine el miedo a preguntar. Creemos que al combinar tecnología, educación y entretenimiento a través de nuestro personaje, podemos ayudar a que más personas se apasionen por aprender y descubrir el mundo que les rodea."
    ]
  }
];

const allProjects = [...starProjects, ...otherProjects];

const App: React.FC = () => {
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  return (
    <div className="bg-[#F5F5F7] text-[#1d1d1f]">
      <Header onProjectsClick={() => setIsProjectModalOpen(true)} />
      <main className="container mx-auto px-6 md:px-8">
        <Hero />

        <SectionWrapper id="quienes-somos" title="¿Quiénes somos?">
          <p className="max-w-3xl mx-auto text-center text-xl md:text-2xl text-gray-700 mb-16">
            Buscamos reunir a mentes brillantes en un espacio de colaboración donde la creatividad se convierta en acción y las ideas en herramientas tangibles que mejoren la vida de las personas.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card
              icon={<UsersIcon />}
              title="Nuestra Misión"
              description="Desarrollar soluciones tecnológicas que atiendan problemáticas sociales reales, generando impacto positivo en la calidad de vida de comunidades vulnerables y fomentando un entorno de innovación inclusiva."
              animationIndex={0}
            />
            <Card
              icon={<EyeIcon />}
              title="Nuestra Visión"
              description="Ser una red de innovación reconocida por impulsar cambios sistémicos a través de la tecnología y la inteligencia colectiva, inspirando a una nueva generación de agentes de cambio."
              animationIndex={1}
            />
          </div>
        </SectionWrapper>

        <SectionWrapper id="proyectos" title="Nuestros Proyectos">
           <div className="text-center max-w-3xl mx-auto">
             <p className="text-xl md:text-2xl text-gray-700 mb-8">
                Cada uno de nuestros proyectos es un capítulo en nuestro grimorio, una solución cuidadosamente diseñada para atender una problemática real. Te invitamos a explorar nuestra biblioteca y conocer a fondo el impacto que buscamos generar.
             </p>
             <button
                onClick={() => setIsProjectModalOpen(true)}
                className="cursor-pointer inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full text-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
             >
                Explorar Biblioteca de Proyectos
             </button>
           </div>
        </SectionWrapper>
        
        <SectionWrapper id="modelo" title="Modelo Integral">
            <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">Nuestros Valores</h3>
                    <ul className="space-y-4 inline-block text-left text-lg md:text-xl">
                        {['Inclusión', 'Innovación ética', 'Colaboración', 'Impacto social', 'Empoderamiento'].map(value => (
                            <li key={value} className="flex items-center text-gray-700">
                                <svg className="w-5 h-5 mr-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{value}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <div className="text-center">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">¿Qué queremos lograr?</h3>
                     <ul className="space-y-4 inline-block text-left text-lg md:text-xl">
                        {['Resolver problemáticas sociales', 'Generar comunidad', 'Crear herramientas útiles', 'Fomentar la autonomía tecnológica'].map(item => (
                           <li key={item} className="flex items-center text-gray-700">
                               <svg className="w-5 h-5 mr-4 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{item}</span>
                           </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
        
        <SectionWrapper id="unidad-produccion" title="Unidad de Producción Social y Tecnológica">
            <p className="max-w-3xl mx-auto text-center text-xl md:text-2xl text-gray-700">
              Creemos en un futuro laboral inclusivo. Nuestra unidad está dedicada a crear oportunidades de trabajo digno para personas de comunidades vulnerables que a menudo enfrentan barreras en el empleo tradicional. Ofrecemos un entorno seguro, libre de discriminación y violencia, donde pueden desarrollar sus habilidades, generar ingresos y construir autonomía.
            </p>
        </SectionWrapper>

        <SectionWrapper id="ciencia" title="Ciencia e Innovación Inclusiva">
            <p className="max-w-3xl mx-auto text-center text-xl md:text-2xl text-gray-700">
                Con base en México, nuestra fundación es un laboratorio de ciencia e innovación radicalmente inclusivo. Históricamente, las contribuciones de mujeres y personas LGBTQ+ a la ciencia han sido marginadas. Nosotros queremos reescribir esa historia, creando un espacio seguro donde todas las mentes, sin distinción de género u orientación, puedan investigar, crear y liderar el futuro tecnológico.
            </p>
        </SectionWrapper>

      </main>
      <Footer />
      <ProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)}
        projects={allProjects}
      />
    </div>
  );
};

export default App;