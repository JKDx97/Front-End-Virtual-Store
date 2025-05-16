import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isMenuOpen = false;

  constructor(private carritoService : CarritoService){}

  get cantidadProductos() {
    return this.carritoService.getCarrito().reduce((sum, p) => sum + p.cantidad, 0);
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
