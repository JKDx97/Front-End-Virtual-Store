import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../carrito.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  carrito: any[] = [];

  selectedRegion: string = ''; 

  departamentosConRegiones: {
    [key in
      | 'Amazonas'
      | 'Áncash'
      | 'Apurímac'
      | 'Arequipa'
      | 'Ayacucho'
      | 'Cajamarca'
      | 'Callao'
      | 'Cusco'
      | 'Huancavelica'
      | 'Huánuco'
      | 'Ica'
      | 'Junín'
      | 'La Libertad'
      | 'Lambayeque'
      | 'Lima'
      | 'Loreto'
      | 'Madre de Dios'
      | 'Moquegua'
      | 'Pasco'
      | 'Piura'
      | 'Puno'
      | 'San Martín'
      | 'Tacna'
      | 'Tumbes'
      | 'Ucayali']: string[];
  } = {
    Amazonas: ['Chachapoyas', 'Bagua', 'Utcubamba'],
    Áncash: ['Huaraz', 'Yungay', 'Recuay'],
    Apurímac: ['Abancay', 'Andahuaylas', 'Aymaraes'],
    Arequipa: ['Arequipa', 'Camaná', 'Caylloma'],
    Ayacucho: ['Ayacucho', 'Huamanga', 'Cangallo'],
    Cajamarca: ['Cajamarca', 'Jaén', 'San Ignacio'],
    Callao: ['Callao'],
    Cusco: ['Cusco', 'Urubamba', 'Anta'],
    Huancavelica: ['Huancavelica', 'Acobamba', 'Angaraes'],
    Huánuco: ['Huánuco', 'Leoncio Prado', 'Pachitea'],
    Ica: ['Ica', 'Nazca', 'Pisco'],
    Junín: ['Huancayo', 'Chanchamayo', 'Jauja'],
    'La Libertad': ['Trujillo', 'Ascope', 'Chepén'],
    Lambayeque: ['Chiclayo', 'Ferreñafe', 'Lambayeque'],
    Lima: ['Lima Metropolitana', 'Barranca', 'Canta', 'Chancay'],
    Loreto: ['Iquitos', 'Requena', 'Maynas'],
    'Madre de Dios': ['Puerto Maldonado'],
    Moquegua: ['Moquegua', 'Ilo'],
    Pasco: ['Pasco', 'Oxapampa', 'Daniel Alcides Carrión'],
    Piura: ['Piura', 'Talara', 'Sullana'],
    Puno: ['Puno', 'Juliaca', 'Huancané'],
    'San Martín': ['Tarapoto', 'Moyobamba', 'San Martín'],
    Tacna: ['Tacna', 'Candarave'],
    Tumbes: ['Tumbes', 'Zarumilla'],
    Ucayali: ['Pucallpa', 'Coronel Portillo'],
  };

  // Lista de departamentos
  departamentos = [
    'Amazonas',
    'Áncash',
    'Apurímac',
    'Arequipa',
    'Ayacucho',
    'Cajamarca',
    'Callao',
    'Cusco',
    'Huancavelica',
    'Huánuco',
    'Ica',
    'Junín',
    'La Libertad',
    'Lambayeque',
    'Lima',
    'Loreto',
    'Madre de Dios',
    'Moquegua',
    'Pasco',
    'Piura',
    'Puno',
    'San Martín',
    'Tacna',
    'Tumbes',
    'Ucayali',
  ];

  selectedDepartamento:
    | 'Amazonas'
    | 'Áncash'
    | 'Apurímac'
    | 'Arequipa'
    | 'Ayacucho'
    | 'Cajamarca'
    | 'Callao'
    | 'Cusco'
    | 'Huancavelica'
    | 'Huánuco'
    | 'Ica'
    | 'Junín'
    | 'La Libertad'
    | 'Lambayeque'
    | 'Lima'
    | 'Loreto'
    | 'Madre de Dios'
    | 'Moquegua'
    | 'Pasco'
    | 'Piura'
    | 'Puno'
    | 'San Martín'
    | 'Tacna'
    | 'Tumbes'
    | 'Ucayali' = 'Amazonas'; // Valor predeterminado

  regiones: string[] = [];

  constructor(private carritoService: CarritoService, private router: Router) {}

  ngOnInit() {
    this.carrito = this.carritoService.getCarrito();
  }

  enviarDatos(form: any) {
    if (form.valid && this.selectedDepartamento && this.selectedRegion) {
      const datosUsuario = form.value;
      this.router.navigate(['/pago'], {
        state: { usuario: datosUsuario, carrito: this.carrito },
      });
    } else {
      alert('Por favor, complete todos los campos hasta la región.');
    }
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

  onDepartamentoChange(
    departamento:
      | 'Amazonas'
      | 'Áncash'
      | 'Apurímac'
      | 'Arequipa'
      | 'Ayacucho'
      | 'Cajamarca'
      | 'Callao'
      | 'Cusco'
      | 'Huancavelica'
      | 'Huánuco'
      | 'Ica'
      | 'Junín'
      | 'La Libertad'
      | 'Lambayeque'
      | 'Lima'
      | 'Loreto'
      | 'Madre de Dios'
      | 'Moquegua'
      | 'Pasco'
      | 'Piura'
      | 'Puno'
      | 'San Martín'
      | 'Tacna'
      | 'Tumbes'
      | 'Ucayali'
  ) {
    this.selectedRegion = '';  // Reinicia la selección de la región

    this.selectedDepartamento = departamento;
    this.regiones = this.departamentosConRegiones[departamento] || [];
  }
  volver() {
    this.router.navigate(['/carrito']); // Cambiar la ruta de acuerdo a tu aplicación
  }
}
