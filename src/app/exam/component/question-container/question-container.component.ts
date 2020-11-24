import { Component, OnInit, Input } from '@angular/core';
import { QuestionType, CheckboxQuestion, RadiogroupQuestion, BooleanQuestion, TextQuestion } from '../../models/question';
import { Page } from '../../models/page';
import { ExamSettings } from '../../models/exam-settings';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question-container',
  templateUrl: './question-container.component.html',
  styleUrls: ['./question-container.component.scss']
})
export class QuestionContainerComponent implements OnInit {

  questionType = QuestionType;
  @Input() pages: Array<Page>;
  @Input() examSettings;
  @Input() isSurvey: boolean;
  activePageIndex;
  constructor(private toaster: ToastrService) { }

  ngOnInit() {
    this.activePageIndex = 0;
  }

  addNewPage() {
    const lastPageNumber = /\d+/.exec(this.pages[this.pages.length - 1].name.default);
    if (this.pages.some(page => !page.elements.length)) {
      this.toaster.error('Add Question to all pages at first');
      return;
    }
    this.activePageIndex = this.pages.length;
    this.pages.push(new Page('Page ' + (+lastPageNumber[0] + 1)));
  }

  changeActivePage(newIndex) {
    this.activePageIndex = newIndex;
  }

  addNewQuestion(type) {
    let newQuestion;
    switch (type) {
      case QuestionType.checkbox:
        newQuestion = new CheckboxQuestion();
        break;
      case QuestionType.radiogroup:
        newQuestion = new RadiogroupQuestion();
        break;
      case QuestionType.boolean:
        newQuestion = new BooleanQuestion();
        break;
      case QuestionType.text:
        newQuestion = new TextQuestion();
        break;
      default:
        break;
    }
    this.pages[this.activePageIndex].elements.push(newQuestion);
  }

  removeQuestion(index) {
    this.pages[this.activePageIndex].elements.splice(index, 1);
  }

  removePage(index) {
    if (this.pages.length === 1) {
      this.pages[0].elements = [];
    } else {
      if (index < this.activePageIndex && this.activePageIndex !== 0) {
        this.activePageIndex--;
      } else if (this.activePageIndex === index) {
        this.activePageIndex = 0;
      }
      this.pages.splice(index, 1);
    }
  }

}
