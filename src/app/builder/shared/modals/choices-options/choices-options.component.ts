import { Component, OnInit } from '@angular/core';

import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import * as Survey from 'survey-angular';

@Component({
  selector: 'app-choices-options',
  templateUrl: './choices-options.component.html',
  styleUrls: ['./choices-options.component.scss']
})
export class ChoicesOptionsComponent implements OnInit {
  item: any;
  value: any;
  question: any;
  baseQuestionLength: any;
  choices: any;
  type: string;
  action: Subject<any> = new Subject();
  data: any;
  prop: string;
  file: {
    name: string,
    type: string,
    content: any
  } = {
      name: undefined,
      type: undefined,
      content: undefined,
    };

  constructor(public modalRef: MDBModalRef, private modalService: ModalService) { }

  ngOnInit() {
    if (this.question.choices) {
      this.choices = JSON.parse(JSON.stringify(this.question.choices));
    }
    if (this.question.visibleRateValues) {
      this.choices = JSON.parse(JSON.stringify(this.question.visibleRateValues));
    }
    this.type = this.question.getType();

    if (this.type === 'checkbox') {
      if (this.value) {
        this.value.filter(res => {
          this.choices.filter(choice => {
            if (res === choice.value) {
              choice._value = true;
            }
          });
        });
      }
    } else if (this.type === 'radiogroup') {

    } else if (this.type === 'file') {
      if (this.value) {
        this.file = this.value;
      }
    } else if (this.type === 'matrix') {
      if (!this.value) {
        this.value = {};
      } else {
        this.value = JSON.parse(JSON.stringify(this.value));
      }
    } else if (this.type === 'matrixdropdown') {
      if (!this.value) {
        this.value = {};
        this.question.rows.filter(row => {
          this.value[row.text] = {};
        });
      } else {
        this.value = JSON.parse(JSON.stringify(this.value));
      }
    } else if ((this.type === 'matrixdynamic' && (this.prop === 'correctAnswer' || this.prop === 'defaultValue'))) {
      this.baseQuestionLength = this.question.koRows().length;


      if (!this.value) {
        this.value = [];
        this.question.koRows().filter(row => {
          const currentObj = {};
          this.value.push(currentObj);
        });
      } else {
        this.value = JSON.parse(JSON.stringify(this.value));
      }

    } else if ((this.type === 'matrixdynamic' && (this.prop === 'defaultRowValue'))) {
      // this.baseQuestionLength = this.question.koRows().length;


      if (!this.value) {
        this.value = {};
        // this.question.columns.filter(col => {
        //   const currentObj = {};
        //   this.value.push(currentObj);
        // });
      } else {
        console.log(this.value);
        this.value = JSON.parse(JSON.stringify(this.value));
      }

    } else if (this.type === 'multipletext') {
      console.log(this.question);
      if (!this.value) {
        this.value = {};
      } else {
        console.log(this.value);
        this.value = JSON.parse(JSON.stringify(this.value));
      }
    }


  }



  checkboxChange() {
    this.value = [];
    this.choices.filter(res => {
      if (res._value) {
        this.value.push(res.value);
      }
    });
  }

  clearSelection() {
    this.value = undefined;
  }

  setValue(choice) {
    this.value = choice;
  }

  showUndefinedValue() {
    if (this.value === undefined) {
      return true;
    }
    return false;
  }

  showUndefinedObjValue(obj) {
    if (obj === undefined) {
      return true;
    }
    return false;
  }
  matrixCheckBoxChange(data, row, col) {
    const checked = data.target.checked;
    const value = data.target.value;

    if (this.prop === 'correctAnswer' || this.prop === 'defaultValue') {
      if (!this.value[row][col]) {
        this.value[row][col] = [];
      }
      if (checked) {
        this.value[row][col].push(value);
      } else {
        let index;
        this.value[row][col].filter((item, i) => {
          if (item === value) {
            index = i;
          }
        });
        this.value[row][col].splice(index, 1);
      }
    } else if (this.prop === 'defaultRowValue') {
      this.value[col] = value;
    }

  }


  searchValue(value, array) {
    let found = false;
    if (!array) {
      return;
    }
    if (typeof array === 'string') {
      array = JSON.parse('[' + array + ']');
    }
    if (typeof array === 'number') {
      array = [array];
    }

    if (!Array.isArray(array)) {
      return;
    }
    array.filter(element => {
      if ((element === value + '') || element === value) {
        found = true;
      }
    });
    return found;
  }
  // onFileAdd(file: File) {
  //   this.file = file;
  // }

  onFileRemove() {
    this.file = {
      name: undefined,
      type: undefined,
      content: undefined,
    };
  }

  fileChange(event): void {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      this.file.name = file.name;
      this.file.type = file.type;
      const reader = new FileReader();
      reader.onload = (e) => {
        this.file.content = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  imageFile(fileType) {
    if (fileType) {
      return fileType.includes('image');
    }
  }

  checkObjectKeys(obj) {
    return Object.keys(obj).length;
  }
  getDisplayText(obj, row, col) {
    let text = col;
    if (obj[row] && obj[row][col]) {
      text = obj[row][col].text;
    } else if (obj['default'] && obj['default'][col]) {
      text = obj['default'][col].text;
    }
    return text;
  }

  selectAnswer(row, col) {
    if (!this.value) {
      this.value = {};
    }
    this.value[row] = col;
  }

  activeItem(value, row, col) {
    if (value && value[row] === col) {
      return true;
    }
    return false;
  }
  // TODO : revsit this bussniess
  dynamicMatrixRemoveRow(index) {
    this.question.removeRow(index);
    this.value.splice(index, 1);

  }
  dynamicMatrixAddRow() {
    this.question.addRow();
    this.value.push({});
  }
  ////////////////////////
  okAction() {
    if (this.type === 'file') {
      this.value = this.file;
    }

    this.modalService.okAction(this.action, this.modalRef, this.value);
  }
  applyAction() {
    if (this.type === 'file') {
      this.value = this.file;
    }

    this.modalService.applyAction(this.action, this.value);
  }
  searchArray(array, obj) {
    let objIndex;
    array.filter((elem, index) => {
      if (elem.rowIndex === obj.rowIndex) {
        objIndex = index;
      }
    });
    return objIndex;
  }
  cancelAction() {

    if ((this.type === 'matrixdynamic' && (this.prop === 'correctAnswer' || this.prop === 'defaultValue'))) {
      const diff = Math.abs(this.baseQuestionLength - this.question.koRows().length);
      if (this.baseQuestionLength > this.question.koRows().length) {
        let iterator = diff;
        while (iterator > 0) {
          this.question.addRow();
          const currentObj = {};
          this.value.push(currentObj);
          iterator--;
        }

      } else if (this.baseQuestionLength < this.question.koRows().length) {
        let iterator = diff;
        while (iterator > 0) {
          this.question.removeRow(iterator);
          this.value.splice(iterator, 1);
          iterator--;
        }
      }
    }


    this.modalService.cancelAction(this.modalRef);
  }

}
