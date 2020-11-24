import { Component, OnInit } from '@angular/core';
import { BuilderService } from '../../shared/services/builder/builder.service';

@Component({
  selector: 'app-builder-home-page',
  templateUrl: './builder-home-page.component.html',
  styleUrls: ['./builder-home-page.component.scss']
})
export class BuilderHomePageComponent implements OnInit {
  surveyArray = [];
  constructor(private _BuilderService: BuilderService) { }

  ngOnInit() {
    // this.surveyArray = this._BuilderService.getSurveyArray();
  }
  createSurvey() {
    this._BuilderService.createSurvey();
    // this.surveyArray.push();

  }
  openSurvey(id) {
    console.log(id);
  }

}
