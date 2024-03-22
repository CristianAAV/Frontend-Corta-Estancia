import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Banco, TipoMovimiento, Categoria, TipoMantenimiento, Estado } from './enums';

@Injectable({
  providedIn: 'root'
})
export class EnumsService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  bancos(): Observable<Banco[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Banco[]>(`${this.apiUrl}/bancos`, { headers: headers });
  }

  tiposMovimiento(): Observable<TipoMovimiento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Banco[]>(`${this.apiUrl}/tipo-movimientos`, { headers: headers });
  }
  
  categorias(): Observable<Categoria[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Categoria[]>(`${this.apiUrl}/categorias`, { headers: headers });
  }
  
  tiposMantenimiento(): Observable<TipoMantenimiento[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Banco[]>(`${this.apiUrl}/tipo-mantenimientos`, { headers: headers });
  }
  
  estados(): Observable<Estado[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    })
    return this.http.get<Estado[]>(`${this.apiUrl}/estados`, { headers: headers });
  }

  
}
