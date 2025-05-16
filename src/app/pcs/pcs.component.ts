import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PcService } from '../pc.service';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../carrito.service';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
@Component({
  selector: 'app-pcs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pcs.component.html',
  styleUrl: './pcs.component.css',
})
export class PcsComponent implements OnInit {
  pcs: any[] = []; // Asegúrate de inicializarlo como un array vacío
  filteredPcs: any[] = [];

  selectedBrands: string[] = [];
  minPrice: number = 0;
  maxPrice: number = Infinity;
  sortOption: string = 'asc';

  private notyf = new Notyf();

  constructor(
    private pcService: PcService,
    private carritoService: CarritoService
  ) {}

  addPcCarrito(pc: any) {
    const producto = { ...pc, tipo: 'pc' }; 
    const agregado = this.carritoService.agregarProducto(producto);

    if (agregado) {
      this.notyf.success('Producto agregado al carrito');
    } else {
      this.notyf.error('No hay suficiente stock para agregar este producto');
    }
  }

  ngOnInit(): void {
    this.pcService.getAvailablePcs().subscribe(
      (data) => {
        this.pcs = data;
        this.pcs.forEach((pc) => this.getImagesPcs(pc));
        this.filteredPcs = [...this.pcs]; // Inicializamos con todas las laptops
      },
      (error) => console.error('Error ', error)
    );
  }
  getImagesPcs(pc: any) {
    if (!pc || !pc.id_pc) return;
    this.pcService.getImagesPcs(pc.id_pc).subscribe(
      (data: any) => (pc.images = data),
      (error) => console.error('Error al obtener imágenes:', error)
    );
  }
  toggleBrand(brand: string) {
    if (this.selectedBrands.includes(brand)) {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brand);
    } else {
      this.selectedBrands.push(brand);
    }
    this.applyFilters();
  }
  updatePrice(type: 'min' | 'max', event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const price = inputElement?.value ? parseFloat(inputElement.value) : 0;

    if (type === 'min') {
      this.minPrice = price;
    } else {
      this.maxPrice = price || Infinity;
    }

    this.applyFilters();
  }
  applyFilters() {
    this.filteredPcs = this.pcs.filter((pcs) => {
      const matchesBrand =
        this.selectedBrands.length === 0 ||
        this.selectedBrands.includes(pcs.marca);
      const matchesPrice =
        pcs.precio >= this.minPrice && pcs.precio <= this.maxPrice;
      return matchesBrand && matchesPrice;
    });

    this.sortLaptops();
  }
  sortLaptops() {
    this.filteredPcs.sort((a, b) => {
      if (this.sortOption === 'asc') return a.precio - b.precio;
      if (this.sortOption === 'desc') return b.precio - a.precio;
      if (this.sortOption === 'az') return a.marca.localeCompare(b.marca);
      if (this.sortOption === 'za') return b.marca.localeCompare(a.marca);
      return 0;
    });
  }
}
