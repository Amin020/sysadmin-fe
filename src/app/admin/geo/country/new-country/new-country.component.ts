import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { SharedService } from 'src/app/services/shared.service';
import { CurrencyService } from 'src/app/services/admin/currency.service';
@Component({
  selector: 'app-new-country',
  templateUrl: './new-country.component.html',
  styleUrls: ['./new-country.component.scss']
})
export class NewCountryComponent implements OnInit {
  refreshLangList = 0;
  selectedRegion; selectedCurrency;
  id: number;
  saveloading: Boolean = false;
  regionsArray: any;
  currencyArray: any;
  regionsList: object[];
  currencyList: object[];
  country: any = {
    createdBy: '',
    editBy: '',
    sysCurrency: {},
    region: {},
    nationalId: '',
    phoneKey: ''
  };
  constructor(
    private SharedService: SharedService,
    private RegionsService: RegionsService,
    private CurrencyService: CurrencyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    console.log(this.country);
    this.RegionsService.getRegions().subscribe(data =>
      this.getRegionsList(data)
    );
    this.CurrencyService.getcurrencies().subscribe(data =>
      this.getCurrencyList(data)
    );
    //this.RegionsService.currentMessage.subscribe(id => (this.country.id = id));
  }

  getRegionsList(regions) {
    this.regionsArray = regions;
    this.regionsList = [];
    regions.forEach(region => {
      const regionItem: any = { value: region.id, label: region.code };
      this.regionsList.push(regionItem);
    });
  }

  getSelectedRegion(id) {
    this.selectedRegion = this.regionsArray.find(o => o.id === id);
    this.country.region = this.selectedRegion;
  }

  getCurrencyList(currencies) {
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
    this.country.sysCurrency = this.selectedCurrency;
  }

  saveCountry() {
    this.saveloading = true;
    this.country.createdBy = this.SharedService.loggedInUser;
    this.country.editBy = this.SharedService.loggedInUser;
    this.RegionsService.addCountry(this.country).subscribe(data => {
      //this.countrys.push(data);
      this.RegionsService.refreshCountries(1);
      this.saveloading = false;
      this.router.navigate(['/countries']);
    }, error => {
      this.saveloading = false;
    });
  }

  cancel() {
    this.router.navigate(['/countries']);
  }

}
