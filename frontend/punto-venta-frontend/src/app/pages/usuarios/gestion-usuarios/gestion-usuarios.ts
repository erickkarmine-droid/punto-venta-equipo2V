import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminNavbar } from '../../../shared/admin-navbar/admin-navbar';

@Component({
  selector: 'app-gestion-usuarios',
  standalone: true,
  imports: [CommonModule, FormsModule, AdminNavbar],
  templateUrl: './gestion-usuarios.html',
  styleUrl: './gestion-usuarios.css'
})
export class GestionUsuarios implements OnInit {

  usuarios: any[] = [];

  busqueda = '';
  filtroRol = 'AMBOS';

  mostrarModal = false;
  mensajeModal = '';
  usuarioSeleccionado: any = null;
  accionModal: 'eliminarAdmin' | 'desactivar' | null = null;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    const params = `?busqueda=${this.busqueda}&rol=${this.filtroRol}`;

    this.http.get<any[]>(
      `http://localhost:8080/api/usuarios${params}`
    ).subscribe({
      next: (data) => {
        this.usuarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  buscar() {
    if (this.busqueda && !/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ @._-]*$/.test(this.busqueda)) {
    alert('La búsqueda solo permite letras, números, espacios y caracteres válidos de correo');
    this.busqueda = '';
    this.cargarUsuarios();
    return;
    }

    this.cargarUsuarios();
  }

  cambiarFiltro(valor: string) {
  this.filtroRol = valor;
  this.cargarUsuarios();
  this.cdr.detectChanges();
}

  hacerAdministrador(usuario: any) {
    this.http.put(
      `http://localhost:8080/api/usuarios/${usuario.id}/hacer-administrador`,
      {}
    ).subscribe({
      next: () => this.cargarUsuarios()
    });
  }

  abrirModalEliminarAdministrador(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.accionModal = 'eliminarAdmin';
    this.mensajeModal = '¿Estas seguro de dar de baja a este administrador?';
    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  abrirModalDesactivar(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.accionModal = 'desactivar';

    const rol = usuario.rol?.toUpperCase();

    this.mensajeModal = rol === 'ADMINISTRADOR'
      ? '¿Estas seguro de dar de baja a este administrador?'
      : '¿Estas seguro de dar de baja a este cliente?';

    this.mostrarModal = true;
    this.cdr.detectChanges();
  }

  cancelarModal() {
    this.mostrarModal = false;
    this.usuarioSeleccionado = null;
    this.accionModal = null;
    this.mensajeModal = '';
    this.cdr.detectChanges();
  }

  aceptarModal() {
    if (!this.usuarioSeleccionado || !this.accionModal) {
      return;
    }

    if (this.accionModal === 'eliminarAdmin') {
      this.http.put(
        `http://localhost:8080/api/usuarios/${this.usuarioSeleccionado.id}/eliminar-administrador`,
        {}
      ).subscribe({
        next: () => {
          this.cancelarModal();
          this.cargarUsuarios();
        }
      });
    }

    if (this.accionModal === 'desactivar') {
      this.http.put(
        `http://localhost:8080/api/usuarios/${this.usuarioSeleccionado.id}/desactivar`,
        {}
      ).subscribe({
        next: () => {
          this.cancelarModal();
          this.cargarUsuarios();
        }
      });
    }
  }

  reactivar(usuario: any) {
    this.http.put(
      `http://localhost:8080/api/usuarios/${usuario.id}/reactivar`,
      {}
    ).subscribe({
      next: () => this.cargarUsuarios()
    });
  }
}