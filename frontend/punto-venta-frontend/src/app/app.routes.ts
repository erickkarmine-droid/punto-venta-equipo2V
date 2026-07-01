import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';

import { CrearProducto } from './pages/productos/crear-producto/crear-producto';
import { GestionProductos } from './pages/productos/gestion-productos/gestion-productos';
import { GestionUsuarios } from './pages/usuarios/gestion-usuarios/gestion-usuarios';
import { CrearCategoria } from './pages/categorias/crear-categoria/crear-categoria';
import { GestionCategorias } from './pages/categorias/gestion-categorias/gestion-categorias';
import { EditarProducto } from './pages/productos/editar-producto/editar-producto';

import { Catalogo } from './pages/cliente/catalogo/catalogo';
import { Carrito } from './pages/cliente/carrito/carrito';
import { HistorialCompras } from './pages/cliente/historial-compras/historial-compras';
import { ResumenCompra } from './pages/cliente/resumen-compra/resumen-compra';
import { Pago } from './pages/cliente/pago/pago';
import { Ticket } from './pages/cliente/ticket/ticket';

import { adminGuard } from './guards/admin.guard';
import { clienteGuard } from './guards/cliente.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  { path: 'admin', redirectTo: 'admin/productos', pathMatch: 'full' },
  { path: 'admin/usuarios', component: GestionUsuarios, canActivate: [adminGuard] },
  { path: 'admin/categorias', component: GestionCategorias, canActivate: [adminGuard] },
  { path: 'admin/categorias/nueva', component: CrearCategoria, canActivate: [adminGuard] },
  { path: 'admin/productos', component: GestionProductos, canActivate: [adminGuard] },
  { path: 'admin/productos/nuevo', component: CrearProducto, canActivate: [adminGuard] },
  { path: 'admin/productos/editar/:id', component: EditarProducto, canActivate: [adminGuard] },

  { path: 'cliente', redirectTo: 'cliente/catalogo', pathMatch: 'full' },
  { path: 'cliente/catalogo', component: Catalogo, canActivate: [clienteGuard] },
  { path: 'cliente/carrito', component: Carrito, canActivate: [clienteGuard] },
  { path: 'cliente/resumen-compra', component: ResumenCompra, canActivate: [clienteGuard] },
  { path: 'cliente/pago', component: Pago, canActivate: [clienteGuard] },
  { path: 'cliente/ticket', component: Ticket, canActivate: [clienteGuard] },
  { path: 'cliente/historial', component: HistorialCompras, canActivate: [clienteGuard] },

  { path: '**', redirectTo: 'login' }
];