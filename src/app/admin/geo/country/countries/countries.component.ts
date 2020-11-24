import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { LoaderService } from 'src/app/core/loader.service';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent extends ParentListBase implements OnInit {

  loading: boolean;
  pageMode: string;
  message: number;
  countries: any;
  noDataFound: boolean;
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private regionsService: RegionsService,
    private loaderSerivce: LoaderService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    if (this.router.url === '/countries/new') {
      this.pageMode = 'newCountry';
    } else if (this.router.url.indexOf('/countries/edit') > -1) {
      this.pageMode = 'editCountry';
    }
    this.regionsService.currentMessage.subscribe(message => this.message = message);
    this.regionsService.refreshCountriessList.subscribe(refresh => this.getCountriesList());
  }

  openModal(x) {
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
        this.delete(x);
        this.getCountriesList();
      }
    });
  }

  private getCountriesList() {
    this.loading = true;
    this.regionsService.getCountries().subscribe(data => {
      this.countries = data;
      this.updatePagination(this.countries);
      if (this.countries.length > 0) {
        this.regionsService.changeMessage(Number(this.countries[this.countries.length - 1].id) + 1);
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

  edit(country) {
    this.router.navigate(['/countries/edit/' + country.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(country) {
    this.regionsService.deleteCountry(country.id).subscribe(item => {
      this.getCountriesList();
    });
  }

  removeLang(item) {
    const index = this.countries.indexOf(item);
    if (index > -1) {
      this.countries.splice(index, 1);
    }
  }

}
