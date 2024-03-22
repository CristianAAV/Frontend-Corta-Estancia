import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MantenimientoService } from '../mantenimiento.service';
import { Mantenimiento } from '../mantenimiento';

@Component({
  selector: 'app-mantenimiento-lista',
  templateUrl: './mantenimiento-lista.component.html',
  styleUrls: ['./mantenimiento-lista.component.css']
})
export class MantenimientoListaComponent implements OnInit {


  @Input() idPropiedadSeleccionada: number;
  lista_mantenimientos: Array<Mantenimiento>;
  idPropiedad: number;
  mantenimiento: Mantenimiento;
  mantenimientos: Array<Mantenimiento>;
  mantenimientoSeleccionado: number;
  mantenimientosLista: Mantenimiento[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages: number;
  mostrarDetallesMantenimiento: boolean;
  rol: string | null = sessionStorage.getItem('rol');

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private mantenimientoService: MantenimientoService
  ) { }

  ngOnInit() {
    if (this.router) {
      this.router.paramMap.subscribe(params => {
        this.idPropiedad= this.idPropiedadSeleccionada;
      });
    }
      this.loadMantenimientos();
      this.mantenimientoService.obtenerMantenimientos(this.idPropiedad).subscribe((mantenimientos) => {
      this.mantenimientos = mantenimientos;

      this.lista_mantenimientos = this.mantenimientos.filter(mantenimiento => mantenimiento.tipo_mantenimiento == 'Mantenimientos');
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

  loadMantenimientos() {
    this.mantenimientoService.obtenerMantenimientos(this.idPropiedadSeleccionada).subscribe((mantenimientos) => {
      this.mantenimientos = mantenimientos;
      this.totalPages = Math.ceil(this.mantenimientos.length / this.itemsPerPage);
    });
  }

  onPageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  get paginatedMantenimientos() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.mantenimientos.slice(startIndex, startIndex + this.itemsPerPage);
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }

  crearMantenimiento() {
    this.routerPath.navigate(['/propiedades/' + this.idPropiedad + '/mantenimientos/crear']);
  }

  obtenerDetallesMantenimiento(idMantenimiento: number) {
    if(this.mantenimientoSeleccionado == idMantenimiento && this.mostrarDetallesMantenimiento){
      this.mostrarDetallesMantenimiento = false;
    }else{
      this.mostrarDetallesMantenimiento = true;
    }
    this.mantenimientoSeleccionado = idMantenimiento;
    this.mantenimientoService.obtenerMantenimiento(idMantenimiento).subscribe((mantenimiento) => {
      this.mantenimiento = mantenimiento;
    },
      error => {
        this.toastr.error("Error", "Se ha producido un error al intentar obtener los detalles del mantenimiento. ")
      }
    );
  }

  editarMantenimiento(idIngreso: number): void {
    this.routerPath.navigate(['propiedades/' + this.idPropiedad + '/mantenimientos/editar/' + idIngreso]);
  }

  borrarMantenimiento(idMantenimiento: number) {
    this.mantenimientoService.eliminarMantenimiento(idMantenimiento).subscribe((mantenimiento) => {
      this.toastr.success("Registro eliminado de la lista")
      this.ngOnInit();
    },
      error => {
        if (error.statusText === "UNAUTHORIZED") {
          this.toastr.error("Error", "Su sesión ha caducado, por favor vuelva a iniciar sesión.")
        }
        else if (error.statusText === "UNPROCESSABLE ENTITY") {
          this.toastr.error("Error", "No hemos podido identificarlo, por favor vuelva a iniciar sesión.")
        }
        else {
          this.toastr.error("", "Ha ocurrido un error. " + error.error.mensaje)
        }
      });
  }

}
