import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente-navbar',
  standalone: true,
  imports: [],
  templateUrl: './cliente-navbar.html',
  styleUrl: './cliente-navbar.css',
})
export class ClienteNavbar {

  constructor(private router: Router) {}

  irACatalogo() {
    this.router.navigate(['/cliente/catalogo']);
  }

  irACarrito() {
    this.router.navigate(['/cliente/carrito']);
  }

  irAHistorial() {
    this.router.navigate(['/cliente/historial']);
  }

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}