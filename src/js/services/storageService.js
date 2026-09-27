/**
 * Storage Service
 * Principio SOLID: Single Responsibility - Gestiona persistencia en localStorage
 * Principio DRY: Centraliza acceso a localStorage
 */

const PREFIX = 'gamified_app_';

const EVIDENCE_DEFAULT = {
  videoVisto: false,
  kahootCompletado: false,
  formularioCompletado: false,
  actualizadoEn: null,
};

export class StorageService {
  static set(clave, valor) {
    try {
      localStorage.setItem(PREFIX + clave, JSON.stringify(valor));
      return true;
    } catch (error) {
      console.error('Error guardando en storage:', error);
      return false;
    }
  }

  static get(clave, defaultValue = null) {
    try {
      const item = localStorage.getItem(PREFIX + clave);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error leyendo de storage:', error);
      return defaultValue;
    }
  }

  static remove(clave) {
    try {
      localStorage.removeItem(PREFIX + clave);
      return true;
    } catch (error) {
      console.error('Error removiendo de storage:', error);
      return false;
    }
  }

  static clear() {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(PREFIX)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error limpiando storage:', error);
      return false;
    }
  }

  static getAll() {
    const data = {};
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith(PREFIX)) {
        const cleanKey = key.replace(PREFIX, '');
        data[cleanKey] = this.get(cleanKey);
      }
    });
    return data;
  }

  static getEvidenceKey(userId, claseId) {
    return `evidence_${userId}_${claseId}`;
  }

  static getEvidence(userId, claseId) {
    return {
      ...EVIDENCE_DEFAULT,
      ...this.get(this.getEvidenceKey(userId, claseId), {}),
    };
  }

  static updateEvidence(userId, claseId, partialState) {
    const currentState = this.getEvidence(userId, claseId);
    return this.set(this.getEvidenceKey(userId, claseId), {
      ...currentState,
      ...partialState,
      actualizadoEn: new Date().toISOString(),
    });
  }

  static clearEvidence(userId, claseId = null) {
    if (claseId) {
      return this.remove(this.getEvidenceKey(userId, claseId));
    }

    try {
      const evidencePrefix = PREFIX + `evidence_${userId}_`;
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith(evidencePrefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (error) {
      console.error('Error limpiando evidencia:', error);
      return false;
    }
  }
}

export default StorageService;
