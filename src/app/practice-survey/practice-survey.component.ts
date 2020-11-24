import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as widgets from 'surveyjs-widgets';
// import * as SurveyPDF from 'survey-pdf';
import { LoaderService } from 'src/app/core/loader.service';
// import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
// import { ModalDirective } from 'ng-uikit-pro-standard';

import 'inputmask/dist/inputmask/phone-codes/phone.js';
import { SurveyManagementService } from '../services/survey-management.service';
import { Location } from '@angular/common';
import * as showdown from 'showdown';
// import { Observable } from 'rxjs/Observable';
const SurveyDefault = require('../../libFile/survey');
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
  selector: 'app-practice-survey',
  templateUrl: './practice-survey.component.html',
  styleUrls: ['./practice-survey.component.scss']
})
export class PracticeSurveyComponent implements OnInit {
  id; surveyData; backupSurveyBody; oldSelectedLang = 'en'; survey; logo; themeValue;
  url; type; optionsSelect = []; surveyCurrentLang = 'en'; completed = false;

  surveyResults;

  dirtyQuestions = [];
  constructor(private route: ActivatedRoute,
    private suerveys: SurveyManagementService, private location: Location, private loaderSerivce: LoaderService) {

  }

  onChangeTheme() {
    Survey
      .StylesManager
      .applyTheme(this.themeValue);
  }
  ngOnInit() {
    this.optionsSelect = [
      { value: 'en', label: 'english' },
      { value: 'ar', label: 'العربية' },
      { value: 'ca', label: 'català' },
      { value: 'cz', label: 'čeština' },
      { value: 'da', label: 'dansk' },
      { value: 'de', label: 'deutsch' },
      { value: 'es', label: 'español' },
      { value: 'fa', label: 'فارْسِى' },
      { value: 'fi', label: 'suomalainen' },
      { value: 'fr', label: 'français' },
      { value: 'gr', label: 'ελληνικά' },
      { value: 'he', label: 'עברית' },
      { value: 'hu', label: 'magyar' },
      { value: 'bg', label: 'Bulgarian' },
      { value: 'id', label: 'Bahasa Indonesia' },
      { value: 'is', label: 'íslenska' },
      { value: 'it', label: 'italiano' },
      { value: 'ja', label: '日本語' },
      { value: 'ka', label: 'ქართული' },
      { value: 'ko', label: '한국어' },
      { value: 'lt', label: 'Lietuvių' },
      { value: 'lv', label: 'latviešu' },
      { value: 'nl', label: 'nederlands' },
      { value: 'no', label: 'norsk' },
      { value: 'pl', label: 'polski' },
      { value: 'pt', label: 'português' },
      { value: 'ro', label: 'română' },
      { value: 'ru', label: 'русский' },
      { value: 'sv', label: 'svenska' },
      { value: 'tr', label: 'türkçe' },
      { value: 'ua', label: 'українська' },
      { value: 'zh-cn', label: '简体中文' },
      { value: 'zh-tw', label: '繁體中文' }]
    this.id = this.route.snapshot.params['id'];
    this.surveyCurrentLang = this.route.snapshot.params['lang'];
    this.type = this.route.snapshot.params['type'];
    this.getSelectedSurvey();
  }
  changeLang() {
    this.survey['locale'] = this.surveyCurrentLang;
    if (this.surveyCurrentLang == 'ar') {
      localStorage.setItem('currentLang', JSON.stringify(this.surveyCurrentLang));
      this.location.go(`/practice-survey/${this.id}/${this.surveyCurrentLang}/${this.type}`);
      location.reload();
    } else if (this.oldSelectedLang == 'ar') {
      localStorage.setItem('currentLang', JSON.stringify(this.surveyCurrentLang));
      this.location.go(`/practice-survey/${this.id}/${this.surveyCurrentLang}/${this.type}`);
      location.reload();
    }
    this.oldSelectedLang = this.surveyCurrentLang;
  }
  generateModel(data) {
    this.survey = new Survey.Model(this.backupSurveyBody);
    this.addImages();
    this.survey['background'] = `url(${data.surveyBackground})`;
    this.survey['logo'] = this.logo;
    this.survey['logoPosition'] = data.logoPosition;
    this.survey['logoStyle'] = data.logoStyle;
    var surveyModalDB = data.surveyBody;
    if (surveyModalDB['pages']) {
      surveyModalDB.pages.forEach((page) => {
        if (page['elements']) {
          page.elements.forEach((element) => {
            if (element['score'] || element['ref']) {
              this.survey.getQuestionByName(element.name)['ref'] = element['ref'];
              this.survey.getQuestionByName(element.name)['score'] = element['score'];
            }
          });
        }
      });
    }
    this.survey['locale'] = this.surveyCurrentLang;
    this.oldSelectedLang = this.surveyCurrentLang;
    // this.survey.currentPage = this.survey.pages[this._BuilderService.pageIndex];

    // Survey.StylesManager.applyTheme("bootstrap");
    this.render(this.survey);
    let $this = this;
    this.survey.onComplete.add(function (sender) {
      var modifiedData = Object.keys(sender.data).map(function (qName) {
        return {
          name: sender.getQuestionByName(qName).name,
          score: $this.getScore(sender, qName),
          correctAnswer: sender.getQuestionByName(qName).correctAnswer,
          questionValue: sender.getQuestionByName(qName).questionValue
        };
      });
      localStorage.setItem('answer', JSON.stringify(sender.data));
      $this.submitSurvey(modifiedData);
      // $this.submitSurvey(sender.data);
    });
    // let $this=this;
    this.survey
      .onValueChanged
      .add(function (sender, options) {
        console.log(sender)
        if ($this.dirtyQuestions.find(x => x.name == options.name)) {
          if (options.question.bookmark) {
            $this.dirtyQuestions[options.name] = options;
          } else {
            delete $this.dirtyQuestions[options.name];
          }
        } else {
          if (options.question['bookmark']) {
            if (typeof options.value == 'object') {
              options['object'] = options.value.join();
            }
            $this.dirtyQuestions.push(options);
          }
        }
      });
  }

  addImages() {
    const converter = new showdown.Converter();
    this.survey.onTextMarkdown.add(function (survey, options) {
      let str = converter.makeHtml(options.text);
      str = str.substring(3);
      str = str.substring(0, str.length - 4);
      options.html = str;
    });
  }

  changeQuestionValue(question) {
    if (typeof question.value == 'object') {
      question['object'] = question.value.split(',');
    }
    this.survey.setValue(question.name, question.value);
  }
  getScore(sender, qName) {
    if (sender.getQuestionByName(qName).correctAnswer == sender.getQuestionByName(qName).questionValue) {
      return sender.getQuestionByName(qName).score
    } else {
      return 0;
    }
  }
  render(model) {
    Survey.SurveyNG.render('surveyElementxx', {
      model: model,
      // onValueChanged: this.surveyValueChanged()
    });
  }
  // surveyValueChanged(sender?, options?) {
  //   var el = document.getElementById(options['name']);
  //   if (el) {
  //     el['value'] = options['value'];
  //   }
  // }
  submitSurvey(answer) {
    let firstName = JSON.parse(localStorage.getItem('userData')).firstName;
    const body = {
      "xsurvey": { "id": this.id },
      "surveyAnswers": answer,
      "createdBy": "MNABIL",
      "editBy": "MNABIL",
      "ip": ".168.101.101",
      "macAddress": "00000000000000000000",
      "user": firstName ? firstName : 'medo'
    }
    // var seralizeBody = JSON.stringify(answer);
    // body.surveyAnswers = seralizeBody.replace("\"", "\\\\\"")
    this.suerveys.submitAnswer(body).subscribe((res: any) => {
      // this.getSurveyResponse();
    });
  }
  getSurveyResponse() {
    let $this = this;
    this.suerveys.getSurveyResponse(this.id)
      .subscribe((res: any) => {
        this.surveyResults = res;
        $this.completed = true;
      })
  }
  getSelectedSurvey() {
    this.suerveys.getSecuredSurvey(this.type, this.id).subscribe(
      (data: any) => {
        if (data != null) {
          this.mapSurveyData(data);
          this.generateModel(data);
          this.loaderSerivce.isLoading.next(false);
        }
      },
      error => { }
    )
  }
  mapSurveyData(data) {
    // this.deserializeSurveyBody(data);
    this.surveyData = data;
    localStorage.setItem('surveyArray', JSON.stringify(data));
    this.logo = data.logo;
    this.themeValue = this.surveyData.surveytheme;
    Survey
      .StylesManager
      .applyTheme(this.themeValue);
    this.backupSurveyBody = this.surveyData["surveyBody"]['surveyBody'] ? this.surveyData["surveyBody"]['surveyBody'] : this.surveyData["surveyBody"];
    this.backupSurveyBody['mode'] = 'edit'
  }

}
