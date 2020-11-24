import { Component, OnInit, ViewChild } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { ModalService } from '../../services/modal/modal.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-general-edit',
  templateUrl: './general-edit.component.html',
  styleUrls: ['./general-edit.component.scss']
})
export class GeneralEditComponent implements OnInit {
  item;
  action: Subject<any> = new Subject();
  editOptions: any;
  question: any;
  initGeneralOptions: { name: string, value: any }[] = [];
  initExtraChoicesOptions: { prop: string, value: [] }[];
  @ViewChild('multipleEdit') multipleEdit: any;

  constructor(public modalRef: MDBModalRef, private modalService: ModalService) { }

  ngOnInit() {
    // load general item values
    this.loadGeneralOptionValues();

    this.generateLatestExtraChoicesOpts();
    this.getLatestGeneralOptions();
  }

  okAction() {
    this.getLatestGeneralOptions();
    this.generateLatestExtraChoicesOpts();

    this.modalService.okAction(this.action, this.modalRef, this.multipleEdit.reCallValue());
  }
  applyAction() {
    this.getLatestGeneralOptions();
    this.generateLatestExtraChoicesOpts();

    this.modalService.applyAction(this.action, this.multipleEdit.reCallValue());
  }
  cancelAction() {
    this.editOptions.filter((option, index) => {
      if (option.type === 'general') {
        // option.value = this.initGeneralOptions;
        option.value = this.getCoressGeneralOption(option.displayName).value;
      } else if (option.type === 'choicesCreation' && option.extraItems) {
        this.initExtraChoicesOptions.filter(choice => {
          if (choice.prop === option.prop) {
            option.extraItems = choice.value;
          }
        });
      }
    });
    this.modalService.cancelAction(this.modalRef);
  }

  loadGeneralOptionValues() {
    this.editOptions.filter((option, index) => {
      if (option.type === 'general') {
        option.value.filter(optionValue => {
          optionValue.value = this.question[optionValue.prop];
        });
        // option.value = this.question[option.value.prop];
      } else {
        option.value = this.question[option.prop];
      }
    });
  }
  getCoressGeneralOption(name) {
    let option;
    this.initGeneralOptions.filter(innerOption => {
      if (innerOption.name === name) {
        option = innerOption;
      }
    });
    return option;
  }



  getLatestGeneralOptions() {
    this.initGeneralOptions = [];
    this.editOptions.filter((option, index) => {
      if (option.type === 'general') {
        // if(option.value){
        //   this.initGeneralOptions.push({ name: option.displayName, value: JSON.parse(JSON.stringify(option.value)) });
        // } else {
        //   this.initGeneralOptions.push({ name: option.displayName, value: {} });
        // }
        this.initGeneralOptions.push({ name: option.displayName, value: JSON.parse(JSON.stringify(option.value)) });
        // this.initGeneralOptions = JSON.parse(JSON.stringify(option.value));
      }
    });
  }

  generateLatestExtraChoicesOpts() {
    this.initExtraChoicesOptions = [];
    this.editOptions.filter((option, index) => {
      if (option.type === 'choicesCreation' && option.extraItems) {
        if (this.checkExistance(this.initExtraChoicesOptions, option.prop) === undefined) {
          this.initExtraChoicesOptions.push({
            prop: option.prop,
            value: JSON.parse(JSON.stringify(option.extraItems))
          });
        }
      }
    });
  }

  checkExistance(array, item) {
    let index;
    array.filter((innerItem, i) => {
      if (innerItem.prop === item.prop) {
        index = i;
      }
    });
    console.log(index);
    return index;
  }
}
