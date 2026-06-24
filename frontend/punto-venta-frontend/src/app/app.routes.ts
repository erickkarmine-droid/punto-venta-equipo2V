import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Cliente } from './pages/cliente/cliente';


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

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'registro',
    component: Registro
  },

  {
    path: 'cliente',
    component: Cliente
  },

  {
    path: 'admin',
    redirectTo: 'admin/productos',
    pathMatch: 'full'
  },

  {
    path: 'admin/usuarios',
    component: GestionUsuarios
  },

  {
    path: 'admin/categorias',
    component: GestionCategorias
  },

  {
    path: 'admin/categorias/nueva',
    component: CrearCategoria
  },

  {
    path: 'admin/productos',
    component: GestionProductos
  },

  {
    path: 'admin/productos/nuevo',
    component: CrearProducto
  },

  {
    path: 'admin/productos/editar/:id',
    component: EditarProducto
  },

  {
  path: 'cliente/catalogo',
  component: Catalogo
  },

  {
  path: 'cliente/carrito',
  component: Carrito
  },

  {
  path: 'cliente/resumen-compra',
  component: ResumenCompra
  },

  {
  path: 'cliente/pago',
  component: Pago
  },

  {
  path: 'cliente/ticket',
  component: Ticket
  },

  {
  path: 'cliente/historial',
  component: HistorialCompras
  },

  {
  path: 'cliente',
  redirectTo: 'cliente/catalogo',
  pathMatch: 'full'
  },

  {
  path: 'cliente/catalogo',
  component: Catalogo
  },

  {
  path: 'cliente/carrito',
  component: Carrito
  },
  
  {
  path: 'cliente/historial',
  component: HistorialCompras
  },

  {
    path: '**',
    redirectTo: 'login'
  }

];