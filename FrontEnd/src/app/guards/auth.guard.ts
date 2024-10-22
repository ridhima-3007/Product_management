import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { ToasterService } from '../sharedServices/toastr.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const toaster = inject(ToasterService);

  if (!authService.getAccessToken()) {
    toaster.showError('Login to continue', 'You are not Logged In');
    router.navigate(['/login']);
    return false;
  }

  if (authService.isTokenExpired(authService.getAccessToken())) {
    authService.checkAndRefreshToken();
    authService.isLoggedIn();
    return true;
  }

  authService.isLoggedIn();
  return true;
};
