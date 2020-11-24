
import * as Survey from 'survey-angular';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Subject } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';


@Component({
  selector: 'app-choices-creation-component',
  templateUrl: './choices-creation-component.component.html',
  styleUrls: ['./choices-creation-component.component.scss']
})
export class ChoicesCreationComponentComponent implements OnInit {


  @ViewChild('multipleEdit') multipleEdit: any;
  @Input() value: any;
  @Input() question: any;
  @Input() prop: string;

  @Input() extraItems: {
    prop: string,
    displayName: string,
    type: string,
    value: string,
  };


  choices: any;
  type: string;
  item: any;
  action: Subject<any> = new Subject();
  activeView = 'formEntry'; // || 'fastEntry'
  fastEntryData: any;
  showHeader = true;
  editView = 'showItems';
  activeItem: any;
  editOptions: {
    prop: string,
    type: string,
    value: any,
    displayName: string
  }[];
  editedItems: {
    prop: string,
    type: string,
    value: any,
    displayName: string
  }[];

  showColType = 'default';
  colTypes = [{
    value: 'default',
    displayName: 'Default'
  }, {
    value: 'dropdown',
    displayName: 'DropDown'
  },
  {
    value: 'checkbox',
    displayName: 'Checkbox'
  }, {
    value: 'radiogroup',
    displayName: 'RadioGroup'
  }, {
    value: 'text',
    displayName: 'Single Input'
  }, {
    value: 'comment',
    displayName: 'Comment'
  }, {
    value: 'boolean',
    displayName: 'Boolean'
  }, {
    value: 'expression',
    displayName: 'Expression'
  }];

  constructor(public modalRef: MDBModalRef, private modalService: ModalService) { }

  ngOnInit() {
    console.log('choices creation modal');
    console.log(this.value);
    console.log(this.question);
    console.log(this.prop);

    this.choices = [];
    this.type = this.question.getType();

    if ((this.type === 'matrixdropdown' || this.type === 'matrixdynamic') && this.prop === 'columns') {
      this.showColType = 'matrix-cols';
    } else if (this.type === 'multipletext' && this.prop === 'items') {
      this.showColType = 'mtext-items';
    } else if (this.type === 'imagepicker') {
      this.showColType = 'imagepicker-items';
    }

    const choices = this.value;
    if (choices) {
      choices.filter(res => {
        let itemCopy;
        if ((this.type === 'matrixdropdown' || this.type === 'matrixdynamic') && this.prop === 'columns') {
          itemCopy = new Survey.MatrixDropdownColumn('', '');
        } else if (this.type === 'multipletext' && this.prop === 'items') {
          itemCopy = new Survey.MultipleTextItem('', '');
        } else if (this.type === 'imagepicker') {
          itemCopy = new Survey.QuestionImagePicker('');
          // itemCopy = new Survey.QuestionImagePickerModel('');
        } else {
          itemCopy = Survey.Base.createItemValue({});
          // need to try this
          // new ItemValue(null)
        }
        const oldObj = JSON.parse(JSON.stringify(res));
        for (const key in oldObj) {
          if (oldObj.hasOwnProperty(key)) {
            itemCopy[key] = JSON.parse(JSON.stringify(oldObj[key]));
          }
        }

        this.checkConditions();
        this.choices.push(itemCopy);
      });
    }
    // console.log(choices);
    // console.log(this.choices);
  }

  checkConditions() {
    this.showHeader = true;
    for (let i = 0; i < this.choices.length; i++) {
      const choice = this.choices[i];
      if (choice.enableIf || choice.visibleIf) {
        this.showHeader = false;
        break;
      }
    }
  }

  addNewOption(value?: string) {
    // create empty item
    var valu = this.question.data.generateNewProp(this.choices, 'value', 'item');
    let itemCopy;
    if ((this.type === 'matrixdropdown' || this.type === 'matrixdynamic') && this.prop === 'columns') {
      itemCopy = new Survey.MatrixDropdownColumn('', '');
      // return true;
    } else if (this.type === 'multipletext' && this.prop === 'items') {
      itemCopy = new Survey.MultipleTextItem('', '');
    } else if (this.type === 'imagepicker') {
      itemCopy = new Survey.QuestionImagePicker('addedManual');
    } else {
      itemCopy = Survey.Base.createItemValue({});
    }
    console.log(itemCopy);
    if ((this.type === 'matrixdropdown' || this.type === 'matrixdynamic') && this.prop === 'columns') {
      itemCopy.name = value || valu;
      this.choices.push(itemCopy);
    } else {
      itemCopy.value = value || valu;
      this.choices.push(itemCopy);
    }

  }
  transformChoices() {
    this.choices = [];
    const data = this.fastEntryData.split('\n');
    data.filter(item => {
      this.addNewOption(item);
    });
    return this.choices;
  }
  activateFormEntry() {
    this.activeView = 'formEntry';
    if (this.fastEntryData) {
      this.transformChoices();
    }
  }
  activateFastEntry() {
    this.activeView = 'fastEntry';
    this.fastEntryData = '';
    this.choices.filter(choice => {
      if (!this.fastEntryData) {
        this.fastEntryData = choice.value;
      } else {
        this.fastEntryData += '\n' + choice.value;
      }
    });
  }

  removeOption(index) {
    // this.question.activeChoices.splice(index,1);
    this.choices.splice(index, 1);
  }

  removeAllOptions() {
    this.choices = [];
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.choices, event.previousIndex, event.currentIndex);
  }

  toggleEditView(item?: any) {
    if (item) {
      this.activeItem = item;
    }
    this.editView = this.editView === 'showItems' ? 'editItems' : 'showItems';
    if (this.editView === 'editItems') {
      if (this.type === 'multipletext' && this.prop === 'items') {
        this.editOptions = [{
          prop: '',
          type: 'general',
          displayName: 'General',
          value: [{
            prop: 'inputType',
            displayName: 'Input Type',
            value: this.activeItem['inputType'],
            type: 'dropdown',
            values: [{
              value: 'color',
              displayName: 'Color'
            }, {
              value: 'date',
              displayName: 'Date'
            }, {
              value: 'datetime',
              displayName: 'Date Time'
            }, {
              value: 'datetime-local',
              displayName: 'Date Time Local'
            }, {
              value: 'email',
              displayName: 'Email'
            }, {
              value: 'month',
              displayName: 'Month'
            }, {
              value: 'number',
              displayName: 'Number'
            }, {
              value: 'password',
              displayName: 'Password'
            }, {
              value: 'range',
              displayName: 'Range'
            }, {
              value: 'tel',
              displayName: 'Tel'
            }, {
              value: 'text',
              displayName: 'Text'
            }, {
              value: 'time',
              displayName: 'Time'
            }, {
              value: 'url',
              displayName: 'Url'
            }, {
              value: 'week',
              displayName: 'Week'
            }
            ]
          }, {
            prop: 'placeHolder',
            value: this.activeItem['placeHolder'],
            displayName: 'PlaceHolder',
            type: 'text',
          }, {
            prop: 'maxLength',
            value: this.activeItem['maxLength'],
            displayName: 'MaxLength',
            type: 'number'
          }]
        }, {
          prop: 'validators',
          type: 'validators',
          value: this.activeItem['validators'],
          displayName: 'Validators'
        }];
      } else if (this.type === 'matrixdynamic' && this.prop === 'choices') {
        this.editOptions = [{
          prop: 'visibleIf',
          type: 'equation',
          value: this.activeItem['visibleIf'],
          displayName: 'Visible If'
        }, {
          prop: 'enableIf',
          type: 'equation',
          value: this.activeItem['enableIf'],
          displayName: 'Enable If'
        }];
      } else if (this.type === 'matrixdynamic' && this.prop === 'columns') {
        this.editOptions = [{
          prop: 'visibleIf',
          type: 'equation',
          value: this.activeItem['visibleIf'],
          displayName: 'Visible If'
        }, {
          prop: 'enableIf',
          type: 'equation',
          value: this.activeItem['enableIf'],
          displayName: 'Enable If'
        }, {
          prop: 'requiredIf',
          type: 'equation',
          value: this.activeItem['requiredIf'],
          displayName: 'Required If'
        }];
      } else if (this.type === 'matrixdropdown' && this.prop === 'choices') {
        this.editOptions = [{
          prop: 'visibleIf',
          type: 'equation',
          value: this.activeItem['visibleIf'],
          displayName: 'Visible If'
        }, {
          prop: 'enableIf',
          type: 'equation',
          value: this.activeItem['enableIf'],
          displayName: 'Enable If'
        }];
      } else if (this.type === 'matrixdropdown' && this.prop === 'columns') {
        this.editOptions = [{
          prop: 'visibleIf',
          type: 'equation',
          value: this.activeItem['visibleIf'],
          displayName: 'Visible If'
        }, {
          prop: 'enableIf',
          type: 'equation',
          value: this.activeItem['enableIf'],
          displayName: 'Enable If'
        }, {
          prop: 'requiredIf',
          type: 'equation',
          value: this.activeItem['requiredIf'],
          displayName: 'Required If'
        }];
      } else if (this.type === 'matrixdropdown' && this.prop === 'rows') {
        this.editOptions = [{
          prop: 'visibleIf',
          type: 'equation',
          value: this.activeItem['visibleIf'],
          displayName: 'Visible If'
        }];
      } else if (this.type === 'matrix' && (this.prop === 'columns' || this.prop === 'rows')) {
        this.editOptions = [{
          prop: 'visibleIf',
          type: 'equation',
          value: this.activeItem['visibleIf'],
          displayName: 'Visible If'
        }];
      } else if ((this.type === 'dropdown' || this.type === 'radiogroup' || this.type === 'checkbox') && this.prop === 'choices') {
        this.editOptions = [{
          prop: 'visibleIf',
          type: 'equation',
          value: this.activeItem['visibleIf'],
          displayName: 'Visible If'
        }, {
          prop: 'enableIf',
          type: 'equation',
          value: this.activeItem['enableIf'],
          displayName: 'Enable If'
        }];
      } else if (this.type === 'rating') {
        this.editOptions = [];
      } else if (this.type === 'imagepicker') {
        this.editOptions = [{
          prop: 'visibleIf',
          type: 'equation',
          value: this.activeItem['visibleIf'],
          displayName: 'Visible If'
        }, {
          prop: 'enableIf',
          type: 'equation',
          value: this.activeItem['enableIf'],
          displayName: 'Enable If'
        }];
      }
    } else {
      this.handleEditedItems();
    }

  }

  handleEditedItems() {
    this.editedItems = this.reCallValue();
    if (this.editedItems) {
      let index;
      this.choices.filter((choice, i) => {
        if (choice === this.activeItem) {
          index = i;
        }
      });
      if (index !== undefined) {
        this.editedItems.filter(item => {
          const eIetm = this.choices[index];
          if (item.type === 'general') {
            item.value.filter(value => {
              eIetm[value.prop] = value.value;
            });
          } else {
            eIetm[item.prop] = item.value;
          }
        });
      }
      this.editedItems = undefined;
    }
    return this.choices;
  }
  getView() {
    return this.activeView;
  }
  getEditView() {
    return this.editView;
  }

  getChoices() {
    // return this.choices;
    let choices = this.choices;
    if (this.getView() === 'fastEntry') {
      choices = this.transformChoices();
    } else if (this.getEditView() === 'editItems') {
      choices = this.handleEditedItems();
    }
    this.checkConditions();
    return choices;
  }

  setEditedItems(data) {
    this.editedItems = data;
    console.log(data);
  }

  reCallValue() {
    console.log('okCancel click');
    return this.multipleEdit.reCallValue();
  }
}
