import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class LicenseOffersService {

  private offersUrl = environment.baseUrl + '/offer';

  constructor(private http: HttpClient) { }

  getOffers() {
    return this.http.get(this.offersUrl, httpOptions);
  }

  deleteOffer(id: number) {
    return this.http.delete(this.offersUrl + '/' + id, httpOptions);
  }

  addOffer(data) {
    return this.http.post(this.offersUrl, data, httpOptions);
  }

  duplicateOffer(offer: any) {
    const requestBody = Object.assign({}, offer);
    requestBody.offerDescription += '-copy';
    return this.http.post(this.offersUrl, requestBody, httpOptions);
  }

  getselectedOffer(id: number) {
    return this.http.get(this.offersUrl + '/' + id, httpOptions);
  }

  updateOffer(id: number, offerData: object) {
    return this.http.put(this.offersUrl + '/' + id, offerData, httpOptions);
  }

}
