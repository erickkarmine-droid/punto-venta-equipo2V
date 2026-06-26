import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ClienteNavbar } from '../../../shared/cliente-navbar/cliente-navbar';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, ClienteNavbar],
  templateUrl: './ticket.html',
  styleUrl: './ticket.css',
})
export class Ticket implements OnInit {

  productos: any[] = [];

  subtotal = 0;
  iva = 0;
  total = 0;
  montoRecibido = 0;
  cambio = 0;

  folio = '';
  fecha = '';
  nombreCliente = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.productos = JSON.parse(localStorage.getItem('carrito') || '[]');

    this.subtotal = Number(localStorage.getItem('subtotalCompra') || 0);
    this.iva = Number(localStorage.getItem('ivaCompra') || 0);
    this.total = Number(localStorage.getItem('totalCompra') || 0);
    this.montoRecibido = Number(localStorage.getItem('montoRecibido') || 0);
    this.cambio = Number(localStorage.getItem('cambio') || 0);

    this.nombreCliente =
      localStorage.getItem('nombreCliente') ||
      'Cliente registrado';

    this.folio =
      localStorage.getItem('folioVenta') ||
      'SIN-FOLIO';

    this.fecha =
      localStorage.getItem('fechaVenta') ||
      new Date().toLocaleString();
  }

  descargarTicket() {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Ticket de compra', 105, 15, { align: 'center' });

    doc.setFontSize(11);

    doc.text(`Folio: ${this.folio}`, 20, 30);
    doc.text(`Fecha y hora: ${this.fecha}`, 20, 38);
    doc.text(`Cliente: ${this.nombreCliente}`, 20, 46);

    doc.text('Detalle de productos', 20, 60);

    let y = 70;

    this.productos.forEach((producto) => {
      const subtotalProducto =
        producto.precioVenta * producto.cantidad;

      doc.text(`Producto: ${producto.nombre}`, 20, y);
      doc.text(`Cantidad: ${producto.cantidad}`, 20, y + 7);
      doc.text(`Precio unitario: $${producto.precioVenta.toFixed(2)}`, 20, y + 14);
      doc.text(`Subtotal: $${subtotalProducto.toFixed(2)}`, 20, y + 21);

      y += 34;
    });

    doc.text(`Subtotal: $${this.subtotal.toFixed(2)}`, 20, y + 5);
    doc.text(`IVA: $${this.iva.toFixed(2)}`, 20, y + 13);
    doc.text(`Total pagado: $${this.total.toFixed(2)}`, 20, y + 21);
    doc.text(`Monto recibido: $${this.montoRecibido.toFixed(2)}`, 20, y + 29);
    doc.text(`Cambio: $${this.cambio.toFixed(2)}`, 20, y + 37);

    doc.save(`${this.folio}.pdf`);
  }

  regresar() {
    localStorage.removeItem('carrito');
    localStorage.removeItem('subtotalCompra');
    localStorage.removeItem('ivaCompra');
    localStorage.removeItem('totalCompra');
    localStorage.removeItem('montoRecibido');
    localStorage.removeItem('cambio');
    localStorage.removeItem('ventaId');
    localStorage.removeItem('folioVenta');
    localStorage.removeItem('fechaVenta');

    this.router.navigate(['/cliente/catalogo']);
  }
}