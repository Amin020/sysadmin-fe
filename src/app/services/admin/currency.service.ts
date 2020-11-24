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
export class CurrencyService {

  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  refreshLanguagesList = this.refershSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  baseURL = this.ShardService.baseUrl;
  currencyObject = {
    editBy: 'MNABILII',
    currId: 1,
    currencyName: 'UAE dirham',
    symbol: 'u062f.u0625;',
    currencyAppr: 'AED',
    defualtCurr: 0,
    createdDate: '2019-05-29T13:34:00.000',
    editDate: '2019-05-29T13:34:00.000'
  };
  constructor(private http: HttpClient, private ShardService: SharedService) {
  }

  changeMessage(message: number) {
    this.messageSource.next(message);
  }

  refreshCurrencies(refresh: number) {
    this.refershSource.next(refresh);
  }
  getcurrencies() {
    return this.http.get(`${this.baseURL}/Currency`);
  }

  getSelectedCurrency(id) {
    return this.http.get(`${this.baseURL}/Currency/${id}`);
  }

  addCurrency(newCurrency) {
    return this.http.post(`${this.baseURL}/Currency`, newCurrency, httpOptions);
  }

  deleteCurrency(id) {
    return this.http.delete(`${this.baseURL}/Currency/${id}`, httpOptions);
  }

  editCurrency(selectedCurrency) {
    return this.http.put(`${this.baseURL}/Currency/${selectedCurrency.currId}`, selectedCurrency, httpOptions);
  }

}
