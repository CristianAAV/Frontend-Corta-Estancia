import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { Reserva } from './reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  obtenerReservasPorEstado(id_propiedad: number, estado: string): Observable<Reserva[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Reserva[]>(`${this.apiUrl}/propiedades/${id_propiedad}/reservas/${estado}`, { headers: headers })
  }

  obtenerReservas(id_propiedad: number): Observable<Reserva[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Reserva[]>(`${this.apiUrl}/propiedades/${id_propiedad}/reservas`, { headers: headers })
  }

  obtenerReserva(id: number): Observable<Reserva> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Reserva>(`${this.apiUrl}/reservas/${id}`, { headers: headers })
  }

  crearReserva(reserva: Reserva, id_propiedad: number): Observable<Reserva> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<Reserva>(`${this.apiUrl}/propiedades/${id_propiedad}/reservas`, reserva, { headers: headers })
  }

  editarReserva(reserva: Reserva, id_reserva: number): Observable<Reserva> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.put<Reserva>(`${this.apiUrl}/reservas/${id_reserva}`, reserva, { headers: headers })
  }

  borrarReserva(idReserva: number): Observable<Reserva> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.delete<Reserva>(`${this.apiUrl}/reservas/${idReserva}`, { headers: headers })
  }

}
