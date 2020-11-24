import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ExamService } from '../../exam.service';

@Component({
  selector: 'app-exam-header',
  templateUrl: './exam-header.component.html',
  styleUrls: ['./exam-header.component.scss']
})
export class ExamHeaderComponent implements OnInit {

  selectedLanguage;
  isLoggedIn: boolean;
  languages = [
    {
      name: "عربي",
      value: 'ar'
    },
    {
      name: "English",
      value: 'en'
    }
  ];
  constructor(
    private translate: TranslateService,
    private authService: AuthService,
    private examService: ExamService
  ) { }

  ngOnInit() {
    this.selectedLanguage = this.languages[1];
    this.authService.isLoggedIn.subscribe(val => { this.isLoggedIn = val; this.getLang(); });
    this.getLang();
  }

  getLang() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    let languageValue;
    if (userData) {
      languageValue = userData.prefferedLanguage.aprv.toLowerCase();
    } else {
      const checkDB = JSON.parse(localStorage.getItem('currentLang'));
      languageValue = checkDB ? checkDB : 'en';
    }
    this.selectedLanguage = languageValue === 'ar' ? this.languages[0] : this.languages[1];
    localStorage.setItem('currentLang', JSON.stringify(languageValue));
  }

  toggleSideMenu() {
    this.examService.toggleSideMenu();
  }

  changeManLanguage(language) {
    this.selectedLanguage = language;
    if (this.isLoggedIn) {
      this.authService.updateLang(this.selectedLanguage.value).subscribe((res: any) => {
        console.log(res);
        this.translate.use(this.selectedLanguage.value);
        localStorage.setItem('userData', JSON.stringify(res));
        this.refreshRoute();
      });
    } else {
      this.refreshRoute();
    }
  }

  refreshRoute() {
    localStorage.setItem('currentLang', JSON.stringify(this.selectedLanguage.value));
    // location.reload();
  }

}
