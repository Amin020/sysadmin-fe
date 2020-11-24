import { Component, OnInit, ViewChild} from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';

import { ModalService } from '../../services/modal/modal.service';


@Component({
  selector: 'app-validator-modal',
  templateUrl: './validator-modal.component.html',
  styleUrls: ['./validator-modal.component.scss']
})
export class ValidatorModalComponent implements OnInit {

  action: Subject<any> = new Subject();
  item: any;
  value: any;
  question: any;
  prop: string;

  @ViewChild('validatorComp') validatorComp: any;

  constructor( public modalRef: MDBModalRef, public eqModalRef: MDBModalRef,
     private modalService: ModalService) { }

  ngOnInit() {
  }

  okAction() {
    const data = this.validatorComp.constructValidatorArray();
    this.modalService.okAction(this.action, this.modalRef, data);
  }
  applyAction() {
    const data = this.validatorComp.constructValidatorArray();
    this.action.next({ action: 'apply', value: data });
  }
  cancelAction() {
    this.modalService.cancelAction(this.modalRef);
  }

}
