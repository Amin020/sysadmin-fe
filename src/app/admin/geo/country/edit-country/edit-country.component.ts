import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { CurrencyService } from 'src/app/services/admin/currency.service';

@Component({
  selector: 'app-edit-country',
  templateUrl: './edit-country.component.html',
  styleUrls: ['./edit-country.component.scss']
})
export class EditCountryComponent implements OnInit {

  refreshLangList = 0;
  selectedCountry: any;
  id: number;
  saveloading: boolean;
  regionsArray: any;
  currencyArray: any;
  regionsList: object[];
  currencyList: object[];

  constructor(
    private regionsService: RegionsService,
    private currencyService: CurrencyService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.getSelectedCountry(params['id'])
    );
    this.regionsService.getRegions().subscribe(data =>
      this.getRegionsList(data)
    );
    this.currencyService.getcurrencies().subscribe(data =>
      this.getCurrencyList(data)
    );
  }

  getRegionsList(regions) {
    this.regionsArray = regions;
    this.regionsList = [];
    regions.forEach(region => {
      const regionItem: any = { value: region.id, label: region.code };
      this.regionsList.push(regionItem);
    });
  }

  getSelectedCountry(id) {
    this.regionsService.getSelectedCountry(id).subscribe(data => {
      this.selectedCountry = data;
    });
  }

  getSelectedRegion(id) {
    const selectedRegion = this.regionsArray.find(o => o.id === id);
    this.selectedCountry.region = selectedRegion;
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
    const selectedCurrency = this.currencyArray.find(o => o.currId === id);
    this.selectedCountry.sysCurrency = selectedCurrency;
  }

  saveCountry() {
    this.saveloading = true;
    this.selectedCountry.editBy = 'Haitham';
    delete this.selectedCountry.editDate;
    delete this.selectedCountry.createdDate;
    this.regionsService.editCountry(this.selectedCountry).subscribe(data => {
      this.regionsService.refreshCountries(1);
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
