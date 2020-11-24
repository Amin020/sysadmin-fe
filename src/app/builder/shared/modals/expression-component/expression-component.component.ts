import { Component, OnInit, Input } from '@angular/core';
import equationQuestionOperators from '../../data/modals-data/equation-question-operators';

@Component({
  selector: 'app-expression-component',
  templateUrl: './expression-component.component.html',
  styleUrls: ['./expression-component.component.scss']
})
export class ExpressionComponentComponent implements OnInit {

  @Input() value: any;
  @Input() prop: any;
  @Input() question: any;
  mentionConfig = {
    mentions: [
      {
        items: [],
        triggerChar: '{'
      },
      {
        items: [],
        triggerChar: '}'
      },
    ]
  };
  questions: any;
  options: any;

  constructor() { }

  ngOnInit() {
    this.questions = this.question.data.getAllQuestions();
    this.options = equationQuestionOperators;

    this.questions.filter(res => {
      this.mentionConfig.mentions[0].items.push(res.name);
    });
    this.options.filter(res => {
      this.mentionConfig.mentions[1].items.push(res.value);
    });
  }

  getValue() {
    return this.value;
  }
}
