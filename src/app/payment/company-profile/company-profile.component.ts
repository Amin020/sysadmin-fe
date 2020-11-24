import { Component, OnInit, ViewChildren, ViewChild, ElementRef } from '@angular/core';
import { CompanyProfileService } from './company-profile.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers: [CompanyProfileService]
})
export class CompanyProfileComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  gateWayList = [];
  langList = [];
  @ViewChild('stepper', { static: true }) stepper: ElementRef;
  tab1 = true; tab2 = false; tab3 = false
  cityList = [];
  id; done = false;
  optionsClientType = [];
  amountPath = 0;
  currencyList = []; optionsPrefferedLanguage = []; optionsGtwProvider = [];
  optionsReferralType = [];
  optionsPrefferedCommCh = [];
  optionsCity = []; optionsCurrencyList = [];
  constructor(private _companyProfileServ: CompanyProfileService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.amountPath = Number(params['calcPrice']);
    }
    );

  }

  ngOnInit() {
    this.getGateWayList();
    setTimeout(() => {
      this.optionsClientType = [{ label: "CUSTOMER", value: "CUSTOMER" }, { label: "PARTNER", value: "PARTNER" }, { label: "TEST_ACCOUNT", value: "TEST_ACCOUNT" }, { label: "OWNER", value: "OWNER" }];
      this.optionsReferralType = [{ label: "INTERNET", value: "INTERNET" }, { label: "FRIEND", value: "FRIEND" }, { label: "CAMPAIN", value: "CAMPAIN" }, { label: "PARTNER", value: "PARTNER" }];
      this.optionsPrefferedCommCh = [{ label: "EMAIL", value: "EMAIL" }, { label: "MOBILE", value: "MOBILE" }];
    }, 1);

    this.getLangList();
    this.getCityist();
    this.getCurrencyList();
    this.firstFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      mobileCC: new FormControl('', [Validators.required, Validators.pattern('[0-9]+')]),
      mobile: new FormControl(null, [Validators.required, Validators.pattern('([0-0]{1}[1-9]{1}[0-9]{9})|[1-9]{1}[0-9]{9}')]),
      companyName: new FormControl('', [Validators.required]),
      salesRecommendations: new FormControl(''),
      referralTxt: new FormControl(''),

      prefferedLanguage: new FormControl(null, [Validators.required]),
      clientType: new FormControl(null, [Validators.required]),
      referralType: new FormControl(null),
      prefferedCommCh: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
    });
    this.secondFormGroup = new FormGroup({
      gtwprovider: new FormControl(1, Validators.required),
      currency: new FormControl(null, Validators.required),
      billingAddress: new FormControl(null, Validators.required),
      state: new FormControl(null, Validators.required),
      postalCode: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('[0-9]+')]),
      shippingAddress: new FormControl(null, Validators.required),
      shippingState: new FormControl(null, Validators.required),
      shippingPostalCode: new FormControl(null, [Validators.required, Validators.minLength(5), Validators.pattern('[0-9]+')]),
      paidAmount: new FormControl(this.amountPath, [Validators.required, Validators.pattern('[0-9]+')])
    });
  }

  getGateWayList() {
    this._companyProfileServ.getGateWayList().subscribe((res: any) => {
      this.gateWayList = res;
      this.gateWayList.forEach(element => {
        this.optionsGtwProvider = [...this.optionsGtwProvider, { label: element.providerName, value: element }]
      })
    });
  }
  getLangList() {
    this._companyProfileServ.getLangList().subscribe((res: any) => {
      this.langList = res;
      this.langList.forEach(element => {
        this.optionsPrefferedLanguage = [...this.optionsPrefferedLanguage, { label: element.nativeName, value: element.id }];
      })
    });
  }
  getCityist() {
    this._companyProfileServ.getCityist().subscribe((res: any) => {
      this.cityList = res;
      this.cityList.forEach(element => {
        this.optionsCity = [...this.optionsCity, { label: element.cityApp, value: element.id }];
      })
    });
  }
  getCurrencyList() {
    this._companyProfileServ.getCurrencyList().subscribe((res: any) => {
      this.currencyList = res;
      this.currencyList.forEach(element => {
        this.optionsCurrencyList = [...this.optionsCurrencyList, { label: element.currencyName, value: element.currId }];
      })
    });
  }
  // get email() { return this.firstFormGroup.get('email'); }
  // get password() { return this.secondFormGroup.get('password'); }
  redirectApiPosting(url) {
    location.href = url;
  }
  onSubmit() {
    let data = Object.assign({}, { offer: { id: Number(this.id) } }, this.firstFormGroup.value, this.secondFormGroup.value);
    data['city'] = { id: data['city'] };
    data['prefferedLanguage'] = { id: data['prefferedLanguage'] };
    data['currency'] = { id: data['currency'] };
    data['gtwprovider'] = { id: data['gtwprovider']['id'] }
    // data['requestType'] = 'DEFAULT'
    this._companyProfileServ.postNewCompany(data).subscribe((res: any) => {
      this.redirectApiPosting(res.gtRequest);
    })
    // do something here
  }
  moveTo(tabNumber) {
    switch (tabNumber) {
      case 2:
        this.tab1 = false;
        this.tab3 = false;
        this.tab2 = true;
        break;
      case 3:
        this.tab2 = false;
        this.tab1 = false;
        this.tab3 = true;
        break;
      default:
        this.tab2 = false;
        this.tab3 = false;
        this.tab1 = true;
        break;
    }
  }
  get email() { return this.firstFormGroup.get('email'); }
  get firstName() { return this.firstFormGroup.get('firstName'); }
  get lastName() { return this.firstFormGroup.get('lastName'); }
  get mobileCC() { return this.firstFormGroup.get('mobileCC'); }
  get mobile() { return this.firstFormGroup.get('mobile'); }
  get companyName() { return this.firstFormGroup.get('companyName'); }
  get salesRecommendations() { return this.firstFormGroup.get('salesRecommendations'); }
  get clientType() { return this.firstFormGroup.get('clientType'); }
  get referralTxt() { return this.firstFormGroup.get('referralTxt'); }
  get postalCode() { return this.secondFormGroup.get('postalCode'); }
  get prefferedLanguage() { return this.firstFormGroup.get('prefferedLanguage'); }
  get city() { return this.firstFormGroup.get('city'); }
  get referralType() { return this.firstFormGroup.get('referralType'); }
  get prefferedCommCh() { return this.firstFormGroup.get('prefferedCommCh'); }
  get gtwprovider() { return this.secondFormGroup.get('gtwprovider'); }
  get currency() { return this.secondFormGroup.get('currency'); }
  get billingAddress() { return this.secondFormGroup.get('billingAddress'); }
  get state() { return this.secondFormGroup.get('state'); }
  get shippingAddress() { return this.secondFormGroup.get('shippingAddress'); }
  get shippingState() { return this.secondFormGroup.get('shippingState'); }
  get shippingPostalCode() { return this.secondFormGroup.get('shippingPostalCode'); }
  get paidAmount() { return this.secondFormGroup.get('paidAmount'); }
}
