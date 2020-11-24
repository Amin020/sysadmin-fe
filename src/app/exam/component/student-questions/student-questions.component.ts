import { Component, Input, OnInit } from '@angular/core';
import { Question, QuestionType } from '../../models/question';

@Component({
  selector: 'app-student-questions',
  templateUrl: './student-questions.component.html',
  styleUrls: ['./student-questions.component.scss']
})
export class StudentQuestionsComponent implements OnInit {

  questionType = QuestionType;
  @Input() questions: Array<Question>;
  @Input() showRemark: boolean;
  @Input() totalQuestion: number;
  @Input() opener = 'mark';
  constructor() { }

  ngOnInit() {
  }

  getQuestionTypeText(question: Question) {
    switch (question.type) {
      case QuestionType.checkbox:
        return 'Multiple Choices';
      case QuestionType.radiogroup:
        return 'Single Choice';
      case QuestionType.boolean:
        return 'True or False';
      case QuestionType.text:
        return 'Type the answer';
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

  updateSelectedAnswer(event, answer, question?) {
    if (question) {
      question.answers.forEach(element => {
        element.isSelected = false;
      });
      question.answer = answer.value.default;
      answer.isSelected = true;
      return;
    }
    answer.isSelected = event.checked;
  }

}
