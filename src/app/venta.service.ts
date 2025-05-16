import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VentaService {
  private apiUrl = 'http://localhost:3000/venta';

  constructor(private http: HttpClient) {}
  crearPaymentIntent(data: { total: number }): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-payment-intent`, data);
  }

  crearVenta(venta: any): Observable<any> {
    return this.http.post(this.apiUrl, venta);
  }
}
