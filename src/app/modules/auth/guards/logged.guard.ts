import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {user} from '@angular/fire/auth';
import {map} from 'rxjs';

export const loggedGuard: CanActivateFn = () => {
  const user$ = inject(user);
  const router = inject(Router);

  return user$.pipe(
    map(u => {
      if (u) return router.createUrlTree(['/expenses']); // ✅ redirige si ya está logueado
      return true; // ❌ permite acceso si NO está logueado
    })
  );
};
