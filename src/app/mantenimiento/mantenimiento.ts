export class Mantenimiento {
    nombre: string;
    costo: number;
    id: number;
    estado: string;
    tipo_mantenimiento: string;
    fecha: Date;
    descripcion: string;
    id_propiedad: number;

    public constructor(id: number, nombre: string, id_propiedad: number, costo: number, fecha: Date,
         estado: string, tipo_mantenimiento: string, descripcion: string) {
            this.id = id;
            this.nombre = nombre;
            this.id_propiedad = id_propiedad;
            this.costo = costo;
            this.fecha = fecha;
            this.tipo_mantenimiento = tipo_mantenimiento;
            this.estado = estado;
            this.descripcion = descripcion;
        }
}
