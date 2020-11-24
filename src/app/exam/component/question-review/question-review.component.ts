import { Component, OnInit, Input } from '@angular/core';
import { Question, QuestionType } from '../../models/question';

@Component({
  selector: 'app-question-review',
  templateUrl: './question-review.component.html',
  styleUrls: ['./question-review.component.scss']
})
export class QuestionReviewComponent implements OnInit {

  @Input() question: Question;
  @Input() questionIndex: number;
  @Input() liteStyle;
  questionTypeText: string;
  constructor() { }

  ngOnInit() {
    switch (this.question.type) {
      case QuestionType.checkbox:
        this.questionTypeText = 'Multiple Choices';
        break;

      case QuestionType.radiogroup:
        this.questionTypeText = 'Single Choice';
        break;

      case QuestionType.boolean:
        this.questionTypeText = 'True or False';
        break;

      case QuestionType.text:
        this.questionTypeText = 'Type the answer';
        break;
    }
  }

  getQuestionCode(QuestionNumber: number) {
    let code = '';
    let powerLevel = 3;
    let remain = (QuestionNumber + 1) / Math.pow(25, powerLevel);
    while (powerLevel + 1) {
      if (Math.floor(remain)) {
        code += String.fromCharCode(64 + remain % 25);
      }
      powerLevel--;
      remain = (QuestionNumber + 1) / Math.pow(25, powerLevel);
    }
    return code;
  }

}
