import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ExamSettings } from '../../models/exam-settings';
import { KeyValue } from '@angular/common';

@Component({
  selector: 'app-exam-setting-review',
  templateUrl: './exam-setting-review.component.html',
  styleUrls: ['./exam-setting-review.component.scss']
})
export class ExamSettingReviewComponent implements OnInit {

  @Input() examSetting: ExamSettings;
  @Output() changeActiveTab = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  originalOrder = (a: KeyValue<string, string>, b: KeyValue<number, string>): number => {
    return 0;
  }

  editExamSetting() {
    this.changeActiveTab.emit(1);
  }


}
