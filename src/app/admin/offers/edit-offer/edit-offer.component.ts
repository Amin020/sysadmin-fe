import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  IMyOptions,
  MDBDatePickerComponent,
  LocaleService
} from 'ng-uikit-pro-standard';
import { LoaderService } from 'src/app/core/loader.service';

// import { error } from 'util';
import { LicenseOffersService } from 'src/app/services/admin/license-offers.service';
import { NgForm } from '@angular/forms';
import { del } from 'selenium-webdriver/http';

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditOfferComponent implements OnInit {
  price: boolean;
  period: boolean;
  extraPeriod: boolean;
  alertTypeValid: boolean;
  errorMessg = "";
  alertFrequencyValid: boolean;

  constructor(
    private router: Router,
    private offersService: LicenseOffersService,
    private route: ActivatedRoute,
    private loaderSerivce: LoaderService
  ) { }

  bundleList: any = [];
  cuurencyList: any = [];
  offerDetailsList: any = [];
  selectedBundle: any = {};
  selectedOffer: any;
  offerJson: object = {};
  selectedBundleId: any;
  headElements = ['Desciription', 'Unit of measure', 'Show/Hide', 'Value', 'Costly', 'Estimated Cost', 'Key Feature'];
  apps = [];
  objectKeys = Object.keys;
  appList = {};
  initialVlas = {};
  selectedCurrency: any;
  saveLoading: boolean;
  validDateFrom = true;
  validDateTo = true;
  @ViewChild('f') offersForm: NgForm;

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
    this.route.params.subscribe(params =>
      [
        this.selectedOffer = params['id'],
      ]);
    this.initialVlas = {
      "alertFrequency": "DAY",
      "alertType": "MAIL",
      "alterFireBefore": 0,
      "currency": '',
      "approveBy": "test",
      "approveDate": this.getCurrentDate(),
      "calcPrice": 0,
      "discount": 0,
      "status": "DRAFT",
      "editBy": "test",
      "createdBy": "test"/*  */
    };
    this.getSelectedOffer();
    this.getAllOffers();
  }

  getCurrentDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  }

  getAllOffers() {
    this.offersService.getOffers().subscribe(
      data => {
        if (data && data["length"] > 0) {
          for (let i = 0; i < data["length"]; i++) {
            this.cuurencyList.push({ value: data[i]["currency"]["currId"], label: data[i]["currency"]["currencyName"] });
            setTimeout(() => {
              this.offersForm.controls['currency'].setValue(this.selectedCurrency);
            }, 0);
          }
        }
        this.loaderSerivce.isLoading.next(false);
      },
      error => {
      }
    );
  }

  getSelectedOffer() {
    this.offersService.getselectedOffer(this.selectedOffer).subscribe(
      data => {
        this.offerJson = data;
        delete this.offerJson["editBy"];
        delete this.offerJson["editDate"];
        delete this.offerJson["createdBy"];
        delete this.offerJson["createdDate"];
        delete this.offerJson["approveBy"];
        delete this.offerJson["approveDate"];
        delete this.offerJson["calcPrice"];
        delete this.offerJson["discount"];
        delete this.offerJson["status"];
        delete this.offerJson["id"];

        if (this.offerJson["alertFrequency"] === "DAY") {
          delete this.offerJson["alertFrequency"];
        } else {
          setTimeout(() => {
            this.offersForm.controls['alertFrequency'].setValue(this.offerJson["alertFrequency"]);
          }, 0);
        }
        if (this.offerJson["alertType"] === "MAIL") {
          delete this.offerJson["alertType"];
        } else {
          setTimeout(() => {
            this.offersForm.controls['alertType'].setValue(this.offerJson["alertType"]);
          }, 0);
        }
        if (this.offerJson["alterFireBefore"] === 0) {
          delete this.offerJson["alterFireBefore"];
        } else {
          setTimeout(() => {
            this.offersForm.controls['alterFireBefore'].setValue(this.offerJson["alterFireBefore"]);
          }, 0);
        }

        this.selectedCurrency = this.offerJson["currency"]["currId"];
        this.formateBundleDetailFunc();
        delete this.offerJson["currency"];
        delete this.offerJson["offerCode"];
        delete this.offerJson["sysFeatureBundle"];
        this.offerDetailsList = this.offerJson["offerDetails"];
        delete this.offerJson["offerDetails"];

        if (this.cuurencyList.length > 0) { this.offerJson["currency"] = this.selectedCurrency; }
        this.offersForm.setValue(this.offerJson);
        // this.offersForm.controls['offerCode'].setValue(this.offerJson["offerCode"]);
        this.loaderSerivce.isLoading.next(false);
      },
      error => { });
  }

  formateBundleDetailFunc() {
    if (this.selectedBundle) {
      this.offerJson["offerDetails"].forEach(app => {
        if (!this.apps.includes(app["bundleDetailId"].sysAppFeature.sysAppNode.id)) {
          this.apps.push(app["bundleDetailId"].sysAppFeature.sysAppNode.id);
          this.appList[app["bundleDetailId"].sysAppFeature.sysAppNode.shortName] = [app];
        } else {
          this.appList[app["bundleDetailId"].sysAppFeature.sysAppNode.shortName].push(app);
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

  backToPreviousPage() {
    this.router.navigate(['offers']);
  }

  updateOffer(form: ElementRef) {
    this.initialVlas = Object.assign({}, this.initialVlas, form["value"]);
    this.initialVlas["offerDetails"] = this.offerDetailsList;
    this.initialVlas["currency"] = { "currId": this.selectedCurrency };
    const date = new Date();
    const formatedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
    this.validDateFrom = true;
    this.validDateTo = true;
    this.errorMessg = "";
    if (formatedDate > form["validFrom"]) {
      this.validDateFrom = false;
      this.errorMessg = "Please enter a valid Effective Date!";
      return;
    }
    if (form["validFrom"] > form["validTo"]) {
      this.validDateTo = false;
      this.validDateFrom = false;
      this.errorMessg = "Expire Date must be greater than Effective Date!";
      return;
    }
    if (form["valid"] && this.validDateFrom && this.validDateTo && !this.price && !this.period && !this.extraPeriod) {
      this.saveLoading = true;
      this.offersService.updateOffer(this.selectedOffer, this.initialVlas).subscribe(data => {
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
