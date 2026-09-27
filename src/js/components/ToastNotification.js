/**
 * Toast Notification Component
 * Muestra notificaciones tipo toast en mobile/desktop
 */

export class ToastNotification {
  constructor(message, type = 'info', duration = 3000) {
    this.message = message;
    this.type = type; // 'success', 'error', 'warning', 'info'
    this.duration = duration;
    this.ensureStyles();
  }

  /**
   * Muestra la notificación
   */
  show() {
    const toast = document.createElement('div');
    toast.className = `toast toast--${this.type}`;
    toast.innerHTML = `
      <div class="toast__content">
        <span class="toast__icon">${this.getIcon()}</span>
        <span class="toast__message">${this.message}</span>
      </div>
      <button class="toast__close" aria-label="Cerrar">&times;</button>
    `;

    // Agregar al DOM
    document.body.appendChild(toast);

    // Trigger animación
    setTimeout(() => {
      toast.classList.add('toast--visible');
    }, 10);

    // Botón cerrar
    toast.querySelector('.toast__close')?.addEventListener('click', () => {
      this.dismiss(toast);
    });

    // Auto-cerrar después de duration
    if (this.duration > 0) {
      setTimeout(() => {
        this.dismiss(toast);
      }, this.duration);
    }

    return toast;
  }

  /**
   * Cierra la notificación
   */
  dismiss(toast) {
    toast.classList.remove('toast--visible');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }

  /**
   * Retorna el icono según el tipo
   */
  getIcon() {
    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
    };
    return icons[this.type] || '●';
  }

  /**
   * Crea estilos CSS si no existen
   */
  ensureStyles() {
    if (document.getElementById('toast-styles')) {
      return;
    }

    const style = document.createElement('style');
    style.id = 'toast-styles';
    style.textContent = `
      .toast {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 16px 20px;
        border-radius: 8px;
        background-color: white;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        font-size: 14px;
        font-weight: 500;
        max-width: 350px;
        opacity: 0;
        transform: translateY(100px) scale(0.95);
        transition: all 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        animation: slideInUp 0.3s ease-out;
      }

      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(100px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      .toast--visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }

      .toast__content {
        display: flex;
        align-items: center;
        gap: 12px;
        flex: 1;
      }

      .toast__icon {
        font-weight: bold;
        font-size: 18px;
        flex-shrink: 0;
      }

      .toast__message {
        line-height: 1.4;
      }

      .toast__close {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        margin-left: 12px;
        color: inherit;
        opacity: 0.6;
        transition: opacity 0.2s;
      }

      .toast__close:hover {
        opacity: 1;
      }

      /* Colores por tipo */
      .toast--success {
        background-color: #f0fdf4;
        border-left: 4px solid #00d084;
        color: #166534;
      }

      .toast--success .toast__icon {
        color: #00d084;
      }

      .toast--success .toast__close {
        color: #166534;
      }

      .toast--error {
        background-color: #fef2f2;
        border-left: 4px solid #ff6b6b;
        color: #991b1b;
      }

      .toast--error .toast__icon {
        color: #ff6b6b;
      }

      .toast--error .toast__close {
        color: #991b1b;
      }

      .toast--warning {
        background-color: #fffbeb;
        border-left: 4px solid #ffc400;
        color: #92400e;
      }

      .toast--warning .toast__icon {
        color: #ffc400;
      }

      .toast--warning .toast__close {
        color: #92400e;
      }

      .toast--info {
        background-color: #f0f9ff;
        border-left: 4px solid #00d9ff;
        color: #0c4a6e;
      }

      .toast--info .toast__icon {
        color: #00d9ff;
      }

      .toast--info .toast__close {
        color: #0c4a6e;
      }

      /* Mobile */
      @media (max-width: 480px) {
        .toast {
          bottom: 10px;
          right: 10px;
          left: 10px;
          max-width: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  /**
   * Métodos estáticos para crear toasts rápidamente
   */
  static success(message, duration = 3000) {
    return new ToastNotification(message, 'success', duration).show();
  }

  static error(message, duration = 4000) {
    return new ToastNotification(message, 'error', duration).show();
  }

  static warning(message, duration = 3500) {
    return new ToastNotification(message, 'warning', duration).show();
  }

  static info(message, duration = 3000) {
    return new ToastNotification(message, 'info', duration).show();
  }
}

export default ToastNotification;
