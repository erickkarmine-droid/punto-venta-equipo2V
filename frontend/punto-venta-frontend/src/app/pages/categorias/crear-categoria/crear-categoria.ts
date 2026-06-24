import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminNavbar } from '../../../shared/admin-navbar/admin-navbar';

@Component({
  selector: 'app-crear-categoria',
  standalone: true,
  imports: [FormsModule, AdminNavbar],
  templateUrl: './crear-categoria.html',
  styleUrl: './crear-categoria.css'
})
export class CrearCategoria {

  categoria = '';
  mensaje = '';
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  registrarCategoria() {
    this.mensaje = '';
    this.error = '';

    const data = {
      categoria: this.categoria
    };

    this.http.post('http://localhost:8080/api/categorias', data)
      .subscribe({
        next: () => {
          this.mensaje = 'Categoría registrada correctamente';
          this.error = '';
          this.cdr.detectChanges();

          setTimeout(() => {
            this.router.navigate(['/admin/categorias']);
          }, 1000);
        },
        error: (err) => {
          this.error =
            err.error?.mensaje ||
            'No se pudo registrar la categoría';

          this.mensaje = '';
          this.cdr.detectChanges();
        }
      });
  }

  cancelar() {
    this.router.navigate(['/admin/categorias']);
  }
}