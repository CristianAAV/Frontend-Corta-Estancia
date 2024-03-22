import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { MovimientoListaComponent } from './movimiento-lista.component';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('MovimientoListaComponent', () => {
  let component: MovimientoListaComponent;
  let fixture: ComponentFixture<MovimientoListaComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovimientoListaComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {},
              paramMap: {
                get: (key: string) => {
                  if (key === 'id') {
                    return '1';
                  }
                  return null;
                }
              }
            },
            paramMap: of({
              get: (key: string) => {
                if (key === 'id') {
                  return '1';
                }
                return null;
              }
            })
          }
        },
        ToastrService
      ],
      imports: [
        ToastrModule.forRoot(),
        HttpClientModule,
        HttpClientTestingModule
      ],
      schemas: [NO_ERRORS_SCHEMA],
    });

    fixture = TestBed.createComponent(MovimientoListaComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display buttons for editing and deleting if role is ADMINISTRADOR', fakeAsync(() => {
    spyOn(component, 'ngOnInit').and.callThrough();

    component.ingresos = [{ id: 1, fecha: new Date('2022-02-20'), descripcion: 'Ingreso 1', valor: 100, id_propiedad: 1, id_reserva: 1, tipo_movimiento: 'INGRESO', categoria: 'CAT1' }];
    component.egresos = [{ id: 2, fecha: new Date('2022-02-20'), descripcion: 'Egreso 1', valor: 50, id_propiedad: 1, id_reserva: 1, tipo_movimiento: 'EGRESO', categoria: 'CAT2' }];
    component.rol = 'ADMINISTRADOR';

    tick();
    fixture.detectChanges();

    const editButtons = fixture.debugElement.queryAll(By.css('.btn-primary'));
    const deleteButtons = fixture.debugElement.queryAll(By.css('.btn-danger'));
    expect(editButtons.length).toBe(2);
    expect(deleteButtons.length).toBe(2);
  }));

  it('should not display buttons for editing and deleting if role is not ADMINISTRADOR', fakeAsync(() => {
    spyOn(component, 'ngOnInit').and.callThrough();
  
    component.rol = 'PROPIETARIO';
  
    tick();
    fixture.detectChanges();
  
    const editButtons = fixture.debugElement.queryAll(By.css('.btn-primary'));
    const deleteButtons = fixture.debugElement.queryAll(By.css('.btn-danger'));
    expect(editButtons.length).toBe(0);
    expect(deleteButtons.length).toBe(0);
  }));

  it('should display details of selected movement when obtenerDetallesMovimiento is called', fakeAsync(() => {
    spyOn(component, 'ngOnInit').and.callThrough();
    
    const egresos = {
      id: 1,
      fecha: new Date('2022-02-20'),
      descripcion: 'Movimiento 1',
      valor: 200,
      id_propiedad: 1,
      id_reserva: 1,
      tipo_movimiento: 'EGRESO',
      categoria: 'CAT3'
    };

    const movimiento = {
      id: 1,
      categoria: 'Categoría de Prueba',
      descripcion: 'Movimiento 1',
      fecha: new Date('2022-02-20'),
      id_propiedad: 1,
      tipo_movimiento: 'Tipo de Movimiento de Prueba',
      valor: 100,
      id_reserva: 1
    };

    const movimientoSeleccionado = 1;
    
    component.egresos = [egresos];
    component.movimiento = movimiento,
    component.movimientoSeleccionado = movimientoSeleccionado
    
    tick();
    fixture.detectChanges();
  
    const obtenerDetallesBoton = fixture.debugElement.query(By.css('.obtener-detalles-btn'));
    console.log(obtenerDetallesBoton)
    obtenerDetallesBoton.triggerEventHandler('click', null);
    
    tick();
    fixture.detectChanges();
    
    const detallesMovimiento = fixture.debugElement.query(By.css('.detalles-movimiento'));
    expect(detallesMovimiento).toBeTruthy();

    const detalleDescripcion = fixture.debugElement.query(By.css('.card-text p:nth-child(3)')).nativeElement.textContent.trim();
    expect(detalleDescripcion).toBe(`Descripción: ${egresos.descripcion}`);
  }));
  


});
