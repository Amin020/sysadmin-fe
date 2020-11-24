import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from 'src/app/core/loader.service';
import { AppUser } from '../security/app-user';
import { AppUserAuth } from '../security/app-user-auth';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loggedUserObj: AppUser = new AppUser();
  securityObject: AppUserAuth = null;
  isLoggedIn$: Observable<boolean>;
  logged: boolean;
  loading = false;
  message: string;
  signedInEmail: Observable<String>;
  accountAliasValisd: boolean;
  accountAlias: string;
  accountId: number;
  loggedUser: string;
  constructor(
    public authService: AuthService,
    private securityService: SecurityService,
    public router: Router,
    private _toastrServ: ToastrService,
    private loaderService: LoaderService
  ) {
    this.setMessage();
  }

  ngOnInit() {
    this.authService.refreshLoggedIn.subscribe(message => this.logged = message);
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.authService.isLoggedIn.subscribe(value => {
      if (value) {
        this.router.navigate(['/home']);
      }
    });
    console.log(this.logged);

  }

  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  checkAccountAlias() {

    this.authService.getAccountAlias(this.accountAlias).subscribe(
      data => {
        this.accountId = data['id'];
        this.accountAliasValisd = true;
        this.loggedUserObj['accountAlias'] = this.accountAlias;
        console.log('getAccountAlias', data);
        this.loaderService.isLoading.next(false);
      },
      error => {
        this.message = error;
        this.loaderService.isLoading.next(false);
      }
    );
  }
  login() {
    this.message = 'Trying to log in ...';
    this.loading = true;
    this.authService.login(this.accountAlias, this.loggedUserObj).subscribe(
      data => {
        this.loggedUser = this.loggedUserObj['email'];
        this.authService.loggedUser = this.loggedUser;
        // this.loggedIN.next(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('SignedInEmail', this.loggedUserObj['email']);
        localStorage.setItem('userData', JSON.stringify(data));
        this.setMessage();
        if (this.authService.isLoggedIn) {
          // Get the redirect URL from our auth service
          // If no redirect has been set, use the default
          let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/surveyManagement';

          // Redirect the user
          this.router.navigate([redirect]);
          this.authService.refreshLogin(true);
          this.loading = false;
          this.loaderService.isLoading.next(false);
        }
      },
      error => {
        console.log('error', error);
        this._toastrServ.error('Wrong username/password');
        this.loading = false;
        this.loaderService.isLoading.next(false);
      }
    );
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }

}
