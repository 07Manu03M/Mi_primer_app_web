import bcrypt from "bcryptjs";

export default class Usuario {
  constructor({ nombre, email, password }) {
    this.nombre = nombre;
    this.email = email;
    this.password = password;
  }

  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
