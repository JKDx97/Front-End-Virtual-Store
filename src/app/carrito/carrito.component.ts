import { Component } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.component.html',
  styleUrl: './carrito.component.css',
})
export class CarritoComponent {
  carrito: any[] = [];

  constructor(private carritoService: CarritoService, private router : Router) {}

  ngOnInit(): void {
    this.carrito = this.carritoService.getCarrito();
  }

  eliminarProducto(id: number) {
    this.carritoService.eliminarProducto(id);
    this.carrito = this.carritoService.getCarrito();
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.carrito = [];
  }
  getProductImage(product: any): string {
    if (product.images && product.images.length > 0) {
      const firstImage = product.images[0];
      if (firstImage.pc_image_url) {
        return firstImage.pc_image_url;
      } else if (firstImage.laptop_image_principal) {
        return firstImage.laptop_image_principal;
      } else if (firstImage.consola_image_principal) {
        return firstImage.consola_image_principal;
      }
    }
    // Si no hay arreglo 'images' o está vacío, intenta con campos directos
    if (product.pc_image_url) {
      return product.pc_image_url;
    } else if (product.laptop_image_principal) {
      return product.laptop_image_principal;
    } else if (product.consola_image_principal) {
      return product.consola_image_principal;
    } else {
      return 'assets/default-image.png'; // Imagen por defecto
    }
  }
  aumentarCantidad(item: any) {
    if (item.cantidad < item.stock) {
      item.cantidad++;
    }
  }
  disminuirCantidad(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
    } else {
      this.eliminarProducto(item.id);
      if (this.carrito.length === 0) {
        this.router.navigate(['/']);
      }
    }
  }
  getTotalGeneral() {
    return this.carrito.reduce(
      (total, item) => total + item.precio * item.cantidad,
      0
    );
  }

  getTotalUnidades() {
    return this.carrito.reduce((total, item) => total + item.cantidad, 0);
  }
  continuarCompra() {
    this.carritoService.setCarrito(this.carrito);
    this.router.navigate(['/checkout']);
  }
}
