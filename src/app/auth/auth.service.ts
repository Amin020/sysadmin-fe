import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
// import { Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserObj } from 'src/models/user.model';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  loggedUser: string;
  private loggedIN = new BehaviorSubject<boolean>(false);
  baseUrl = environment.baseUrl;
  private authenticUrl = this.baseUrl + '/user/authentic';
  refreshLoggedIn = this.loggedIN.asObservable();
  http: any;
  get isLoggedIn() {
    return this.loggedIN.asObservable(); // {2}
  }
  constructor(public router: Router, private httpClient: HttpClient) {
    if (localStorage.isLoggedIn && localStorage.isLoggedIn === 'true') {
      this.loggedUser = localStorage.getItem('SignedInEmail');
      this.refreshLogin(true);
    } else {
      localStorage.setItem('isLoggedIn', 'false');
      this.refreshLogin(false);
    }
  }
  updateLang(preferredLang) {
    return this.httpClient.patch(this.baseUrl + `/user/preferredLang/${preferredLang}`, { preferredLang: preferredLang });
  }
  refreshLogin(refresh: boolean) {
    this.loggedIN.next(refresh);
  }

  changeMessage(message: boolean) {
    this.loggedIN.next(message);
  }
  getAccountAlias(accountAlias) {
    return this.httpClient.get(this.authenticUrl + '/alias/' + accountAlias, httpOptions);
  }
  // Login function
  login(accountAlias, userData) {
    const userIdOrEmail = userData['email'];
    const password = userData['password'];
    const authString = 'Basic ' + btoa(accountAlias + '\\' + userIdOrEmail + ':' + password);
    const url = this.authenticUrl + '/verify/' + accountAlias + '?userIdOrEmail=' + userIdOrEmail + '&password=' + password;
    // const headers = new HttpHeaders({ Authorization: authString });
    return this.httpClient.get<UserObj>(url, httpOptions).pipe(
      map(
        user => {
          localStorage.setItem('SignedInEmail', userIdOrEmail);
          localStorage.setItem('basicauth', authString);
          return user;
        }
      )
    );
  }

  // Logout function
  logout(): void {
    // localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('SignedInEmail');
    this.refreshLogin(false);
    this.router.navigate(['/login']);
  }
}
