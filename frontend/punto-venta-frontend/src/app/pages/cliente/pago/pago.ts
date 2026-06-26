import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs';
import { ClienteNavbar } from '../../../shared/cliente-navbar/cliente-navbar';

@Component({
  selector: 'app-pago',
  standalone: true,
  imports: [CommonModule, FormsModule, ClienteNavbar],
  templateUrl: './pago.html',
  styleUrl: './pago.css',
})
export class Pago {

  total = Number(localStorage.getItem('totalCompra') || 0);
  montoRecibido: number | null = null;
  cambio = 0;
  error = '';

  mostrarModalExito = false;
  procesandoPago = false;
  ventaFinalizada = false;

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  validarPago() {
    if (this.montoRecibido === null || this.montoRecibido <= 0) {
      this.error = 'Por favor, ingrese el monto recibido para continuar.';
      this.cambio = 0;
      return;
    }

    if (this.montoRecibido < this.total) {
      this.error = 'El monto ingresado es insuficiente para cubrir el total.';
      this.cambio = 0;
      return;
    }

    this.error = '';
    this.cambio = this.montoRecibido - this.total;
  }

  puedeFinalizar(): boolean {
    return !this.procesandoPago &&
           !this.ventaFinalizada &&
           this.montoRecibido !== null &&
           this.montoRecibido >= this.total &&
           this.total > 0;
  }

  cancelar() {
    this.router.navigate(['/cliente/catalogo']);
  }

  finalizarTransaccion() {
    if (!this.puedeFinalizar()) {
      return;
    }

    this.procesandoPago = true;
    this.error = '';

    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const usuarioId = Number(localStorage.getItem('usuarioId'));

    if (!usuarioId) {
      this.error = 'No se encontró el usuario de la sesión';
      this.procesandoPago = false;
      this.cdr.detectChanges();
      return;
    }

    if (carrito.length === 0) {
      this.error = 'No hay productos agregados en el carrito';
      this.procesandoPago = false;
      this.cdr.detectChanges();
      return;
    }

    const ventaRequest = {
      clienteId: usuarioId,
      productos: carrito.map((producto: any) => ({
        productoId: producto.id,
        cantidad: producto.cantidad
      }))
    };

    this.http.post<any>(
      'https://punto-venta-equipo2v-production.up.railway.app/api/ventas/finalizar',
      ventaRequest
    )
    .pipe(
      finalize(() => {
        this.procesandoPago = false;
        this.cdr.detectChanges();
      })
    )
    .subscribe({
      next: (venta) => {
        console.log('Venta registrada:', venta);

        this.ventaFinalizada = true;

        localStorage.setItem('ventaId', String(venta.id));
        localStorage.setItem('folioVenta', venta.folio);
        localStorage.setItem('fechaVenta', venta.fechaVenta);
        localStorage.setItem('subtotalCompra', String(venta.subtotal));
        localStorage.setItem('ivaCompra', String(venta.impuesto));
        localStorage.setItem('totalCompra', String(venta.total));

        localStorage.setItem('montoRecibido', this.montoRecibido!.toString());
        localStorage.setItem('cambio', this.cambio.toString());

        this.mostrarModalExito = true;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al finalizar venta:', err);

        this.error =
          err.error?.mensaje ||
          err.error?.message ||
          err.error?.error ||
          'No se pudo finalizar la compra';

        this.ventaFinalizada = false;
        this.cdr.detectChanges();
      }
    });
  }

  aceptarCompraFinalizada() {
    localStorage.removeItem('carrito');

    this.mostrarModalExito = false;
    this.router.navigate(['/cliente/ticket']);
  }
}