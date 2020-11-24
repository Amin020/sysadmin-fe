import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import equationQuestionOperators from '../../data/modals-data/equation-question-operators';


@Component({
  selector: 'app-equation-modal',
  templateUrl: './equation-modal.component.html',
  styleUrls: ['./equation-modal.component.scss']
})
export class EquationModalComponent implements OnInit {

  prop: any;
  value: any;
  question: any;
  item: any;

  action: Subject<any> = new Subject();

  showfirst = false;

  constructor(public modalRef: MDBModalRef, private modalService: ModalService) { }

  ngOnInit() {
  }

  editItem(data) {
    this.value = data;
  }
  okAction() {
    this.modalService.okAction(this.action, this.modalRef, this.value);
  }
  applyAction() {
    this.modalService.applyAction(this.action, this.value);
  }
  cancelAction() {
    this.modalService.cancelAction(this.modalRef);
  }
}
