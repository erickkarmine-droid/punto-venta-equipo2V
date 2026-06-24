import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {

  nombre = '';
  apellidoPaterno = '';
  apellidoMaterno = '';
  email = '';
  password = '';
  telefono = '';

  mensaje = '';
  error = '';

  constructor(
    private router: Router,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  registrar() {

     if (!/^\d{10}$/.test(this.telefono)) {
    this.error = 'Debe ingresar todos los campos correctamente';
    this.mensaje = '';
    this.cdr.detectChanges();
    return;
    }
    
    const data = {
      nombre: this.nombre,
      apellidoPaterno: this.apellidoPaterno,
      apellidoMaterno: this.apellidoMaterno,
      email: this.email,
      password: this.password,
      telefono: this.telefono
    };

    this.auth.registro(data).subscribe({
      next: () => {

        this.mensaje = 'Registro exitoso';
        this.error = '';

        this.cdr.detectChanges();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },

      error: (err) => {

        console.log('Error completo:', err);

        if (err.error && err.error.mensaje) {
          this.error = err.error.mensaje;
        } else if (typeof err.error === 'string') {
          this.error = err.error;
        } else {
          this.error = 'Debe ingresar todos los campos correctamente';
        }

        this.mensaje = '';

        this.cdr.detectChanges();
      }
    });
  }

  irALogin() {
    this.router.navigate(['/login']);
  }
}