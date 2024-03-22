import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Mantenimiento } from '../mantenimiento';
import { EnumsService } from 'src/app/enums.service';
import { Estado, TipoMantenimiento } from 'src/app/enums';
import { MantenimientoService } from '../mantenimiento.service';

@Component({
  selector: 'app-mantenimiento-crear',
  templateUrl: './mantenimiento-crear.component.html',
  styleUrls: ['./mantenimiento-crear.component.css']
})
export class MantenimientoCrearComponent implements OnInit {

  mantenimientoForm: FormGroup;
  idPropiedad: number;
  estados: Array<Estado>;
  tiposMantenimiento: Array<TipoMantenimiento>;

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private routerPath: Router,
    private toastr: ToastrService,
    private enumService: EnumsService,
    private mantenimientoService: MantenimientoService,
  ) {
    this.mantenimientoForm = this.formBuilder.group({
      nombre:["", Validators.required], // Se cambia por ["", Validators.required] para que el campo sea requerido
      fecha: ["", Validators.required],
      estado: [null, Validators.required],
      descripcion: ["", Validators.required],
      costo: ["", Validators.required],
      tipo_mantenimiento: [null, Validators.required]
    });
   }

  ngOnInit() {
    this.idPropiedad = parseInt(this.router.snapshot.params['id']);

      this.enumService.tiposMantenimiento().subscribe((tiposMantenimiento) => {
        this.tiposMantenimiento = tiposMantenimiento;

        
        this.enumService.estados().subscribe((estados) => {
          this.estados = estados;

            this.mantenimientoForm = this.formBuilder.group({              
              nombre: ["", Validators.required],
              fecha: ["", Validators.required],
              estado: [null, Validators.required],
              descripcion: ["", Validators.required],
              costo: ["", Validators.required],
              tipo_mantenimiento: [null, Validators.required]
            });
          });
    });
  }

  crearMantenimiento(mantenimiento: Mantenimiento) {
    this.mantenimientoService.crearMantenimiento(mantenimiento, this.idPropiedad).subscribe((mantenimiento) => {
      this.toastr.success("Confirmation", "Registro creado")
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
        this.toastr.error("Error","Ha ocurrido un error. " + error.message)
      }
    });
  }

  cancelarCrearMantenimiento() {
    this.routerPath.navigate(['/propiedades']);
  }

}
