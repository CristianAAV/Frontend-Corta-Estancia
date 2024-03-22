import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncabezadoAppModule } from '../encabezado-app/encabezado-app.module';
import { MantenimientoListaComponent } from './mantenimiento-lista/mantenimiento-lista.component';
import { MantenimientoEditarComponent } from './mantenimiento-editar/mantenimiento-editar.component';
import { MantenimientoCrearComponent } from './mantenimiento-crear/mantenimiento-crear.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EncabezadoAppModule
  ],
  declarations: [
    MantenimientoListaComponent,
    MantenimientoEditarComponent,
    MantenimientoCrearComponent
  ],
  exports: [
    MantenimientoListaComponent,
    MantenimientoEditarComponent,
    MantenimientoCrearComponent
  ]
})
export class MantenimientoModule { }

