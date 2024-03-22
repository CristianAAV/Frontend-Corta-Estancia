export class Propietario {
  id: number;
  id_usuario: number;
  nombres: string;
  apellidos: string;
  tipo_documento: string;
  documento: string;

  public constructor(id: number, id_usuario: number, nombres: string, apellidos: string,
    tipo_documento: string, documento: string) {
      this.id = id;
      this.id_usuario = id_usuario;
      this.nombres = nombres;
      this.apellidos = apellidos;
      this.tipo_documento = tipo_documento;
      this.documento = documento;
  }
}