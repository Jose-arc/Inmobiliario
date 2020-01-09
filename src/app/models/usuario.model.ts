
export class Usuario {
    constructor(
      public id: string,
      public favoritos: string,
      public permiso: string,
      public verificacion : string,
      public name: string,
      public correo: string,
      public contrasena: string,
      public token: string,
      public image: string
    ) {}
  }