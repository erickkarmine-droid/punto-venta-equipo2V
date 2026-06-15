import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  mensaje = '';
  error = '';

  constructor(
    private router: Router,
    private auth: Auth,
    private cdr: ChangeDetectorRef
  ) {}

  login() {
    this.mensaje = '';
    this.error = '';

    const data = {
      email: this.email,
      password: this.password
    };

    this.auth.login(data).subscribe({
      next: (response) => {
        console.log('Respuesta login:', response);

        if (response.mensaje === 'Correo o contraseña inválidos') {
          this.error = response.mensaje;
          this.mensaje = '';
          this.cdr.detectChanges();
          return;
        }

        this.mensaje = response.mensaje || 'Inicio de sesión exitoso';
        this.error = '';

        this.cdr.detectChanges();

        if (response.rol === 'ADMINISTRADOR' || response.rol === 'Administrador') {
          this.router.navigate(['/admin']);
        } else if (response.rol === 'CLIENTE' || response.rol === 'Cliente') {
          this.router.navigate(['/cliente']);
        } else {
          this.error = 'Rol no reconocido';
          this.mensaje = '';
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log('Error login:', err);

        this.mensaje = '';
        this.error =
          err.error?.mensaje ||
          'Correo o contraseña inválidos';

        this.cdr.detectChanges();
      }
    });
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }
}