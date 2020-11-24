import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as widgets from 'surveyjs-widgets';
// import * as SurveyPDF from 'survey-pdf';

import 'inputmask/dist/inputmask/phone-codes/phone.js';
import { BuilderService } from '../../shared/services/builder/builder.service';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
import * as showdown from 'showdown';
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
  selector: 'app-builder-test',
  templateUrl: './builder-test.component.html',
  styleUrls: ['./builder-test.component.scss']
})
export class BuilderTestComponent implements OnInit {
  link: string; id; surveyData; backupSurveyBody; surveyCurrentLang = 'en'; optionsSelect: any; survey; logo; themeValue;
  themeList = [
    "default", "bootstrap", "orange", "darkblue", "darkrose", "stone", "winter", "winterstone"
  ]; url; type; modifiedData;
  constructor(private router: ActivatedRoute, private _BuilderService: BuilderService,
    private suerveys: SurveyManagementService) {
  }

  ngOnInit() {
    const id = this.router.snapshot.params['id'];
    const origin = location.origin;
    this.link = origin + '/test-survey/' + id;
    this.generateModel();
  }

  generateModel() {
    this._BuilderService._surveyModel$.subscribe((res: any) => {
      let surveyStorage = JSON.parse(localStorage.getItem('surveyArray'));
      this.survey = new Survey.Model(surveyStorage);
      this.survey['background'] = res.background;
      this.survey['logo'] = res.logo;
      this.survey['logoPosition'] = res.logoPosition;
      this.survey['logoStyle'] = res.logoStyle;
      this.survey['mode'] = 'edit';
      this.survey.currentPage = this.survey.pages[this._BuilderService.pageIndex];
      this.addImages();
      this.render(this.survey);
    })
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

  render(model) {
    Survey.SurveyNG.render('surveyElementxx', { model: model });
  }
  copyToClipboard(item) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
}
