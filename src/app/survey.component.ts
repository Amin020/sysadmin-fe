import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
// import * as Survey from 'survey-angular';
const SurveyDefault = require('../libFile/survey');
const Survey = SurveyDefault.default;
// import 'inputmask/dist/inputmask/phone-codes/phone.js';

@Component({
  selector: 'app-survey',
  template: `<div class='survey-container contentcontainer codecontainer'>
   <button style= '
    background-color: #1ab394;
    color: white;
    border: none;
    border-radius: 2px;
    margin: 5px;
    font-weight: bold;
    font-size: 12px;' (click)="create()">create new text question</button>
  <div id='surveyElement'></div></div>`
})
export class SurveyComponent implements OnInit {

  surveyModel;
  counter = 0;
  ngOnInit() {

    this.surveyModel = new Survey.Model();
    // this.surveyModel.currentPage = this.surveyModel.addNewPage('assigPage');

    this.surveyModel.currentPage = this.surveyModel.addNewPage(this.surveyModel.generateNewName(this.surveyModel.pages, 'page'));

    this.surveyModel.onComplete
      .add(result =>
        console.log(result.data)
      );
    this.surveyModel.onComplete.add(function (result) {
      document.querySelector('#surveyElement').textContent = "Result JSON:\n" + JSON.stringify(result.data, null, 3);
    });
    this.render();
  }
  create() {
    if (this.surveyModel.currentPage) {
      this.surveyModel.currentPage.addNewQuestion('text', `question ${this.counter}`);
    } else if (this.surveyModel.pages[0]) {
      this.surveyModel.pages[0].elements.push(this.surveyModel.pages[0].addNewQuestion('text', `question ${this.counter}`));
    }
    this.render();
    this.counter++;
  }

  render() {
    Survey.SurveyNG.render('surveyElement', { model: this.surveyModel });
  }


}
