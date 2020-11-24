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

export class LanguagesService {
  private messageSource = new BehaviorSubject<number>(0);
  private refershSource = new BehaviorSubject<number>(0);
  refreshLanguagesList = this.refershSource.asObservable();
  currentMessage = this.messageSource.asObservable();
  baseURL = this.ShardService.baseUrl;
  languageObject = {

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

  refreshLanguages(refresh: number) {
    this.refershSource.next(refresh);
  }
  getLanguages() {
    return this.http.get(`${this.baseURL}/languages`);
  }

  getSelectedLanguage(id) {
    return this.http.get(`${this.baseURL}/languages/${id}`);
  }

  addLanguage(newLanguage) {
    return this.http.post(`${this.baseURL}/languages`, newLanguage, httpOptions);
  }

  deleteLanguage(id) {
    return this.http.delete(`${this.baseURL}/languages/${id}`, httpOptions);
  }

  editLanguage(selectedLanguage) {
    this.languageObject.id = selectedLanguage.id;
    this.languageObject.aprv = selectedLanguage.aprv;
    this.languageObject.name = selectedLanguage.name;
    this.languageObject.nativeName = selectedLanguage.nativeName;
    this.languageObject.isRTL = selectedLanguage.isRTL;
    return this.http.put(`${this.baseURL}/languages/${selectedLanguage.id}`, this.languageObject, httpOptions);
  }

}
