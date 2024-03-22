import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Movimiento } from './movimiento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  obtenerMovimientos(idPropiedad: number): Observable<Movimiento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<Movimiento[]>(`${this.apiUrl}/propiedades/${idPropiedad}/movimientos`, { headers: headers });
  }

  obtenerMovimiento(idMovimiento: number): Observable<Movimiento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.get<Movimiento>(`${this.apiUrl}/movimientos/${idMovimiento}`, { headers: headers });
  }

  actualizarMovimiento(movimiento: Movimiento, idMovimiento: number): Observable<Movimiento> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.put<Movimiento>(`${this.apiUrl}/movimientos/${idMovimiento}`, movimiento, { headers: headers });
  }

  eliminarMovimiento(idMovimiento: number): Observable<Movimiento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.delete<Movimiento>(`${this.apiUrl}/movimientos/${idMovimiento}`, { headers: headers });
  }

  crearMovimiento(movimiento: Movimiento, idPropiedad: number): Observable<Movimiento> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    return this.http.post<Movimiento>(`${this.apiUrl}/propiedades/${idPropiedad}/movimientos`, movimiento, { headers: headers });
  }

}
