import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AdminNavbar } from '../../../shared/admin-navbar/admin-navbar';

@Component({
  selector: 'app-editar-producto',
  standalone: true,
  imports: [FormsModule, AdminNavbar],
  templateUrl: './editar-producto.html',
  styleUrl: './editar-producto.css',
})
export class EditarProducto implements OnInit {

  productoId!: number;
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
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCategorias();
    this.cargarProducto();
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

  cargarProducto() {
    this.http.get<any>(
      `https://punto-venta-equipo2v-production.up.railway.app/api/productos/${this.productoId}`
    ).subscribe({
      next: (producto) => {
        this.codigoBarras = producto.codigoBarras || '';
        this.nombre = producto.nombre || '';
        this.descripcion = producto.descripcion || '';
        this.imagenUrl = producto.imagenUrl || '';
        this.precioCompra = producto.precioCompra;
        this.precioVenta = producto.precioVenta;
        this.stockActual = producto.stockActual;
        this.categoriaId = producto.categoria?.idCategoria;

        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'No se pudo cargar el producto';
        this.cdr.detectChanges();
      }
    });
  }

  actualizarProducto() {
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

    this.http.put(
      `https://punto-venta-equipo2v-production.up.railway.app/api/productos/${this.productoId}`,
      data
    ).subscribe({
      next: () => {
        this.mensaje = 'Producto actualizado correctamente';
        this.error = '';
        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/admin/productos']);
        }, 1000);
      },
      error: (err) => {
        this.error =
          err.error?.mensaje ||
          'No se pudo actualizar el producto';

        this.mensaje = '';
        this.cdr.detectChanges();
      }
    });
  }

  cancelar() {
    this.router.navigate(['/admin/productos']);
  }
}