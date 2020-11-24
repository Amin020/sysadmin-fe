import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import equationQuestionOperators from '../../data/modals-data/equation-question-operators';
import { Question } from 'survey-angular';



@Component({
  selector: 'app-equation-component',
  templateUrl: './equation-component.component.html',
  styleUrls: ['./equation-component.component.scss']
})
export class EquationComponentComponent implements OnInit {

  @Input() item: any;
  @Input() question: any;
  @Input() showfirst: boolean;
  @Input() prop: string;
  @Input() value: string;
  @Output() outputValue = new EventEmitter();

  // value: any;
  options: any;
  selectedOption: any;
  selectedQuestion: any;
  equationValue: string;
  questions: any;

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


  constructor() { }

  ngOnInit() {
    // show all questions in the survey
    this.questions = this.question.data.getAllQuestions();
    this.questions = this.questions.filter(q => {
      if (!this.showfirst) {
        return q.name !== this.question.name;
      }
      return true;
    });
    this.options = equationQuestionOperators;

    this.questions.filter(res => {
      this.mentionConfig.mentions[0].items.push(res.name);
    });
    this.options.filter(res => {
      this.mentionConfig.mentions[1].items.push(res.value);
    });

  }

  operatorChange() {
    console.log(this.selectedOption);
  }

  addEquation() {
    if (this.selectedOption.disableInput) {
      if (this.value) {
        this.value += ' and {' + this.selectedQuestion + '} ' + this.selectedOption.value;

      } else {
        this.value = '{' + this.selectedQuestion + '} ' + this.selectedOption.value;
      }

    } else {
      if (this.value) {
        this.value += ' and {' + this.selectedQuestion + '} ' + this.selectedOption.value + ' ' + this.equationValue;
      } else {
        this.value = '{' + this.selectedQuestion + '} ' + this.selectedOption.value + ' ' + this.equationValue;
      }
    }
    this.selectedQuestion = '';
    this.selectedOption = '';
    this.equationValue = '';

    this.emit();
  }
  emit() {
    this.outputValue.emit(this.value);
  }

  getValue() {
    return this.value;
  }
}
