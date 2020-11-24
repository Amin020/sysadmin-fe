import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoaderService } from '../core/loader.service';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpInterceptorService implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];
  constructor(private router: Router, private toastr: ToastrService, private loaderService: LoaderService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method == "GET" && !req.url.includes('.json') && req.url.includes('api/v1') && !location.pathname.includes('company-profile') && !req.url.includes('apps/type?type=APP')) {
      this.requests.push(req);
      this.loaderService.isLoading.next(true);
    }
    if (localStorage.getItem('SignedInEmail') && localStorage.getItem('basicauth')) {
      if (req.url.includes('http') && !req.url.includes('preferredLang') && req.method !== 'PUT' && req.method !== 'POST' && req.method !== 'PATCH' && req.method !== 'DELETE') {
        const lang = JSON.parse(localStorage.getItem('currentLang'));
        let requ: string;
        if (req.url.includes('?')) requ = req.url + '&'
        else {
          requ = req.url + '?'
        }
        const httpRequest = new HttpRequest(<any>req.method, requ + `lang=${lang}`);
        req = Object.assign(req, httpRequest);
      }
      let header = req.headers.set('Authorization', localStorage.getItem('basicauth'));
      header = header.set('Content-Type', 'application/json');
      header = header.set('Accept', 'application/json')
      req = req.clone(
        { headers: header }
      );

    } else {
      if (location.pathname.includes('company-profile') && req.method == 'POST') {
      } else {
        let requ: string;
        requ = req.url.replace('v1/', 'v1/public/');
        const lang = JSON.parse(localStorage.getItem('currentLang'));
        const httpRequest = new HttpRequest(<any>req.method, requ);
        req = Object.assign(req, httpRequest);
      }
    }
    const _this = this;
    return next.handle(req).pipe(
      map((res: any) => {
        this.removeRequest(req);
        if (res['ok']) {
          if (req.method == 'POST') {
            _this.toastr.success('New Item has been created successfully', 'Added');
          } else if (req.method == 'PUT' || req.method == "PATCH") {
            _this.toastr.success('Updated successfully', 'Updated');
          } else if (req.method == 'DELETE') {
            _this.toastr.success('Deleted successfully', 'Deleted');
          }
        }
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.status === 401 && !req.url.includes('authentic/verify')) {
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('basicauth');
          localStorage.removeItem('userData');
          localStorage.removeItem('SignedInEmail');
          _this.router.navigateByUrl('/login');
        } else if (error.status === 400) {
          if (typeof error.error.debugMessage === 'string') {
            this.toastr.error(error.error.debugMessage, 'Error Message: ');
          } else {
            for (const key in error.error.message) {
              if (error.error.message.hasOwnProperty(key)) {
                // _this.toastr.show(error.error.message[key], 'danger');
              }
            }
          }
        } else {
          this.toastr.error(error.error.message);
        }
        // _this.toastr.show(error.error.message, 'danger');
        if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.error.message}`;
        }
        this.removeRequest(req);
        return throwError(errorMessage);
      })
    );
  }
  removeRequest(req: HttpRequest<any>) {
    let x = 0;
    for (let i = 0; i < this.requests.length; i++) {
      const element = this.requests[i];
      if (element.url == req.url) {
        x = i;
        this.requests.splice(x, 1);
      }
    }
  }
}
