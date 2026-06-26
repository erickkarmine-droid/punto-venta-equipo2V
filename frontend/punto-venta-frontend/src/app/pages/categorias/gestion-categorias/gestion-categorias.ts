import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminNavbar } from '../../../shared/admin-navbar/admin-navbar';

@Component({
  selector: 'app-gestion-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbar],
  templateUrl: './gestion-categorias.html',
  styleUrl: './gestion-categorias.css'
})
export class GestionCategorias implements OnInit {

  categorias: any[] = [];
  categoriasFiltradas: any[] = [];

  busqueda = '';
  nuevaCategoria = '';

  mostrarModal = false;
  mostrarModalEliminar = false;

  categoriaAEliminar: any = null;

  mensaje = '';
  error = '';

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.http.get<any[]>('https://punto-venta-equipo2v-production.up.railway.app/api/categorias')
      .subscribe({
        next: (data) => {
          this.categorias = data;
          this.categoriasFiltradas = data;
          this.cdr.detectChanges();
        }
      });
  }

  buscar() {
    if (!this.busqueda.trim()) {
      this.categoriasFiltradas = this.categorias;
      this.cdr.detectChanges();
      return;
    }

    this.http.get<any[]>(
      `https://punto-venta-equipo2v-production.up.railway.app/api/categorias/buscar?categoria=${this.busqueda}`
    ).subscribe({
      next: (data) => {
        this.categoriasFiltradas = data;
        this.cdr.detectChanges();
      }
    });
  }

  abrirModal() {
    this.nuevaCategoria = '';
    this.mensaje = '';
    this.error = '';
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.nuevaCategoria = '';
    this.mensaje = '';
    this.error = '';
    this.cdr.detectChanges();
  }

  registrarCategoria() {
    this.mensaje = '';
    this.error = '';

    const data = {
      categoria: this.nuevaCategoria
    };

    this.http.post('https://punto-venta-equipo2v-production.up.railway.app/api/categorias', data)
      .subscribe({
        next: () => {
          this.cargarCategorias();
          this.cerrarModal();
        },
        error: (err) => {
          this.error =
            err.error?.mensaje ||
            'No se pudo registrar la categoría';

          this.cdr.detectChanges();
        }
      });
  }

  abrirModalEliminar(categoria: any) {
    this.categoriaAEliminar = categoria;
    this.mostrarModalEliminar = true;
    this.cdr.detectChanges();
  }

  cancelarEliminacion() {
    this.categoriaAEliminar = null;
    this.mostrarModalEliminar = false;
    this.cdr.detectChanges();
  }

  confirmarEliminacion() {
    if (!this.categoriaAEliminar) {
      return;
    }

    this.http.delete(
      `https://punto-venta-equipo2v-production.up.railway.app/api/categorias/${this.categoriaAEliminar.idCategoria}`
    ).subscribe({
      next: () => {
        this.cancelarEliminacion();
        this.cargarCategorias();
      },
      error: (err) => {
        this.error =
          err.error?.mensaje ||
          'No se puede eliminar la categoría';

        this.cancelarEliminacion();

        alert(this.error);
      }
    });
  }
}