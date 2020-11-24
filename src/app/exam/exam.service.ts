import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Exam } from './models/exam-settings';

@Injectable({
  providedIn: 'root'
})
export class ExamService {

  exam: Exam;
  toggelSideMenuObservable: Observable<any>;
  toggelSideMenuSubject: Subject<any>;
  constructor() {
    this.toggelSideMenuSubject = new Subject();
    this.toggelSideMenuObservable = this.toggelSideMenuSubject.asObservable();
  }

  toggleSideMenu() {
    this.toggelSideMenuSubject.next();
  }

}
