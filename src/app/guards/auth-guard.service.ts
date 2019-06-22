import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public session: SessionService, public auth: AuthService, public router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    this.auth.redirectUrl = state.url;

    if (this.session.isLoggedIn()) {
      console.log('user is logged in.')
      return true;
    }

    this.router.navigate(['/login']);
    console.log('user is not logged in')
    return false;
  }
}