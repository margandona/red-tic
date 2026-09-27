/**
 * Configuración de todas las clases del itinerario
 * Principio SOLID: Single Responsibility - Define estructura de clases
 */

export const CLASES = {
  CLASE1: {
    id: 'clase1',
    nombre: 'Acceso al Sistema Académico',
    descripcion: 'Tu primera misión: aprende a entrar y moverte por el aula virtual como un experto',
    orden: 1,
    icono: 'login',
    color: '#F90598',
    duracion: '120 min',
    contenido: {
      introduccion: '¡Hola! Este es tu primer paso en esta aventura académica. Aquí aprenderás a entrar al aula virtual sin perderte, a encontrar tus asignaturas y a ubicar todo lo que necesitas para el curso. No te preocupes si al principio parece mucho, iremos paso a paso y en poco tiempo serás todo un experto navegando la plataforma.',
      objetivos: [
        'Identificar las plataformas académicas que usarás durante el curso.',
        'Ingresar al aula virtual con tus credenciales institucionales sin ayuda.',
        'Encontrar tareas, avisos y materiales de estudio dentro del sistema.'
      ],
      datosUtiles: [
        'Mantén siempre a mano tu correo institucional y contraseña actualizada, los usarás en cada acceso.',
        '¿Una página no carga? Primero revisa tu conexión a internet, y si sigue fallando, prueba abrirla en modo incógnito.',
        'Guarda el enlace del aula virtual en favoritos desde el primer día. Así evitarás escribir mal la dirección o caer en páginas equivocadas.'
      ],
      aulaInvertida: {
        antes: [
          'Mira el video de la clase y anota las pantallas principales que aparecen en el sistema.',
          'Ten listas tus credenciales (usuario y contraseña) y verifica que tu navegador funciona bien.',
          'Escribe dos dudas que crees que podrías tener al iniciar sesión; luego revisa si se responden durante la clase.'
        ],
        durante: [
          'Ingresa al aula virtual junto con el docente y sigue cada paso en tu propio computador.',
          'Localiza las secciones de anuncios, tareas pendientes y calendario académico.',
          'Ayuda a un compañero que se haya perdido, enseñar es la mejor forma de aprender.'
        ],
        despues: [
          'Vuelve a entrar por tu cuenta y toma una captura de pantalla donde se vea tu curso asignado.',
          'Completa el quiz y el formulario para demostrar que ya dominas la navegación básica.',
          'Crea tu propia mini-guía con los pasos de acceso, así la tendrás lista para futuras ocasiones.'
        ]
      },
      video: 'https://www.youtube.com/embed/AGUSTLSxea8?rel=0&modestbranding=1',
      pasos: [
        'Enciende tu computador y asegúrate de tener conexión a internet',
        'Abre tu navegador favorito (Chrome, Edge o Firefox)',
        'Escribe en la barra de direcciones: https://www.microcredencial.com/aulas',
        'Ingresa tu usuario institucional y contraseña',
        'Una vez dentro, ubica tu asignatura en el panel principal',
        'Explora el menú lateral para conocer las secciones disponibles'
      ],
      practicaAutonoma: [
        'Dentro del aula virtual, busca el reglamento académico o un aviso reciente y léelo completo.',
        'Identifica en qué sección se entregan las tareas y explícalo con tus propias palabras.',
        'Comparte con tus compañeros un error común al ingresar y cómo solucionarlo, así todos aprenden.'
      ],
      evidencia: 'Toma una captura de pantalla del aula virtual donde se vea tu asignatura asignada y escribe una breve explicación (3 líneas) de qué secciones crees que usarás más durante el curso.',
      quiz: [
        {
          question: '¿Cuál es el primer paso para acceder al sistema académico según la clase?',
          options: ['Encender el computador y verificar conexión', 'Abrir el navegador directamente', 'Llamar al soporte técnico', 'Esperar instrucciones del docente'],
          correct: 0
        },
        {
          question: '¿Qué navegador puedes usar para acceder al aula virtual?',
          options: ['Solo Chrome', 'Solo Edge', 'Chrome, Edge o Firefox', 'Solo Safari'],
          correct: 2
        },
        {
          question: '¿Qué debes tener siempre a mano para ingresar al sistema?',
          options: ['Tu número de teléfono', 'Credenciales institucionales', 'Tu dirección', 'Tu horario de clases'],
          correct: 1
        },
        {
          question: '¿Qué se recomienda hacer con el enlace oficial del aula virtual?',
          options: ['Memorizarlo', 'Guardarlo en favoritos', 'Anotarlo en un papel', 'Compartirlo en redes sociales'],
          correct: 1
        },
        {
          question: 'Si una página no carga, ¿qué deberías revisar primero?',
          options: ['Cambiar de computador', 'La conexión a internet y luego modo incógnito', 'Esperar al día siguiente', 'Reinstalar el navegador'],
          correct: 1
        }
      ],
      formulario: 'https://forms.cloud.microsoft/r/NMNUfCXvQ2',
    },
    requisitos: [],
  },

  CLASE2: {
    id: 'clase2',
    nombre: 'Comunicación Académica Efectiva',
    descripcion: 'Aprende a escribir correos que sí te respondan y a comunicarte como un profesional',
    orden: 2,
    icono: 'email',
    color: '#F02C7D',
    duracion: '120 min',
    contenido: {
      introduccion: 'Saber comunicarte por escrito es una de las habilidades más importantes en la vida académica. En esta clase aprenderás a redactar correos que los profesores lean con atención, a estructurar mensajes claros y a entregar tus tareas por los canales correctos. Vas a ver que con pequeños cambios en tu forma de escribir, todo se vuelve más fácil y profesional.',
      objetivos: [
        'Redactar correos electrónicos formales con la estructura adecuada para cada situación.',
        'Diferenciar cuándo usar un tono formal y cuándo uno informal en el ámbito académico.',
        'Enviar tareas y solicitudes por los canales correctos, sin errores de último minuto.'
      ],
      datosUtiles: [
        'Un asunto claro y específico hace que tu profesor responda más rápido. "Consulta sobre tarea" es mejor que "Hola".',
        'Nunca envíes un mensaje vacío o solo con un archivo adjunto sin explicación. Siempre escribe algo de contexto.',
        'Antes de hacer clic en "Enviar", relee tu mensaje en voz baja y verifica los archivos adjuntos, la fecha y el destinatario.'
      ],
      aulaInvertida: {
        antes: [
          'Mira el video y anota las partes que componen un correo académico bien hecho.',
          'Revisa tu bandeja de entrada y elige 3 correos recibidos. Analiza cuál está mejor redactado y por qué.',
          'Escribe una lista de frases formales que puedas usar en tus próximos correos (saludos, despedidas, etc.).'
        ],
        durante: [
          'Redacta un correo real de consulta académica siguiendo la estructura que verás en la clase.',
          'Intercambia tu borrador con un compañero y corrijan juntos los errores que encuentren.',
          'Simula la entrega de una tarea incluyendo asunto claro, mensaje breve y archivo adjunto.'
        ],
        despues: [
          'Envía el correo que redactaste a tu propia dirección o déjalo guardado como borrador.',
          'Completa el formulario de la clase y escribe 3 errores de comunicación que no volverás a cometer.',
          'Construye una plantilla de correo académico en un bloc de notas para reutilizarla en el futuro.'
        ]
      },
      video: 'https://www.youtube.com/embed/pd9aLpBZ7SQ?rel=0&modestbranding=1',
      pasos: [
        'Accede a tu correo institucional (@mistudiante.edu.co)',
        'Redacta un correo con asunto claro que resuma el propósito del mensaje',
        'Usa un saludo formal ("Estimado profesor", "Hola [nombre]") y una despedida cordial',
        'Adjunta los archivos necesarios verificando que sean los correctos y tengan nombres descriptivos',
        'Revisa ortografía, destinatario y archivos adjuntos antes de enviar',
        'Monitorea tu bandeja de entrada para responder a tiempo cualquier consulta'
      ],
      practicaAutonoma: [
        'Escribe un correo a un profesor solicitando una prórroga para entregar un trabajo, con razones claras y respetuosas.',
        'Redacta otro correo entregando una tarea, describiendo brevemente el archivo que adjuntas.',
        'Haz una lista de 5 frases demasiado informales que hayas usado antes y reescríbelas en tono académico.'
      ],
      evidencia: 'Envía un borrador o captura de un correo académico que incluya: asunto claro, saludo formal, cuerpo del mensaje, despedida cordial y tu nombre completo.',
      quiz: [
        {
          question: '¿Qué mejora la velocidad de respuesta del docente al enviar un correo?',
          options: ['Un saludo cordial', 'Un asunto específico y claro', 'Una despedida extensa', 'Varios archivos adjuntos'],
          correct: 1
        },
        {
          question: '¿Qué debe incluir un correo académico bien estructurado?',
          options: ['Asunto, saludo, cuerpo y despedida', 'Solo el mensaje', 'Solo el archivo adjunto', 'Emojis y colores'],
          correct: 0
        },
        {
          question: '¿Qué deberías hacer ANTES de enviar un correo académico?',
          options: ['Releer el texto y verificar adjuntos', 'Solo adjuntar el archivo', 'Esperar 24 horas', 'Pedir permiso al docente'],
          correct: 0
        },
        {
          question: '¿Qué tipo de mensaje NO es apropiado en un correo académico?',
          options: ['Mensaje formal con saludo', 'Mensaje vacío sin contexto', 'Mensaje con datos claros', 'Mensaje con despedida cordial'],
          correct: 1
        },
        {
          question: '¿Cuál de estas opciones es un canal correcto para entregar tareas académicas?',
          options: ['Redes sociales', 'Los canales indicados por el docente', 'WhatsApp personal', 'Correo no institucional'],
          correct: 1
        }
      ],
      formulario: 'https://forms.cloud.microsoft/r/xmcqVSphwj'
    },
    requisitos: ['clase1'],
  },

  CLASE3: {
    id: 'clase3',
    nombre: 'Producción Académica: Office 365',
    descripcion: 'Domina Word y PowerPoint para crear trabajos que destaquen por su calidad y orden',
    orden: 3,
    icono: 'document',
    color: '#EC5852',
    duracion: '120 min',
    contenido: {
      introduccion: 'Cuando entregas un trabajo bien formateado, causas una excelente impresión. En esta clase aprenderás a usar Word para darle a tus documentos un aspecto profesional y PowerPoint para crear presentaciones limpias que mantengan la atención de tu audiencia. Son herramientas sencillas una vez que conoces los trucos adecuados.',
      objetivos: [
        'Aplicar formato académico básico en Word para que tus documentos se vean ordenados y profesionales.',
        'Diseñar presentaciones en PowerPoint que sean visualmente atractivas sin saturar de información.',
        'Exportar y compartir tus archivos en el formato correcto para cada tipo de entrega.'
      ],
      datosUtiles: [
        'Usa los estilos predefinidos de Word (Título 1, Título 2, Normal) y podrás generar tablas de contenido automáticas en segundos.',
        'En una presentación, menos texto siempre es más. Usa imágenes, íconos o gráficos para comunicar mejor.',
        'Ponle nombres descriptivos a tus archivos: "Informe_Semana1_Perez.docx" es mejor que "Documento final.docx".'
      ],
      aulaInvertida: {
        antes: [
          'Mira los videos de Word y PowerPoint. Identifica al menos una herramienta de cada uno que no conocías.',
          'Busca una plantilla gratuita de Word o PowerPoint que puedas adaptar a alguna tarea que tengas pendiente.',
          'Elige un tema simple de tu carrera (un concepto, un proceso) para convertirlo en documento y presentación.'
        ],
        durante: [
          'Crea un documento breve con portada, títulos y subtítulos con formato consistente.',
          'Diseña una presentación de pocas diapositivas que gire en torno a una idea principal.',
          'Verifica que ambos archivos se vean bien al exportarlos o compartirlos.'
        ],
        despues: [
          'Exporta tus archivos a PDF o compártelos desde OneDrive para asegurarte de que se vean bien en cualquier dispositivo.',
          'Pídele a un compañero que revise tu trabajo y te diga si es claro, ordenado y fácil de leer.',
          'Corrige al menos un detalle de diseño o formato a partir de la retroalimentación que recibiste.'
        ]
      },
      videos: [
        {
          titulo: 'Video de Word',
          descripcion: 'Aprende a usar formato académico, estilos, estructura y trucos para trabajar más rápido en tus documentos.',
          url: 'https://youtu.be/oKZZeKwqGr8',
          embedUrl: 'https://www.youtube.com/embed/oKZZeKwqGr8?rel=0&modestbranding=1'
        },
        {
          titulo: 'Video de PowerPoint',
          descripcion: 'Descubre cómo crear presentaciones claras, visuales y efectivas que mantengan la atención de todos.',
          url: 'https://youtu.be/UHBUWkiRWo4',
          embedUrl: 'https://www.youtube.com/embed/UHBUWkiRWo4?rel=0&modestbranding=1'
        }
      ],
      herramientas: [
        'Microsoft Word: Formato académico, estilos, tabla de contenidos, citas y referencias',
        'Microsoft PowerPoint: Diseño de diapositivas limpias, temas visuales y presentaciones efectivas',
        'OneDrive o SharePoint: Comparte y guarda tus archivos en la nube para acceder desde cualquier lugar'
      ],
      pasos: [
        'Abre Word y crea un documento con estructura académica (portada, introducción, desarrollo, conclusión)',
        'Aplica estilos predefinidos a los títulos y genera una tabla de contenidos automática',
        'Inserta imágenes, tablas o elementos visuales que aporten al contenido',
        'Crea una presentación en PowerPoint con diapositivas limpias, poco texto y recursos visuales',
        'Usa un tema o plantilla para mantener colores y fuentes consistentes',
        'Exporta tus documentos a PDF antes de entregarlos para que se vean igual en cualquier computador'
      ],
      practicaAutonoma: [
        'Crea un informe de una página en Word que incluya título, una tabla simple y una conclusión breve.',
        'Diseña una presentación de 5 diapositivas que resuma un tema que hayas visto en clases.',
        'Compara ambos archivos y corrige al menos un problema de formato en cada uno.'
      ],
      evidencia: 'Entrega una captura de pantalla o archivo que muestre: (1) un documento en Word con formato claro y ordenado, y (2) una diapositiva de PowerPoint visualmente limpia y bien estructurada.',
      quiz: [
        {
          question: '¿Qué herramienta de Word permite generar una tabla de contenido automática?',
          options: ['Los estilos', 'Los colores', 'Las imágenes', 'Los bordes'],
          correct: 0
        },
        {
          question: '¿Qué mejora la calidad de una presentación en PowerPoint?',
          options: ['Mucho texto en cada diapositiva', 'Menos texto y más apoyo visual', 'Animaciones excesivas', 'Sonidos de fondo'],
          correct: 1
        },
        {
          question: '¿Qué formato es más recomendable para exportar documentos académicos?',
          options: ['.docx', '.pdf', '.txt', '.jpg'],
          correct: 1
        },
        {
          question: 'Antes de compartir un archivo, ¿qué deberías verificar?',
          options: ['Solo el peso del archivo', 'Formato, nombre y contenido', 'Solo el nombre del archivo', 'La fecha de creación'],
          correct: 1
        },
        {
          question: '¿Qué servicio de Office 365 permite compartir archivos en línea?',
          options: ['Excel', 'OneDrive', 'Outlook', 'Teams'],
          correct: 1
        }
      ],
      formulario: 'https://forms.cloud.microsoft/r/FKQWeuRjEi',
      formularioLabel: 'Abrir Forms Clase 3',
      template: 'https://templates.office.com/es-es/plantilla-informe-profesional-tm16400714'
    },
    requisitos: ['clase2'],
  },

  CLASE4: {
    id: 'clase4',
    nombre: 'Mejora tu Aprendizaje con IA',
    descripcion: 'Aprende a hablarle a la inteligencia artificial para que realmente te entienda y te ayude',
    orden: 4,
    icono: 'star',
    color: '#00D9FF',
    duracion: '120 min',
    contenido: {
      introduccion: 'La inteligencia artificial llegó para quedarse y puede ser tu mejor aliada académica si sabes cómo pedirle las cosas. En esta clase aprenderás a construir "prompts" profesionales: instrucciones claras y completas que cualquier IA (ChatGPT, Copilot, Claude, Gemini) va a entender a la perfección. Al final tendrás tu propio prompt universal listo para copiar, pegar y usar en cualquier tarea.',
      objetivos: [
        'Identificar los 5 elementos clave que todo buen prompt debe incluir para obtener respuestas útiles.',
        'Redactar instrucciones claras con contexto, formato y restricciones para un LLM.',
        'Crear un prompt profesional que puedas reutilizar en distintas asignaturas y trabajos.'
      ],
      datosUtiles: [
        'Un prompt completo siempre incluye: rol de la IA, contexto, tarea específica, formato de salida y restricciones.',
        'Entre más específico seas al pedir, mejor será la respuesta. "Resume este texto en 3 viñetas" funciona mejor que "resume esto".',
        'Siempre revisa la respuesta de la IA antes de usarla. El prompt perfecto se logra probando y ajustando.'
      ],
      aulaInvertida: {
        antes: [
          'Piensa en una tarea académica real en la que te gustaría recibir ayuda de una IA (resumir, explicar, crear ideas, etc.).',
          'Imagina que le explicas la tarea a un compañero: ¿qué información mínima necesitaría para entenderte bien?',
          'Define cómo te gustaría recibir la respuesta: ¿lista, párrafo, pasos, tabla? Eso será tu formato de salida.'
        ],
        durante: [
          'Completa el formulario guía con datos concretos sobre tu tarea y necesidades.',
          'Construye tu prompt universal usando la estructura que verás en la clase.',
          'Pruébalo en cualquier IA (ChatGPT, Copilot, Claude o Gemini) y ajusta lo que no haya quedado claro.'
        ],
        despues: [
          'Guarda tu prompt final en un bloc de notas o documento para reutilizarlo durante todo el semestre.',
          'Comparte con tus compañeros qué ajuste hizo que la IA te respondiera mejor.',
          'Completa el quiz y el formulario para consolidar lo aprendido sobre la estructura de un prompt.'
        ]
      },
      pasos: [
        'Define claramente la tarea que quieres que la IA realice (resumir, explicar, crear, comparar, etc.)',
        'Agrega contexto: ¿de qué tema se trata? ¿cuál es tu nivel de conocimiento? ¿cuál es el objetivo?',
        'Indica el formato de salida que esperas (lista con viñetas, párrafo corto, tabla comparativa, pasos numerados, etc.)',
        'Especifica restricciones: tono (formal/informal), idioma, extensión máxima, qué evitar',
        'Prueba el prompt, evalúa la respuesta y ajústalo hasta que el resultado sea el que necesitas'
      ],
      herramientas: [
        'Cualquier LLM: ChatGPT, Microsoft Copilot, Claude, Gemini u otro similar (todos funcionan con prompts)',
        'Formulario guía para construir tu prompt paso a paso',
        'Bloc de notas, Word o Google Docs para guardar tu prompt final y tus versiones de prueba'
      ],
      practicaAutonoma: [
        'Escribe un prompt para resumir un texto académico indicando formato, extensión y tono específico.',
        'Crea una segunda versión del mismo prompt pero agregando más restricciones. Compara los resultados.',
        'Guarda una plantilla base de prompt en un documento para reutilizarla en futuras tareas del semestre.'
      ],
      evidencia: 'Entrega tu prompt final listo para copiar y pegar en cualquier IA, más una nota breve indicando en qué IA lo probaste y qué ajuste hiciste después de ver la primera respuesta.',
      quiz: [
        {
          question: '¿Qué es un prompt en el contexto de la IA?',
          options: ['Un archivo de Word', 'Instrucciones claras para un LLM', 'Un tipo de gráfico', 'Un formato de imagen'],
          correct: 1
        },
        {
          question: '¿Qué elementos debe incluir un buen prompt profesional?',
          options: ['Solo la pregunta', 'Tarea, contexto, formato y restricciones', 'Solo el tema', 'Solo el formato de salida'],
          correct: 1
        },
        {
          question: '¿Qué sucede cuanto más específica sea la instrucción en un prompt?',
          options: ['La IA se confunde', 'Más útil suele ser la respuesta', 'La IA no responde', 'Es lo mismo siempre'],
          correct: 1
        },
        {
          question: '¿Qué deberías hacer después de generar tu prompt universal?',
          options: ['Olvidarlo', 'Probarlo en un LLM', 'Venderlo', 'Publicarlo en redes'],
          correct: 1
        },
        {
          question: '¿Cuál de los siguientes NO es un ejemplo de LLM?',
          options: ['ChatGPT', 'Microsoft Copilot', 'Microsoft Forms', 'Claude'],
          correct: 2
        }
      ],
      formulario: 'https://forms.cloud.microsoft/r/4UbXnTyyTP',
      formularioLabel: 'Abrir Forms Clase 4',
      promptBuilder: {
        titulo: 'Constructor de Prompt Universal',
        descripcion: 'Completa los campos clave (rol, contexto, tarea, formato y restricciones) y genera un prompt listo para copiar y pegar en cualquier LLM.',
      },
      actividad: 'Completa el formulario, genera tu prompt profesional universal y pruebalo en el LLM que prefieras.',
    },
    requisitos: ['clase3'],
  },

  CLASE5: {
    id: 'clase5',
    nombre: 'Bonus Track: Excel',
    descripcion: 'Domina lo básico de Excel: fórmulas, tablas ordenadas y gráficos para tus trabajos',
    orden: 5,
    icono: 'spreadsheet',
    color: '#217346',
    duracion: '60 min',
    contenido: {
      introduccion: 'Este bonus track es para que le pierdas el miedo a Excel. Vas a aprender las funciones más útiles para la vida académica: sumar y promediar notas, organizar información en tablas limpias y crear gráficos simples que hablen por sí solos. No necesitas saber nada de antemano, solo tener Excel abierto y ganas de aprender algo práctico.',
      objetivos: [
        'Aplicar fórmulas básicas como SUMA y PROMEDIO en una planilla con datos reales.',
        'Organizar información académica usando encabezados claros, filtros y formato ordenado.',
        'Crear un gráfico de columnas simple para visualizar y comunicar resultados.'
      ],
      datosUtiles: [
        'Toda fórmula en Excel comienza con el signo =. Escríbelo siempre antes de cualquier operación.',
        'Los encabezados claros (Nombre, Nota 1, Nota 2, Promedio) hacen que tu tabla sea fácil de entender para ti y para los demás.',
        'Un gráfico bien elegido comunica información en segundos. No reemplaza los datos, pero ayuda a interpretarlos rápidamente.'
      ],
      aulaInvertida: {
        antes: [
          'Mira el video de Excel completo y anota las funciones o herramientas que no conocías.',
          'Piensa en una situación real donde podrías usar Excel: registro de notas, control de gastos, asistencia, etc.',
          'Abre Excel o Excel Online para practicar al mismo tiempo que ves los recursos.'
        ],
        durante: [
          'Crea una tabla con nombres de compañeros y notas de ejemplo. Ordena la información con encabezados claros.',
          'Aplica una fórmula de SUMA y una de PROMEDIO. Revisa que los números tengan sentido.',
          'Genera un gráfico de columnas con los datos para visualizar quién tiene el promedio más alto y más bajo.'
        ],
        despues: [
          'Usa el filtro o la herramienta de orden para encontrar rápidamente un dato específico en tu tabla.',
          'Responde el quiz y completa el formulario para cerrar esta actividad.',
          'Guarda una captura de tu planilla como evidencia de tu práctica.'
        ]
      },
      video: 'https://www.youtube.com/embed/S8FsLXYM0Qo?rel=0&modestbranding=1',
      herramientas: [
        'Microsoft Excel o Excel Online (gratuito desde tu navegador)',
        'Fórmulas básicas: SUMA, PROMEDIO, ordenar y filtrar datos',
        'Gráficos de columnas para visualizar y comparar resultados'
      ],
      pasos: [
        'Crea una tabla con encabezados claros (Nombre, Nota 1, Nota 2, Promedio)',
        'Ingresa datos de ejemplo en las filas (nombres y notas numéricas)',
        'Aplica la fórmula =SUMA(rango) y =PROMEDIO(rango) en las celdas correspondientes',
        'Usa la opción de ordenar o filtrar para organizar la información como necesites',
        'Selecciona los datos e inserta un gráfico de columnas para visualizar los resultados'
      ],
      practicaAutonoma: [
        'Crea una planilla con 5 estudiantes, ingresa 3 notas para cada uno y calcula sus promedios.',
        'Ordena los promedios de mayor a menor e identifica quién necesita más apoyo.',
        'Genera un gráfico de columnas con los promedios y escribe una conclusión de una línea.'
      ],
      evidencia: 'Entrega una captura de pantalla de tu planilla donde se vean: encabezados claros, una fórmula aplicada (SUMA o PROMEDIO) y un gráfico básico de columnas.',
      quiz: [
        {
          question: '¿Con qué signo comienza toda fórmula en Excel?',
          options: ['=', '+', '-', '*'],
          correct: 0
        },
        {
          question: '¿Qué función de Excel se usa para calcular el promedio de un rango de celdas?',
          options: ['SUMA', 'PROMEDIO', 'CONTAR', 'MAX'],
          correct: 1
        },
        {
          question: '¿Qué hace que una tabla en Excel sea más fácil de leer y organizar?',
          options: ['Usar muchos colores', 'Encabezados claros', 'Dejar celdas vacías', 'Combinar todas las celdas'],
          correct: 1
        },
        {
          question: '¿Para qué sirve principalmente un gráfico en Excel?',
          options: ['Reemplazar los datos', 'Interpretar datos rápidamente', 'Ocultar información', 'Imprimir más bonito'],
          correct: 1
        },
        {
          question: '¿Qué debes hacer después de completar tu planilla de práctica?',
          options: ['Cerrar sin guardar', 'Guardar una captura como evidencia', 'Borrar todo', 'Enviarla por correo al profesor'],
          correct: 1
        }
      ],
      formulario: 'https://forms.cloud.microsoft/r/cE3ykPkMMi',
      formularioLabel: 'Abrir Forms de Excel',
      descarga: {
        url: './assets/actividades/actividad1.xlsx',
        nombre: 'actividad1.xlsx',
        etiqueta: 'Descargar Actividad Excel',
      },
      actividad: 'Descarga el archivo actividad1.xlsx, completalo en Excel siguiendo las instrucciones del archivo y luego sube una captura al formulario como evidencia.',  
    },
    requisitos: [],
  },
};

export const GETCLASE = (id) => {
  if (!id) return null;

  const normalizedId = id.toString().trim().toLowerCase();
  const numericId = normalizedId.replace('clase', '');

  return CLASES[`CLASE${numericId}`] || null;
};

export const CLASES_ARRAY = Object.values(CLASES).sort((a, b) => a.orden - b.orden);

export const GETCLASE_SIGUIENTE = (claseActual) => {
  const index = CLASES_ARRAY.findIndex((c) => c.id === claseActual);
  return index < CLASES_ARRAY.length - 1 ? CLASES_ARRAY[index + 1] : null;
};
