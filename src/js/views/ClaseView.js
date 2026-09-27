/**
 * Clase View (Genérica)
 * Principio SOLID: Single Responsibility - Renderiza cualquier clase
 */

import { GETCLASE } from '../constants/clases.js';
import { ROUTES } from '../constants/routes.js';
import { ProgressBarComponent } from '../components/ProgressBarComponent.js';
import { ToastNotification } from '../components/ToastNotification.js';
import { QuizEngine } from '../components/QuizEngine.js';

export class ClaseView {
  constructor(claseId, progressService, navigationService, user = null) {
    this.claseId = claseId;
    this.clase = GETCLASE(claseId);
    this.progressService = progressService;
    this.navigationService = navigationService;
    this.user = user;
  }

  render() {
    if (!this.clase) {
      return '<div>Clase no encontrada</div>';
    }

    return `
      <div class="clase-view">
        <div class="clase-header">
          <h1>${this.clase.nombre}</h1>
          <p>${this.clase.descripcion}</p>
        </div>

        ${this.renderIntroduccion()}
        ${this.renderObjetivos()}
        ${this.renderDatosUtiles()}
        <div id="clase-video-container">${this.renderVideo()}</div>
        ${this.renderAulaInvertida()}
        ${this.renderPasos()}
        <div id="clase-actividades-container">${this.renderActividades()}</div>
        ${this.renderPracticaAutonoma()}
        ${this.renderEvidencia()}
        <div id="clase-validacion-container">${this.renderValidacionEvidencia()}</div>

        <div class="clase-footer">
          <div class="clase-progress">
            <div id="clase-progress-container"></div>
          </div>
          <div id="clase-complete-container">
            ${this.renderCompleteButton()}
          </div>
        </div>
      </div>
    `;
  }

  renderIntroduccion() {
    if (!this.clase.contenido.introduccion) return '';

    return `
      <section class="clase-section">
        <h2>📖 Introducción</h2>
        <p>${this.clase.contenido.introduccion}</p>
      </section>
    `;
  }

  renderObjetivos() {
    const objetivos = this.clase.contenido.objetivos;
    if (!objetivos || objetivos.length === 0) return '';

    return `
      <section class="clase-section">
        <h2>🎯 Qué vas a lograr</h2>
        <ul class="clase-lista clase-lista--objetivos">
          ${objetivos.map((objetivo) => `<li>${objetivo}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  renderDatosUtiles() {
    const datosUtiles = this.clase.contenido.datosUtiles;
    if (!datosUtiles || datosUtiles.length === 0) return '';

    return `
      <section class="clase-section">
        <h2>📌 Datos Útiles</h2>
        <div class="clase-data-grid">
          ${datosUtiles
            .map(
              (dato) => `
                <article class="clase-data-card">
                  <span class="clase-data-card__icon">💡</span>
                  <p>${dato}</p>
                </article>
              `
            )
            .join('')}
        </div>
      </section>
    `;
  }

  renderVideo() {
    const videos = this.clase.contenido.videos || [];
    const video = this.clase.contenido.video;
    if (!video && videos.length === 0) return '';

    const evidencia = this.progressService.obtenerEvidenciaClase(this.claseId);
    const estadoVideo = evidencia.videoVisto ? 'Completado' : 'Pendiente';

    if (videos.length > 0) {
      return `
        <section class="clase-section">
          <h2>🎥 Recursos de Video</h2>
          <div class="clase-data-grid">
            ${videos
              .map(
                (item) => `
                  <article class="clase-data-card">
                    <span class="clase-data-card__icon">🎬</span>
                    <div style="width:100%;">
                      <h3>${item.titulo}</h3>
                      <p>${item.descripcion}</p>
                      <div class="clase-video" style="margin: 0.75rem 0; min-height: 260px;">
                        <iframe 
                          width="100%" 
                          height="100%"
                          src="${item.embedUrl || item.url}"
                          frameborder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowfullscreen
                        ></iframe>
                      </div>
                      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="btn btn--info btn--sm">
                        Abrir video en nueva pestaña
                      </a>
                    </div>
                  </article>
                `
              )
              .join('')}
          </div>
          <div class="clase-inline-validation">
            <span class="clase-status ${evidencia.videoVisto ? 'clase-status--done' : 'clase-status--pending'}">Video: ${estadoVideo}</span>
            <button
              type="button"
              class="btn ${evidencia.videoVisto ? 'btn--secondary' : 'btn--outline'} btn--sm evidencia-confirm-btn"
              data-evidence="video"
            >
              ${evidencia.videoVisto ? 'Videos confirmados' : 'Marcar videos como revisados'}
            </button>
          </div>
        </section>
      `;
    }

    return `
      <section class="clase-section">
        <h2>🎥 Video Tutorial</h2>
        <div class="clase-video">
          <iframe 
            width="100%" 
            height="100%"
            src="${video}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="clase-inline-validation">
          <span class="clase-status ${evidencia.videoVisto ? 'clase-status--done' : 'clase-status--pending'}">Video: ${estadoVideo}</span>
          <button
            type="button"
            class="btn ${evidencia.videoVisto ? 'btn--secondary' : 'btn--outline'} btn--sm evidencia-confirm-btn"
            data-evidence="video"
          >
            ${evidencia.videoVisto ? 'Video confirmado' : 'Marcar video como visto'}
          </button>
        </div>
      </section>
    `;
  }

  renderAulaInvertida() {
    const aulaInvertida = this.clase.contenido.aulaInvertida;
    if (!aulaInvertida) return '';

    const bloques = [
      { key: 'antes', title: 'Antes de la clase', icon: '👀' },
      { key: 'durante', title: 'Durante la clase', icon: '🧠' },
      { key: 'despues', title: 'Después de la clase', icon: '🚀' },
    ];

    return `
      <section class="clase-section">
        <h2>🔄 Ruta de Aula Invertida</h2>
        <div class="clase-flipped-grid">
          ${bloques
            .map(({ key, title, icon }) => {
              const items = aulaInvertida[key] || [];
              if (items.length === 0) return '';

              return `
                <article class="clase-flipped-card clase-flipped-card--${key}">
                  <h3>${icon} ${title}</h3>
                  <ul class="clase-lista">
                    ${items.map((item) => `<li>${item}</li>`).join('')}
                  </ul>
                </article>
              `;
            })
            .join('')}
        </div>
      </section>
    `;
  }

  renderPasos() {
    if (!this.clase.contenido.pasos) return '';

    const pasos = this.clase.contenido.pasos
      .map(
        (paso, index) => `
        <div class="step">
          <div class="step__number">${index + 1}</div>
          <div class="step__content">
            <div class="step__title">${paso}</div>
          </div>
          <input type="checkbox" class="step__checkbox" data-step="${index}" />
        </div>
      `
      )
      .join('');

    return `
      <section class="clase-section">
        <h2>✅ Pasos a Seguir</h2>
        <div class="clase-steps">
          ${pasos}
        </div>
      </section>
    `;
  }

  renderActividades() {
    const actividades = [];
    const evidencia = this.progressService.obtenerEvidenciaClase(this.claseId);

    // Herramientas
    if (this.clase.contenido.herramientas && this.clase.contenido.herramientas.length > 0) {
      const herramientas = this.clase.contenido.herramientas
        .map(h => `<li>${h}</li>`)
        .join('');
      actividades.push(`
        <div class="clase-tools">
          <h3>🛠️ Herramientas Necesarias</h3>
          <ul class="tools-list">
            ${herramientas}
          </ul>
        </div>
      `);
    }

    // Quiz integrado (reemplaza el Kahoot externo)
    const quizQuestions = this.clase.contenido.quiz;
    const quizCompletado = evidencia.kahootCompletado;
    if (quizQuestions && quizQuestions.length > 0) {
      actividades.push(`
        <div class="clase-action-card clase-action-card--quiz">
          <div class="clase-action-card__content">
            <h3>🎮 Quiz de la Clase</h3>
            <p>Responde las preguntas para demostrar lo que aprendiste. Debes acertar al menos el 60% para desbloquear la misión.</p>
            ${quizCompletado ? '<div class="quiz-completed-badge">✓ Quiz completado</div>' : ''}
          </div>
          <div class="quiz-wrapper" id="quiz-container">
          </div>
        </div>
      `);
      this.quizActive = true;
    }

    const formularioUrl = this.clase.contenido.formulario;
    const formularioLabel = this.clase.contenido.formularioLabel || 'Abrir Formulario';
    if (formularioUrl) {
      actividades.push(`
        <div class="clase-action-card">
          <div class="clase-action-card__content">
            <h3>📋 Formulario</h3>
            <p>Envía tu respuesta en Microsoft Forms y luego deja registrada la confirmación en la plataforma.</p>
          </div>
          <div class="clase-action-card__actions">
            <a href="${formularioUrl}" target="_blank" rel="noopener noreferrer" class="btn btn--accent btn--lg">
              ${formularioLabel}
            </a>
            <button
              type="button"
              class="btn ${evidencia.formularioCompletado ? 'btn--secondary' : 'btn--outline'} btn--sm evidencia-confirm-btn"
              data-evidence="formulario"
            >
              ${evidencia.formularioCompletado ? 'Formulario confirmado' : 'Confirmar formulario'}
            </button>
          </div>
        </div>
      `);
    }

    // EdPuzzle
    if (this.clase.contenido.edpuzzle) {
      actividades.push(`
        <a href="${this.clase.contenido.edpuzzle}" target="_blank" class="btn btn--primary btn--lg">
          🎬 EdPuzzle
        </a>
      `);
    }

    // Template
    if (this.clase.contenido.template) {
      actividades.push(`
        <a href="${this.clase.contenido.template}" target="_blank" class="btn btn--secondary btn--lg">
          📄 Descargar Plantilla
        </a>
      `);
    }

    // Descarga de archivo
    if (this.clase.contenido.descarga) {
      const { url, nombre, etiqueta } = this.clase.contenido.descarga;
      actividades.push(`
        <div class="clase-action-card clase-action-card--download">
          <div class="clase-action-card__content">
            <h3>📥 Actividad Práctica</h3>
            <p>Descarga el archivo, complétalo en Excel y sube la evidencia en el formulario.</p>
          </div>
          <div class="clase-action-card__actions">
            <a
              href="${url}"
              download="${nombre}"
              class="btn btn--success btn--lg"
            >
              ${etiqueta}
            </a>
          </div>
        </div>
      `);
    }

    // Constructor de prompt universal
    if (this.clase.contenido.promptBuilder) {
      const { titulo, descripcion } = this.clase.contenido.promptBuilder;
      actividades.push(`
        <div class="clase-action-card clase-action-card--prompt-builder">
          <div class="clase-action-card__content">
            <h3>🧩 ${titulo}</h3>
            <p>${descripcion}</p>
            <div class="prompt-builder" id="prompt-builder">
              <label for="prompt-rol"><strong>Rol de la IA</strong></label>
              <input id="prompt-rol" class="prompt-builder-input" type="text" placeholder="Ej: Tutor académico de educación superior" />

              <div class="prompt-builder-quick-options">
                <div>
                  <label for="prompt-tono"><strong>Tono</strong></label>
                  <select id="prompt-tono" class="prompt-builder-input">
                    <option value="académico claro">Académico claro</option>
                    <option value="formal profesional">Formal profesional</option>
                    <option value="simple y didáctico">Simple y didáctico</option>
                    <option value="motivador y cercano">Motivador y cercano</option>
                  </select>
                </div>
                <div>
                  <label for="prompt-longitud"><strong>Longitud</strong></label>
                  <select id="prompt-longitud" class="prompt-builder-input">
                    <option value="máximo 150 palabras">Corta (150 palabras)</option>
                    <option value="máximo 250 palabras" selected>Media (250 palabras)</option>
                    <option value="máximo 400 palabras">Larga (400 palabras)</option>
                  </select>
                </div>
                <div>
                  <label for="prompt-idioma"><strong>Idioma</strong></label>
                  <select id="prompt-idioma" class="prompt-builder-input">
                    <option value="español" selected>Español</option>
                    <option value="inglés">Inglés</option>
                  </select>
                </div>
              </div>

              <label for="prompt-contexto"><strong>Contexto</strong></label>
              <textarea id="prompt-contexto" class="prompt-builder-input" rows="2" placeholder="Ej: Estoy en primer año y necesito preparar una evaluación sobre comunicación académica."></textarea>

              <label for="prompt-tarea"><strong>Tarea específica</strong></label>
              <textarea id="prompt-tarea" class="prompt-builder-input" rows="2" placeholder="Ej: Ayúdame a resumir este texto y convertirlo en una guía de estudio clara."></textarea>

              <label for="prompt-formato"><strong>Formato de salida</strong></label>
              <input id="prompt-formato" class="prompt-builder-input" type="text" placeholder="Ej: Entrega en lista de 5 puntos y luego 3 preguntas tipo prueba" />

              <label for="prompt-restricciones"><strong>Restricciones y criterios</strong></label>
              <textarea id="prompt-restricciones" class="prompt-builder-input" rows="2" placeholder="Ej: Español claro, máximo 250 palabras, no inventar datos, tono académico simple."></textarea>

              <label for="prompt-output"><strong>Prompt universal generado</strong></label>
              <textarea id="prompt-output" rows="10" readonly></textarea>
            </div>
          </div>
          <div class="clase-action-card__actions">
            <button type="button" class="btn btn--primary btn--lg" id="prompt-generate-btn">Generar Prompt</button>
            <button type="button" class="btn btn--success btn--lg" id="prompt-copy-btn">Copiar Prompt</button>
            <button type="button" class="btn btn--secondary btn--lg" id="prompt-clear-btn">Limpiar Campos</button>
          </div>
        </div>
      `);
    }

    // Actividad personalizada
    if (this.clase.contenido.actividad) {
      actividades.push(`
        <div class="clase-activity">
          <h3>💡 Instrucciones</h3>
          <p>${this.clase.contenido.actividad}</p>
        </div>
      `);
    }

    if (actividades.length === 0) return '';

    return `
      <section class="clase-section">
        <h2>🎯 Recursos y Actividades</h2>
        <div class="clase-actions">
          ${actividades.join('')}
        </div>
      </section>
    `;
  }

  renderPracticaAutonoma() {
    const practicaAutonoma = this.clase.contenido.practicaAutonoma;
    if (!practicaAutonoma || practicaAutonoma.length === 0) return '';

    return `
      <section class="clase-section">
        <h2>🧪 Práctica para Consolidar</h2>
        <ul class="clase-lista clase-lista--practica">
          ${practicaAutonoma.map((item) => `<li>${item}</li>`).join('')}
        </ul>
      </section>
    `;
  }

  renderEvidencia() {
    const evidencia = this.clase.contenido.evidencia;
    if (!evidencia) return '';

    return `
      <section class="clase-section clase-section--evidencia">
        <h2>📎 Evidencia Sugerida</h2>
        <p>${evidencia}</p>
      </section>
    `;
  }

  renderValidacionEvidencia() {
    const evidencia = this.progressService.obtenerEvidenciaClase(this.claseId);
    const pendientes = this.progressService.obtenerRequisitosPendientes(this.claseId);
    const items = [
      {
        key: 'videoVisto',
        label: 'Video revisado',
        helper: 'Marca este paso cuando termines el video de la clase.',
      },
      {
        key: 'kahootCompletado',
        label: 'Quiz completado',
        helper: 'Responde el quiz integrado para desbloquear la misión.',
      },
      {
        key: 'formularioCompletado',
        label: 'Formulario enviado',
        helper: 'Registra el envio del formulario para desbloquear el cierre.',
      },
    ];

    return `
      <section class="clase-section clase-section--validacion">
        <h2>🔒 Validación de Evidencia</h2>
        <div class="clase-validation-list">
          ${items
            .map(
              ({ key, label, helper }) => `
                <article class="clase-validation-item ${evidencia[key] ? 'is-complete' : ''}">
                  <span class="clase-validation-item__icon">${evidencia[key] ? '✓' : '○'}</span>
                  <div class="clase-validation-item__content">
                    <strong>${label}</strong>
                    <p>${helper}</p>
                  </div>
                </article>
              `
            )
            .join('')}
        </div>
        <p class="clase-validation-note">
          ${pendientes.length === 0
            ? 'Todos los requisitos de evidencia estan completos. Ya puedes cerrar esta misión.'
            : `Falta completar: ${pendientes.join(', ')}.`}
        </p>
      </section>
    `;
  }

  renderCompleteButton() {
    const claseProgress = this.progressService.obtenerProgresoClase(this.claseId);
    const evidenciaCompleta = this.progressService.esEvidenciaCompleta(this.claseId);
    const pendientes = this.progressService.obtenerRequisitosPendientes(this.claseId);
    const yaCompletada = claseProgress?.completada;

    return `
      <button
        class="btn btn--success btn--lg clase-complete-btn"
        data-action="complete-clase"
        id="complete-btn"
        ${yaCompletada || !evidenciaCompleta ? 'disabled' : ''}
        title="${yaCompletada ? 'La misión ya fue completada.' : evidenciaCompleta ? 'Listo para completar la misión.' : `Falta: ${pendientes.join(', ')}` }"
      >
        ${yaCompletada ? 'Misión completada' : 'Completar Misión'}
      </button>
    `;
  }

  mount(selector) {
    const container = document.querySelector(selector);
    if (container) {
      container.innerHTML = this.render();
      this.attachListeners();
      this.renderProgress();
      this.initQuiz();
    }
  }

  initQuiz() {
    const quizContainer = document.querySelector('#quiz-container');
    const quizQuestions = this.clase.contenido.quiz;
    const evidencia = this.progressService.obtenerEvidenciaClase(this.claseId);
    if (quizContainer && quizQuestions && quizQuestions.length > 0 && !evidencia.kahootCompletado) {
      this.quiz = new QuizEngine(quizQuestions, (passed, score, total) => {
        if (passed) {
          this.progressService.marcarKahootCompletado(this.claseId);
          ToastNotification.success(`Quiz aprobado! ${score}/${total} correctas`, 3000);
          this.syncEvidenceUI();
        } else {
          ToastNotification.warning(`Necesitas al menos 60% para aprobar. Obtuviste ${score}/${total}`, 4000);
        }
      });
      this.quiz.mount(quizContainer);
    } else if (quizContainer && evidencia.kahootCompletado) {
      quizContainer.innerHTML = '<div class="quiz-completed-msg">✓ Ya completaste este quiz. Puedes continuar con la misión.</div>';
    }
  }

  attachListeners() {
    const completeButton = document.querySelector('#complete-btn');
    if (completeButton) {
      completeButton.onclick = (e) => {
        e.preventDefault();
        this.completarClase();
      };
    }

    document.querySelectorAll('.evidencia-confirm-btn').forEach((button) => {
      button.onclick = (event) => {
        event.preventDefault();
        this.confirmarEvidencia(event.currentTarget.dataset.evidence);
      };
    });

    document.querySelectorAll('.step__checkbox').forEach((checkbox) => {
      checkbox.onchange = () => {
        this.actualizarProgreso();
      };
    });

    const promptGenerateBtn = document.querySelector('#prompt-generate-btn');
    const promptCopyBtn = document.querySelector('#prompt-copy-btn');
    const promptClearBtn = document.querySelector('#prompt-clear-btn');
    const promptInputs = document.querySelectorAll('.prompt-builder-input');

    if (promptGenerateBtn) {
      promptGenerateBtn.onclick = (event) => {
        event.preventDefault();
        this.actualizarPromptUniversal();
      };
    }

    if (promptCopyBtn) {
      promptCopyBtn.onclick = async (event) => {
        event.preventDefault();
        await this.copiarPromptUniversal();
      };
    }

    if (promptClearBtn) {
      promptClearBtn.onclick = (event) => {
        event.preventDefault();
        this.limpiarPromptUniversal();
      };
    }

    if (promptInputs.length > 0) {
      promptInputs.forEach((input) => {
        input.addEventListener('input', () => this.actualizarPromptUniversal());
        input.addEventListener('change', () => this.actualizarPromptUniversal());
      });

      // Inicializa el cuadro de salida con una plantilla base.
      this.actualizarPromptUniversal();
    }
  }

  obtenerValorPrompt(id, fallback) {
    const element = document.querySelector(`#${id}`);
    const valor = element?.value?.trim();
    return valor || fallback;
  }

  actualizarPromptUniversal() {
    const output = document.querySelector('#prompt-output');
    if (!output) return;

    const rol = this.obtenerValorPrompt('prompt-rol', 'Asistente académico profesional');
    const contexto = this.obtenerValorPrompt(
      'prompt-contexto',
      'Estudiante de educación superior que necesita apoyo para una tarea específica.'
    );
    const tarea = this.obtenerValorPrompt(
      'prompt-tarea',
      'Ayúdame a resolver la tarea solicitada paso a paso con claridad.'
    );
    const formato = this.obtenerValorPrompt(
      'prompt-formato',
      'Entrega la respuesta en una lista clara y ordenada.'
    );
    const restricciones = this.obtenerValorPrompt(
      'prompt-restricciones',
      'No inventes datos y mantén claridad en cada punto.'
    );
    const tono = this.obtenerValorPrompt('prompt-tono', 'académico claro');
    const longitud = this.obtenerValorPrompt('prompt-longitud', 'máximo 250 palabras');
    const idioma = this.obtenerValorPrompt('prompt-idioma', 'español');

    output.value = `Actúa como ${rol}.\n\nContexto:\n${contexto}\n\nTarea:\n${tarea}\n\nFormato de salida esperado:\n${formato}\n\nRestricciones y criterios de calidad:\n${restricciones}\n\nParámetros rápidos:\n- Idioma: ${idioma}\n- Tono: ${tono}\n- Longitud: ${longitud}\n\nSi falta información relevante, indícalo antes de responder. No inventes datos y organiza la respuesta de forma útil para estudiar.`;
  }

  limpiarPromptUniversal() {
    const ids = [
      'prompt-rol',
      'prompt-contexto',
      'prompt-tarea',
      'prompt-formato',
      'prompt-restricciones',
    ];

    ids.forEach((id) => {
      const element = document.querySelector(`#${id}`);
      if (element) {
        element.value = '';
      }
    });

    const tono = document.querySelector('#prompt-tono');
    const longitud = document.querySelector('#prompt-longitud');
    const idioma = document.querySelector('#prompt-idioma');

    if (tono) tono.value = 'académico claro';
    if (longitud) longitud.value = 'máximo 250 palabras';
    if (idioma) idioma.value = 'español';

    this.actualizarPromptUniversal();
    ToastNotification.success('Campos limpiados. Puedes crear un nuevo prompt.', 2200);
  }

  async copiarPromptUniversal() {
    const output = document.querySelector('#prompt-output');
    if (!output || !output.value.trim()) {
      ToastNotification.show('Primero genera el prompt antes de copiarlo.', 'warning');
      return;
    }

    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(output.value);
      } else {
        output.select();
        document.execCommand('copy');
      }

      ToastNotification.show('Prompt copiado. Ya puedes pegarlo en tu LLM.', 'success');
    } catch (error) {
      ToastNotification.show('No se pudo copiar automaticamente. Copialo manualmente desde el cuadro.', 'warning');
    }
  }

  actualizarProgreso() {
    const totalPasos =
      this.clase.contenido.pasos?.length || 1;
    const pasosMarcados = document.querySelectorAll(
      '.step__checkbox:checked'
    ).length;
    const porcentaje = Math.round((pasosMarcados / totalPasos) * 100);

    this.progressService.actualizarProgreso(this.claseId, porcentaje);
    this.renderProgress();
  }

  renderProgress() {
    const claseProgress = this.progressService.obtenerProgresoClase(this.claseId);
    const pb = new ProgressBarComponent(claseProgress.progreso, 'Progreso de clase');
    const container = document.querySelector('#clase-progress-container');
    if (container) {
      container.innerHTML = pb.render();
    }
  }

  confirmarEvidencia(tipo) {
    const actions = {
      video: {
        handler: () => this.progressService.marcarVideoVisto(this.claseId),
        successMessage: 'Video registrado como revisado.',
      },
      kahoot: {
        handler: () => this.progressService.marcarKahootCompletado(this.claseId),
        successMessage: 'Kahoot registrado correctamente.',
      },
      formulario: {
        handler: () => this.progressService.marcarFormularioCompletado(this.claseId),
        successMessage: 'Formulario registrado correctamente.',
      },
    };

    const action = actions[tipo];
    if (!action) {
      return;
    }

    action.handler();
    ToastNotification.success(action.successMessage, 2200);
    this.syncEvidenceUI();
  }

  syncEvidenceUI() {
    const videoContainer = document.querySelector('#clase-video-container');
    if (videoContainer) {
      videoContainer.innerHTML = this.renderVideo();
    }

    const actividadesContainer = document.querySelector('#clase-actividades-container');
    if (actividadesContainer) {
      actividadesContainer.innerHTML = this.renderActividades();
    }

    const validacionContainer = document.querySelector('#clase-validacion-container');
    if (validacionContainer) {
      validacionContainer.innerHTML = this.renderValidacionEvidencia();
    }

    const completeContainer = document.querySelector('#clase-complete-container');
    if (completeContainer) {
      completeContainer.innerHTML = this.renderCompleteButton();
    }

    this.attachListeners();
    this.initQuiz();
  }

  completarClase() {
    if (!this.progressService.esEvidenciaCompleta(this.claseId)) {
      const pendientes = this.progressService.obtenerRequisitosPendientes(this.claseId);
      ToastNotification.warning(`Aun no puedes completar la misión. Falta: ${pendientes.join(', ')}`, 3500);
      return;
    }

    const completado = this.progressService.completarClase(this.claseId);
    if (completado) {
      ToastNotification.success('Misión completada correctamente.', 2500);
      this.navigationService.ir(ROUTES.HOME);
    }
  }
}

export default ClaseView;
