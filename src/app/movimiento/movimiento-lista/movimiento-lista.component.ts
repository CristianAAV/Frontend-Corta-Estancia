import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnumsService } from 'src/app/enums.service';
import { Categoria } from 'src/app/enums';
import { MovimientoService } from '../movimiento.service';
import { Movimiento } from '../movimiento';

@Component({
  selector: 'app-movimiento-lista',
  templateUrl: './movimiento-lista.component.html',
  styleUrls: ['./movimiento-lista.component.css']
})
export class MovimientoListaComponent implements OnInit {
  
  private readonly FILTRO_TODOS: string = 'TODOS';
  private readonly FILTRO_INGRESO: string = 'INGRESO';
  private readonly FILTRO_EGRESO: string = 'EGRESO';

  idPropiedad: number;
  allIngresos: Array<Movimiento> = [];
  ingresos: Array<Movimiento> = [];
  allEgresos: Array<Movimiento> = [];
  egresos: Array<Movimiento> = [];
  movimientos: Array<Movimiento>;
  movimiento: Movimiento;
  movimientoSeleccionado: number;
  categoriasIngreso: Array<Categoria>;
  selectedIngreso: Categoria;
  categoriasEgreso: Array<Categoria>;
  selectedEgreso: Categoria;
  rol: string | null = sessionStorage.getItem('rol');

  constructor(
    private routerPath: Router,
    private router: ActivatedRoute,
    private toastr: ToastrService,
    private enumService: EnumsService,
    private movimientoService: MovimientoService
  ) { }

  ngOnInit() {
    if (this.router) {
      this.router.paramMap.subscribe(params => {
        this.idPropiedad = +params.get('id');
      });
    }
    this.obtenerCategorias();
    this.obtenerMovimientos();
  }

  obtenerCategorias() {
    //Muestra las categirias de ingreso y egreso en el select
    this.enumService.categorias().subscribe((categorias) => {
      //Contruye array con las categorias de ingreso, incluyendo "TODOS"
      this.categoriasIngreso = [this.FILTRO_TODOS
        , ...categorias.filter(categoria => categoria.toString().indexOf(this.FILTRO_INGRESO)>-1)];

      //Contruye array con las categorias de egreso, incluyendo "TODOS"
      this.categoriasEgreso = [this.FILTRO_TODOS
        , ...categorias.filter(categoria => categoria.toString().indexOf(this.FILTRO_EGRESO)>-1)];

      this.selectedIngreso =  this.categoriasIngreso[0];
      this.selectedEgreso = this.categoriasEgreso[0];
    });
  }

  obtenerMovimientos() {
    //Recupera los movimientos de la propiedad
    this.movimientoService.obtenerMovimientos(this.idPropiedad).subscribe((movimientos) => {
      this.movimientos = movimientos;

      this.allIngresos = this.movimientos.filter(movimiento => movimiento.tipo_movimiento == this.FILTRO_INGRESO);
      this.allEgresos = this.movimientos.filter(movimiento => movimiento.tipo_movimiento == this.FILTRO_EGRESO);

      this.filtrarCategoriaIngresos();
      this.filtrarCategoriaEgresos();
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

  onChangeCategoriaIngresos() {
    this.filtrarCategoriaIngresos();
  }

  onChangeCategoriaEgresos() {
    this.filtrarCategoriaEgresos();
  }

  filtrarCategoriaIngresos() {
    if(this.selectedIngreso === this.FILTRO_TODOS)
      this.ingresos = this.allIngresos;
    else
      this.ingresos = this.allIngresos.filter(item => item.categoria === this.selectedIngreso);
  }

  filtrarCategoriaEgresos() {
    if(this.selectedEgreso === this.FILTRO_TODOS)
      this.egresos = this.allEgresos;
    else
      this.egresos = this.allEgresos.filter(item => item.categoria === this.selectedEgreso);
  }


  crearMovimiento() {
    this.routerPath.navigate(['/propiedades/' + this.idPropiedad + '/movimientos/crear']);
  }

  obtenerDetallesMovimiento(idMovimiento: number) {
    this.movimientoSeleccionado = idMovimiento;
    this.movimientoService.obtenerMovimiento(idMovimiento).subscribe((movimiento) => {
      this.movimiento = movimiento;
    },
      error => {
        this.toastr.error("Error", "Se ha producido un error al intentar obtener los detalles del movimiento. ")
      }
    );
  }

  editarMovimiento(idIngreso: number): void {
    this.routerPath.navigate(['propiedades/' + this.idPropiedad + '/movimientos/editar/' + idIngreso]);
  }

  borrarMovimiento(idMovimiento: number) {
    this.movimientoService.eliminarMovimiento(idMovimiento).subscribe((movimiento) => {
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
