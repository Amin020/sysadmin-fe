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
export class RegiondescService {
  baseURL = this.ShardService.baseUrl;
  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  refreshRegionsList = this.refershSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  regionObject = {
    id: null,
    regionDesc: '',
    regionId: {
      id: ''
    },
    langId: {
      id: ''
    }
  };
  constructor(private http: HttpClient, private ShardService: SharedService) {
  }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  getRegionsdesc() {
    return this.http.get(`${this.baseURL}/regionDesc`);
  }

  refreshRegionsdesc(refresh: number) {
    this.refershSource.next(refresh);
  }

  getSelectedRegionsdesc(id) {
    return this.http.get(`${this.baseURL}/regionDesc/${id}`);
  }

  addRegionsdesc(newRegion) {
    return this.http.post(`${this.baseURL}/regionDesc`, newRegion, httpOptions);
  }

  deleteRegionsdesc(id) {
    return this.http.delete(`${this.baseURL}/regionDesc/${id}`, httpOptions);
  }

  editRegionsdesc(selectedRegion) {
    this.regionObject.id = selectedRegion.id;
    this.regionObject.regionDesc = selectedRegion.regionDesc;
    this.regionObject.regionId = selectedRegion.regionId;
    this.regionObject.langId = selectedRegion.langId;

    return this.http.put(`${this.baseURL}/regionDesc/${selectedRegion.id}`, this.regionObject, httpOptions);
  }

}
