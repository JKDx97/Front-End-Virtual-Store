import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { VentaService } from '../venta.service';
import { loadStripe, StripeElements } from '@stripe/stripe-js';
import {
  StripeElementsOptions,
  StripeCardElement,
  Stripe,
} from '@stripe/stripe-js';
import Swal from 'sweetalert2';
import { CarritoService } from '../carrito.service';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css',
})
export class PagoComponent implements OnInit {
  isLoading: boolean = false;

  usuario: any;
  carrito: any;
  total: number = 0;
  stripe: Stripe | null = null;
  elements: StripeElements | null = null;
  card: StripeCardElement | null = null;
  @ViewChild('cardElement', { static: true }) cardElement:
    | ElementRef
    | undefined;

  constructor(
    private router: Router,
    private ventaService: VentaService,
    private carritoService: CarritoService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { usuario: any; carrito: any };
    this.usuario = state?.usuario;
    this.carrito = state?.carrito;
  }

  async ngOnInit() {
    this.total = this.carrito?.reduce(
      (sum: any, item: any) => sum + item.precio * item.cantidad,
      0
    );
    this.stripe = await loadStripe(
      'pk_test_51RLaoK4I1ibKCog8xB33VwhG30bLxW3AcrcINvCPbi4A4TVsd9kvi78xTCa78ZjAQEUjrvmG2qIqO9EJwnfsJL17007kfqKEKv'
    );

    if (this.stripe) {
      this.elements = this.stripe.elements();
      const cardElement = this.elements.create('card', {
        style: {
          base: {
            color: '#32325d',
            lineHeight: '40px',
            fontWeight: 300,
            fontFamily: 'Helvetica Neue, Helvetica, sans-serif',
            fontSize: '18px',
          },
        },
      });
      cardElement.mount(this.cardElement?.nativeElement);
      this.card = cardElement;
    }
  }

  async pagar() {
    const subtotal = this.carrito.reduce(
      (sum: any, item: any) => sum + item.precio * item.cantidad,
      0
    );

    const impuestos = subtotal * 0.18;

    const totalConImpuestos = subtotal + impuestos;

    Swal.fire({
      title: 'Procesando pago...',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.ventaService
      .crearPaymentIntent({ total: totalConImpuestos })
      .subscribe(
        async (res: any) => {
          const clientSecret = res.clientSecret;

          const result = await this.stripe?.confirmCardPayment(clientSecret, {
            payment_method: {
              card: this.card!,
              billing_details: {
                name: `${this.usuario.nombre} ${this.usuario.apellido}`,
                email: this.usuario.correo,
              },
            },
          });

          if (result?.error) {
            Swal.fire({
              icon: 'error',
              title: 'Error al procesar el pago',
              text: result.error.message,
            });
          } else if (result?.paymentIntent?.status === 'succeeded') {
            this.ventaService
              .crearVenta({
                nombre: this.usuario.nombre,
                apellido: this.usuario.apellido,
                departamento: this.usuario.departamento,
                region: this.usuario.region,
                distrito: this.usuario.distrito,
                direccion: this.usuario.direccion,
                dni: this.usuario.dni,
                correo: this.usuario.correo,
                telefono: this.usuario.telefono,
                total: totalConImpuestos,
                carrito: this.carrito,
              })
              .subscribe({
                next: () => {
                  Swal.fire({
                    icon: 'success',
                    title: '¡Pago exitoso!',
                    text: 'La venta se registró correctamente.',
                  }).then(() => {
                    this.carritoService.vaciarCarrito();
                    this.router.navigate(['/']);
                  });
                },
                error: () => {
                  Swal.fire({
                    icon: 'warning',
                    title: 'Pago exitoso',
                    text: 'Pero ocurrió un error al guardar la venta.',
                  }).then(() => {
                    this.carrito = [];
                    this.router.navigate(['/']);
                  });
                },
              });
          }
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error al crear el intento de pago',
            text: 'Por favor intenta nuevamente.',
          });
        }
      );
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
    if (product.pc_image_url) {
      return product.pc_image_url;
    } else if (product.laptop_image_principal) {
      return product.laptop_image_principal;
    } else if (product.consola_image_principal) {
      return product.consola_image_principal;
    } else {
      return 'assets/default-image.png';
    }
  }
}
