import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionBankService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  addQuestionBank(body) {
    return this.http.post(this.baseUrl + '/qbank', body);
  }
}
