import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = `${environment.api}/venta`;

  constructor(private http: HttpClient) {}
  crearPaymentIntent(data: { total: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, data);
  }

  crearVenta(venta: any): Observable<any> {
    return this.http.post(this.apiUrl, venta);
  }
}
