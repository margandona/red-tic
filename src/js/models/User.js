/**
 * Modelo User
 * Principio SOLID: Single Responsibility - Representa un usuario
 */

export class User {
  constructor(id = 'usuario_' + Date.now()) {
    this.id = id;
    this.nombre = 'Estudiante';
    this.email = '';
    this.createdAt = new Date();
    this.ultimaActividad = new Date();
  }

  actualizar(datos) {
    Object.assign(this, datos);
    this.ultimaActividad = new Date();
    return this;
  }

  toJSON() {
    return {
      id: this.id,
      nombre: this.nombre,
      email: this.email,
      createdAt: this.createdAt.toISOString(),
      ultimaActividad: this.ultimaActividad.toISOString(),
    };
  }

  static fromJSON(json) {
    const user = new User(json.id);
    user.nombre = json.nombre;
    user.email = json.email;
    user.createdAt = new Date(json.createdAt);
    user.ultimaActividad = new Date(json.ultimaActividad);
    return user;
  }
}
