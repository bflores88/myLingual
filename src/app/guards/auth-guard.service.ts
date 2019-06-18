import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private session: SessionService, private auth: AuthService, private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.auth.redirectUrl = state.url;

    if (this.session.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}