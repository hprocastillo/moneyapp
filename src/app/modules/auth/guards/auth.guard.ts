import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {user} from '@angular/fire/auth';
import {map} from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const user$ = inject(user); // 🔸 accede al observable que emite el usuario actual
  const router = inject(Router); // 🔸 para redirigir si hace falta

  return user$.pipe(
    map(u => {
      if (u) return true; // ✅ si hay usuario autenticado, permite acceso
      return router.createUrlTree(['/auth']); // ❌ si no hay usuario, redirige
    })
  );
};
