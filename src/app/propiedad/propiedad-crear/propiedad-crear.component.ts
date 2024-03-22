import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Propiedad } from '../propiedad';
import { PropiedadService } from '../propiedad.service';
import { Banco } from 'src/app/enums';
import { EnumsService } from 'src/app/enums.service';
import { Propietario } from '../propietario';

@Component({
  selector: 'app-propiedad-crear',
  templateUrl: './propiedad-crear.component.html',
  styleUrls: ['./propiedad-crear.component.css']
})
export class PropiedadCrearComponent implements OnInit {

  propiedadForm: FormGroup;
  listaBancos: Banco[] = [];
  listaPropietarios: Propietario[]

  constructor(
    private formBuilder: FormBuilder,
    private routerPath: Router,
    private toastr: ToastrService,
    private propiedadService: PropiedadService,
    private enumService: EnumsService
  ) { 
    this.propiedadForm = this.formBuilder.group({
      nombre_propiedad: ["", Validators.required],
      ciudad: ["", Validators.required],
      municipio: ["", []],
      direccion: ["", Validators.required],
      id_propietario: ["", Validators.required],
      numero_contacto: ["", Validators.required],
      banco: [null, []],
      numero_cuenta: ["", []]
    });
  }

  ngOnInit() {
    this.enumService.bancos().subscribe((bancos) => {
      this.listaBancos = bancos;
      this.propiedadService.darPropietarios().subscribe((propietarios)=>{
        this.listaPropietarios = propietarios;

        console.log(this.listaPropietarios)

        this.propiedadForm = this.formBuilder.group({
          nombre_propiedad: ["", Validators.required],
          ciudad: ["", Validators.required],
          municipio: ["", []],
          direccion: ["", Validators.required],
          id_propietario: ["", Validators.required],
          numero_contacto: ["", Validators.required],
          banco: [null, []],
          numero_cuenta: ["", []]
        });
      });
    });
  }

  crearPropiedad(nuevaPropiedad: Propiedad): void {
    this.propiedadService.crearPropiedad(nuevaPropiedad).subscribe((propiedad) => {
      this.toastr.success("Confirmation", "Registro creado")
      this.propiedadForm.reset();
      this.routerPath.navigate(['/propiedades/']);
    },
    error => {
      if (error.statusText === "UNAUTHORIZED") {
        this.toastr.error("Error","Su sesión ha caducado, por favor vuelva a iniciar sesión.")
      }
      else if (error.statusText === "UNPROCESSABLE ENTITY") {
        this.toastr.error("Error","No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
      }
      else {
        this.toastr.error("Error","Ha ocurrido un error. ")
      }
    })

  }

  cancelarPropiedad(): void {
    this.propiedadForm.reset();
    this.routerPath.navigate(['/propiedades/']);
  }
  onActualizarPropietarios() {
    this.propiedadService.darPropietarios().subscribe((propietarios)=>{
      this.listaPropietarios = propietarios;
      console.log(this.listaPropietarios)
    });
  }


}
