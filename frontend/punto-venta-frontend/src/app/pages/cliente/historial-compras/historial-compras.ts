  import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { HttpClient } from '@angular/common/http';
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
    error = '';

    constructor(
      private http: HttpClient,
      private cdr: ChangeDetectorRef
    ) {}

    ngOnInit() {
      this.cargarHistorial();
    }

    cargarHistorial() {
      const usuarioId = Number(localStorage.getItem('usuarioId'));

      if (!usuarioId) {
        this.error = 'No se encontró el usuario de la sesión';
        this.compras = [];
        this.cdr.detectChanges();
        return;
      }

      this.http.get<any[]>(
        `https://punto-venta-equipo2v-production.up.railway.app/api/ventas/cliente/${usuarioId}`
      ).subscribe({
        next: (data) => {
          this.compras = data;
          this.error = '';
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'No se pudo cargar el historial de compras';
          this.compras = [];
          this.cdr.detectChanges(); 
        }
      });
    }
  }