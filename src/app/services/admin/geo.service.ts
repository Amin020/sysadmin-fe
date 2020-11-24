import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SharedService } from 'src/app/services/shared.service';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegionsService {
  baseURL = this.ShardService.baseUrl;
  loggedUser = this.ShardService.loggedInUser;
  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  private refershCountriesSource = new BehaviorSubject<number>(0);
  private refershCitiesSource = new BehaviorSubject<number>(0);
  refreshRegionsList = this.refershSource.asObservable();
  refreshCountriessList = this.refershCountriesSource.asObservable();
  refreshCitiessList = this.refershCitiesSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  regionObject = {
    id: null,
    code: ''
  };

  constructor(
    private http: HttpClient,
    private ShardService: SharedService) {
  }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  getRegions() {
    return this.http.get(`${this.baseURL}/regions`);
  }

  refreshRegions(refresh: number) {
    this.refershSource.next(refresh);
  }

  getSelectedRegion(id) {
    return this.http.get(`${this.baseURL}/regions/${id}`);
  }

  getSelectedRegionCountries(id) {
    return this.http.get(`${this.baseURL}/regions/${id}/countries`);
  }

  getSelectedRegionDesc(id) {
    return this.http.get(`${this.baseURL}/regions/desc/${id}/all`);
  }

  addRegion(newRegion) {
    newRegion.editBy = this.loggedUser;
    return this.http.post(`${this.baseURL}/regions/`, newRegion, httpOptions);
  }

  deleteRegion(id) {
    return this.http.delete(`${this.baseURL}/regions/${id}`, httpOptions);
  }

  editRegion(selectedRegion) {
    return this.http.put(`${this.baseURL}/regions/${selectedRegion.id}`, selectedRegion, httpOptions);
  }

  getCountries() {
    return this.http.get(`${this.baseURL}/countries`);
  }

  getSelectedCountry(id) {
    return this.http.get(`${this.baseURL}/countries/${id}`);
  }

  refreshCountries(refresh: number) {
    this.refershSource.next(refresh);
  }

  addCountry(newCountry) {
    return this.http.post(`${this.baseURL}/countries`, newCountry, httpOptions);
  }

  editCountry(selectedCountry) {
    return this.http.put(`${this.baseURL}/countries/${selectedCountry.id}`, selectedCountry, httpOptions);
  }

  deleteCountry(id) {
    return this.http.delete(`${this.baseURL}/countries/${id}`, httpOptions);
  }


  getCities() {
    return this.http.get(`${this.baseURL}/cities`);
  }

  getSelectedCity(id) {
    return this.http.get(`${this.baseURL}/cities/${id}`);
  }

  addCity(newCity) {
    return this.http.post(`${this.baseURL}/cities`, newCity, httpOptions);
  }


  editCity(selectedCity) {
    return this.http.put(`${this.baseURL}/cities/${selectedCity.id}`, selectedCity, httpOptions);
  }

  deleteCity(id) {
    return this.http.delete(`${this.baseURL}/cities/${id}`, httpOptions);
  }

  refreshCountriesList(refresh: number) {
    this.refershCountriesSource.next(refresh);
  }

  refreshCitiesList(refresh: number) {
    this.refershCitiesSource.next(refresh);
  }
}
