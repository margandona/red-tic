export class QuizEngine {
  constructor(questions, onComplete) {
    this.questions = questions;
    this.onComplete = onComplete;
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
    this.selectedAnswer = null;
    this.answered = false;
    this.timer = null;
    this.timeLeft = 15;
    this.totalQuestions = questions.length;
    this.started = false;
  }

  render() {
    if (!this.started) {
      return this.renderStart();
    }
    if (this.currentIndex >= this.totalQuestions) {
      return this.renderResults();
    }

    const q = this.questions[this.currentIndex];
    const progress = ((this.currentIndex) / this.totalQuestions) * 100;

    return `
      <div class="quiz-engine">
        <div class="quiz-header">
          <div class="quiz-progress-bar">
            <div class="quiz-progress-fill" style="width: ${progress}%"></div>
          </div>
          <div class="quiz-stats">
            <span class="quiz-counter">Pregunta ${this.currentIndex + 1}/${this.totalQuestions}</span>
            <span class="quiz-score">⭐ ${this.score} pts</span>
            <span class="quiz-timer" id="quiz-timer">${this.timeLeft}s</span>
          </div>
        </div>

        <div class="quiz-question">
          <h3 class="quiz-question-text">${q.question}</h3>
        </div>

        <div class="quiz-options">
          ${q.options.map((opt, i) => {
            const colors = ['quiz-option--red', 'quiz-option--blue', 'quiz-option--yellow', 'quiz-option--green'];
            let extraClass = colors[i];
            if (this.answered) {
              if (i === q.correct) {
                extraClass += ' quiz-option--correct';
              } else if (i === this.selectedAnswer) {
                extraClass += ' quiz-option--wrong';
              } else {
                extraClass += ' quiz-option--disabled';
              }
            }
            return `
              <button class="quiz-option ${extraClass}" data-index="${i}" ${this.answered ? 'disabled' : ''}>
                <span class="quiz-option-letter">${String.fromCharCode(65 + i)}</span>
                <span class="quiz-option-text">${opt}</span>
              </button>
            `;
          }).join('')}
        </div>

        <div class="quiz-feedback" id="quiz-feedback">
          ${this.answered ? `
            <div class="quiz-feedback-banner ${this.selectedAnswer === q.correct ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}">
              ${this.selectedAnswer === q.correct
                ? '✓ ¡Correcto!'
                : `✗ Incorrecto. Respuesta correcta: ${q.options[q.correct]}`
              }
            </div>
            <button class="btn btn--primary quiz-next-btn" id="quiz-next-btn">
              ${this.currentIndex < this.totalQuestions - 1 ? 'Siguiente →' : 'Ver resultados'}
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }

  renderStart() {
    return `
      <div class="quiz-engine quiz-start">
        <div class="quiz-start-card">
          <div class="quiz-start-icon">🎮</div>
          <h3 class="quiz-start-title">Quiz de la Clase</h3>
          <p class="quiz-start-desc">Pon a prueba lo que aprendiste. Responderás ${this.totalQuestions} preguntas con tiempo límite por cada una.</p>
          <div class="quiz-start-info">
            <div class="quiz-start-info-item">
              <span class="quiz-start-info-label">Preguntas</span>
              <span class="quiz-start-info-value">${this.totalQuestions}</span>
            </div>
            <div class="quiz-start-info-item">
              <span class="quiz-start-info-label">Tiempo por pregunta</span>
              <span class="quiz-start-info-value">15 seg</span>
            </div>
            <div class="quiz-start-info-item">
              <span class="quiz-start-info-label">Mínimo para aprobar</span>
              <span class="quiz-start-info-value">60%</span>
            </div>
          </div>
          <button class="btn btn--primary btn--lg quiz-start-btn" id="quiz-start-btn">Comenzar Quiz</button>
        </div>
      </div>
    `;
  }

  renderResults() {
    const porcentaje = Math.round((this.score / this.totalQuestions) * 100);
    let mensaje, emoji;
    if (porcentaje >= 80) {
      mensaje = 'Excelente, dominas el tema';
      emoji = '🏆';
    } else if (porcentaje >= 60) {
      mensaje = 'Buen trabajo, sigue practicando';
      emoji = '⭐';
    } else if (porcentaje >= 40) {
      mensaje = 'Puedes mejorar, revisa el material';
      emoji = '📖';
    } else {
      mensaje = 'Te recomendamos repasar la clase';
      emoji = '💪';
    }

    return `
      <div class="quiz-engine quiz-results">
        <div class="quiz-results-card">
          <div class="quiz-results-icon">${emoji}</div>
          <h2 class="quiz-results-title">Quiz Completado</h2>
          <div class="quiz-results-score">
            <span class="quiz-results-value">${this.score}/${this.totalQuestions}</span>
            <span class="quiz-results-label">respuestas correctas</span>
          </div>
          <div class="quiz-results-bar">
            <div class="quiz-results-fill" style="width: ${porcentaje}%"></div>
          </div>
          <p class="quiz-results-message">${mensaje} (${porcentaje}%)</p>
          <div class="quiz-results-actions">
            <button class="btn btn--primary quiz-retry-btn" id="quiz-retry-btn">Intentar de nuevo</button>
            <button class="btn btn--success quiz-confirm-btn" id="quiz-confirm-btn">Confirmar y continuar</button>
          </div>
        </div>
      </div>
    `;
  }

  mount(selector) {
    const container = typeof selector === 'string' ? document.querySelector(selector) : selector;
    if (!container) return;
    container.innerHTML = this.render();
    if (this.started) {
      this.startTimer();
    }
    this.attachListeners(container);
  }

  startTimer() {
    if (this.answered) return;
    this.timeLeft = 15;
    const timerEl = document.getElementById('quiz-timer');
    if (timerEl) timerEl.textContent = `${this.timeLeft}s`;

    this.clearTimer();
    this.timer = setInterval(() => {
      this.timeLeft--;
      const el = document.getElementById('quiz-timer');
      if (el) {
        el.textContent = `${this.timeLeft}s`;
        if (this.timeLeft <= 5) el.classList.add('quiz-timer--warning');
      }
      if (this.timeLeft <= 0) {
        this.clearTimer();
        this.handleTimeout();
      }
    }, 1000);
  }

  clearTimer() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  handleTimeout() {
    this.answered = true;
    this.selectedAnswer = -1;
    const container = document.querySelector('#quiz-container');
    if (container) {
      container.innerHTML = this.render();
      this.attachListeners(container);
    }
  }

  attachListeners(container) {
    const startBtn = container.querySelector('#quiz-start-btn');
    if (startBtn) {
      startBtn.addEventListener('click', () => this.start());
      return;
    }

    if (this.answered) {
      const nextBtn = container.querySelector('#quiz-next-btn');
      if (nextBtn) {
        nextBtn.addEventListener('click', () => this.nextQuestion());
      }
      const retryBtn = container.querySelector('#quiz-retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => this.retry());
      }
      const confirmBtn = container.querySelector('#quiz-confirm-btn');
      if (confirmBtn) {
        confirmBtn.addEventListener('click', () => this.confirmAndContinue());
      }
      return;
    }

    const options = container.querySelectorAll('.quiz-option');
    options.forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.answered) return;
        this.selectAnswer(parseInt(e.currentTarget.dataset.index));
      });
    });
  }

  selectAnswer(index) {
    if (this.answered) return;
    this.clearTimer();
    this.selectedAnswer = index;
    this.answered = true;

    const q = this.questions[this.currentIndex];
    if (index === q.correct) {
      this.score++;
    }
    this.answers.push({ question: this.currentIndex, selected: index, correct: q.correct });

    const container = document.querySelector('#quiz-container');
    if (container) {
      container.innerHTML = this.render();
      this.attachListeners(container);
    }
  }

  start() {
    this.started = true;
    const container = document.querySelector('#quiz-container');
    if (container) {
      container.innerHTML = this.render();
      this.startTimer();
      this.attachListeners(container);
    }
  }

  nextQuestion() {
    this.currentIndex++;
    this.selectedAnswer = null;
    this.answered = false;
    const container = document.querySelector('#quiz-container');
    if (container) {
      container.innerHTML = this.render();
      this.startTimer();
      this.attachListeners(container);
    }
  }

  retry() {
    this.currentIndex = 0;
    this.score = 0;
    this.answers = [];
    this.selectedAnswer = null;
    this.answered = false;
    const container = document.querySelector('#quiz-container');
    if (container) {
      container.innerHTML = this.render();
      this.startTimer();
      this.attachListeners(container);
    }
  }

  confirmAndContinue() {
    const passed = this.score >= Math.ceil(this.totalQuestions * 0.6);
    if (this.onComplete) {
      this.onComplete(passed, this.score, this.totalQuestions);
    }
  }
}

export default QuizEngine;
