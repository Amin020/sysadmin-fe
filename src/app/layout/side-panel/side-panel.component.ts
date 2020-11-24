import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedService } from 'src/app/services/shared.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-side-panel',
  templateUrl: './side-panel.component.html',
  styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent implements OnInit {
  @ViewChild('sidenav') public el: any;
  isLoggedIn$: Observable<boolean>;
  companyId: number;
  dir: string;

  constructor(
    private authService: AuthService,
    private sharedService: SharedService,
    private translate: TranslateService) {
    if (localStorage.getItem('userData') !== undefined) {
      this.companyId = JSON.parse(localStorage.getItem('userData'))['id'];
    }
  }

  ngOnInit() {
    let checkDB = JSON.parse(localStorage.getItem('currentLang'));
    let currentLang = checkDB ? checkDB : 'en';
    this.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      checkDB = JSON.parse(localStorage.getItem('currentLang'));
      currentLang = checkDB ? checkDB : 'en';
      this.dir = (currentLang === 'ar') ? 'rtl' : 'ltr';
    });
    this.isLoggedIn$ = this.authService.isLoggedIn;
    if (this.sharedService.subsVar === undefined) {
      this.sharedService.subsVar = this.sharedService.
        toggleSideNav.subscribe((name: string) => {
          this.el.show();
        });
    }
  }

}
