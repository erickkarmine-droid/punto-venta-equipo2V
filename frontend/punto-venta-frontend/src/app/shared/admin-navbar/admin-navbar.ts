import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css',
})
export class AdminNavbar {

  constructor(private router: Router) {}

  irAProductos() {
    this.router.navigate(['/admin/productos']);
  }

  irAUsuarios() {
    this.router.navigate(['/admin/usuarios']);
  }

  irACategorias() {
    this.router.navigate(['/admin/categorias']);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}