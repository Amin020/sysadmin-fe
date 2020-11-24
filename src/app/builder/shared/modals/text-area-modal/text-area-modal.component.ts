import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';

import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-text-area-modal',
  templateUrl: './text-area-modal.component.html',
  styleUrls: ['./text-area-modal.component.scss']
})
export class TextAreaModalComponent implements OnInit {
  action: Subject<any> = new Subject();
  item: any;
  value: any;
  prop: any;
  constructor(public modalRef: MDBModalRef, private modalService: ModalService) { }

  ngOnInit() {
  }

  okAction(data) {
    this.modalService.okAction(this.action, this.modalRef, data);
  }
  applyAction(data) {
    this.action.next({ action: 'apply', value: data });
  }
  cancelAction() {
    this.modalService.cancelAction(this.modalRef);
  }
}
