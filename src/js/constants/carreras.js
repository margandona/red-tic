export const RECURSOS_CLASES = {
  clase1: {
    formulario: 'https://forms.cloud.microsoft/r/NMNUfCXvQ2',
  },
  clase2: {
    formulario: 'https://forms.cloud.microsoft/r/xmcqVSphwj',
  },
  clase3: {
    formulario: 'https://forms.cloud.microsoft/r/FKQWeuRjEi',
  },
  clase4: {
    formulario: 'https://forms.cloud.microsoft/r/4UbXnTyyTP',
  },
  clase5: {
    formulario: 'https://forms.cloud.microsoft/r/cE3ykPkMMi',
  },
};

export function getRecursosClase(claseId) {
  return RECURSOS_CLASES[claseId] || null;
}
