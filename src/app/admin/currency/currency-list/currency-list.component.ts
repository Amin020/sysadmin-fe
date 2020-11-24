import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { CurrencyService } from 'src/app/services/admin/currency.service';
import { LoaderService } from 'src/app/core/loader.service';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { ParentListBase } from 'src/app/core/parent-list-base';
@Component({
  selector: 'app-currency-list',
  templateUrl: './currency-list.component.html',
  styleUrls: ['./currency-list.component.scss']
})
export class CurrencyListComponent extends ParentListBase implements OnInit {

  loading = true;
  message: number;
  currencies: any;
  noDataFound = false;
  headElements = ['ID', 'Name', 'Native Name', 'Aprv', "RTL"];
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private currencyService: CurrencyService,
    private loaderSerivce: LoaderService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.currencyService.currentMessage.subscribe(message => this.message = message);
    this.currencyService.refreshLanguagesList.subscribe(refresh => this.getCurrencyList());
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

  private getCurrencyList() {
    this.loading = true;
    this.currencyService.getcurrencies().subscribe(data => {
      this.currencies = data;
      this.updatePagination(this.currencies);
      if (this.currencies.length > 0) {
        this.currencyService.changeMessage(Number(this.currencies[this.currencies.length - 1].id) + 1);
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

  edit(currency) {
    this.router.navigate(['/currencies/edit/' + currency.currId]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(currency) {
    this.currencyService.deleteCurrency(currency.currId).subscribe(item => this.getCurrencyList());
  }

  removeCurrency(item) {
    const index = this.currencies.indexOf(item);
    if (index > -1) {
      this.currencies.splice(index, 1);
    }
  }
}
