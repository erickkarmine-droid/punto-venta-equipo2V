import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClienteNavbar } from '../../../shared/cliente-navbar/cliente-navbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, FormsModule, ClienteNavbar],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css',
})
export class Carrito implements OnInit {

  productos: any[] = [];

  subtotal = 0;
  iva = 0;
  total = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarCarrito();
  }

  cargarCarrito() {
    this.productos = JSON.parse(
      localStorage.getItem('carrito') || '[]'
    );

    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = this.productos.reduce(
      (acc, producto) =>
        acc + (producto.precioVenta * producto.cantidad),
      0
    );

    this.iva = this.subtotal * 0.16;
    this.total = this.subtotal + this.iva;
  }

  obtenerOpcionesStock(producto: any): number[] {
    return Array.from(
      { length: producto.stockActual },
      (_, i) => i + 1
    );
  }

  actualizarCantidad() {
    this.guardarCambios();
  }

  eliminarProducto(producto: any) {
    this.productos = this.productos.filter(
      p => p.id !== producto.id
    );

    this.guardarCambios();
  }

  vaciarCarrito() {
    const confirmar = confirm(
      '¿Desea vaciar el carrito?'
    );

    if (!confirmar) {
      return;
    }

    this.productos = [];

    localStorage.removeItem('carrito');

    this.calcularTotales();
  }

  guardarCambios() {
    localStorage.setItem(
      'carrito',
      JSON.stringify(this.productos)
    );

    this.calcularTotales();
  }

  comprar() {
    if (this.productos.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    this.router.navigate(['/cliente/resumen-compra']);
  }
}