export default class Grupo {
  constructor({ nombre, descripcion, administradores = [], participantes = [], creadoPor }) {
    this.nombre = nombre;
    this.descripcion = descripcion || "";
    this.administradores = administradores; 
    this.participantes = participantes;
    this.creadoPor = creadoPor;
    this.creadoEn = new Date();
  }

  // Método para agregar un administrador
  agregarAdministrador(usuarioId) {
    if (!this.administradores.includes(usuarioId)) {
      this.administradores.push(usuarioId);
    }
  }

  // Método para agregar un participante
  agregarParticipante(usuarioId) {
    if (!this.participantes.includes(usuarioId)) {
      this.participantes.push(usuarioId);
    }
  }

  // Método para remover un participante
  removerParticipante(usuarioId) {
    this.participantes = this.participantes.filter(id => id !== usuarioId);
  }

  // Método para verificar si un usuario es administrador
  esAdministrador(usuarioId) {
    return this.administradores.includes(usuarioId);
  }
}
