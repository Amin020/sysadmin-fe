import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SurveyManagementService {
  private baseUrl = environment.baseUrl;
  private surveysUrl = this.baseUrl + '/surveys';

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem('basicauth')
    })

  };
  constructor(private http: HttpClient) { }
  //   updateSurveyBody(body) {
  //     this._surveyBody.next(body);
  //   }
  retreiveSuerveyList(pageNo, pageSize, orderBy?, direction?) {
    orderBy = orderBy ? orderBy : `id`;
    direction = direction ? direction : `ASC`;
    return this.http.get(this.surveysUrl + `/page/?pageNo=${pageNo}&pageSize=${pageSize}&orderBy=${orderBy}&direction=${direction}`, this.httpOptions);
  }

  addNewSurvey(data) {
    return this.http.post(this.surveysUrl, data);
  }
  deleteSuervey(id: string) {
    return this.http.delete(this.surveysUrl + '/' + id);
  }
  getSurveyById(id: string) {
    return this.http.get(this.surveysUrl + '/' + id);
  }
  getSecuredSurvey(type, id) {
    return this.http.get(this.surveysUrl + `/${type}/practice/${id}`)
  }
  getSurveyResponse(id) {
    return this.http.get(this.baseUrl + `/response/survey/${id}`)
  }
  updateSurveyById(id: string, data) {
    return this.http.put(this.surveysUrl + '/' + id, data);
  }
  submitAnswer(body) {
    return this.http.post(this.baseUrl + '/response', body);
  }
}
