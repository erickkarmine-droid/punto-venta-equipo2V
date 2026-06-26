import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminNavbar } from '../../../shared/admin-navbar/admin-navbar';

@Component({
  selector: 'app-crear-producto',
  standalone: true,
  imports: [FormsModule, AdminNavbar],
  templateUrl: './crear-producto.html',
  styleUrl: './crear-producto.css',
})
export class CrearProducto implements OnInit {

  categorias: any[] = [];

  codigoBarras = '';
  nombre = '';
  descripcion = '';
  imagenUrl = '';
  precioCompra: number | null = null;
  precioVenta: number | null = null;
  stockActual: number | null = null;
  categoriaId: number | null = null;

  mensaje = '';
  error = '';

  constructor(
    private http: HttpClient,
    private router: Router,
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
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'No se pudieron cargar las categorías';
          this.cdr.detectChanges();
        }
      });
  }

  registrarProducto() {
    this.mensaje = '';
    this.error = '';

    if (
      this.imagenUrl.trim() !== '' &&
      !this.imagenUrl.toLowerCase().match(/\.(jpg|jpeg|png)$/)
    ) {
      this.error = 'La imagen debe tener formato JPG, JPEG o PNG';
      this.cdr.detectChanges();
      return;
    }

    if (
      this.descripcion.trim() !== '' &&
      (
        this.descripcion.length > 250 ||
        !this.descripcion.match(/^[A-Za-z0-9ÁÉÍÓÚáéíóúÑñ .,]+$/)
      )
    ) {
      this.error = 'La descripción debe ser alfanumérica y máximo de 250 caracteres';
      this.cdr.detectChanges();
      return;
    }

    if (
      this.stockActual !== null &&
      (!Number.isInteger(Number(this.stockActual)) ||
        this.stockActual < 0 ||
        this.stockActual > 500)
    ) {
      this.error = 'Debe ingresar todos los campos correctamente';
      this.cdr.detectChanges();
      return;
    }

    const data = {
      codigoBarras: this.codigoBarras,
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagenUrl: this.imagenUrl,
      precioCompra: this.precioCompra,
      precioVenta: this.precioVenta,
      stockActual: this.stockActual,
      categoriaId: this.categoriaId
    };

    this.http.post('https://punto-venta-equipo2v-production.up.railway.app/api/productos', data)
      .subscribe({
        next: () => {
          this.mensaje = 'Producto registrado correctamente';
          this.error = '';
          this.cdr.detectChanges();

          setTimeout(() => {
            this.router.navigate(['/admin/productos']);
          }, 1000);
        },
        error: (err) => {
          this.error =
            err.error?.mensaje ||
            'Debe ingresar todos los campos correctamente';

          this.mensaje = '';
          this.cdr.detectChanges();
        }
      });
  }

  cancelar() {
    this.router.navigate(['/admin/productos']);
  }
}