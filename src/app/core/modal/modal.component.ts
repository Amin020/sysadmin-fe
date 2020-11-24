import { Component, OnInit } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  action = new Subject();

  constructor(public modalRef: MDBModalRef) { }

  ngOnInit(): void {
  }

  onYesClick() {
    this.action.next('yes');
  }

  onNoClick() {
    this.action.next('No');
  }
}
