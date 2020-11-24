import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import 'core-js/es7/reflect';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {
  private url = environment.baseUrl + '/public/';
  constructor(private http: HttpClient) { }

  getProductsList() {
    return this.http.get(this.url + "apps/type?type=APP");
  }
}
