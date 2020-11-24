import { Component, OnInit, Input , ViewChild } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';

import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-choices-by-url',
  templateUrl: './choices-by-url.component.html',
  styleUrls: ['./choices-by-url.component.scss']
})
export class ChoicesByUrlComponent implements OnInit {

  action: Subject<any> = new Subject();
  @ViewChild('choicesByUrl') choicesByUrl: any;
  constructor(public modalRef: MDBModalRef, private modalService: ModalService) { }
  item: any;
  value: any;
  question: any;
  // innerValue: {
  //     url: string,
  //     path: string,
  //     valueName: string,
  //     titleName: string
  // };
  ngOnInit() {
    console.log(this.value);
    console.log(this.question);
    // this.innerValue = {
    //   url: this.value.url,
    //   path: this.value.path,
    //   valueName: this.value.valueName,
    //   titleName: this.value.titleName
    // };
  // this.innerValue = JSON.parse(JSON.stringify(this.value));
  }

  okAction() {
    const innerValue = this.choicesByUrl.getValue();
    this.modalService.okAction(this.action, this.modalRef, innerValue);
  }
  applyAction() {
    const innerValue = this.choicesByUrl.getValue();
    this.action.next({ action: 'apply', value: innerValue });
  }
  cancelAction() {
    this.modalService.cancelAction(this.modalRef);
  }
}

