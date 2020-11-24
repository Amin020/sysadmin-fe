import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Page } from '../../models/page';

@Component({
  selector: 'app-question-review-container',
  templateUrl: './question-review-container.component.html',
  styleUrls: ['./question-review-container.component.scss']
})
export class QuestionReviewContainerComponent implements OnInit {

  @Output() editQuestions = new EventEmitter();
  @Input() pages: Array<Page>;
  activePageIndex: number;

  constructor() { }

  ngOnInit() {
    this.activePageIndex = 0;
  }

  editQuestion() {
    this.editQuestions.emit();
  }

}
