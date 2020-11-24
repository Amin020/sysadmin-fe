import { Component, Input, OnInit } from '@angular/core';
import { Survey } from '../../models/survey.model';

@Component({
  selector: 'app-survey-translate',
  templateUrl: './survey-translate.component.html',
  styleUrls: ['./survey-translate.component.scss']
})
export class SurveyTranslateComponent implements OnInit {

  @Input() survey: Survey;
  showAllPages: boolean;
  pagesNames = [];
  searchValue = '';
  selectedPageIndex;
  targetLanguage = 'Ar';
  viewedPages = [];

  languages = [
    {
      key: 'Ar',
      name: 'عربي'
    },
    {
      key: 'Fr',
      name: 'French'
    }
  ];
  constructor() { }

  ngOnInit() {
    this.pagesNames = this.survey.pages.map((page, index) => {
      return {
        index,
        name: page.name.default
      };
    });
    this.pagesNames.splice(0, 0, { index: -1, name: 'config' });
    this.selectedPageIndex = -1;
  }

  applySearch() {

  }

  changeSelectedPage() {
    if (this.showAllPages) {
      this.viewedPages = this.survey.pages;
    } else if (+this.selectedPageIndex !== -1) {
      this.viewedPages = [this.survey.pages[this.selectedPageIndex]];
    } else {
      this.viewedPages = [];
    }
  }

  clearAcivePage() {
    this.viewedPages.forEach(page => {
      page.name[`${this.targetLanguage}`] = '';
      page.elements.forEach(question => {
        question.name[`${this.targetLanguage}`] = '';
        question.answers.forEach(answer => {
          answer.value[`${this.targetLanguage}`] = '';
        });
      });
    });
  }

}
