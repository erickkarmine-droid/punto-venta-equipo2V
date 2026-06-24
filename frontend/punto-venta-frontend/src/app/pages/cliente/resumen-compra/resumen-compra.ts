import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteNavbar } from '../../../shared/cliente-navbar/cliente-navbar';

@Component({
  selector: 'app-resumen-compra',
  standalone: true,
  imports: [CommonModule, ClienteNavbar],
  templateUrl: './resumen-compra.html',
  styleUrl: './resumen-compra.css',
})
export class ResumenCompra implements OnInit {

  productos: any[] = [];

  subtotal = 0;
  iva = 0;
  total = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.productos = JSON.parse(localStorage.getItem('carrito') || '[]');

    if (this.productos.length === 0) {
      this.router.navigate(['/cliente/carrito']);
      return;
    }

    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = this.productos.reduce(
      (acc, producto) => acc + producto.precioVenta * producto.cantidad,
      0
    );

    this.iva = this.subtotal * 0.16;
    this.total = this.subtotal + this.iva;
  }

  cancelar() {
    this.router.navigate(['/cliente/carrito']);
  }

  confirmarCompra() {
    if (this.productos.length === 0) {
      this.router.navigate(['/cliente/carrito']);
      return;
    }

    localStorage.setItem('totalCompra', this.total.toString());
    localStorage.setItem('subtotalCompra', this.subtotal.toString());
    localStorage.setItem('ivaCompra', this.iva.toString());

    this.router.navigate(['/cliente/pago']);
  }
}