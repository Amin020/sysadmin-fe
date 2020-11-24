import { Injectable, EventEmitter } from '@angular/core';

import booleanBaseModel from '../../data/settings-data/boolean-data/boolean-data';
import booleanModalModel from '../../data/settings-data/boolean-data/boolean-modal-data';

import checkboxBaseModel from '../../data/settings-data/checkbox-data/checkbox-data';
import checkboxModalModel from '../../data/settings-data/checkbox-data/checkbox-modal-data';

import commentBaseModel from '../../data/settings-data/comment-data/comment-data';
import commentModalModel from '../../data/settings-data/comment-data/comment-modal-data';

import dropdownBaseModel from '../../data/settings-data/dropdown-data/dropdown-data';
import dropdownModalModel from '../../data/settings-data/dropdown-data/dropdown-modal-data';

import expressionBaseModel from '../../data/settings-data/expression-data/expression-data';
import expressionModalModel from '../../data/settings-data/expression-data/expression-modal-data';

import fileBaseModel from '../../data/settings-data/file-data/file-data';
import fileModalModel from '../../data/settings-data/file-data/file-modal-data';

import htmlBaseModel from '../../data/settings-data/html-data/html-data';
import htmlModalModel from '../../data/settings-data/html-data/html-modal-data';

import imagepickerBaseModel from '../../data/settings-data/imagepicker-data/imagepicker-data';
import imagepickerModalModel from '../../data/settings-data/imagepicker-data/imagepicker-modal-data';

import matrixBaseModel from '../../data/settings-data/matrix-data/matrix-data';
import matrixModalModel from '../../data/settings-data/matrix-data/matrix-modal-data';

import matrixdropdownBaseModel from '../../data/settings-data/matrixdropdown-data/matrixdropdown-data';
import matrixdropdownModalModel from '../../data/settings-data/matrixdropdown-data/matrixdropdown-modal-data';

import matrixdynamicBaseModel from '../../data/settings-data/matrixdynamic-data/matrixdynamic-data';
import matrixdynamicModalModel from '../../data/settings-data/matrixdynamic-data/matrixdynamic-modal-data';

import pageBaseModel from '../../data/settings-data/page-data/page-data';
import pageModalModel from '../../data/settings-data/page-data/page-modal-data';

import panelBaseModel from '../../data/settings-data/panel-data/panel-data';
import panelModalModel from '../../data/settings-data/panel-data/panel-modal-data';

import paneldynamicBaseModel from '../../data/settings-data/paneldynamic-data/paneldynamic-data';
import paneldynamicModalModel from '../../data/settings-data/paneldynamic-data/paneldynamic-modal-data';

import radiogroupBaseModel from '../../data/settings-data/radiogroup-data/radiogroup-data';
import radiogroupModalModel from '../../data/settings-data/radiogroup-data/radiogroup-modal-data';

import ratingBaseModel from '../../data/settings-data/rating-data/rating-data';
import ratingModalModel from '../../data/settings-data/rating-data/rating-modal-data';

import surveyBaseModel from '../../data/settings-data/survey-data/survey-data';
import surveyModalModel from '../../data/settings-data/survey-data/survey-modal-data';

import textBaseModel from '../../data/settings-data/text-data/text-data';
import textModalModel from '../../data/settings-data/text-data/text-modal-data';

import multipletextBaseModel from '../../data/settings-data/multipletext-data/multipletext-data';
import multipletextModalModel from '../../data/settings-data/multipletext-data/multipletext-modal-data';
import tagboxModalModel from '../../data/custom-tool-box-data/tagbox/tagbox-model-data';
import tagboxBaseModel from '../../data/custom-tool-box-data/tagbox/tagbox-data';
import emotionsratingsBaseModel from '../../data/custom-tool-box-data/emotionsRating/emotions-rating';
import emotionsratingsModalModel from '../../data/custom-tool-box-data/emotionsRating/emotions-rating-data';
// import { QuestionCustomWidget } from 'survey-angular';
import sortablelistBaseModel from '../../data/custom-tool-box-data/sortablelist/sortablelist';
import sortablelistModalModel from '../../data/custom-tool-box-data/sortablelist/sortablelist-model-data';
import editorBaseModel from '../../data/custom-tool-box-data/ckeditor/ckeditor-data';
import editorModalModel from '../../data/custom-tool-box-data/ckeditor/ckeditor-modal-data';
import datepickerBaseModel from '../../data/custom-tool-box-data/datepicker/datepicker';
import datepickerModalModel from '../../data/custom-tool-box-data/datepicker/datepicker-model-data';
import bootstrapsliderBaseModel from '../../data/custom-tool-box-data/bootstrapSlider/bootstrapslider';
import bootstrapsliderModalModel from '../../data/custom-tool-box-data/bootstrapSlider/bootstrapslider-data';
import nouisliderBaseModel from '../../data/custom-tool-box-data/nouislider/nouislider';
import nouisliderModalModel from '../../data/custom-tool-box-data/nouislider/nouislider-data';
import barratingBaseModel from '../../data/custom-tool-box-data/barrating/barrating';
import barratingModalModel from '../../data/custom-tool-box-data/barrating/barrating-data';
import signaturepadBaseModel from '../../data/custom-tool-box-data/signaturepad/signaturepad';
import signaturepadModalModel from '../../data/custom-tool-box-data/signaturepad/signaturepad-data';
import { isArray, isObject, isNumber } from 'util';
// import { SurveyManagementService } from 'src/app/services/survey-management.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Survey } from 'survey-angular';
import * as _ from 'lodash';

const SurveyDefault = require('../../../../../libFile/survey');
const SurveyController = SurveyDefault.default;
@Injectable({
  providedIn: 'root'
})
export class BuilderService {
  private baseUrl = environment.baseUrl;
  private _baseModels = {
    booleanBaseModel: booleanBaseModel,
    checkboxBaseModel: checkboxBaseModel,
    commentBaseModel: commentBaseModel,
    dropdownBaseModel: dropdownBaseModel,
    expressionBaseModel: expressionBaseModel,
    fileBaseModel: fileBaseModel,
    htmlBaseModel: htmlBaseModel,
    imagepickerBaseModel: imagepickerBaseModel,
    matrixBaseModel: matrixBaseModel,
    matrixdropdownBaseModel: matrixdropdownBaseModel,
    matrixdynamicBaseModel: matrixdynamicBaseModel,
    pageBaseModel: pageBaseModel,
    panelBaseModel: panelBaseModel,
    paneldynamicBaseModel: paneldynamicBaseModel,
    radiogroupBaseModel: radiogroupBaseModel,
    ratingBaseModel: ratingBaseModel,
    surveyBaseModel: surveyBaseModel,
    textBaseModel: textBaseModel,
    multipletextBaseModel: multipletextBaseModel,
    tagboxBaseModel: tagboxBaseModel,
    sortablelistBaseModel: sortablelistBaseModel,
    datepickerBaseModel: datepickerBaseModel,
    emotionsratingsBaseModel: emotionsratingsBaseModel,
    editorBaseModel: editorBaseModel,
    bootstrapsliderBaseModel: bootstrapsliderBaseModel,
    nouisliderBaseModel: nouisliderBaseModel,
    barratingBaseModel: barratingBaseModel,
    signaturepadBaseModel: signaturepadBaseModel
  };

  private _baseEditModels = {
    booleanModalModel: booleanModalModel,
    checkboxModalModel: checkboxModalModel,
    commentModalModel: commentModalModel,
    dropdownModalModel: dropdownModalModel,
    expressionModalModel: expressionModalModel,
    fileModalModel: fileModalModel,
    htmlModalModel: htmlModalModel,
    imagepickerModalModel: imagepickerModalModel,
    matrixModalModel: matrixModalModel,
    matrixdropdownModalModel: matrixdropdownModalModel,
    matrixdynamicModalModel: matrixdynamicModalModel,
    pageModalModel: pageModalModel,
    panelModalModel: panelModalModel,
    paneldynamicModalModel: paneldynamicModalModel,
    radiogroupModalModel: radiogroupModalModel,
    ratingModalModel: ratingModalModel,
    surveyModalModel: surveyModalModel,
    textModalModel: textModalModel,
    multipletextModalModel: multipletextModalModel,
    tagboxModalModel: tagboxModalModel,
    sortablelistModalModel: sortablelistModalModel,
    datepickerModalModel: datepickerModalModel,
    emotionsratingsModalModel: emotionsratingsModalModel,
    editorModalModel: editorModalModel,
    bootstrapsliderModalModel: bootstrapsliderModalModel,
    nouisliderModalModel: nouisliderModalModel,
    barratingModalModel: barratingModalModel,
    signaturepadModalModel: signaturepadModalModel
  };

  surveyArray: any;
  activeSurveyId: any;

  activePage: EventEmitter<number> = new EventEmitter();
  private _surveyModel = new BehaviorSubject(null);
  _surveyModel$ = this._surveyModel.asObservable();
  // updateSurvey: EventEmitter<any> = new EventEmitter();
  activeComponent: EventEmitter<any> = new EventEmitter();
  surveyModel: Survey; pageIndex = 0;
  newQuestion; surveyCurrentLang;
  constructor(private _http: HttpClient) {

    this.getSurveyArray();
  }

  updateSurvey(surveyModel) {
    this._surveyModel.next(surveyModel);
  }
  createSurvey() {
    this.surveyArray = {};
    localStorage.removeItem('surveyArray');
    this.surveyModel = new SurveyController.Model();
    this.surveyModel.title = 'survey' + 1;
    this.surveyModel.id = 0;
    this.surveyModel.mode = 'display';
    // this.surveyModel.showTestSurveyTab=true;
    this.surveyModel.setDesignMode(true);
    this.surveyModel.dragAndDropAllow({});
    const newPage = this.surveyModel.addNewPage(this.surveyModel.generateNewName(this.surveyModel.pages, 'page'));

    this.surveyModel.name = 'survey' + 1;
    // this.updateSurvey(surveyModel);
    // this.saveSurveyArray();
    this.surveyArray = {
      mode: "display",
      title: 'survey1',
      id: 0,
      description: '',
      completedHtml: '',
      pages: [
        {
          name: newPage.name,
          elements: [

          ]
        }
      ]
    };
    localStorage.setItem('surveyArray', JSON.stringify(this.surveyArray));

    return this.surveyModel;
  }
  getLanguages() {
    return this._http.get(this.baseUrl + '/languages');
  }
  getDepartmentList() {
    return this._http.get(this.baseUrl + '/companies/charts/user/1');
  }
  getSurvey(surveyId) {
    // surveyId = Number(surveyId);
    // const survey = this.surveyArray.find(res => {
    //   return res.id === surveyId;
    // });
    return this.surveyArray;
  }
  setActiveSurvey(id) {
    this.activeSurveyId = id;
  }
  getCustomizedElement(widget, survey) {
    let newQuestion;
    if (widget.id === 15) {
      const tempPanel = this.surveyModel.generateNewName(this.surveyModel.currentPage.elements, widget.type);
      newQuestion = this.surveyModel.currentPage.addNewPanel(tempPanel);
    } else {
      newQuestion = this.surveyModel.currentPage.addNewQuestion(widget.type);
    }
    const oldObj = JSON.parse(JSON.stringify(widget));
    for (const key in oldObj) {
      if (oldObj.hasOwnProperty(key)) {
        if (key === 'name') {
          continue;
        }
        newQuestion[key] = JSON.parse(JSON.stringify(oldObj[key]));
        console.log(key + " -> " + oldObj[key]);
      }
    }
    // this.updateSurvey(survey);
    localStorage.setItem('surveyArray', JSON.stringify(this.surveyModel.toJSON()));
    // this.makeSurveyModel()
  }
  getQuestionBank() {
    return this._http.get(this.baseUrl + '/qbank');
  }
  searchCategory(category, pageNo) {
    return this._http.get(this.baseUrl + `/qbank/search/page/${category}?pageNo=${pageNo}&pageSize=5`);
  }
  getCategoryList(pageNo) {
    return this._http.get(this.baseUrl + `/qbank/all/page?pageNo=${pageNo}&pageSize=5`);
  }
  createCustomWidget(surveyModel, widget) {
    // var survey = surveyModel;

    const element = SurveyController.Serializer.createClass(widget["type"]);
    new SurveyController.JsonObject().toObject(widget, element);
    this.newQuestion = this.surveyModel.currentPage.addElement(element);
    if (widget['type'] === 'editor') {
      widget['name'] = surveyModel.generateNewName(surveyModel.currentPage.elements, widget.type);
    }
    // this.saveSurveyArray(widget, this.surveyModel);
    localStorage.setItem('surveyArray', JSON.stringify(this.surveyModel.toJSON()));
    // newQuestion.updateCustomWidget();
  }

  createNewComponent(surveyModel, item?) {
    // var newQuestion = <any>{};
    if (item.id === 15) {
      this.newQuestion = this.surveyModel.currentPage.addNewPanel();
      // item.name = newQuestion.title;
    } else if (typeof item['id'] === 'number') { // if (item.id === 16 || item.id < 15)
      this.newQuestion = this.surveyModel.currentPage.addNewQuestion(item.type);
      item.name = this.newQuestion.title;
    } else {
      this.getCustomizedElement(item, surveyModel);
      return false;
    }
    // this.updateSurvey(survey);
    localStorage.setItem('surveyArray', JSON.stringify(this.surveyModel.toJSON()));
    // newQuestion.updateQuestion();
  }

  getElementData(type: string) {
    return this._baseModels[type + 'BaseModel'];
  }
  getEditData(type: string) {
    return this._baseEditModels[type + 'ModalModel'];
  }
  makeSurveyModel(_JSON?) {
    // let surveyModel;
    const checkLocal = JSON.parse(localStorage.getItem('surveyArray'));
    // _JSON = checkLocal ? checkLocal : null;
    if (_JSON == null && checkLocal == null) {
      this.surveyModel = this.createSurvey();
      this.surveyModel.title = 'survey' + 1;
      this.surveyModel.id = 0;
      this.surveyModel.mode = 'display';
    } else {
      if (_JSON == null) {
        _JSON = checkLocal;
      }
      let oldPage;
      if (this.surveyModel) {
        oldPage = this.surveyModel.currentPage.visibleIndex;
      }
      this.surveyModel = new SurveyController.Model(_JSON);
      this.surveyModel.title = _JSON.title ? _JSON.title : 'survey1';
      this.surveyModel.id = _JSON.id ? _JSON.id : 0;
      this.surveyModel.mode = 'display';
      if (isNumber(oldPage)) {
        this.surveyModel.currentPage = this.surveyModel.pages[oldPage];
      }
      // this.surveyModel.showTestSurveyTab=true;
      this.surveyModel.setDesignMode(true);
      this.surveyModel.dragAndDropAllow({});
    }
    this.updateSurvey(this.surveyModel);
    // this.activePage.emit(this.surveyModel.currentPage);
    return this.surveyArray;
    // this.saveSurveyArray(undefined,undefined,undefined,_JSON);
  }
  getCurrentPageIndex() {
    // this.pageIndex = 0;
    this.surveyArray.pages.forEach((element, index) => {
      if (this.surveyModel.currentPage.name === element.name) {
        this.pageIndex = index;
      }
    });
  }
  saveSurveyArray(customWidget?, newQuestion?, overrideObject?, overrideSurvey?) {
    this.surveyArray = JSON.parse(localStorage.getItem('surveyArray'));
    if (overrideSurvey) {
      this.surveyArray = overrideSurvey;
    }
    this.getCurrentPageIndex();
    if (this.surveyArray.pages[this.pageIndex]['elements'] == null) {
      this.surveyArray.pages[this.pageIndex]['elements'] = [];
    }
    if (customWidget) {
      const objCopy = _.cloneDeep(customWidget);
      this.surveyArray.pages[this.pageIndex].elements.push(objCopy);
      const lastQuestion = this.surveyArray.pages[this.pageIndex].elements.length - 1;
      this.surveyArray.pages[this.pageIndex].elements[lastQuestion]['name']
        = this.surveyModel.pages[this.pageIndex].elements[lastQuestion]['name'];
    }
    if (overrideObject) {
      this.surveyArray.pages[this.pageIndex].elements.forEach(element => {
        if (element.name === overrideObject.name) {
          // tslint:disable-next-line:forin
          for (const property in overrideObject) {
            element[property] = overrideObject[property];
          }
          return element;
        }
      });
    }
    const data = JSON.parse(JSON.stringify(this.surveyArray));
    const dummyArray = data;
    // dummyArray['locale'] = this.surveyCurrentLang ? this.surveyCurrentLang :'en';
    localStorage.setItem('surveyArray', JSON.stringify(dummyArray));
    this.makeSurveyModel(dummyArray);
    // this.updateSurvey(this.surveyModel);
    // SurveyController.SurveyNG.render('surveyElement', { model: dummyArray });
  }

  getSurveyArray() {
    return this.surveyArray;
  }
  getJson(questionParam) {
    let returnVal;
    this.surveyArray = JSON.parse(localStorage.getItem('surveyArray'));
    this.surveyArray.pages.forEach(page => {
      if (page['elements'] != null) {
        page.elements.forEach(question => {
          if (question.name === questionParam.name || question.id === questionParam.id) {
            returnVal = question;
            return returnVal;
          }
        });
      }
    });
    return returnVal;
  }
}
