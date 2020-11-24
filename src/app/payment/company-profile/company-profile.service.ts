import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import 'core-js/es7/reflect';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {
  private url = environment.baseUrl + '/public/';
  private privateUrl = environment.baseUrl + '/';
  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('basicauth'),
      'Content-Type': 'application/json',
      'responseType': 'text'
    })

  };
  private _nodeListModel = new BehaviorSubject(null);
  _nodeListModel$ = this._nodeListModel.asObservable();
  constructor(private http: HttpClient) { }

  updateNodeList(nodeList) {
    this._nodeListModel.next(nodeList);
  }
  getGateWayList() {
    return this.http.get(this.url + 'gtw/providers');
  }
  getLangList() {
    return this.http.get(this.url + 'languages');
  }
  getCityist() {
    return this.http.get(this.url + 'cities');
  }
  getCurrencyList() {
    return this.http.get(this.url + 'Currency');
  }
  getCountryList() {
    return this.http.get(this.privateUrl + 'countries/list', this.httpOptions);
  }
  postNewCompany(data) {
    return this.http.post(this.url + 'public/newSubs', data, this.httpOptions);
  }
  getCompany(id) {
    return this.http.get(this.privateUrl + `companies/profile`, this.httpOptions);
  }
  editCompany(body) {
    return this.http.patch(this.privateUrl + `companies/profile`, body, this.httpOptions);
  }
  getNodeChart(nodeId) {
    return this.http.get(this.url + `companies/charts/${nodeId}`);
  }
  editNode(nodeId, body) {
    return this.http.put(this.url + `companies/charts/${nodeId}`, body);
  }
  addNode(body) {
    return this.http.post(this.url + `companies/charts`, body);
  }
  deleteNode(nodeId) {
    return this.http.delete(this.url + `companies/charts/${nodeId}`);
  }
}
