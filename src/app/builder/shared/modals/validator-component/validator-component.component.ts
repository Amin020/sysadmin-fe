import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';

import { EquationModalComponent } from '../equation-modal/equation-modal.component';
import { ModalService } from '../../services/modal/modal.service';


@Component({
  selector: 'app-validator-component',
  templateUrl: './validator-component.component.html',
  styleUrls: ['./validator-component.component.scss']
})
export class ValidatorComponentComponent implements OnInit {

  options: { name: string, type: string }[] = [{
    name: 'numeric',
    type: 'numeric'
  }, {
    name: 'text',
    type: 'text'
  }, {
    name: 'answer count',
    type: 'answerCount'
  }, {
    name: 'regex',
    type: 'regex'
  }, {
    name: 'e-mail',
    type: 'email'
  }, {
    name: 'expression',
    type: 'expression'
  }];
  showOptions = false;
  selectedOptions: {
    id: number,
    name: string,
    type: string,
    text?: string, // in case of numeric/text/answercount/regex/email/expression
    minValue?: number, // in case of numeric
    maxValue?: number, // in case of numeric
    minLength?: number, // in case of text
    maxLength?: number, // in case of text
    allowDigits?: boolean // in case of text
    minCount?: number, // in case of answercount
    maxCount?: number, // in case of answercount
    regex?: string, // in case of regex
    expression?: string // in case of expression
  }[] = [];
  selectedOption: {
    id: number,
    name: string,
    type: string,
    text?: string, // in case of numeric/text/answercount/regex/email/expression
    minValue?: number, // in case of numeric
    maxValue?: number, // in case of numeric
    minLength?: number, // in case of text
    maxLength?: number, // in case of text
    allowDigits?: boolean // in case of text
    minCount?: number, // in case of answercount
    maxCount?: number, // in case of answercount
    regex?: string, // in case of regex
    expression?: string // in case of expression
  };
  selectedOptionId: number;
  @Input() value: {
    type: string,
    text?: string, // in case of numeric/text/answercount/regex/email/expression
    minValue?: number, // in case of numeric
    maxValue?: number, // in case of numeric
    minLength?: number, // in case of text
    maxLength?: number, // in case of text
    allowDigits?: boolean // in case of text
    minCount?: number, // in case of answercount
    maxCount?: number, // in case of answercount
    regex?: string, // in case of regex
    expression?: string // in case of expression
  }[];
  @Input() question: any;
  @Input() prop: string;

  constructor(public modalRef: MDBModalRef, public eqModalRef: MDBModalRef, private modalService: ModalService,
    private baseModalService: MDBModalService) {
  }

  ngOnInit() {
    console.log(this.value);
    console.log(this.question);
    if (this.value) {
      this.value.filter(res => {
        this.selectedOptions.push({
          id: this.selectedOptions.length,
          name: res.type,
          type: res.type,
          text: res.text,
          minValue: res.minValue,
          maxValue: res.maxValue,
          minLength: res.minLength,
          maxLength: res.maxLength,
          allowDigits: res.allowDigits,
          minCount: res.minCount,
          maxCount: res.maxCount,
          regex: res.regex,
          expression: res.expression
        });
      });
      this.selectedOption = this.selectedOptions[this.selectedOptions.length - 1];
      this.selectedOptionId = this.selectedOptions.length - 1;
    }
  }

  addOption(option) {
    this.selectedOptions.push(JSON.parse(JSON.stringify(option)));
    this.selectedOptions[this.selectedOptions.length - 1].id = this.selectedOptions.length - 1;
    this.selectedOptionId = this.selectedOptions.length - 1;
    this.selectedOption = this.selectedOptions[this.selectedOptions.length - 1];
    this.showOptions = false;

    console.log('option added');
    console.log(this.selectedOptions);

  }
  deleteOption() {

    if (this.selectedOptionId + 1 < this.selectedOptions.length) {
      this.selectedOption = this.selectedOptions[this.selectedOptionId + 1];
    } else if (this.selectedOptionId - 1 >= 0) {
      this.selectedOption = this.selectedOptions[this.selectedOptionId - 1];
    } else {
      this.selectedOption = {
        id: -1,
        name: '',
        type: '',
        text: '',
        minValue: 0,
        maxValue: 0,
        minLength: 0,
        maxLength: 0,
        allowDigits: true,
        minCount: 0,
        maxCount: 0,
        regex: '',
        expression: ''
      };
    }
    this.selectedOptions.splice(this.selectedOptionId, 1);
    this.selectedOptionId = this.selectedOption.id;


  }
  reSelect() {
    this.selectedOptionId = this.selectedOption.id;
  }
  public constructValidatorArray() {
    const selectedOptionsCopy = JSON.parse(JSON.stringify(this.selectedOptions));
    selectedOptionsCopy.filter(res => {
      for (const property in res) {
        if (res.hasOwnProperty(property)) {
          if ((res[property] !== undefined || res[property] === 0) && property !== 'name' && property !== 'id') {

          } else {
            delete res[property];
          }
        }
      }
    });
    return selectedOptionsCopy;
  }

  openModal() {
    const item = this.question;
    item['displayName'] = 'expression';
    this.eqModalRef = this.baseModalService.show(EquationModalComponent, {
      data: {
        // item: { displayName:  },
        value: this.selectedOptions[this.selectedOptionId].expression,
        showfirst: true,
        question: this.question,
        item: item,
        prop: this.prop
      }
    });

    if (this.eqModalRef && this.eqModalRef.content && this.eqModalRef.content.action) {
      this.eqModalRef.content.action.subscribe((result: any) => {
        if (result.action === 'ok' || result.action === 'apply') {
          this.selectedOptions[this.selectedOptionId].expression = result.value;
        }
      });
    }
  }

  getValue() {
    return this.constructValidatorArray();
  }

}
