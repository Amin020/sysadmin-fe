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

export class AppBundleService {


  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  refreshLanguagesList = this.refershSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  baseURL = this.ShardService.baseUrl;
  bundleObject = {

    id: null,
    aprv: '',
    name: '',
    nativeName: '',
    isRTL: false,
    editBy: 'hh',
    createdDate: '2019-05-29T13:34:00.000',
    editDate: '2019-05-29T13:34:00.000'
  };
  constructor(private http: HttpClient, private ShardService: SharedService) {
  }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  refreshBundles(refresh: number) {
    this.refershSource.next(refresh);
  }
  getBundels() {
    return this.http.get(`${this.baseURL}/bundle`);
  }

  getSelectedBundle(id) {
    return this.http.get(`${this.baseURL}/bundle/${id}`);
  }

  addBundle(newBundle) {
    return this.http.post(`${this.baseURL}/bundle`, newBundle, httpOptions);
  }

  deleteBundle(id) {
    return this.http.delete(`${this.baseURL}/bundle/${id}`, httpOptions);
  }

  editBundle(selectedBundle) {
    console.log(selectedBundle);
    this.bundleObject.id = selectedBundle.id;
    this.bundleObject.name = selectedBundle.name;
    return this.http.put(`${this.baseURL}/bundle/${selectedBundle.id}`, selectedBundle, httpOptions);
  }

}
