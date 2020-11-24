import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrencyService } from 'src/app/services/admin/currency.service';
import { LoaderService } from 'src/app/core/loader.service';
@Component({
  selector: 'app-create-edit-currency',
  templateUrl: './create-edit-currency.component.html',
  styleUrls: ['./create-edit-currency.component.scss']
})
export class CreateEditCurrencyComponent implements OnInit {

  refreshLangList = 0;
  saveloading: Boolean = false; message;
  currency: any = {
    currId: 0,
    currencyName: '',
    currencyAppr: '',
    defualtCurr: false,
    editBy: JSON.parse(localStorage.getItem('userData'))['editBy']
  };
  isUpdateMode: boolean;

  constructor(
    private currencyService: CurrencyService,
    private loaderSerivce: LoaderService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    const currencyId = this.route.snapshot.paramMap.get('id');
    if (!currencyId) {
      this.currency = {
        currId: 0,
        currencyName: '',
        currencyAppr: '',
        defualtCurr: false,
        createdBy: JSON.parse(localStorage.getItem('userData'))['createdBy'],
        editBy: JSON.parse(localStorage.getItem('userData'))['editBy']
      };
    } else {
      this.isUpdateMode = true;
      this.getSelectedCurrency(currencyId);
    }
  }

  getSelectedCurrency(id) {
    this.currencyService.getSelectedCurrency(id).subscribe(data => {
      this.currency = data;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  saveCurrency() {
    this.saveloading = true;
    this.currency.defualtCurr == true ? this.currency.defualtCurr = 1 : this.currency.defualtCurr = 0;
    delete this.currency.editDate;
    delete this.currency.createdDate;
    if (!this.isUpdateMode) {
      this.currencyService.addCurrency(this.currency).subscribe(data => {
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
      });
    } else {
      this.currencyService.editCurrency(this.currency).subscribe(data => {
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
      });
    }
  }

  afterEditOrCreate() {
    this.currencyService.refreshCurrencies(1);
    this.saveloading = false;
    this.router.navigate(['/currencies']);
  }

  cancel() {
    this.router.navigate(['/currencies']);
  }

}
