import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { AuthService } from 'src/app/auth/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  currentLang;
  isLoggedIn$: boolean; isPracticePage = false;
  constructor(public authService: AuthService, public router: Router, private sharedService: SharedService) {
    if (location.pathname.includes('practice-survey')) {
      this.isPracticePage = true;
    }
    this.authService.isLoggedIn.subscribe(val => { this.isLoggedIn$ = val; this.getLang() });
  }

  message: string;
  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    this.getLang();
  }
  getLang() {
    var userData = JSON.parse(localStorage.getItem('userData'));
    var checkDB;
    if (this.isPracticePage) {
      checkDB = location.pathname.includes('en') ? 'en' : 'ar';
      this.currentLang = checkDB;
    } else {
      if (userData) {
        this.currentLang = userData.prefferedLanguage.aprv;
      } else {
        checkDB = JSON.parse(localStorage.getItem('currentLang'))
        this.currentLang = checkDB ? checkDB : 'en';
      }
    }
    localStorage.setItem('currentLang', JSON.stringify(this.currentLang))
  }
  sidenavToggle() {
    this.sharedService.headerSideNavToggle();
  }
  updateLang() {
    if (this.isLoggedIn$) {
      this.authService.updateLang(this.currentLang).subscribe((res: any) => {
        console.log(res);
        localStorage.setItem('userData', JSON.stringify(res));
        this.refreshRoute();
      });
    } else {
      this.refreshRoute();
    }

  }
  refreshRoute() {
    localStorage.setItem('currentLang', JSON.stringify(this.currentLang))
    location.reload();
  }
}
