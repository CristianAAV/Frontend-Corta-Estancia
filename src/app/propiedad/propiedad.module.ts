import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { PropiedadListaComponent } from './propiedad-lista/propiedad-lista.component';
import { PropiedadCrearComponent } from './propiedad-crear/propiedad-crear.component';
import { PropiedadEditarComponent } from './propiedad-editar/propiedad-editar.component';
import { PropiedadPropietarioComponent } from './propiedad-propietario/propiedad-propietario.component';
import { MantenimientoModule } from "../mantenimiento/mantenimiento.module";

@NgModule({
    declarations: [
        PropiedadListaComponent,
        PropiedadCrearComponent,
        PropiedadEditarComponent,
        PropiedadPropietarioComponent
    ],
    exports: [
        PropiedadListaComponent,
        PropiedadCrearComponent,
        PropiedadEditarComponent,
        PropiedadPropietarioComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        EncabezadoAppModule,
        MantenimientoModule
    ]
})
export class PropiedadModule { }
