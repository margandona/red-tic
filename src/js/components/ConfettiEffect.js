/**
 * Confetti Effect Component
 * Crea efecto de confeti cuando se desbloquea un badge
 */

export class ConfettiEffect {
  constructor(container = document.body) {
    this.container = container;
    this.particles = [];
  }

  /**
   * Lanza confeti desde el centro de la pantalla
   */
  launch(x = window.innerWidth / 2, y = window.innerHeight / 2) {
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(x, y);
    }

    this.animate();
  }

  /**
   * Crea una partícula de confeti individual
   */
  createParticle(x, y) {
    const colors = ['#F90598', '#F02C7D', '#EC5852', '#00D9FF', '#00D084', '#FFD700'];
    const shapes = ['●', '■', '▲', '◆'];

    const particle = document.createElement('div');
    particle.className = 'confetti-particle';
    particle.textContent = shapes[Math.floor(Math.random() * shapes.length)];
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.fontSize = Math.random() * 20 + 10 + 'px';
    particle.style.opacity = '1';
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '10000';
    particle.style.animation = `confettiFall ${2 + Math.random()}s linear forwards`;

    this.container.appendChild(particle);

    // Datos de movimiento
    const particle_data = {
      element: particle,
      x: x,
      y: y,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -8 - 5,
      ax: (Math.random() - 0.5) * 0.5,
      ay: 0.3,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 20,
    };

    this.particles.push(particle_data);

    // Remover después de la animación
    setTimeout(() => {
      particle.remove();
    }, 3000);
  }

  /**
   * Anima el movimiento de las partículas
   */
  animate() {
    if (this.particles.length === 0) return;

    this.particles = this.particles.filter((p) => {
      // Física
      p.vx += p.ax;
      p.vy += p.ay;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;

      // Actualizar posición
      p.element.style.left = p.x + 'px';
      p.element.style.top = p.y + 'px';
      p.element.style.transform = `rotate(${p.rotation}deg)`;

      // Remover si está fuera de pantalla
      return p.y < window.innerHeight;
    });

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animate());
    }
  }

  /**
   * Efecto explosión (confetti en todas direcciones)
   */
  explosion(x = window.innerWidth / 2, y = window.innerHeight / 2, intensity = 1) {
    const particleCount = Math.floor(80 * intensity);

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(x, y);
    }

    this.animate();
  }

  /**
   * Limpia todas las partículas
   */
  clear() {
    this.particles.forEach((p) => p.element.remove());
    this.particles = [];
  }
}

export default ConfettiEffect;
