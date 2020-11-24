import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from '../../shared/services/builder/builder.service';
import { isArray, isString } from 'util';
import SettingsModel from '../../shared/models/settings-models/settings-model';
import * as widgets from 'surveyjs-widgets';
import 'inputmask/dist/inputmask/phone-codes/phone.js';
// import { Observable } from 'rxjs/Observable';
const SurveyDefault = require('../../../../libFile/survey');
const Survey = SurveyDefault.default;
widgets.icheck(Survey);
widgets.select2(Survey);
widgets.inputmask(Survey);
widgets.jquerybarrating(Survey);
widgets.jqueryuidatepicker(Survey);
widgets.nouislider(Survey);
widgets.select2tagbox(Survey);
widgets.signaturepad(Survey);
widgets.sortablejs(Survey);
widgets.ckeditor(Survey);
widgets.autocomplete(Survey);
widgets.bootstrapslider(Survey);
widgets.prettycheckbox(Survey);
widgets.bootstrapdatepicker(Survey);
widgets.emotionsratings(Survey);
@Component({
  selector: 'app-builder-translation',
  templateUrl: './builder-translation.component.html',
  styleUrls: ['./builder-translation.component.scss']
})
export class BuilderTranslationComponent implements OnInit {
  objectKeys = Object.keys;
  backupSurveyBody: any;
  showAllText = false;
  surveyModel;
  surveyModelCopy;
  currentModel: any;
  dropDownData; firstTime = true;
  currentPage = 0; elements = [];
  newSelectedLang = 0; selectedElement; selectedElementBaseData: SettingsModel; type;
  customBindingLang: any;
  @Input() optionsSelect = [];
  @Input() addedLanguagesList: any[];
  @Input() translatedLanguagesList: any[];
  constructor(public _BuilderService: BuilderService
  ) {
    this.checkData();
  }
  ngOnInit() {
    // this.getLanguagesList();
    this.generateModel();
    this.getSelectedLang();
    this.updateSelectedElement(this.surveyModel, 'selected');
  }
  getLanguagesList() {
    this.addLanguage(this.optionsSelect[1]);
  }
  createArr(i) {
    return new Array(i);
  }
  serializeJSON(question, data, prop, lang) {
    if (isString(question[prop]) && lang.aprv == 'default') {
      question[prop] = data;
    } else {
      if (question['elements']) {
        if (question['title'] == null) {
          question['title'] = question['name'];
        }
      }
      const oldVal = question[prop];
      if (question[prop] == null) {
        question[prop] = { 'default': '' };
        question[prop][lang.aprv] = data;
      } else if (question[prop]['default'] == null) {
        question[prop] = { 'default': oldVal ? oldVal : '' };
        question[prop][lang.aprv] = data;
      } else if (this.addedLanguagesList.length > 0) {
        question[prop][lang.aprv] = data;
      } else {
        question[prop] = data;
      }
    }
    return question;
  }
  getEachQuestion(element) {
    this.type = element.type;
    if (element['title']) { } else { element['title'] = element['name'] }
    // this.selectedElement = element;
    var settingsItems = this._BuilderService.getElementData(this.type).settingsItems;
    // settingsItems['question'] = this.getQuestionDataFromJSON(element);
    return settingsItems;
  }
  getPage(page) {
    var settingsItems = this._BuilderService.getElementData('page').settingsItems;
    if (page['title'] == null) {
      page['title'] = page['name'];
    }
    return settingsItems;
  }
  getQuestionDataFromJSON(element) {
    var returnQuestion: any;
    this.currentModel.pages.forEach(page => {
      page.elements.forEach(question => {
        if (question.name == element.name) {
          returnQuestion = question;
          return returnQuestion;
        }
      });
    });
    return returnQuestion;
  }
  addLanguage(lan: any): void {
    var index = 0;

    this.optionsSelect.forEach((lang, index) => {
      if (lang.nativeName == lan.nativeName) {
        index = index;
        this.optionsSelect.splice(index, 1);
      }
    });
    setTimeout(() => {
      this.newSelectedLang = 0;
    }, 100);
    this.addedLanguagesList.push({ nativeName: lan.nativeName, aprv: lan.aprv, value: true, hide: false });
    this.translatedLanguagesList.push({ nativeName: lan.nativeName, aprv: lan.aprv, value: true, hide: false });
  }

  checkData(): any {
    this._BuilderService._surveyModel$.subscribe((surveyModel: any) => {
      if (surveyModel) {
        this.currentModel = JSON.parse(localStorage.getItem('surveyArray'));
        this.surveyModel = surveyModel;
        this.constructDropDownData(this.currentModel);
        this.currentPage = this.surveyModel.currentPage;
        if (this.firstTime) {
          this.selectedElement = surveyModel;
          this.selectedElementBaseData = this._BuilderService.getElementData('survey');
          this.updateSelectedElement(this.surveyModel, 'selected');
          this.firstTime = false;
        }
        this.surveyModelCopy = JSON.parse(JSON.stringify(this.currentModel));
        delete this.surveyModelCopy.pages;
        delete this.surveyModelCopy.id;
        delete this.surveyModelCopy.mode;
        // if (this.firstTime) {
        // this.selectedElement = this.surveyModel;

        // this.deactivateAllElements();
        // this.firstTime = false;
        // }
        // this.pages = this.surveyModel.pages;
        // this.currencyData = currencyData;
      } else {
        return false;
      }
    });
  }
  getArray(items, dots) {
    const flat = [];
    dots = 1;
    items.forEach((item) => {
      if (typeof item.name == 'object') {
        flat.push({ iterator: dots, name: item.name['default'] });
      } else {
        flat.push({ iterator: dots, name: item.name });
      }
      // this.elements.push(item);
      if (Array.isArray(item.elements)) {
        // this.elements.push(...this.getArray(item.elements, dots));
        flat.push(...this.getArray(item.elements, dots));
      }
    });
    return flat;
  }
  constructDropDownData(survey, action?) {
    this.dropDownData = [];
    this.elements = [];
    this.dropDownData = this.getArray(this.surveyModel.pages, 1);
    this.dropDownData.unshift({ iterator: 0, name: survey.title });
    this.elements = this.getElementArray(this.surveyModel.pages);
    this.elements.unshift(this.surveyModel);
    console.log(this.dropDownData);
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
  changeTextCheckbox() {

  }
  updateSurvey(data, prop, lang?) {
    var type = this.selectedElement.getType();
    var questionFromDB = JSON.parse(localStorage.getItem('surveyArray'));
    questionFromDB = this.serializeJSON(questionFromDB, data, prop, lang)
    localStorage.setItem('surveyArray', JSON.stringify(questionFromDB));
    this.saveDataAfterEdit(questionFromDB, type);
  }
  checkIfQuestionExistInPage(page) {
    var question = this.getQuestionLocalStorage(this.selectedElement.name);
    var returnedVal = page.elements.find((element) => {
      return element.name == question.name
    });
    if (returnedVal) {
      return true;
    } else {
      return false;
    }
  }
  showPage(page) {
    var returnedVal = false;
    if ((this.selectedElement.name == page.name || this.selectedElement.title == page.title) || (this.selectedElement.name == this.surveyModelCopy.name || this.selectedElement.title == this.surveyModelCopy.title)) {
      returnedVal = true;
    } else {
      returnedVal = this.checkIfQuestionExistInPage(page);
    }
    return returnedVal;
  }
  updateElementArray(data, prop, lang?, element?, index?, getObj?, pageIndex?) {
    var type;
    // var localStorageElment = this.getQuestionLocalStorage(element.name);
    type = element.type;
    const originalElement = this._BuilderService.getJson(element);
    // if (getObj == 'value') getObj = 'text';
    if (element[prop][index][getObj] == null) {
      element[prop][index][getObj] = { 'default': '' };
      element[prop][index][getObj][lang.aprv] = data;
    } else if (element[prop][index][getObj]['default'] == null) {
      element[prop][index][getObj] = { 'default': originalElement[prop][index][getObj] ? originalElement[prop][index][getObj] : '' };
      element[prop][index][getObj][lang.aprv] = data;
    } else if (this.addedLanguagesList.length > 0) {
      element[prop][index][getObj][lang.aprv] = data;
    } else {
      element[prop][index][getObj] = data;
    }
    this.saveDataAfterEdit(element, type, pageIndex);
  }
  updateElement(data, prop, lang?, element?, pageIndex?) {
    var type = element.type ? element.type : 'page';
    // var localStorageElment = this.getQuestionLocalStorage(element.name);
    var questionFromDB = this.serializeJSON(element, data, prop, lang);
    this.saveDataAfterEdit(questionFromDB, type, pageIndex);
  }
  saveDataAfterEdit(questionFromDB, type, pageIndex?) {
    var survey = JSON.parse(localStorage.getItem('surveyArray'));
    if (type != 'survey' && type != 'page') {
      survey.pages[pageIndex].elements.forEach(element => {
        if (element.name == questionFromDB.name) {
          for (var property in questionFromDB) {
            element[property] = questionFromDB[property];
          }
          return element;
        }
      });
    } else if (type == 'page') {
      survey.pages[pageIndex] = questionFromDB;
      survey.pages[pageIndex]['name'] = survey.pages[pageIndex]['title'];
    } else {
      survey = questionFromDB;
    }
    this.backupSurveyBody = survey;
    this.currentModel = survey;
    localStorage.setItem('surveyArray', JSON.stringify(survey));
    this._BuilderService.makeSurveyModel();
  }
  updateSelectedElement(selected, type?) {
    this.type = selected.getType();
    this.currentPage = this.surveyModel.currentPage;
    // this.selectedElement = selected;
    this.surveyModelCopy = JSON.parse(JSON.stringify(this.currentModel));
    this.selectedElementBaseData = this._BuilderService.getElementData(this.type);

  }
  checkIfArray(element) {
    if (element['items'] || element['choices'] || element['columns']) {
      return true;
    } else { return false; }
  }
  typeOfArray(item) {
    if (item instanceof Array) {
      return true;
    } else { return false; }
  }
  getSingleChoiceObjects(element, prop): {} {
    // || element.type == 'radiogroup'
    if (element.type == 'matrix' || element.type == 'checkbox'
      || element.type == 'dropdown') {
      return { value: 'value' };
    } else if (element.type == 'matrixdropdown' || element.type == 'matrixdynamic' ||
      element.type == 'multipletext') {
      if (prop == 'columns' || prop == 'items') {
        return { name: 'name' };
      } else if (prop == 'choices' || prop == 'rows') {
        return { text: 'text' };
      }
    } else if (element.type == 'imagepicker') {
      return { value: 'value' };
    }
    return { text: 'text' };
  }
  getQuestionLocalStorage(name) {
    var originalElement;
    var surveyModel = JSON.parse(localStorage.getItem('surveyArray'));
    surveyModel.pages.forEach(page => {
      if (page['elements'] != null) {
        page.elements.forEach((questionEle, indexx) => {
          if (questionEle.name == name) {
            originalElement = questionEle;
          }
        });
      }
    });
    return originalElement;
  }
  saveQuestion(questionFromDB, type) {
    if (type !== 'survey' && type !== 'page' && type !== 'panel') {
      // const element = this.getElement(data);
      // this.updateSelectedElement(element, 'selected');
      // this.selectedElement.updateQuestion();
    }

    // this._BuilderService.saveSurveyArray(undefined, undefined, questionFromDB);
    // this.constructDropDownData(this._BuilderService.getSurvey(this.surveyId));
  }

  generateModel() {
    this.backupSurveyBody = JSON.parse(localStorage.getItem('surveyArray'));
  }
  getSelectedLang() {
    if (localStorage.getItem('surveyArray').includes('default')) {
      for (var obj in this.backupSurveyBody) {
        if (obj == 'pages') {
          this.backupSurveyBody[obj].forEach(element => {
            for (const pageObj in element) {
              if (pageObj == 'elements') {
                element[pageObj].forEach(question => {
                  for (const questionProp in question) {
                    this.checkSelectedLang(question, questionProp);
                  }
                });
              }
              this.checkSelectedLang(element, pageObj);
            }
          });
        } else {
          this.checkSelectedLang(this.backupSurveyBody, obj);
        }
      }
    }
  }
  checkSelectedLang(object, prop) {
    if (object[prop]['default'] != null) {
      let element = object[prop];
      for (let lang in element) {
        this.optionsSelect.filter((x: any) => {
          if (x.aprv == lang) {
            this.addLanguage(x);
          }
        })
      }
    }
  }
  onLanguageChangeVal(lang) {
    if (lang.aprv) {
      this.translatedLanguagesList.forEach((x, index) => {
        if (x.nativeName == lang.nativeName) {
          x.hide = false;
        }
      })
    } else {
      this.translatedLanguagesList.forEach((x, index) => {
        if (x.nativeName == lang.nativeName) {
          x.hide = true;
        }
      })
    }
  }

  // getElement(name) {
  //   let element;
  //   this.survey.filter(item => {
  //     if (item.name === name || item.title === name) {
  //       element = item;
  //     }
  //   });
  //   return element;
  // }
  getElement(name) {
    let element;
    this.elements.filter(item => {
      if (item.name === name || item.title === name) {
        element = item;
      }
    });
    return element;
  }
  onActiveChange(data) {
    console.log(data);
    const element = this.getElement(data);
    this.generateModel();
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
  showAllStrings() {

  }
}
