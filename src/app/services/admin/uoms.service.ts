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

export class UOMsService {
  baseURL = this.sharedService.baseUrl;
  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  refreshUOMsList = this.refershSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  id: number;
  uomObject = {
    id: this.id,
    uomId: '',
    uomDesc: '',
    uomISO: ''
  };

  constructor(private http: HttpClient, private sharedService: SharedService) {}

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  getApps() {
    return this.http.get(`${this.baseURL}/apps/all`);
  }

  getUOMs() {
    return this.http.get(`${this.baseURL}/uom`);
  }

  refreshUOMs(refresh: number) {
    this.refershSource.next(refresh);
  }

  getSelectedUOM(id) {
    return this.http.get(`${this.baseURL}/uom/${id}`);
  }

  addUOM(newUOM) {
    return this.http.post(`${this.baseURL}/uom`, newUOM, httpOptions);
  }

  editUOM(selectedUOM) {
    return this.http.put(`${this.baseURL}/uom/${selectedUOM.id}`, selectedUOM, httpOptions);
  }

  deleteUOM(id) {
    return this.http.delete(`${this.baseURL}/uom/${id}`, httpOptions);
  }
}
