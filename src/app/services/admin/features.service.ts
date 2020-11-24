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
export class FeaturesService {
  baseURL = this.sharedService.baseUrl;
  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  refreshFeaturesList = this.refershSource.asObservable();
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  refreshFeatures(refresh: number) {
    this.refershSource.next(refresh);
  }

  // Features services
  getFeatures() {
    return this.http.get(`${this.baseURL}/features/active`);
  }

  addFeature(newFeature) {
    return this.http.post(`${this.baseURL}/features`, newFeature, httpOptions);
  }

  // Edit Feature by id
  getSelectedFeature(id) {
    return this.http.get(`${this.baseURL}/features/${id}`);
  }

  editFeature(selectedFeature) {
    return this.http.put(`${this.baseURL}/features/${selectedFeature.id}`, selectedFeature, httpOptions);
  }

  deleteFeature(id) {
    return this.http.delete(`${this.baseURL}/features/${id}`, httpOptions);
  }

  // get Active UOMs
  getActiveUOMs() {
    return this.http.get(`${this.baseURL}/uom/general`);
  }
}
