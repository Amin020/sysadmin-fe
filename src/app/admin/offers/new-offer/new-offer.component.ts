import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IMyOptions,
  MDBDatePickerComponent
} from 'ng-uikit-pro-standard';
import { LoaderService } from 'src/app/core/loader.service';

// import { error } from 'util';
import { LicenseOffersService } from 'src/app/services/admin/license-offers.service';
import { AppBundleService } from 'src/app/services/admin/app-bundle.service';
import { CurrencyService } from 'src/app/services/admin/currency.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewOfferComponent implements OnInit {

  constructor(
    private router: Router,
    private offersService: LicenseOffersService,
    private BundleService: AppBundleService,
    private loaderSerivce: LoaderService,
    private currencyService: CurrencyService
  ) { }

  bundleList: any = [];
  currencyList: any = [];
  offerDetailsList: any = [];
  selectedBundle: any = {};
  validForm: boolean;
  validDateFrom: boolean;
  errorMessg = "";
  price: boolean;
  extraPeriod: boolean;
  period: boolean;
  alertTypeValid: boolean;
  alertFrequencyValid: boolean;
  headElements = ['Desciription', 'Unit of measure', 'Show/Hide', 'Value', 'Costly', 'Estimated Cost', 'Key Feature'];
  apps = [];
  appList = [];
  offerJson: object = {};
  @ViewChild('f') offersForm: NgForm;
  saveLoading: boolean;
  selectedCurrencyId: any;

  @ViewChild('datePicker') datePicker: MDBDatePickerComponent;
  public myDatePickerOptions: IMyOptions = {
    firstDayOfWeek: 'su',
    closeAfterSelect: true,
    disableUntil: { year: 2019, month: 5, day: 31 },
    markDates: [
      {
        dates: [{ year: 2016, month: 11, day: 14 }],
        color: '#004198'
      }
    ]
  };

  offerTypeList = [
    { value: 'FIXED', label: 'FIXED' },
    { value: 'CUSTOMIZED', label: 'CUSTOMIZED' }
  ];
  bundleStatusList = [
    { value: 'DRAFT', label: 'DRAFT' },
    { value: 'APPROVED', label: 'APPROVED' },
    { value: 'PENDING', label: 'PENDING' },
    { value: 'INACTIVE', label: 'INACTIVE' }
  ];
  alertFrequency = [
    { value: 'DAY', label: 'DAY' },
    { value: 'WEEK', label: 'WEEK' },
    { value: 'MONTH', label: 'MONTH ' }
  ];
  alertType = [
    { value: 'MAIL', label: 'MAIL' },
    { value: 'SMS', label: 'SMS' },
    { value: 'BOTH', label: 'BOTH' }
  ];

  ngOnInit() {
    this.offerJson = {
      "alertFrequency": "DAY",
      "alertType": "MAIL",
      // "offerCode": '',
      "price": 0,
      "alertNotify": '',
      'currency': '',
      "additionPeriodFree": 0,
      "alterFireBefore": 0,
      "period": 0,
      "published": false,
      "validTo": '',
      "validFrom": '',
      "offerDescription": '',
      "approveBy": "test",
      "approveDate": this.getCurrentDate(),
      "calcPrice": 0,
      "discount": 0,
      "status": "DRAFT",
      "editBy": "test",
      "createdBy": "test",
      "offerType": "FIXED"
    };
    setTimeout(() => { this.resetFormValues(); }, 0);
    this.getBundleList();
    this.getAllCurrencies();
    this.validForm = true;
    this.validDateFrom = true;
  }

  getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  resetFormValues() {
    this.offersForm.setValue({
      additionPeriodFree: 0,
      alertNotify: false,
      // offerCode: "",
      offerDescription: "",
      period: 0,
      price: 0,
      published: false,
      // "status":	"DRAFT",
      validFrom: "",
      validTo: "",
      offerType: "FIXED"
    });
  }

  backToPreviousPage() {
    this.router.navigate(['offers']);
  }

  getBundleList() {
    this.BundleService.getBundels().subscribe(
      data => {
        if (data && data["length"] > 0) {
          this.selectedBundle = data[0];
          for (let i = 0; i < data["length"]; i++) {
            this.bundleList.push({ value: data[i]["id"], label: data[i]["name"], bundle: data[i] });
          }
          this.loaderSerivce.isLoading.next(false);
          this.formateBundleDetailFunc();
        }
      },
      error => {
      });
  }

  private getAllCurrencies() {
    this.currencyService.getcurrencies().subscribe((currencies: any[]) => {
      for (let i = 0; i < currencies.length; i++) {
        this.currencyList.push({
          value: currencies[i]["currId"],
          label: currencies[i]["currencyName"],
          currency: currencies[i]
        });
      }
      this.selectedCurrencyId = this.currencyList[0].value;
    });
  }

  getSelectedBundle(event) {
    this.selectedBundle = this.bundleList.find(x => x.value === event).bundle;
    this.formateBundleDetailFunc();
  }

  formateBundleDetailFunc() {
    if (this.selectedBundle) {
      this.selectedBundle.sysFeatureBundleDetails.forEach(app => {
        if (!this.apps.includes(app.sysAppFeature.sysAppNode.id)) {
          this.apps.push(app.sysAppFeature.sysAppNode.id);
          this.appList[app.sysAppFeature.sysAppNode.shortName] = [app];
        } else {
          this.appList[app.sysAppFeature.sysAppNode.shortName].push(app);
        }
      });
    }
  }
  acceptPositiveNum(event) {
    const inputVal = event["srcElement"]["value"];
    const inputName = event["srcElement"]["name"];
    if (inputVal <= 0) {
      switch (inputName) {
        case "price": this.price = true;
          break;
        case "period": this.period = true;
          break;
        case "additionPeriodFree": this.extraPeriod = true;
          break;
      }
    } else {
      switch (inputName) {
        case "price": this.price = false;
          break;
        case "period": this.period = false;
          break;
        case "additionPeriodFree": this.extraPeriod = false;
          break;
      }
    }
  }

  /* getOfferDetails(id: any) {
     /* return {
       "bundleDetailId": this.selectedBundle["sysFeatureBundleDetails"],
       "licenseOfferId": this.selectedBundle["id"]
     } *
     return this.selectedBundle["sysFeatureBundleDetails"];
   } */

  addOffer(form: NgForm) {
    const date = new Date();
    const formatedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    this.validDateFrom = true;
    this.validForm = true;
    this.errorMessg = "";
    if (formatedDate > form["validFrom"]) {
      this.validDateFrom = false;
      this.errorMessg = "Please enter a valid Effective Date!";
      return;
    }
    if (form["validFrom"] > form["validTo"]) {
      this.validForm = false;
      this.validDateFrom = false;
      this.errorMessg = "Expire Date must be greater than Effective Date!";
      return;
    }
    form["value"].currency = this.currencyList.find(currency => currency.value === this.selectedCurrencyId).currency;
    this.offerJson = Object.assign({}, this.offerJson, form["value"]);
    delete this.offerJson["offerDetails"];
    if (form["valid"] && this.validForm && this.validDateFrom && !this.price && !this.period && !this.extraPeriod) {
      this.saveLoading = true;
      this.offersService.addOffer(this.offerJson).subscribe(data => {
        this.backToPreviousPage();
        this.saveLoading = false;
      }, error => {
        this.saveLoading = false;
      });
    } else if (form["controls"]["alertType"] && form["controls"]["alertType"]["invalid"]) {
      this.alertTypeValid = true;
      this.errorMessg = "Please Fill All Required Inputs With Correct Value";
    } else if (form["controls"]["alertFrequency"] && form["controls"]["alertFrequency"]["invalid"]) {
      this.alertFrequencyValid = true;
      this.errorMessg = "Please Fill All Required Inputs With Correct Value";
    } else {
      this.errorMessg = "Please Fill All Required Inputs With Correct Value";
    }
  }

}
