

import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguagesService } from 'src/app/services/admin/languages.service';
import { LoaderService } from 'src/app/core/loader.service';
@Injectable()
@Component({
  selector: 'app-create-edit-language',
  templateUrl: './create-edit-language.component.html',
  styleUrls: ['./create-edit-language.component.scss']
})
export class CreateEditLanguageComponent implements OnInit {

  refreshLangList = 0;
  saveloading: boolean;
  language: any = {
    id: 0,
    aprv: '',
    name: '',
    nativeName: '',
    isRTL: false
  };
  isUpdateMode: boolean;

  constructor(
    private languagesService: LanguagesService,
    private loaderSerivce: LoaderService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    const languageId = this.activatedRoute.snapshot.paramMap.get('id');
    this.languagesService.refreshLanguagesList.subscribe(refresh => {
      this.refreshLangList = refresh;
    });
    if (!languageId) {
      this.language = {
        id: languageId,
        aprv: '',
        name: '',
        nativeName: '',
        isRTL: false,
        editBy: 'hhh',
        createdDate: new Date().toISOString(),
        editDate: new Date().toISOString()
      };
    } else {
      this.isUpdateMode = true;
      this.getSelectedLanguage(languageId);
    }
  }

  getSelectedLanguage(id) {
    this.languagesService.getSelectedLanguage(id).subscribe(data => {
      this.language = data;
      this.loaderSerivce.isLoading.next(false);
    });
  }
  saveLanguage() {
    this.saveloading = true;
    this.language.isRTL === true ? this.language.isRTL = 1 : this.language.isRTL = 0;
    if (!this.isUpdateMode) {
      this.saveloading = true;
      this.language.isRTL === true ? this.language.isRTL = 1 : this.language.isRTL = 0;
      this.language.createdDate = new Date().toISOString();
      this.language.editDate = new Date().toISOString();
      this.languagesService.addLanguage(this.language).subscribe(data => {
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
      });
    } else {
      this.languagesService.editLanguage(this.language).subscribe(data => {
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
      });
    }
  }

  afterEditOrCreate() {
    this.languagesService.refreshLanguages(1);
    this.saveloading = false;
    this.router.navigate(['/languages']);
  }

  cancel() {
    this.router.navigate(['/languages']);
  }

}
