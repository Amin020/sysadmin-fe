import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
// import { moveItemInList } from 'mdb-sortable';
// import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Subject } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import { BuilderService } from '../../services/builder/builder.service';


@Component({
  selector: 'app-choices-creation',
  templateUrl: './choices-creation.component.html',
  styleUrls: ['./choices-creation.component.scss']
})
export class ChoicesCreationComponent implements OnInit {
  item: any;
  value: any;
  question: any;
  action: Subject<any> = new Subject();
  prop: any;
  @ViewChild('choicesCreation') choicesCreation: any;
  constructor(public modalRef: MDBModalRef, private modalService: ModalService, private builderServ: BuilderService) { }

  ngOnInit() {
  }

  okAction() {
    const choices = this.choicesCreation.getChoices();
    // if (this.choicesCreation.getView() === 'fastEntry') {
    //   choices = this.choicesCreation.transformChoices();
    // } else if (this.choicesCreation.getEditView() === 'editItems') {
    //   choices = this.choicesCreation.handleEditedItems();
    // } else {
    //   choices = this.choicesCreation.getChoices();
    // }
    this.question.columns = choices;
    localStorage.setItem('surveyArray', JSON.stringify(this.question.data.toJSON()));
    this.modalService.cancelAction(this.modalRef);
    // this.builderServ.saveSurveyArray(null,null,question)
    // this.modalService.okAction(this.action, this.modalRef, choices, this.prop, this.question);
  }
  applyAction() {
    const choices = this.choicesCreation.getChoices();
    // if (this.choicesCreation.getView() === 'fastEntry') {
    //   choices = this.choicesCreation.transformChoices();
    // } else if (this.choicesCreation.getEditView() === 'editItems') {
    //   choices = this.choicesCreation.handleEditedItems();
    // } else {
    //   choices = this.choicesCreation.getChoices();
    // }
    // this.choicesCreation.checkConditions();
    this.modalService.applyAction(this.action, choices);
    this.builderServ.saveSurveyArray();
  }
  cancelAction() {
    this.modalService.cancelAction(this.modalRef);
  }


}
