import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from '../../shared/services/builder/builder.service';
// import { TrustedStyleString } from '@angular/core/src/sanitization/bypass';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
// import * as Survey from 'survey-angular';
const SurveyDefault = require('../../../../libFile/survey');
const Survey = SurveyDefault.default;

// import * as Survey from 'survey-angular';
import 'survey-angular/survey.css';
import * as widgets from 'surveyjs-widgets';
import 'inputmask/dist/inputmask/phone-codes/phone.js';
import * as showdown from 'showdown';
// import { Observable } from 'rxjs/Observable';
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

// Survey.JsonObject.metaData.addProperty('questionbase', 'popupdescription:text');
// Survey.JsonObject.metaData.addProperty('page', 'popupdescription:text');
@Component({
  selector: 'app-builder-sketch-page',
  templateUrl: './builder-sketch-page.component.html',
  styleUrls: ['./builder-sketch-page.component.scss']
})
export class BuilderSketchPageComponent implements OnInit {
  serviceCall;
  surveyModel;
  backupSurveyBody;
  activePage; firstTime = true;
  @Input() surveyId: string;
  @Input() logo: string; currentPage;
  @Input() background: string;
  @Input() surveyLogoPosition: string
  @Input() logoStyle: string
  constructor(public _BuilderService: BuilderService, private manageServ: SurveyManagementService) {
    // get surveyId

  }

  ngOnInit() {
    this.checkData();
    this._BuilderService.activePage.subscribe(page => {
      this.activePage = page;
      // this.surveyModel.currentPage = page;
      // this.updateSelectedElement(page, 'selected');
      // this.constructDropDownData(this.surveyModel);
    });
  }
  // saveDataApi(){
  //   this.manageServ.updateSurveyById(this.surveyModel.id,)
  // }
  // canDeactivate() {
  //   return true;
  // }
  removePage(page) {
    if (this.surveyModel.pages.length != 1) {
      this.surveyModel.removePage(page);
      localStorage.setItem('surveyArray', JSON.stringify(this.surveyModel.toJSON()));
      this.surveyModel.currentPage = this.activePage;
      this._BuilderService.activePage.emit(this.activePage);
      this._BuilderService.pageIndex = this.activePage.visibleIndex;
    }
  }

  checkData() {
    this._BuilderService._surveyModel$.subscribe((surveyModel: any) => {
      // this.surveyModel = model;
      if (surveyModel) {
        this.surveyModel = surveyModel;
        this.addImages();
        this.surveyModel['background'] = `url(${this.background})`;
        this.surveyModel['logoPosition'] = this.surveyLogoPosition;
        this.surveyModel['logoStyle'] = this.logoStyle;
        console.log(this.surveyModel.background);
        this.surveyModel['logo'] = this.logo;
        var surveyModalDB = JSON.parse(localStorage.getItem('surveyArray'));
        if (surveyModalDB['pages']) {
          surveyModalDB.pages.forEach((page, pageIndex) => {
            if (page['elements']) {
              page.elements.forEach((element, elementIndex) => {
                if (element['score'] || element['ref']) {
                  this.surveyModel.pages[pageIndex].elements[elementIndex]['ref'] = element['ref'];
                  this.surveyModel.pages[pageIndex].elements[elementIndex]['score'] = element['score'];
                }
              });
            }
          });
        }
        this.backupSurveyBody = JSON.parse(localStorage.getItem('surveyArray'));;
        // this._BuilderService.saveSurveyArray(model, this.surveyModel.currentPage);
        this.surveyModel.currentPage = this.surveyModel.pages[this._BuilderService.pageIndex];
        this.activePage = this.surveyModel.currentPage;
        this.render(this.surveyModel);
      }
    })
  }

  addImages() {
    //Create showdown mardown converter
    const converter = new showdown.Converter();
    this.surveyModel.onTextMarkdown.add(function (survey, options) {
      //convert the mardown text to html
      let str = converter.makeHtml(options.text);
      //remove root paragraphs <p></p>
      str = str.substring(3);
      str = str.substring(0, str.length - 4);
      //set html
      options.html = str;
    });
  }


  addNewPage() {
    // this.surveyModel = this._BuilderService.getSurvey(this.surveyId);
    if (this.surveyModel) {
      // this.activePage = this.surveyModel.addNewPage('page' + this.surveyModel.pages.length);
      this.activePage = this.surveyModel.addNewPage(this.surveyModel.generateNewName(this.surveyModel.pages, 'page'));
      this.surveyModel.currentPage = this.activePage;
      this._BuilderService.activePage.emit(this.activePage);
      this.addPageinLocalStorage();
      // this._BuilderService.saveSurveyArray();
    }
  }
  addPageinLocalStorage() {
    var surveyLocalStorage = JSON.parse(localStorage.getItem('surveyArray'));
    let newPage = {
      name: this.activePage.name,
      elements: [

      ]
    }
    surveyLocalStorage.pages.push(newPage);
    localStorage.setItem('surveyArray', JSON.stringify(surveyLocalStorage))
  }
  checkboxChange() {
    console.log(this.activePage);
    if (this.activePage === -1) {
      this.addNewPage();
    } else {
      this.surveyModel.currentPage = this.activePage;
      this._BuilderService.activePage.emit(this.activePage);
      this._BuilderService.pageIndex = this.activePage.visibleIndex;
      // this._BuilderService.saveSurveyArray(this.surveyModel.currentPage);
    }
  }
  addtToolBoxAction() {
    console.log()
  }
  render(model) {
    Survey.SurveyNG.render('surveyElement', { model: model });
  }



}
