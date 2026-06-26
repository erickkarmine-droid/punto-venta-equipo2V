import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminNavbar } from '../../../shared/admin-navbar/admin-navbar';

@Component({
  selector: 'app-gestion-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbar],
  templateUrl: './gestion-productos.html',
  styleUrl: './gestion-productos.css',
})
export class GestionProductos implements OnInit {

  productos: any[] = [];
  productosFiltrados: any[] = [];

  busqueda = '';
  soloStockBajo = false;

  mostrarModalEliminar = false;
  productoAEliminar: any = null;

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.http.get<any[]>('https://punto-venta-equipo2v-production.up.railway.app/api/productos')
      .subscribe({
        next: (data) => {
          this.productos = data;
          this.aplicarFiltros();
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error(error);
        }
      });
  }

  buscar() {
    this.soloStockBajo = false;
    this.aplicarFiltros();
  }

  aplicarFiltros() {
  let resultado = [...this.productos];

  const texto = this.busqueda.trim().toLowerCase();

  if (texto) {
    resultado = resultado.filter(producto =>
      producto.nombre?.toLowerCase().includes(texto) ||
      producto.categoria?.categoria?.toLowerCase().includes(texto) ||
      producto.descripcion?.toLowerCase().includes(texto)
    );
  }

  if (this.soloStockBajo) {
    resultado = resultado.filter(producto =>
      producto.activo === true &&
      producto.stockActual <= 5
    );
  }

  this.productosFiltrados = resultado;
  this.cdr.detectChanges();
}

  get cantidadStockBajo(): number {
    return this.productos.filter(
      producto =>
        producto.activo === true &&
        producto.stockActual <= 5
    ).length;
  }

  verStockBajo() {
    this.soloStockBajo = true;
    this.busqueda = '';
    this.aplicarFiltros();
  }

  crearProducto() {
    this.router.navigate(['/admin/productos/nuevo']);
  }

  editarProducto(producto: any) {
    this.router.navigate([
      '/admin/productos/editar',
      producto.id
    ]);
  }

  abrirModalEliminar(producto: any) {
    this.productoAEliminar = producto;
    this.mostrarModalEliminar = true;
    this.cdr.detectChanges();
  }

  cancelarEliminacion() {
    this.productoAEliminar = null;
    this.mostrarModalEliminar = false;
    this.cdr.detectChanges();
  }

  confirmarEliminacion() {
    if (!this.productoAEliminar) {
      return;
    }

    this.http.delete(
      `https://punto-venta-equipo2v-production.up.railway.app/api/productos/${this.productoAEliminar.id}`
    ).subscribe({
      next: () => {
        this.productoAEliminar = null;
        this.mostrarModalEliminar = false;
        this.cargarProductos();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }

  reactivarProducto(producto: any) {
    this.http.put(
      `https://punto-venta-equipo2v-production.up.railway.app/api/productos/${producto.id}/reactivar`,
      {}
    ).subscribe({
      next: () => {
        alert('Producto reactivado correctamente');
        this.cargarProductos();
      },
      error: (err) => {
        alert(
          err.error?.mensaje ||
          'No se pudo reactivar el producto'
        );
      }
    });
  }

  guardarStock(producto: any) {
    const stock = Number(producto.stockActual);

    if (!Number.isInteger(stock) || stock < 0 || stock > 500) {
      alert('El stock debe ser un número entero entre 0 y 500');
      return;
    }

    const data = {
      stockActual: stock
    };

    this.http.put(
      `https://punto-venta-equipo2v-production.up.railway.app/api/productos/${producto.id}/stock`,
      data
    ).subscribe({
      next: () => {
        alert('Stock actualizado correctamente');
        this.cargarProductos();
      },
      error: (err) => {
        alert(err.error?.mensaje || 'No se pudo actualizar el stock');
      }
    });
  }
}