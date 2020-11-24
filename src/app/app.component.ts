import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import * as aos from 'aos';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  lang; isHomePage = false; isLoggedIn = false; isLoginPage = false;
  isExamPage = false;
  constructor(
    private translate: TranslateService,
    private router: Router,
    private location: Location,
    private authServ: AuthService
  ) {
    const lang = JSON.parse(localStorage.getItem('currentLang'));
    translate.setDefaultLang(lang ? lang : 'en');
    this.router.events.subscribe((val) => {
      if (location.path().includes('home')) {
        this.isHomePage = true;
        this.isExamPage = false;
      } else if (location.path().includes('exam') || location.path().includes('create-survey')) {
        this.isHomePage = false;
        this.isExamPage = true;
      } else {
        this.isHomePage = false;
        this.isExamPage = false;
      }
    });
    this.translate.onLangChange.subscribe(() => {
      this.lang = this.translate.currentLang;
    });
    this.subscribeLogOut();
  }

  subscribeLogOut() {
    this.authServ.isLoggedIn.subscribe(res => {
      this.isLoggedIn = res;
    });
  }

  ngOnInit() {
    const langDB = JSON.parse(localStorage.getItem('currentLang'));
    if (langDB) {
      this.lang = langDB;
    } else {
      this.lang = 'en';
    }
    this.isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (location.pathname.includes('login')) {
      this.isLoginPage = true;
    }
  }

  useLanguage(language: string) {
    this.translate.use(language);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
