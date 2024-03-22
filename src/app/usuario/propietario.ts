import { Usuario } from "./usuario";

export interface Propietario extends Usuario {
    nombres: string;
    apellidos: string;
    tipoDocumento: string;
    documento: string;
    telefono: string;
    correo: string

}
