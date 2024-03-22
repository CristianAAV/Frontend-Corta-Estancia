import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Importa HttpClientModule
import { MantenimientoService } from './mantenimiento.service';

describe('Service: Mantenimiento', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Agrega HttpClientModule a los imports del módulo de prueba
      providers: [MantenimientoService]
    });
  });

  it('should ...', inject([MantenimientoService], (service: MantenimientoService) => {
    expect(service).toBeTruthy();
  }));
});