import { CanActivateFn, Router } from '@angular/router';
import { AccesoService } from './acceso.service';
import { inject } from '@angular/core';

export const entryGuard: CanActivateFn = (route, state) => {
  const accesoService = inject(AccesoService);
  const router = inject(Router);

  const tieneAcceso = accesoService.tieneAcceso();

  if (tieneAcceso) {
    return true;  // Permite el acceso
  } else {
    router.navigate(['/']);  // Redirige a la página principal
    return false;  // Bloquea el acceso
  }
};
