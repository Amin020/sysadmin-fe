import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   let url: string = state.url;
  //   console.log('AuthGuard#canActivate called');
  //   return this.checkLogin(url);
  // }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;
    if (localStorage.getItem('SignedInEmail') && localStorage.getItem('basicauth')) { return true; }

    // not logged in so redirect to login page with the return url
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/login']);
    return false;
  }
}
