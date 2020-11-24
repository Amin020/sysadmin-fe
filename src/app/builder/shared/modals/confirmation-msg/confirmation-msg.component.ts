import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';

@Component({
  selector: 'app-confirmation-msg',
  templateUrl: './confirmation-msg.component.html',
  styleUrls: ['./confirmation-msg.component.scss']
})
export class ConfirmationMsgComponent implements OnInit {
  public onClose: Subject<boolean>;
  confirmationReturn;
  constructor(private modalService: MDBModalService, public modalRef: MDBModalRef) { }


  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public onConfirm(): void {
    this.onClose.next(true);
    this.modalRef.hide();
  }

  public onCancel(): void {
    this.onClose.next(false);
    this.modalRef.hide();
  }
}
