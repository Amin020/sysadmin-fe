import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as widgets from 'surveyjs-widgets';
// import * as SurveyPDF from 'survey-pdf';
import { LoaderService } from 'src/app/core/loader.service';

import 'inputmask/dist/inputmask/phone-codes/phone.js';
import { BuilderService } from 'src/app/builder/shared/services/builder/builder.service';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
import * as showdown from 'showdown';
// import { Observable } from 'rxjs/Observable';
const SurveyDefault = require('../../../libFile/survey');
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
  selector: 'app-test-survey',
  templateUrl: './test-survey.component.html',
  styleUrls: ['./test-survey.component.scss']
})
export class TestSurveyComponent implements OnInit {
  id; surveyData; backupSurveyBody; surveyCurrentLang = 'en'; optionsSelect: any; survey; logo; themeValue;
  themeList = [
    "default", "bootstrap", "orange", "darkblue", "darkrose", "stone", "winter", "winterstone"
  ]; url; type; modifiedData;
  constructor(private _BuilderService: BuilderService, private route: ActivatedRoute,
    private suerveys: SurveyManagementService, private loaderSerivce: LoaderService) {

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
    console.log(location.origin)
    this.getSelectedSurvey();
  }
  changeLang() {
    this.survey['locale'] = this.surveyCurrentLang;
    this.url = location.origin + '/practice-survey/' + this.id + `/${this.surveyCurrentLang}/${this.type}`;
  }


  generateModel(data) {
    this.survey = new Survey.Model(this.backupSurveyBody);
    this.addImages();
    this.survey['background'] = `url(${data.surveyBackground})`;
    this.survey['logo'] = this.logo;
    this.survey['logoPosition'] = data.logoPosition;
    this.survey['logoStyle'] = data.logoStyle;
    this.survey['mode'] = 'edit';
    var surveyModalDB = this.backupSurveyBody;
    if (surveyModalDB['pages']) {
      surveyModalDB.pages.forEach((page, pageIndex) => {
        if (page['elements']) {
          page.elements.forEach((element, elementIndex) => {
            if (element['score'] || element['ref']) {
              this.survey.pages[pageIndex].elements[elementIndex]['ref'] = element['ref'];
              this.survey.pages[pageIndex].elements[elementIndex]['score'] = element['score'];
            }
          });
        }
      });
    }

    this.addImages();
    this.changeLang();
    this.survey.currentPage = this.survey.pages[this._BuilderService.pageIndex];

    // Survey.StylesManager.applyTheme("bootstrap");
    this.render(this.survey);
    let $this = this;
    this.survey.onComplete.add(function (sender, options) {
      var modifiedData = Object.keys(sender.data).map(function (qName) {

        return {
          name: sender.getQuestionByName(qName).name,
          score: $this.getScore(sender, qName),
          correctAnswer: sender.getQuestionByName(qName).correctAnswer,
          questionValue: sender.getQuestionByName(qName).questionValue
        };
      });
      localStorage.setItem('answer', JSON.stringify(sender.data));
      $this.modifiedData = modifiedData
      // document.querySelector('#surveyScore').innerHTML = "Score result: " + JSON.stringify(modifiedData);

      // $this.submitSurvey(sender.data);
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


  getScore(sender, qName) {
    if (sender.getQuestionByName(qName).correctAnswer == sender.getQuestionByName(qName).questionValue) {
      return sender.getQuestionByName(qName).score
    } else {
      return 0;
    }
  }
  render(model) {
    Survey.SurveyNG.render('surveyElementxx', { model: model });
  }
  // saveSurveyToPdf(answer) {
  //   var options = {
  //     fontSize: 14,
  //     margins: {
  //       left: 10,
  //       right: 10,
  //       top: 10,
  //       bot: 10
  //     },
  //     format: [500, 500]
  //   };
  //   var surveyPDF = new surveyPDF.SurveyPDF(this.survey.toJSON(), options);
  //   surveyPDF.data = answer;
  //   surveyPDF.save('answers');
  // }
  submitSurvey(answer) {
    const body = {
      "xsurvey": { "id": this.id },
      "surveyAnswers": answer,
      "createdBy": "MNABIL",
      "editBy": "MNABIL",
      "ip": "192.168.101.101",
      "macAddress": "00000000000000000000",
      "user": { id: 1 }
    }
    // var seralizeBody = JSON.stringify(answer);
    // body.surveyAnswers = seralizeBody.replace("\"", "\\\\\"")
    // this.suerveys.submitAnswer(body).subscribe((res) => {
    // });
  }
  getSelectedSurvey() {
    this.suerveys.getSurveyById(this.id).subscribe(
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
    this.surveyData = data;
    this.logo = data.logo;
    this.themeValue = this.surveyData.surveytheme;
    Survey
      .StylesManager
      .applyTheme(this.themeValue);
    this.backupSurveyBody = this.surveyData["surveyBody"];
    this.backupSurveyBody['mode'] = 'edit';
    this.type = this.surveyData.public ? 'public' : 'private';
    this.url = location.origin + '/practice-survey/' + this.id + `/${this.surveyCurrentLang}/${this.type}`;
  }
}
