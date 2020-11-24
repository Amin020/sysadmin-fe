import { Router } from '@angular/router';
import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit {
  baseUrl = environment.baseUrl;
  introPages = [];
  navPages = [];
  loggedInUser;
  toggleSideNav = new EventEmitter();
  subsVar: Subscription;

  constructor(private router: Router, private authService: AuthService) {
    this.loggedInUser = authService.loggedUser;
  }

  ngOnInit() {

  }

  getRoutesArray() {
    return window.location.href.split('/');
  }

  introHideNavAndFooter() {

    if (this.getRoutesArray().some(page => this.introPages.indexOf(page) >= 0)) {
      return true;
    }
    return false;

  }

  navHideNavAndFooter() {

    if (this.getRoutesArray().some(page => this.navPages.indexOf(page) >= 0)) {
      return true;
    }
    return false;

  }

  headerSideNavToggle() {
    this.toggleSideNav.emit();
  }
}
