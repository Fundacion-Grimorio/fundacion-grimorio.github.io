
export const APP_NAME = "Fundación Grimorio";

export const DOSSIER_CONTENT = `
Fundación Grimorio - Dossier Institucional

¿Quiénes somos?
Grimorio es una fundación que nace del deseo de aplicar la tecnología como una fuerza positiva para transformar la realidad. Creemos en el poder de la innovación con propósito y en la capacidad del conocimiento para sanar, construir y empoderar.
Buscamos reunir a mentes brillantes en un espacio de colaboración donde la creatividad se convierta en acción y las ideas en herramientas tangibles que mejoren la vida de las personas.

Nuestra Misión
Desarrollar soluciones tecnológicas que atiendan problemáticas sociales reales, generando impacto positivo en la calidad de vida de comunidades vulnerables y fomentando un entorno de innovación inclusiva.

Nuestra Visión
Ser una red de innovación reconocida por impulsar cambios sistémicos a través de la tecnología y la inteligencia colectiva, inspirando a una nueva generación de agentes de cambio.

Nuestros valores
- Inclusión: Abrimos las puertas a todas las mentes creativas sin importar su origen, identidad o trayectoria.
- Innovación ética: Desarrollamos tecnología con conciencia social y visión a largo plazo.
- Colaboración: Creemos que el conocimiento compartido es la base del verdadero progreso.
- Impacto social: Cada proyecto busca resolver una problemática concreta y medible.
- Empoderamiento: Ayudamos a que las personas desarrollen su potencial a través del conocimiento.

Líneas estratégicas de acción
1. Laboratorios de innovación social.
2. Programas de mentoría y formación.
3. Alianzas con la sociedad civil y el sector académico.
4. Proyectos tecnológicos aplicados.
5. Investigación con enfoque social.

¿Qué queremos lograr?
- Atender problemáticas urgentes con soluciones innovadoras.
- Crear redes de colaboración entre expertas, tecnólogas y comunidades.
- Ser un semillero de talento comprometido con el cambio.
- Documentar y escalar soluciones exitosas.

Modelo de financiamiento
Nuestro modelo de financiamiento se basa en una combinación de fuentes públicas y privadas:
- Donaciones filantrópicas.
- Fondos gubernamentales para innovación y desarrollo.
- Patrocinios y alianzas con empresas tecnológicas.
- Crowdfunding y campañas de impacto social.
- Venta de servicios de consultoría y desarrollo tecnológico aplicado.
La transparencia financiera es clave: cada aportación se traduce en acciones medibles y reportes abiertos a nuestras aliadas.

Contacto y alianzas
¿Quieres sumarte al Grimorio?
Buscamos aliadas, mentoras, financiadoras, creadoras y soñadoras que crean en el poder de la tecnología al servicio de la humanidad.
> Juntas escribiremos el futuro, página por página.
`;

export const QUIENES_SOMOS_TEXT = "Grimorio es una fundación que nace del deseo de aplicar la tecnología como una fuerza positiva para transformar la realidad. Creemos en el poder de la innovación con propósito y en la capacidad del conocimiento para sanar, construir y empoderar. \nBuscamos reunir a mentes brillantes en un espacio de colaboración donde la creatividad se convierta en acción y las ideas en herramientas tangibles que mejoren la vida de las personas.";
export const MISION_TEXT = "Desarrollar soluciones tecnológicas que atiendan problemáticas sociales reales, generando impacto positivo en la calidad de vida de comunidades vulnerables y fomentando un entorno de innovación inclusiva.";
export const VISION_TEXT = "Ser una red de innovación reconocida por impulsar cambios sistémicos a través de la tecnología y la inteligencia colectiva, inspirando a una nueva generación de agentes de cambio.";

export const VALORES_LIST = [
  { title: "Inclusión", description: "Abrimos las puertas a todas las mentes creativas sin importar su origen, identidad o trayectoria." },
  { title: "Innovación Ética", description: "Desarrollamos tecnología con conciencia social y visión a largo plazo." },
  { title: "Colaboración", description: "Creemos que el conocimiento compartido es la base del verdadero progreso." },
  { title: "Impacto Social", description: "Cada proyecto busca resolver una problemática concreta y medible." },
  { title: "Empoderamiento", description: "Ayudamos a que las personas desarrollen su potencial a través del conocimiento." }
];

export const LINEAS_ESTRATEGICAS_LIST = [
  "Laboratorios de innovación social.",
  "Programas de mentoría y formación.",
  "Alianzas con la sociedad civil y el sector académico.",
  "Proyectos tecnológicos aplicados.",
  "Investigación con enfoque social."
];

export const OBJETIVOS_LIST = [
  "Atender problemáticas urgentes con soluciones innovadoras.",
  "Crear redes de colaboración entre expertas, tecnólogas y comunidades.",
  "Ser un semillero de talento comprometido con el cambio.",
  "Documentar y escalar soluciones exitosas."
];

export const FINANCIAMIENTO_MODELO_TEXT = "Nuestro modelo de financiamiento se basa en una combinación de fuentes públicas y privadas:";
export const FINANCIAMIENTO_FUENTES_LIST = [
  "Donaciones filantrópicas.",
  "Fondos gubernamentales para innovación y desarrollo.",
  "Patrocinios y alianzas con empresas tecnológicas.",
  "Crowdfunding y campañas de impacto social.",
  "Venta de servicios de consultoría y desarrollo tecnológico aplicado."
];
export const FINANCIAMIENTO_TRANSPARENCIA_TEXT = "La transparencia financiera es clave: cada aportación se traduce en acciones medibles y reportes abiertos a nuestras aliadas.";

export const CONTACTO_TEXT = "¿Quieres sumarte al Grimorio? \nBuscamos aliadas, mentoras, financiadoras, creadoras y soñadoras que crean en el poder de la tecnología al servicio de la humanidad.";
export const CONTACTO_SLOGAN = "> Juntas escribiremos el futuro, página por página.";

export const GEMINI_SYSTEM_INSTRUCTION = `Eres un asistente virtual de Fundación Grimorio. Tu propósito es responder preguntas sobre la fundación basándote exclusivamente en el siguiente dossier institucional. Sé conciso, amigable y profesional. Si la pregunta no puede ser respondida con la información del dossier, indícalo amablemente. No inventes información.

Dossier Institucional de Fundación Grimorio:
${DOSSIER_CONTENT}
`;

export const DIVERSIPEDIA_CATEGORIES = [ // Renamed from RESOURCE_CATEGORIES
  { id: 'todos', name: 'Mostrar Todos' },
  { id: 'identidad_genero', name: 'Identidad de Género y LGBTQ+' },
  { id: 'mujeres', name: 'Apoyo a Mujeres' },
  { id: 'ninez_adolescencia', name: 'Niñez y Adolescencia' },
  { id: 'derechos_humanos', name: 'Derechos Humanos Generales' },
  { id: 'asesoria_legal', name: 'Asesoría Legal' },
  { id: 'salud_bienestar', name: 'Salud y Bienestar' },
] as const;
