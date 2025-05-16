import { Injectable } from '@angular/core';
import { CarritoService } from './carrito.service';

@Injectable({
  providedIn: 'root'
})
export class AccesoService {
  private accesoPermitido = false;

  constructor(private carrtitoService : CarritoService){}

  permitirAcceso() {
    this.accesoPermitido = true;
  }

  denegarAcceso() {
    this.accesoPermitido = false;
  }

  tieneAcceso(): boolean {
    const carrito = this.carrtitoService.getCarrito();
    return carrito.length > 0;  // Permite acceso solo si hay productos en el carrito
  }
}
