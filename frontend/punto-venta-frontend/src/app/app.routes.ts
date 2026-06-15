import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Admin } from './pages/admin/admin';
import { Cliente } from './pages/cliente/cliente';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  { path: 'admin', component: Admin },
  { path: 'cliente', component: Cliente },

  { path: '**', redirectTo: 'login' }
];