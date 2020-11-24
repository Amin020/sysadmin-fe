import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AppUserAuth } from './app-user-auth';
import { AppUser } from './app-user';
import { LOGIN_MOCKS } from './login-mocks';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();

  constructor() { }

  resetSecurityObject(): void {
    this.securityObject.email = "";
    this.securityObject.basicauth = "";
    this.securityObject.isAuthenticated = false;
    this.securityObject.canAccessProducts = false;
    this.securityObject.canAddProduct = false;
    this.securityObject.canSaveProduct = false;
    this.securityObject.canAccessCategories
      = false;
    this.securityObject.canAddCategory = false;
    localStorage.removeItem("basicauth");
  }
  // login(entity: AppUser):
  //   Observable<AppUserAuth> {
  //   this.resetSecurityObject();
  //   Object.assign(this.securityObject,
  //     LOGIN_MOCKS.find(
  //       user => user.email.toLowerCase() ===
  //         entity.email.toLowerCase()));
  //   if (this.securityObject.email !== "") {
  //     localStorage.setItem("basicauth",
  //       this.securityObject.basicauth);
  //   }
  //   return of<AppUserAuth>(this.securityObject);
  // }
  logout(): void {
    this.resetSecurityObject();
  }
}
