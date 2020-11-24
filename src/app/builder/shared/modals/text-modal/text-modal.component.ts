import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';

import { ModalService } from '../../services/modal/modal.service';

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.scss']
})
export class TextModalComponent implements OnInit {
  action: Subject<any> = new Subject();
  item: any;
  value: any;
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
