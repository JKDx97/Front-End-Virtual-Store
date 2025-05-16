import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private carrito: any[] = [];
  carritoSeleccionado: any[] = [];

  constructor() {
    if (this.isBrowser()) {
      const carritoGuardado = localStorage.getItem('carrito');
      if (carritoGuardado) {
        this.carrito = JSON.parse(carritoGuardado);
      }
    }
  }

  setCarrito(carrito: any[]) {
    this.carritoSeleccionado = carrito;
  }

  getCarrito() {
    return this.carrito;
  }

  agregarProducto(producto: any): boolean {
    const id = producto.id;
    const existente = this.carrito.find(
      (p) => p.id === id && p.tipo === producto.tipo
    );
    if (existente) {
      if (existente.cantidad + 1 > producto.stock) {
        return false;
      }
      existente.cantidad += 1;
    } else {
      if (producto.stock <= 0) {
        return false;
      }
      this.carrito.push({ ...producto, cantidad: 1 });
    }

    this.guardarCarrito();
    return true;
  }
  eliminarProducto(id: number) {
    this.carrito = this.carrito.filter((p) => p.id !== id);
    this.guardarCarrito();
  }

  obtenerProductos() {
    return this.carrito;
  }

  vaciarCarrito() {
    this.carrito = [];
    this.guardarCarrito();
  }

  private guardarCarrito() {
    if (this.isBrowser()) {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }
}
