import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteNavbar } from '../../../shared/cliente-navbar/cliente-navbar';

@Component({
  selector: 'app-historial-compras',
  standalone: true,
  imports: [CommonModule, ClienteNavbar],
  templateUrl: './historial-compras.html',
  styleUrl: './historial-compras.css',
})
export class HistorialCompras implements OnInit {

  compras: any[] = [];

  ngOnInit() {
    this.compras = JSON.parse(
      localStorage.getItem('historialCompras') || '[]'
    );
  }
}