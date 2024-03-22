import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MantenimientoService } from '../mantenimiento.service';
import { EnumsService } from 'src/app/enums.service';
import { Estado, TipoMantenimiento } from 'src/app/enums';
import { Mantenimiento } from '../mantenimiento';

@Component({
  selector: 'app-mantenimiento-editar',
  templateUrl: './mantenimiento-editar.component.html',
  styleUrls: ['./mantenimiento-editar.component.css']
})
export class MantenimientoEditarComponent implements OnInit {

  mantenimiento: Mantenimiento;
  mantenimientoForm: FormGroup;
  estados: Array<Estado>;
  tiposMantenimiento: Array<TipoMantenimiento>;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private mantenimientoService: MantenimientoService,
    private enumService: EnumsService,
  ) {
    this.mantenimientoForm = this.formBuilder.group({
      nombre: ["", Validators.required],
      fecha: ["", Validators.required],
      estado: [null, Validators.required],
      descripcion: ["", Validators.required],
      costo: ["", []]
    });
   }

  ngOnInit() {
    const idMantenimiento = parseInt(this.router.snapshot.params['id_mantenimiento']);
    this.mantenimientoService.obtenerMantenimiento(idMantenimiento).subscribe((mantenimiento) => {
      this.mantenimiento = mantenimiento;

      this.enumService.estados().subscribe((estados) => {
        this.estados = estados;

          this.mantenimientoForm = this.formBuilder.group({
            nombre: [this.mantenimiento.nombre, Validators.required],
            fecha: [this.mantenimiento.fecha, Validators.required],
            estado: [this.mantenimiento.estado, Validators.required],
            descripcion: [this.mantenimiento.descripcion, Validators.required],
            costo: [this.mantenimiento.costo, []]
          });
        });
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    });
    
  }

  editarMantenimiento(mantenimiento: Mantenimiento) {
    this.mantenimientoService.actualizarMantenimiento(mantenimiento, this.mantenimiento.id).subscribe((mantenimiento) => {
      this.toastr.success("Confirmation", "Registro editado")
      this.mantenimientoForm.reset();
      this.routerPath.navigate(['/propiedades']);
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Ha ocurrido un error. " + error.error.mensaje)
      }
    });
  }

  cancelarEditarMantenimiento() {
    this.routerPath.navigate(['/propiedades']);
  }

}
