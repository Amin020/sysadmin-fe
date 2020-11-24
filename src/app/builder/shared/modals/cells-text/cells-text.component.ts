
import * as Survey from 'survey-angular';
import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';

import { ModalService } from '../../services/modal/modal.service';


@Component({
  selector: 'app-cells-text',
  templateUrl: './cells-text.component.html',
  styleUrls: ['./cells-text.component.scss']
})
export class CellsTextComponent implements OnInit {
  action: Subject<any> = new Subject();
  value: any;
  item: any;
  privateValue: any;
  question: any;
  constructor(public modalRef: MDBModalRef, private modalService: ModalService) { }

  ngOnInit() {

    this.privateValue = new Survey.MartrixCells(this.value.cellsOwner);
    this.constructObj(this.privateValue, this.value);
  }


  constructObj(obj, oldObj) {
    if (oldObj && (!oldObj.values || !Object.keys(oldObj.values).length)) {
      obj.values = {};
      obj.values['default'] = {};
      obj.columns.filter(col => {
        obj.values['default'][col.text] = '';
      });
      obj.rows.filter(row => {
        obj.values[row.text] = {};
        obj.columns.filter(col => {
          obj.values[row.text][col.text] = '';
        });
      });
    } else {
      obj.values['default'] = {};
      obj.columns.filter(col => {
        if (oldObj.values['default']) {
          if (oldObj.values['default'][col.text]) {
            this.setObjValues('default', col.text, oldObj.values['default'][col.text].text, obj);
          } else {
            this.setObjValues('default', col.text, '', obj);
          }
        } else {
          this.setObjValues('default', col.text, '', obj);
        }
      });
      obj.rows.filter(row => {
        obj.values[row.text] = {};
        obj.columns.filter(col => {
          if (oldObj.values[row.text]) {
            if (oldObj.values[row.text][col.text]) {

              this.setObjValues(row.text, col.text, oldObj.values[row.text][col.text].text, obj);
            } else {
              this.setObjValues(row.text, col.text, '', obj);
            }
          } else {
            this.setObjValues(row.text, col.text, '', obj);
          }
        });
      });
    }
  }


  setObjValues(row, col, value, obj) {
    if (!value) {
      obj.values[row][col] = { text: '' };
      return;
    }
    if (row === 'default') {
      obj.setDefaultCellText(col, value);
    } else {
      obj.setCellText(row, col, value);
    }
  }


  filterCells() {

    const editedValue: any = new Survey.MartrixCells(this.privateValue.cellsOwner);
    this.constructObj(editedValue, this.privateValue);

    for (const property in editedValue.values) {
      if (editedValue.values.hasOwnProperty(property)) {
        const row = editedValue.values[property];
        for (const innerProperty in row) {
          if (row.hasOwnProperty(innerProperty)) {
            if (!row[innerProperty]) {
              delete row[innerProperty];
            } else if (!row[innerProperty].text) {
              delete row[innerProperty];
            }
          }
        }
      }
    }

    for (const property in editedValue.values) {
      if (editedValue.values.hasOwnProperty(property)) {
        if (!editedValue.values[property]) {
          delete editedValue.values[property];
        } else if (!Object.keys(editedValue.values[property]).length) {
          delete editedValue.values[property];
        }

      }
    }
    return editedValue;
  }


  okAction() {
    const editedValue = this.filterCells();
    this.modalService.okAction(this.action, this.modalRef, editedValue, 'cells', this.question);
  }
  applyAction() {
    const editedValue = this.filterCells();
    this.modalService.applyAction(this.action, editedValue);
  }
  cancelAction() {
    this.modalService.cancelAction(this.modalRef);
  }
}

