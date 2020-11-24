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
  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  refreshRegionsList = this.refershSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  regionObject = {
    id: null,
    code: ''
  };
  constructor(private http: HttpClient, private ShardService: SharedService) {
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

  addRegion(newRegion) {
    return this.http.post(`${this.baseURL}/regions`, newRegion, httpOptions);
  }

  deleteRegion(id) {
    return this.http.delete(`${this.baseURL}/regions/${id}`, httpOptions);
  }

  editRegion(selectedRegion) {
    this.regionObject.id = selectedRegion.id;
    this.regionObject.code = selectedRegion.code;
    return this.http.put(`${this.baseURL}/regions/${selectedRegion.id}`, this.regionObject, httpOptions);
  }

}
