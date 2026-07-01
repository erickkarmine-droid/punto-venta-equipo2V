import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const clienteGuard: CanActivateFn = () => {
  const router = inject(Router);
  const rol = localStorage.getItem('rol');

  if (rol === 'CLIENTE') {
    return true;
  }

  return router.createUrlTree(['/login']);
};