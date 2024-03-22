import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment'
import { Propiedad } from './propiedad';
import { Propietario } from './propietario';
import { Kpi } from './kpi';

@Injectable({
  providedIn: 'root'
})
export class PropiedadService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }


  darPropiedades(): Observable<Propiedad[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Propiedad[]>(`${this.apiUrl}/propiedades`, { headers: headers })
  }

  darPropiedad(idPropiedad: number): Observable<Propiedad> {
    const idUsuario = sessionStorage.getItem('idUsuario');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Propiedad>(`${this.apiUrl}/propiedades/${idPropiedad}`, { headers: headers })
  }

  crearPropiedad(propiedad: Propiedad): Observable<Propiedad> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.post<Propiedad>(`${this.apiUrl}/propiedades`, propiedad, { headers: headers })
  }

  editarPropiedad(propiedad: Propiedad, idPropiedad: number): Observable<Propiedad> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.put<Propiedad>(`${this.apiUrl}/propiedades/${idPropiedad}`, propiedad, { headers: headers })
  }


  borrarPropiedad(idPropiedad: number): Observable<Propiedad> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.delete<Propiedad>(`${this.apiUrl}/propiedades/${idPropiedad}`, { headers: headers })
  }

  darPropietarios(): Observable<Propietario[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Propietario[]>(`${this.apiUrl}/propietarios`, { headers: headers })
  }

  darKpi(idPropiedad: number): Observable<Kpi> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Kpi>(`${this.apiUrl}/propiedades/${idPropiedad}/kpi`, { headers: headers })
  }  

}
