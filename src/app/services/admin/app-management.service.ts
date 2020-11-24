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
export class AppManagementService {
  baseURL = this.sharedService.baseUrl;
  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  refreshAppsList = this.refershSource.asObservable();
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }


  refreshApps(refresh: number) {
    this.refershSource.next(refresh);
  }

  // App services
  addApp(newApp) {
    return this.http.post(`${this.baseURL}/apps`, newApp, httpOptions);
  }

  editApp(selectedApp) {
    return this.http.put(`${this.baseURL}/apps/${selectedApp.id}`, selectedApp, httpOptions);
  }

  deleteApp(id) {
    return this.http.delete(`${this.baseURL}/apps/${id}`, httpOptions);
  }

  getAppByName(name) {
    return this.http.get(`${this.baseURL}/apps/${name}`);
  }

  getAppById(id) {
    return this.http.get(`${this.baseURL}/apps/${id}`);
  }

  getApps() {
    return this.http.get(`${this.baseURL}/apps/active`);
  }

  getAllAppChilds(id) {
    return this.http.get(`${this.baseURL}/apps/childs/${id}`);
  }

  // App Descrition sevices
  addAppDesc(newDesc: any, appId: any) {
    return this.http.post(`${this.baseURL}/apps/${appId}/desc`, newDesc, httpOptions);
  }

  editAppDesc(selectedDesc) {
    return this.http.put(`${this.baseURL}/apps/desc/${selectedDesc.id}`, selectedDesc, httpOptions);
  }

  deleteAppDesc(id) {
    return this.http.delete(`${this.baseURL}/apps/desc/${id}`, httpOptions);
  }

  getAppDesc(id) {
    return this.http.get(`${this.baseURL}/apps/desc/${id}/all`);
  }

  // App Version services
  addAppVersion(newVersion) {
    return this.http.post(`${this.baseURL}/apps/version`, newVersion, httpOptions);
  }

  editAppVersion(selectedVersion) {
    return this.http.put(`${this.baseURL}/apps/version/${selectedVersion.id}`, selectedVersion, httpOptions);
  }

  deleteAppVersion(id) {
    return this.http.delete(`${this.baseURL}/apps/version/${id}`, httpOptions);
  }

  getAppVersion(id) {
    return this.http.get(`${this.baseURL}/apps/version/${id}`);
  }

  // App UOM services
  addUOM(newUOM) {
    return this.http.post(`${this.baseURL}/uom`, newUOM, httpOptions);
  }

  editUOM(selectedUOM) {
    return this.http.put(`${this.baseURL}/uom/${selectedUOM.id}`, selectedUOM, httpOptions);
  }

  deleteAppUOM(id) {
    return this.http.delete(`${this.baseURL}/uom/${id}`, httpOptions);
  }

  getUOMs() {
    return this.http.get(`${this.baseURL}/uom`);
  }

  getSelectedUOM(id) {
    return this.http.get(`${this.baseURL}/uom/${id}`);
  }

  getAppUOMs(id) {
    return this.http.get(`${this.baseURL}/uom/app/active/${id}`);
  }

  // App Feature services
  addAppFeature(newFeature, appId) {
    return this.http.post(`${this.baseURL}/App-features/${appId}`, newFeature, httpOptions);
  }

  editAppFeature(selectedFeature) {
    return this.http.put(`${this.baseURL}/App-features/${selectedFeature.id}`, selectedFeature, httpOptions);
  }

  getAppFeatures() {
    return this.http.get(`${this.baseURL}/App-features`);
  }
}
