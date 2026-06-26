import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ClienteNavbar } from '../../../shared/cliente-navbar/cliente-navbar';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, ClienteNavbar],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.css',
})
export class Catalogo implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];
  categorias: any[] = [];

  busqueda = '';
  categoriaId: number | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarProductos();
    this.cargarCategorias();
  }

  cargarProductos() {
  this.http.get<any[]>('https://punto-venta-equipo2v-production.up.railway.app/api/productos')
    .subscribe({
      next: (data) => {
        this.productos = data.filter(producto =>
          producto.activo === true &&
          producto.stockActual > 0
        );

        this.productosFiltrados = this.productos;
        this.cdr.detectChanges();
      }
    });
}

  cargarCategorias() {
    this.http.get<any[]>('https://punto-venta-equipo2v-production.up.railway.app/api/categorias')
      .subscribe({
        next: (data) => {
          this.categorias = data;
          this.cdr.detectChanges();
        }
      });
  }

  filtrar() {
    this.productosFiltrados = this.productos.filter(producto => {
      const coincideNombre =
        producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase());

      const coincideCategoria =
        this.categoriaId === null ||
        producto.categoria?.idCategoria === this.categoriaId;

      return coincideNombre && coincideCategoria;
    });

    this.cdr.detectChanges();
  }

  agregarAlCarrito(producto: any) {
  if (producto.stockActual <= 0) {
    alert('Producto sin stock disponible');
    return;
  }

  const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

  const productoExistente = carrito.find((item: any) => item.id === producto.id);

    if (productoExistente) {
      if (productoExistente.cantidad < producto.stockActual) {
        productoExistente.cantidad += 1;
      } else {
        alert('No hay más stock disponible');
        return;
      }
    } else {
      carrito.push({
        id: producto.id,
        nombre: producto.nombre,
        imagenUrl: producto.imagenUrl,
        precioVenta: producto.precioVenta,
        stockActual: producto.stockActual,
        cantidad: 1
      });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`Producto agregado al carrito: ${producto.nombre}`);
  }
}