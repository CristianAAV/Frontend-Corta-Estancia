export class Propiedad {
    id: number;
    nombre_propiedad: string;
    ciudad: string;
    municipio: string;
    direccion: string;
    id_propietario: number;
    numero_contacto: string;
    banco: string;
    numero_cuenta: string;

    public constructor(id: number, nombre_propiedad: string, ciudad: string, municipio: string, direccion: string,
        id_propietario: number, numero_contacto: string, banco: string, numero_cuenta: string) {
        this.id = id;
        this.nombre_propiedad = nombre_propiedad;
        this.ciudad = ciudad;
        this.municipio = municipio;
        this.direccion = direccion;
        this.id_propietario = id_propietario;
        this.numero_contacto = numero_contacto;
        this.banco = banco;
        this.numero_cuenta = numero_cuenta;
    }
}
