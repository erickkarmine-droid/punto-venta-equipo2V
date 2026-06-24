import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {

  constructor(private router: Router) {}

  irAProductos() {
    this.router.navigate(['/admin/productos']);
  }

  irAUsuarios() {
    console.log('Gestión de usuarios');
  }

  irACategorias() {
    console.log('Gestión de categorías');
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}