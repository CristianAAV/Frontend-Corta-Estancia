import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Propiedad } from '../propiedad';
import { PropiedadService } from '../propiedad.service';
import { UserType } from 'src/app/usuario/roles';
import { Mantenimiento } from 'src/app/mantenimiento/mantenimiento';
import { MovimientoService } from '../../movimiento/movimiento.service';
import { Movimiento } from 'src/app/movimiento/movimiento';
import { Kpi } from '../kpi';

@Component({
  selector: 'app-propiedad-lista',
  templateUrl: './propiedad-lista.component.html',
  styleUrls: ['./propiedad-lista.component.css']
})
export class PropiedadListaComponent implements OnInit {
  verMantenimientos: boolean = false;
  propiedades: Array<Propiedad> = []
  propiedadElegida: Propiedad
  userTypes: UserType;
  rolUsuario: string;
  ocultarBotones: boolean;
  mostrarReportePropiedadSeleccionada: number;
  mostraReporteMovimientos: boolean;
  mostrarDetallesPropiedad: boolean;
  propiedad: Propiedad;
  propiedadKpi: Kpi;
  idPropiedad: number;
  ingresosEgresos: Array<Movimiento>;
  ingresos: Array<Movimiento>;
  egresos: Array<Movimiento>;
  propiedadSeleccionada: number;
  lista_mantenimientos: Array<Mantenimiento>;
  mantenimiento: Mantenimiento;
  mantenimientos: Array<Mantenimiento>;
  mantenimientoSeleccionado: number;
  rol: string | null = sessionStorage.getItem('rol');

  private readonly FILTRO_INGRESO: string = 'INGRESO';
  private readonly FILTRO_EGRESO: string = 'EGRESO';

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private propiedadService: PropiedadService,
    private movimientoService: MovimientoService
  ) {
    this.userTypes = new UserType();
    this.rolUsuario = '';
    this.ocultarBotones = false;
   }

  ngOnInit() {
    this.ocultarBotones = false;
    this.rolUsuario = sessionStorage.getItem('rol');
    if(this.rolUsuario == 'PROPIETARIO') {
      this.ocultarBotones = true;
    }
    this.propiedadService.darPropiedades().subscribe((propiedades) => {
      this.propiedades = propiedades;
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

  obtenerReporteMovimientos(idPropiedad: number): void {

    if(this.mostrarReportePropiedadSeleccionada == idPropiedad && this.mostraReporteMovimientos){
      this.mostraReporteMovimientos = false;
    }else{
      this.mostraReporteMovimientos = true;
    }
    this.mostrarReportePropiedadSeleccionada = idPropiedad;
    this.movimientoService.obtenerMovimientos(idPropiedad).subscribe((movimientos) => {
      this.ingresosEgresos = movimientos;
      this.ingresos = movimientos.filter(movimiento => movimiento.tipo_movimiento == this.FILTRO_INGRESO);
      this.egresos = movimientos.filter(movimiento => movimiento.tipo_movimiento == this.FILTRO_EGRESO);
    },
      error => {
        if (error.statusText === "UNAUTHORIZED") {
          this.toastr.error("Error", "Su sesión ha caducado, por favor vuelva a iniciar sesión.")
        }
        else if (error.statusText === "UNPROCESSABLE ENTITY") {
          this.toastr.error("Error", "No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
        }
        else {
          this.toastr.error("Error", "Ha ocurrido un error. ");
        }
      });
  }

  obtenerDetallesPorpiedad(idPropiedad: number):void {
    if(this.propiedadSeleccionada == idPropiedad && this.mostrarDetallesPropiedad){
      this.mostrarDetallesPropiedad = false;
    }else{
      this.mostrarDetallesPropiedad = true;
    }
    this.propiedadSeleccionada = idPropiedad
    this.propiedadService.darPropiedad(idPropiedad).subscribe((propiedad) => {
      this.propiedad = propiedad
      //Recuperar el kpi de la propiedad
      this.propiedadService.darKpi(idPropiedad).subscribe((kpi) => {
        this.propiedadKpi = kpi
      },
      error => {
        this.toastr.error("Error","No se pudo recuperar Kpi de la propiedad.")
      });

    },
    error => {
      this.toastr.error("Error","No se ha podido cargar la información de la propiedad.")
    });
  }

  
  obtenerMantenimientos(idPropiedad: number):void {  
    if (this.verMantenimientos) {
     this.verMantenimientos = false;
     return; // Salimos de la función para evitar hacer la petición nuevamente
     }       
     this.verMantenimientos = true;
  }

  crearPropiedad():void {
    this.routerPath.navigate(['/propiedad/crear/']);
  }

  movimientos(idPropiedad: number): void {
    this.routerPath.navigate(['/propiedades/'+ idPropiedad + '/movimientos']);
  }

  // mantenimientos(idPropiedad: number): void {
  //   this.routerPath.navigate(['/propiedades/'+ idPropiedad + '/mantenimientos']);
  // }

  editarPropiedad(idPropiedad: number):void {
    this.routerPath.navigate(['/propiedad/editar/' + idPropiedad]);
  }

  borrarPropiedad(idPropiedad: number):void {
    this.propiedadService.borrarPropiedad(idPropiedad).subscribe((receta) => {
      this.toastr.success("Confirmation", "Registro eliminado de la lista")
      this.ngOnInit();
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

}
