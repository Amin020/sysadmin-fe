import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { LanguagesService } from 'src/app/services/admin/languages.service';
import { LoaderService } from 'src/app/core/loader.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ParentListBase } from 'src/app/core/parent-list-base';
@Component({
  selector: 'app-languages-list',
  templateUrl: './languages-list.component.html',
  styleUrls: ['./languages-list.component.scss']
})
export class LanguagesListComponent extends ParentListBase implements OnInit {

  loading = true;
  message: number;
  languages: any;
  noDataFound: boolean;
  headElements = ['ID', 'Name', 'Native Name', 'Aprv', "RTL"];
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private languagesService: LanguagesService,
    private loaderSerivce: LoaderService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.languagesService.currentMessage.subscribe(message => this.message = message);
    this.languagesService.refreshLanguagesList.subscribe(refresh => this.getLanguagesList());
  }

  openModal(lang) {
    this.modalRef = this.modalService.show(ModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true
    });

    this.modalRef.content.action.subscribe((result: any) => {
      if (result === 'yes') {
        this.delete(lang);
      }
    });
  }

  private getLanguagesList() {
    this.loading = true;
    this.languagesService.getLanguages().subscribe(data => {
      this.languages = data;
      this.updatePagination(this.languages);
      if (this.languages.length > 0) {
        this.languagesService.changeMessage(Number(this.languages[this.languages.length - 1].id) + 1);
      } else {
        this.noDataFound = true;
      }
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  edit(language) {
    this.router.navigate(['/languages/edit/' + language.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(language) {
    this.languagesService.deleteLanguage(language.id).subscribe(item => this.getLanguagesList());
  }

  removeLang(item) {
    const index = this.languages.indexOf(item);
    if (index > -1) {
      this.languages.splice(index, 1);
    }
    console.log(this.languages);
  }
}
