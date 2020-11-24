import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PreferencesService {



  private url = environment.baseUrl + '/preferences/';

  // url = 'http://178.128.33.193:8080/api/swagger-ui.html#/x-user-preferences-resource';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Credentials': 'true'
    })

  };
  constructor(private http: HttpClient) { }

  sendUserPreferences(data) {
    return this.http.post(this.url, data, this.httpOptions);
  }

  retrieveUserPreferences(userID: string) {
    const url = this.url + userID;
    return this.http.get(url);
  }
  updateXUserPreferences(data, id) {
    const url = this.url + 'user/' + id;
    return this.http.put(url, data, this.httpOptions);
  }

  findUserPreferencesByUser(user: number) {
    const url = this.url + 'user/' + user;
    return this.http.get(url);
  }
}
