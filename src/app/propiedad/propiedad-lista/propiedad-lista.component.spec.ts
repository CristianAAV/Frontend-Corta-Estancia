import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PropiedadListaComponent } from './propiedad-lista.component';
import { ActivatedRoute } from '@angular/router';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PropiedadListaComponent', () => {
  let component: PropiedadListaComponent;
  let fixture: ComponentFixture<PropiedadListaComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropiedadListaComponent],
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

    fixture = TestBed.createComponent(PropiedadListaComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropiedadListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display details of selected property when obtenerDetallesPorpiedad is called', fakeAsync(() => {
    spyOn(component, 'obtenerDetallesPorpiedad').and.callThrough();

    const mockPropiedad = {
      id: 1,
      nombre_propiedad: 'Propiedad 1',
      direccion: 'Dirección 1',
      id_propietario: 1,
      numero_contacto: 'Contacto 1',
      ciudad: 'Pasto',
      municipio: 'Narino',
      banco: 'PPPUTV',
      numero_cuenta: '1234'
    };

    component.propiedades = [mockPropiedad];
    component.propiedadSeleccionada = mockPropiedad.id;

    tick();
    fixture.detectChanges();

    const detallesBtn = fixture.debugElement.query(By.css('.obtener-detalles-btn'));
    detallesBtn.triggerEventHandler('click', null);

    tick();
    fixture.detectChanges();

    const detallesPropiedad = fixture.debugElement.query(By.css('.detalles-movimiento'));
    expect(detallesPropiedad).toBeTruthy();

    const detalleNombre = fixture.debugElement.query(By.css('.card-text p:nth-child(2)')).nativeElement.textContent.trim();
    expect(detalleNombre).toBe(`Nombre: ${mockPropiedad.nombre_propiedad}`);
  }));
});
