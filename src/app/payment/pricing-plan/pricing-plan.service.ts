import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import 'core-js/es7/reflect';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PricingPlanService {
  private url = environment.baseUrl + '/public/';
  constructor(private http: HttpClient) { }

  getPricingPlan(id) {
    return this.http.get(this.url + `offer/active/app/${id}`);
  }
}
