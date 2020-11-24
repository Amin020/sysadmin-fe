import { Component, OnInit, Input } from '@angular/core';
import { Utilities } from 'src/app/core/utilities';
import { Router } from '@angular/router';
import { ExamSettings } from '../../models/exam-settings';

@Component({
  selector: 'app-exam-setting',
  templateUrl: './exam-setting.component.html',
  styleUrls: ['./exam-setting.component.scss']
})
export class ExamSettingComponent implements OnInit {

  utilities = new Utilities();
  @Input() settings: ExamSettings;
  constructor(private router: Router) { }

  ngOnInit() {
  }

  updateSelectedLanguage(event, value) {
    if (event.checked) {
      this.settings.selectedLanguage = value;
    } else {
      this.settings.selectedLanguage = "";
    }
  }

}
