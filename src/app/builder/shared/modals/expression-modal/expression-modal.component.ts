import { Component, OnInit, Input } from '@angular/core';
import { MDBModalRef } from 'ng-uikit-pro-standard';
import { Subject } from 'rxjs';
import { ModalService } from '../../services/modal/modal.service';
import equationQuestionOperators from '../../data/modals-data/equation-question-operators';

@Component({
  selector: 'app-expression-modal',
  templateUrl: './expression-modal.component.html',
  styleUrls: ['./expression-modal.component.scss']
})
export class ExpressionModalComponent implements OnInit {
  item: any;
  value: any;
  question: any;
  options: any;
  selectedOption: any;
  selectedQuestion: any;
  equationValue: string;
  questions: any;
  action: Subject<any> = new Subject();
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

  constructor(public modalRef: MDBModalRef, private modalService: ModalService) { }

  ngOnInit() {
    // this.questions = this.question.data.getAllQuestions();
    // this.options = equationQuestionOperators;

    // this.questions.filter(res => {
    //   this.mentionConfig.mentions[0].items.push(res.name);
    // });
    // this.options.filter(res => {
    //   this.mentionConfig.mentions[1].items.push(res.value);
    // });
  }

  okAction(data) {
    this.modalService.okAction(this.action, this.modalRef, data);
  }
  applyAction(data) {
    this.modalService.applyAction(this.action, data);
  }
  cancelAction() {
    this.modalService.cancelAction(this.modalRef);
  }

}
