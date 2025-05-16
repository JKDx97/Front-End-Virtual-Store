import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { LaptopsService } from '../laptops.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { CarritoService } from '../carrito.service';
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';
@Component({
  selector: 'app-laptops',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './laptops.component.html',
  styleUrl: './laptops.component.css',
})
export class LaptopsComponent implements OnInit {
  laptops: any[] = []; // Asegúrate de inicializarlo como un array vacío
  filteredLaptops: any[] = [];

  selectedBrands: string[] = [];
  minPrice: number = 0;
  maxPrice: number = Infinity;
  sortOption: string = 'asc';

  private notyf = new Notyf();

  constructor(
    private laptopService: LaptopsService,
    private carritoService: CarritoService
  ) {}

  ngOnInit(): void {
    this.laptopService.getAvailableLaptops().subscribe(
      (data) => {
        this.laptops = data;
        this.laptops.forEach((laptop) => this.getImagesLaptops(laptop));
        this.filteredLaptops = [...this.laptops]; // Inicializamos con todas las laptops
      },
      (error) => console.error('Error ', error)
    );
  }
  addLaptopsCarrito(laptop: any) {
    const producto = { ...laptop, tipo: 'laptop' }; // 👈 le agregas tipo
    const agregado = this.carritoService.agregarProducto(producto);

    if (agregado) {
      this.notyf.success('Producto agregado al carrito');
    } else {
      this.notyf.error('No hay suficiente stock para agregar este producto');
    }
  }

  getImagesLaptops(laptop: any) {
    if (!laptop || !laptop.id) return;
    this.laptopService.getImagesLaptops(laptop.id).subscribe(
      (data: any) => (laptop.images = data),
      (error) => console.error('Error al obtener imágenes:', error)
    );
  }

  applyFilters() {
    this.filteredLaptops = this.laptops.filter((laptop) => {
      const matchesBrand =
        this.selectedBrands.length === 0 ||
        this.selectedBrands.includes(laptop.marca);
      const matchesPrice =
        laptop.precio >= this.minPrice && laptop.precio <= this.maxPrice;
      return matchesBrand && matchesPrice;
    });

    this.sortLaptops();
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
  toggleBrand(brand: string) {
    if (this.selectedBrands.includes(brand)) {
      this.selectedBrands = this.selectedBrands.filter((b) => b !== brand);
    } else {
      this.selectedBrands.push(brand);
    }
    this.applyFilters();
  }

  sortLaptops() {
    this.filteredLaptops.sort((a, b) => {
      if (this.sortOption === 'asc') return a.precio - b.precio;
      if (this.sortOption === 'desc') return b.precio - a.precio;
      if (this.sortOption === 'az') return a.marca.localeCompare(b.marca);
      if (this.sortOption === 'za') return b.marca.localeCompare(a.marca);
      return 0;
    });
  }
}
