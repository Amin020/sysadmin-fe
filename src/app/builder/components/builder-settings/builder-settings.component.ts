import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from '../../shared/services/builder/builder.service';
import SettingsModel from '../../shared/models/settings-models/settings-model';
import currencyData from '../../shared/data/settings-data/currency-data';

import { TextModalComponent } from '../../shared/modals/text-modal/text-modal.component';
import { TextAreaModalComponent } from '../../shared/modals/text-area-modal/text-area-modal.component';
import { EquationModalComponent } from '../../shared/modals/equation-modal/equation-modal.component';
import { ValidatorModalComponent } from '../../shared/modals/validator-modal/validator-modal.component';
import { ChoicesCreationComponent } from '../../shared/modals/choices-creation/choices-creation.component';
import { ChoicesByUrlComponent } from '../../shared/modals/choices-by-url/choices-by-url.component';
import { ChoicesOptionsComponent } from '../../shared/modals/choices-options/choices-options.component';
import { CellsTextComponent } from '../../shared/modals/cells-text/cells-text.component';
import { ExpressionModalComponent } from '../../shared/modals/expression-modal/expression-modal.component';

import { GeneralEditComponent } from '../../shared/modals/general-edit/general-edit.component';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { isArray } from 'util';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
const SurveyDefault = require('../../../../libFile/survey');
const Survey = SurveyDefault.default;
@Component({
  selector: 'app-builder-settings',
  templateUrl: './builder-settings.component.html',
  styleUrls: ['./builder-settings.component.scss']
})
export class BuilderSettingsComponent implements OnInit {
  showAdvancedOptions = false;
  type: string;
  surveyModel;
  selectedElement: any;
  searchValue;
  selectedElementBaseData: SettingsModel;
  modalRef: MDBModalRef;
  pages: string[];
  currentPage;
  currencyData: string[];
  @Input() surveyId: string;
  dropDownData: any;
  elements: any;
  currentModel;
  firstTime = true;
  constructor(public _BuilderService: BuilderService, private modalService: MDBModalService, private manageServ: SurveyManagementService
  ) { }
  checkData(): any {
    this._BuilderService._surveyModel$.subscribe((surveyModel: any) => {
      if (surveyModel) {
        this.currentModel = JSON.parse(localStorage.getItem('surveyArray'));
        this.surveyModel = surveyModel;
        this.constructDropDownData(this.currentModel);
        this.currentPage = this.surveyModel.currentPage;
        // this.selectedElement = surveyModel;
        if (this.firstTime) {
          // this.selectedElement = this.surveyModel;
          // this.selectedElementBaseData = this._BuilderService.getElementData('survey');
          this.updateSelectedElement(this.surveyModel, 'selected');
          this.deactivateAllElements();
          this.firstTime = false;
        }
        this.pages = this.surveyModel.pages;
        this.currencyData = currencyData;
      } else {
        return false;
      }

      // this.surveyModel.onSurveyEdit.add(selected => {
      //   this.updateSelectedElement(selected, 'selected');
      // })
      if (!this.surveyModel.onElementSelected.hasFunc(this.onElementSelect)) {
        this.surveyModel.onElementSelected.add(this.onElementSelect);
      }

      if (!this.surveyModel.onElementEdit.hasFunc(this.onElementEdit)) {
        this.surveyModel.onElementEdit.add(this.onElementEdit);
      }

      this.constructDropDownData(this.surveyModel);
      // this._BuilderService._surveyModel$.subscribe(data => {
      //   this.constructDropDownData(this.currentModel);
      // });
      this._BuilderService.activePage.subscribe(page => {
        this.currentPage = page;
        // this.surveyModel.currentPage = page;
        this.updateSelectedElement(page, 'selected');
        this.constructDropDownData(this.surveyModel);
      });

      this.surveyModel.onPanelAdded.add(data => {
        this.constructDropDownData(data, 'questionAdded');
      });
      this.surveyModel.onQuestionAdded.add((data, item) => {
        // if(!item['index']){
        //   this._BuilderService.makeSurveyModel();
        // }
        this.constructDropDownData(data, 'questionAdded');
      });
      this.surveyModel.onPanelRemoved.add(data => {
        // this.surveyModel = data;
        // this._BuilderService.surveyArray = JSON.parse(localStorage.getItem('surveyArray'));
        this.constructDropDownData(data);
      });
      this.surveyModel.onQuestionRemoved.add(data => {
        this.surveyModel = data;
        // this._BuilderService.surveyArray = JSON.parse(localStorage.getItem('surveyArray'));
        // this._BuilderService.updateSurvey(data);
        this.constructDropDownData(data);
      });
      return this.surveyModel;
      // console.log(this.selectedElement);
      // this.render(surveyModel);
      // })
    });
  }

  ngOnInit() {

    // const surveyModel = this.surveyModel;
    const surveyModel = this.checkData();


    console.log(surveyModel);

  }

  onElementSelect = (selected) => {
    this.updateSelectedElement(selected, 'selected');
  }

  onElementEdit = (selected) => {
    this.updateSelectedElement(selected, 'edit');
    this.openEditModal(selected);
  }

  // TODO: need to reset the active questions while selecting the page and survey
  // play with survey modals
  // renameQuestions() {
  //   setTimeout(() => {
  //     let pageIndex = this._BuilderService.pageIndex;
  //     let surveyJSON = JSON.parse(localStorage.getItem('surveyArray'));
  //     let lastQuestion = surveyJSON.pages[pageIndex].questions.length - 1
  //     // surveyJSON.pages[pageIndex].questions[lastQuestion]['name'] = this._BuilderService.newQuestion.name;
  //     this._BuilderService.surveyArray.pages[pageIndex].questions.forEach(() => {
  //       this.dropDownData.forEach((rsElement, dropDownIndex) => {
  //         if (rsElement.name === surveyJSON.pages[pageIndex].name) {
  //           this._BuilderService.surveyArray.pages[pageIndex].questions.forEach((element, index) => {
  //             element['name'] = this.dropDownData[dropDownIndex + index]['name'];
  //           });
  //           return false;
  //         }
  //       });
  //     });

  //     localStorage.setItem('surveyArray', JSON.stringify(surveyJSON));
  //   }, 500);
  // }
  constructDropDownData(survey, action?) {
    this.dropDownData = [];
    this.elements = [];

    this.dropDownData = this.getArray(this.surveyModel.pages, 1);
    this.dropDownData.unshift({ iterator: 0, name: survey['title'] });

    this.elements = this.getElementArray(this.surveyModel.pages);
    // this.elements.push({
    //   "type": "tagbox",
    //   "isRequired": true,
    //   "choicesByUrl": {
    //     "url": "https://restcountries.eu/rest/v2/all"
    //   },
    //   "name": "countries",
    //   "title": "Please select all countries you have been for the last 3 years."
    // })
    this.elements.unshift(this.surveyModel);
    // this._BuilderService.saveSurveyArray(this.surveyModel);
    console.log(this.dropDownData);
    // if (action === 'questionAdded') {
    //   this.renameQuestions();
    // }
  }

  getArray(items, dots) {
    const flat = [];
    dots = 1;
    items.forEach((item) => {
      flat.push({ iterator: dots, name: item.name });
      // this.elements.push(item);
      if (Array.isArray(item.elements)) {
        // this.elements.push(...this.getArray(item.elements, dots));
        flat.push(...this.getArray(item.elements, dots));
      }
    });
    return flat;
  }

  getElementArray(items) {
    const flat = [];
    items.forEach((item) => {
      flat.push(item);
      if (Array.isArray(item.elements)) {
        item.elements.forEach((elem) => {
          flat.push(elem);
        })
      }
    });
    return flat;
  }

  createArr(i) {
    return new Array(i);
  }

  onActiveChange(data) {
    console.log(data);
    const element = this.getElement(data);
    this.updateSelectedElement(element, 'selected');

    // this.deactivateAllElements();
    if (element.getType() !== 'page' && element.getType() !== 'survey') {
      element.active(true);
    } else if (element.getType() == 'page') {
      this.surveyModel.currentPage = element;
      this._BuilderService.activePage.emit(element);
      this._BuilderService.pageIndex = element.visibleIndex;
    }
    console.log(this.elements);

  }

  deactivateAllElements() {
    this.elements.filter(element => {
      if (element.active) {
        element.active(false);
      }
    });
  }
  getElement(name) {
    let element;
    this.elements.filter(item => {
      if (item.name === name || item.title === name) {
        element = item;
      }
    });
    return element;
  }

  getSearchResult() {
    var currentBaseData = JSON.parse(JSON.stringify(this._BuilderService.getElementData(this.type)));
    if (this.searchValue) {
      var newPropToDisplay = currentBaseData.settingsItems.filter(item => {
        console.log(item.displayName.toLowerCase())
        return item.displayName.toLowerCase().includes(this.searchValue.toLowerCase());
      })
      this.selectedElementBaseData.settingsItems = newPropToDisplay;
    } else {
      this.selectedElementBaseData = currentBaseData;
    }

  }
  updateSelectedElement(selected, type) {
    this.type = selected.getType();
    this.selectedElement = selected;
    this.selectedElementBaseData = JSON.parse(JSON.stringify(this._BuilderService.getElementData(this.type)));

  }
  openEditModal(item) {
    const itemObj = this._BuilderService.getEditData(item.getType());
    console.log(itemObj);
    if (this.modalService['modalsCount'] === 1) {
      return false;
    }
    this.modalRef = this.modalService.show(GeneralEditComponent, {
      data: {
        editOptions: itemObj.editOptions,
        item: item,
        value: this.selectedElement[item.prop],
        question: this.selectedElement
      }
    });

    if (this.modalRef && this.modalRef.content && this.modalRef.content.action) {
      this.modalRef.content.action.subscribe((result: any) => {
        if (result.action === 'ok' || result.action === 'apply') {
          // this.updateElement(result.value, item.prop);
          this.multipleUpdate(result);
          this.selectedElement.updateQuestion();
          var survey = JSON.parse(localStorage.getItem('surveyArray'))
          this._BuilderService.updateSurvey(this.selectedElement.data)
          console.log(result);
        }
      });
    }
  }

  multipleUpdate(data) {

    data.value.filter(obj => {
      if (obj.type === 'general') {
        console.log('general');
        obj.value.filter((item, index) => {
          var isLastIndex = false;
          if (index === obj.value.length - 1) {
            isLastIndex = true;
          }
          this.updateElement(item.value, item.prop, true, isLastIndex);
        });
      } else if (obj.type === 'choicesCreation') {
        this.updateElement(obj.value, obj.prop);
        if (isArray(obj.extraItem)) {
          obj.extraItems.filter((item, index) => {
            var isLastIndex = false;
            if (index === obj.value.length - 1) {
              isLastIndex = true;
            }
            this.updateElement(item.value, item.prop, true, isLastIndex);
          });
        }
      } else {
        this.updateElement(obj.value, obj.prop, true);
      }
      this.selectedElement.updateQuestion();
      // this._BuilderService.updateSurvey(this.surveyModel);
      // this._BuilderService.updateSurvey(this.surveyModel);
      // if (obj.type === 'equation' || obj.type === 'validators' || obj.type === 'choicesCreation') {
      //   this.updateElement(obj.value, obj.prop);
      // }
    });
  }
  updateElement(data, prop, multiUpdate?, isLastIndex?) {
    const type = this.selectedElement.getType();
    this.selectedElement[prop] = data ? data : '';
    if (type == 'survey' || type == 'page') {
      if (type == 'survey') {
        var questionFromDB = JSON.parse(localStorage.getItem('surveyArray'));
        if (data == false || data == true) {
          questionFromDB[prop] = data;
        } else {
          questionFromDB[prop] = data ? data : '';
        }
      } else {
        var questionFromDB = JSON.parse(localStorage.getItem('surveyArray'));
        if (data == false || data == true) {
          questionFromDB.pages[this._BuilderService.pageIndex][prop] = data;
        } else {
          questionFromDB.pages[this._BuilderService.pageIndex][prop] = data ? data : '';
        }
      }
      this._BuilderService.saveSurveyArray(undefined, undefined, undefined, questionFromDB);
    } else {
      var newVal = [];
      var questionFromDB = this._BuilderService.getJson(this.selectedElement);
      if (data == false || data == true) {
        questionFromDB[prop] = data;
      } else if (isArray(data) && prop == 'choices' && type == 'imagepicker') {
        data.forEach(element => {
          newVal.push({ value: element.value, imageLink: element.imageLink });
        });
        questionFromDB[prop] = newVal;
      } else if ((prop == 'columns' || prop == 'rows') && type == 'matrix') {
        data.forEach(element => {
          newVal.push({ value: element.value, text: element.text });
        });
        questionFromDB[prop] = newVal;
      }
      else if (prop == 'columns' && (type == 'matrixdropdown' || type == 'matrixdynamic')) {
        data.forEach(element => {
          newVal.push({ name: element.name, title: element.title });
        });
        questionFromDB[prop] = newVal;
      } else if (prop == 'rows' && (type == 'matrixdropdown' || type == 'matrixdynamic')) {
        data.forEach(element => {
          newVal.push({ text: element.text, value: element.value });
        });
        questionFromDB[prop] = newVal;
      } else if ((prop == 'cells')) {
        let cellObj = <any>{};
        // data.values.default.forEach(element => {
        //   newVal.push({ value: element.value, text: element.text });
        // });
        for (const row in data.values) {
          cellObj[row] = <any>{};
          if (row !== '__proto__') {
            for (const col in data.values[row]) {
              cellObj[row][col] = data.values[row][col]['renderedText'];
            }

          }
        }
        questionFromDB[prop] = cellObj;
      } else {
        questionFromDB[prop] = data ? data : '';
      }
    }
    this.saveAfterEdit(questionFromDB)
    this._BuilderService.updateSurvey(this.surveyModel);
  }
  saveQuestion(questionFromDB, type) {
    if (type !== 'survey' && type !== 'page' && type !== 'panel') {
      // const element = this.getElement(data);
      // this.updateSelectedElement(element, 'selected');
      this.selectedElement.updateQuestion();
    }

    // this._BuilderService.saveSurveyArray(undefined, undefined, questionFromDB);
    this.constructDropDownData(this._BuilderService.getSurvey(this.surveyId));
  }
  saveAfterEdit(questionFromDB) {
    var survey = JSON.parse(localStorage.getItem('surveyArray'));
    survey.pages[this._BuilderService.pageIndex].elements.forEach(element => {
      if (element.name == questionFromDB.name) {
        for (var property in questionFromDB) {
          element[property] = questionFromDB[property];
        }
        return element;
      }
    });
    localStorage.setItem('surveyArray', JSON.stringify(survey));
  }
  updateNumberElement(data, prop) {
    const type = this.selectedElement.getType();
    this.selectedElement[prop] = data;
    if (type == 'survey' || type == 'page') {
      if (type == 'survey') {
        var questionFromDB = JSON.parse(localStorage.getItem('surveyArray'));
        if (data == false || data == true) {
          questionFromDB[prop] = data;
        } else {
          questionFromDB[prop] = data ? data : '';
        }
      } else {
        var questionFromDB = JSON.parse(localStorage.getItem('surveyArray'));
        if (data == false || data == true) {
          questionFromDB.pages[this._BuilderService.pageIndex][prop] = data;
        } else {
          questionFromDB.pages[this._BuilderService.pageIndex][prop] = data ? data : '';
        }
      }
      this._BuilderService.saveSurveyArray(undefined, undefined, undefined, questionFromDB);
    } else {
      var questionFromDB = this._BuilderService.getJson(this.selectedElement);
      questionFromDB[prop] = data ? data : '';
      this._BuilderService.saveSurveyArray(undefined, undefined, questionFromDB);
    }
    if (type !== 'survey' && type !== 'page' && type !== 'panel') {
      this.selectedElement.updateQuestion();
    }
    this._BuilderService.updateSurvey(this.surveyModel);
  }

  openModal(item) {
    console.log(item.subType);
    switch (item.subType) {
      case 'text':
        this.modalRef = this.modalService.show(TextModalComponent, { data: { item: item, value: this.selectedElement[item.prop] } });
        break;
      case 'text_area':
        this.modalRef = this.modalService.show(TextAreaModalComponent, { data: { item: item, value: this.selectedElement[item.prop] } });
        break;
      case 'equation':
        this.modalRef = this.modalService.show(EquationModalComponent, {
          data: {
            item: item, value: this.selectedElement[item.prop],
            question: this.selectedElement,
            prop: item.prop
          }
        });
        break;
      case 'validator':
        this.modalRef = this.modalService.show(ValidatorModalComponent, {
          data: {
            item: item, value: this.selectedElement[item.prop],
            question: this.selectedElement, showfirst: false,
            prop: item.prop
          }
        });
        break;
      case 'choices_creation':
        var type = this.selectedElement.getType();
        if (type == 'imagepicker') {
          this.modalRef = this.modalService.show(ChoicesCreationComponent, {
            data: {
              item: item, value: this.selectedElement[item.prop],
              question: this.selectedElement,
              prop: item.prop
            }
          });
          return false;
        }
        this.modalRef = this.modalService.show(ChoicesCreationComponent, {
          data: {
            item: item, value: this.selectedElement[item.prop],
            question: this.selectedElement,
            prop: item.prop
          }
        });
        break;
      case 'choices_by_url':
        this.modalRef = this.modalService.show(ChoicesByUrlComponent, {
          data: {
            item: item, value: this.selectedElement[item.prop],
            question: this.selectedElement,
          }
        });
        break;
      case 'choices_options':
        this.modalRef = this.modalService.show(ChoicesOptionsComponent, {
          data: {
            item: item,
            value: this.selectedElement[item.prop],
            question: this.selectedElement,
            prop: item.prop,
          }
        });
        break;
      case 'cells_text':
        this.modalRef = this.modalService.show(CellsTextComponent, {
          data: {
            item: item, value: this.selectedElement[item.prop],
            question: this.selectedElement
          }
        });
        break;
      case 'expression':
        this.modalRef = this.modalService.show(ExpressionModalComponent, {
          data: {
            item: item, value: this.selectedElement[item.prop],
            question: this.selectedElement
          }
        });
        break;
      default:
    }
    if (this.modalRef && this.modalRef.content && this.modalRef.content.action) {
      this.modalRef.content.action.subscribe((result: any) => {
        if (result.action === 'ok' || result.action === 'apply') {
          this.updateElement(result.value, item.prop);
        }
      });
    }
  }
}
