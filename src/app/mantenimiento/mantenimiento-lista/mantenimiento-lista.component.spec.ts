import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { MantenimientoService } from '../mantenimiento.service';
import { MantenimientoListaComponent } from './mantenimiento-lista.component';

describe('MantenimientoListaComponent', () => {
  let component: MantenimientoListaComponent;
  let fixture: ComponentFixture<MantenimientoListaComponent>;
  let mockActivatedRoute: any;
  let mockToastrService: jasmine.SpyObj<ToastrService>;
  let mockMantenimientoService: jasmine.SpyObj<MantenimientoService>;

  beforeEach(async () => {
    mockActivatedRoute = {
      paramMap: of({ get: () => 1 }) // Mock ActivatedRoute
    };

    mockToastrService = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    mockMantenimientoService = jasmine.createSpyObj('MantenimientoService', ['obtenerMantenimientos', 'eliminarMantenimiento']);
    mockMantenimientoService.obtenerMantenimientos.and.returnValue(of([])); 

    await TestBed.configureTestingModule({
      declarations: [MantenimientoListaComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ToastrService, useValue: mockToastrService },
        { provide: MantenimientoService, useValue: mockMantenimientoService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});