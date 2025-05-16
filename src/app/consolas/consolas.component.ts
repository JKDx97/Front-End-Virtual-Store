import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ConsolasService } from '../consolas.service';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../carrito.service';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
@Component({
  selector: 'app-consolas',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './consolas.component.html',
  styleUrl: './consolas.component.css',
})
export class ConsolasComponent implements OnInit {
  consola: any[] = [];
  filteredConsolas = [...this.consola];
  selectedBrands: string[] = [];
  minPrice: number | null = null;
  maxPrice: number | null = null;
  sortOrder: string = 'asc';

  constructor(private consolaService: ConsolasService, private carritoService : CarritoService) {}
    private notyf = new Notyf();
  
  ngOnInit(): void {
    this.getAllConsolas();
  }

 addConsolaCarrito(consola: any) {
  const producto = { ...consola, tipo: 'consola' };  // 👈 le agregas tipo
  const agregado = this.carritoService.agregarProducto(producto);
  
  if (agregado) {
    this.notyf.success('Producto agregado al carrito');
  } else {
    this.notyf.error('No hay suficiente stock para agregar este producto');
  }
}

  getAllConsolas() {
    this.consolaService.getAvailableConsolas().subscribe((data: any) => {
      this.consola = data;
      this.filteredConsolas = [...this.consola]; // Actualizar la lista filtrada
      this.consola.forEach((consola) => {
        this.getImagesConsola(consola);
      });
    });
  }
  getImagesConsola(consola: any) {
    if (!consola || !consola.id_consola) {
      console.error('Consola inválida:', consola);
      return;
    }

    this.consolaService.getImagesConsola(consola.id_consola).subscribe(
      (data: any) => {
        console.log(`Imágenes de la consola ${consola.id_consola}:`, data);
        consola.images = data; // Agregamos las imágenes a la laptop específica
      },
      (error) => {
        console.error('Error al obtener imágenes:', error);
      }
    );
  }
  onBrandFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.checked) {
      this.selectedBrands.push(input.value);
    } else {
      this.selectedBrands = this.selectedBrands.filter(brand => brand !== input.value);
    }
    this.applyFilters();
  }

  onPriceFilterChange() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredConsolas = this.consola.filter(consola => {
      const meetsBrandCriteria = this.selectedBrands.length === 0 || this.selectedBrands.includes(consola.marca);
      const meetsPriceCriteria =
        (!this.minPrice || consola.precio >= this.minPrice) &&
        (!this.maxPrice || consola.precio <= this.maxPrice);

      return meetsBrandCriteria && meetsPriceCriteria;
    });

    // Aplicar ordenamiento
    this.filteredConsolas.sort((a, b) => {
      if (this.sortOrder === 'asc') return a.precio - b.precio;
      if (this.sortOrder === 'desc') return b.precio - a.precio;
      if (this.sortOrder === 'az') return a.marca.localeCompare(b.marca);
      if (this.sortOrder === 'za') return b.marca.localeCompare(a.marca);
      return 0;
    });
  }
}
