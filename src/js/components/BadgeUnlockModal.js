/**
 * Badge Unlock Modal
 * Muestra una celebración cuando se desbloquea un badge
 */

import { ConfettiEffect } from './ConfettiEffect.js';

export class BadgeUnlockModal {
  constructor(badge) {
    this.badge = badge;
    this.confetti = new ConfettiEffect(document.body);
  }

  show() {
    const modal = document.createElement('div');
    modal.className = 'badge-unlock-modal';
    modal.innerHTML = `
      <div class="badge-unlock-modal__backdrop"></div>
      <div class="badge-unlock-modal__content">
        <div class="badge-unlock-modal__header">
          🎉 ¡FELICIDADES! 🎉
        </div>
        <div class="badge-unlock-modal__badge">
          <div class="badge-unlock-modal__icon">${this.badge.icono}</div>
        </div>
        <div class="badge-unlock-modal__info">
          <h2>${this.badge.nombre}</h2>
          <p>${this.badge.descripcion}</p>
          <div class="badge-unlock-modal__points">+${this.badge.puntos} puntos</div>
        </div>
        <button class="badge-unlock-modal__close btn btn--primary">
          Continuar
        </button>
      </div>
    `;

    document.body.appendChild(modal);

    // Agregar estilos dinámicamente si no existen
    this.ensureStyles();

    // Reproducir sonido (opcional)
    this.playUnlockSound();

    // Lanzar confeti 🎊
    setTimeout(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      this.confetti.explosion(centerX, centerY, 1.2);
    }, 300);

    // Cerrar modal al hacer click
    modal.querySelector('.badge-unlock-modal__close')?.addEventListener('click', () => {
      modal.remove();
    });

    // Cerrar modal al hacer click en backdrop
    modal.querySelector('.badge-unlock-modal__backdrop')?.addEventListener('click', () => {
      modal.remove();
    });

    // Auto-cerrar después de 5 segundos
    setTimeout(() => {
      if (modal.parentNode) {
        modal.remove();
      }
    }, 5000);
  }

  playUnlockSound() {
    // Crear un sonido de celebración usando Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const notes = [523, 659, 784, 1047]; // Do, Mi, Sol, Do alto
      let time = audioContext.currentTime;

      notes.forEach((freq, i) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();

        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.3, time);
        gain.gain.exponentialRampToValueAtTime(0.01, time + 0.1);

        osc.start(time);
        osc.stop(time + 0.1);

        time += 0.1;
      });
    } catch (e) {
      // Si el audio no funciona, continuar sin sonido
    }
  }

  ensureStyles() {
    // Verificar si los estilos ya existen
    if (document.getElementById('badge-unlock-modal-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'badge-unlock-modal-styles';
    style.textContent = `
      .badge-unlock-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
      }

      .badge-unlock-modal__backdrop {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        backdrop-filter: blur(4px);
      }

      .badge-unlock-modal__content {
        position: relative;
        background: linear-gradient(135deg, #f90598 0%, #f02c7d 100%);
        border-radius: 20px;
        padding: 40px;
        text-align: center;
        color: white;
        max-width: 500px;
        width: 90%;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        animation: modalBounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }

      @keyframes modalBounce {
        0% {
          opacity: 0;
          transform: scale(0.5) rotate(-10deg);
        }
        50% {
          transform: scale(1.05);
        }
        100% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      .badge-unlock-modal__header {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 20px;
        animation: headerGlow 0.8s ease-in-out infinite;
      }

      @keyframes headerGlow {
        0%, 100% {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
        }
        50% {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.8);
        }
      }

      .badge-unlock-modal__badge {
        margin: 30px 0;
      }

      .badge-unlock-modal__icon {
        font-size: 100px;
        display: inline-block;
        animation: iconSpin 0.8s ease-in-out;
      }

      @keyframes iconSpin {
        0% {
          transform: scale(0) rotate(-180deg);
        }
        50% {
          transform: scale(1.1);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }

      .badge-unlock-modal__info {
        margin: 30px 0;
      }

      .badge-unlock-modal__info h2 {
        margin: 0 0 10px 0;
        font-size: 24px;
        line-height: 1.3;
      }

      .badge-unlock-modal__info p {
        margin: 0 0 20px 0;
        font-size: 16px;
        opacity: 0.95;
      }

      .badge-unlock-modal__points {
        font-size: 20px;
        font-weight: bold;
        background-color: rgba(255, 255, 255, 0.2);
        padding: 10px 20px;
        border-radius: 50px;
        display: inline-block;
        margin-bottom: 20px;
      }

      .badge-unlock-modal__close {
        background-color: rgba(255, 255, 255, 0.2);
        border: 2px solid white;
        color: white;
        padding: 12px 30px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 50px;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: 20px;
      }

      .badge-unlock-modal__close:hover {
        background-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
      }

      .badge-unlock-modal__close:active {
        transform: translateY(0);
      }

      /* Confetti effect */
      .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        pointer-events: none;
      }

      @keyframes confettiFall {
        0% {
          opacity: 1;
          transform: translateY(0) rotateZ(0deg);
        }
        100% {
          opacity: 0;
          transform: translateY(400px) rotateZ(720deg);
        }
      }
    `;
    document.head.appendChild(style);
  }
}

export default BadgeUnlockModal;
