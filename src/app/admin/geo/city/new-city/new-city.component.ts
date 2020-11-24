import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { SharedService } from 'src/app/services/shared.service';
import { CurrencyService } from 'src/app/services/admin/currency.service';
import { LoaderService } from 'src/app/core/loader.service';
@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.scss']
})
export class NewCityComponent implements OnInit {

  refreshLangList = 0;
  id: number;
  saveloading: boolean;
  countryArray: any;
  currencyArray: any;
  countryList: object[];
  currencyList: object[];
  city: any = {
    cityApp: '',
    country: {},
  };
  selectedCountry: string;
  selectedCurrency: string;

  constructor(
    private sharedService: SharedService,
    private regionsService: RegionsService,
    private currencyService: CurrencyService,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.regionsService.getCountries().subscribe(data => {
      this.mapCountryList(data);
      this.loaderService.isLoading.next(false);
    });
    this.currencyService.getcurrencies().subscribe(data => {
      this.mapCurrencyList(data);
      this.loaderService.isLoading.next(false);
    });
    // this.RegionsService.currentMessage.subscribe(id => (this.country.id = id));
  }

  mapCountryList(countries) {
    this.countryArray = countries;
    this.countryList = [];
    countries.forEach(country => {
      const countryItem: any = { value: country.id, label: country.nationalId };
      this.countryList.push(countryItem);
    });
  }

  getSelectedCountry(id) {
    this.selectedCountry = this.countryArray.find(o => o.id === id);
    this.city.country = this.selectedCountry;
  }

  mapCurrencyList(currencies) {
    this.currencyList = [];
    this.currencyArray = currencies;
    currencies.forEach(currency => {
      const currenciesObject = {
        value: currency.currId,
        label: currency.currencyName
      };
      this.currencyList.push(currenciesObject);
    });
  }

  getSelectedCurrency(id) {
    this.selectedCurrency = this.currencyArray.find(o => o.currId === id);
    this.city.sysCurrency = this.selectedCurrency;
  }

  saveCity() {
    this.saveloading = true;
    this.city.createdBy = this.sharedService.loggedInUser;
    this.city.editBy = this.sharedService.loggedInUser;
    this.regionsService.addCity(this.city).subscribe(data => {
      // this.countrys.push(data);
      this.regionsService.refreshCitiesList(1);
      this.saveloading = false;
      this.router.navigate(['/cities']);
    });
  }

  cancel() {
    this.router.navigate(['/cities']);
  }

}
