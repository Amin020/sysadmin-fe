import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { SharedService } from 'src/app/services/shared.service';
import { CurrencyService } from 'src/app/services/admin/currency.service';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.scss']
})
export class EditCityComponent implements OnInit {

  refreshLangList = 0;
  selectedCity: any;
  id: number;
  saveloading: Boolean = false;
  countryArray: any;
  countryList: any;
  selectedCountry: any;
  constructor(
    private SharedService: SharedService,
    private RegionsService: RegionsService,
    private route: ActivatedRoute,
    private router: Router  , private loaderSerivce: LoaderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.getSelectedCity(params['id'])
    );

    this.RegionsService.getCountries().subscribe(data =>
      this.getCountryList(data)
    );
  }

  getCountryList(countries) {
    this.countryArray = countries;
    this.countryList = [];
    countries.forEach(country => {
      const countryItem: any = { value: country.id, label: country.nationalId };
      this.countryList.push(countryItem);
    });
  }

  getSelectedCity(id) {
    this.RegionsService.getSelectedCity(id).subscribe(data => {
      this.selectedCity = data;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  getSelectedCountry(id) {
    this.selectedCountry = this.countryArray.find(o => o.id === id);

  }


  saveCity() {
    this.saveloading = true;
    this.selectedCity.editBy = 'Haitham';
    delete this.selectedCity.editDate;
    delete this.selectedCity.createdDate;
    console.log(this.selectedCountry);
    this.RegionsService.editCity(this.selectedCity).subscribe(data => {
      this.RegionsService.refreshCitiesList(1);
      this.saveloading = false;
      this.router.navigate(['/cities']);

    });
  }

  cancel() {
    this.router.navigate(['/cities']);
  }
}
