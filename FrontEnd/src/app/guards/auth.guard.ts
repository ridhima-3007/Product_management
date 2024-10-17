import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (!authService.getAccessToken()) {
    snackBar.open('You are not logged in', 'Close', {
      verticalPosition: 'top',
    });
    router.navigate(['/login']);
    return false;
  }

  if (authService.isTokenExpired(authService.getAccessToken())) {
    authService.checkAndRefreshToken();
    return true;
  }

  return true;
};
