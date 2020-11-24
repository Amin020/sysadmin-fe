import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { BuilderService } from 'src/app/builder/shared/services/builder/builder.service';
import { LoaderService } from 'src/app/core/loader.service';
import { Utilities } from 'src/app/core/utilities';
import { PreferencesService } from 'src/app/services/preferences.service';
import { SurveySettings } from '../../models/survey.model';

@Component({
  selector: 'app-survey-settings',
  templateUrl: './survey-settings.component.html',
  styleUrls: ['./survey-settings.component.scss']
})
export class SurveySettingsComponent implements OnInit {

  @Input() settings: SurveySettings;
  @Input() departments;
  allStatus = [];
  themes = [
    'default', 'bootstrap', 'orange', 'darkblue', 'darkrose', 'stone', 'winter', 'winterstone'
  ];
  groups = [];
  utilities = new Utilities();
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    defaultFontName: "Arial",
    height: '8rem',
    minHeight: '8rem',
    maxHeight: '9rem',
    placeholder: 'Enter text here...',
    translate: 'no',
  };
  occurs = [
    'Weekly',
    'Monthly'
  ];
  days = [
    {
      index: 0,
      name: 'Monday',
      key: 'MON'
    },
    {
      index: 1,
      name: 'Tuesday',
      key: 'TUE'
    },
    {
      index: 2,
      name: 'Wednesday',
      key: 'WED'
    },
    {
      index: 3,
      name: 'Thursday',
      key: 'THU'
    },
    {
      index: 4,
      name: 'Friday',
      key: 'FRI'
    },
    {
      index: 5,
      name: 'Saturday',
      key: 'SAT'
    },
    {
      index: 6,
      name: 'Sunday',
      key: 'SUN'
    }
  ];
  userId: number;
  constructor(
    private toastr: ToastrService,
    private builderService: BuilderService,
    private loaderService: LoaderService,
    private preferencesService: PreferencesService
  ) { }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('userData')).id;
    this.getDepartmentList();
    this.retrieveUserPreferences();
  }

  getDepartmentList() {
    this.builderService.getDepartmentList().subscribe((res: any) => {
      this.loaderService.isLoading.next(false);
      this.departments = res;
    });
  }

  retrieveUserPreferences() {
    this.preferencesService.findUserPreferencesByUser(this.userId).subscribe(
      (data: any) => {
        // this.userGroupData = data;
        this.settings.emailInvitationTemplate = data["mailInvitationTemplate"];
        this.settings.logo = data.logo;
        // this.surveyJson['logoPosition'] = data.logoPosition;
        // this.surveyForm.get('mailSurveyCompletion').setValue(data["mailSurveyCompletion"]);
        this.groups = data["userGroups"];
        // setTimeout(() => {
        // }, 500)
        // this.getUserGroup();
      },
      err => {
        console.log("Error occured");
      }
    );
  }

  selectValue(newValue, propertyName) {
    this.settings[`${propertyName}`] = newValue;
  }

  uploadImage(files: FileList, attributeName, fileUploader) {
    if (!files.length) {
      return;
    }
    this.utilities.handleFiles(files, 10000, 'upload', 300, (image) => {
      // TODO call update customer api to udapte customer image
      this.settings[`${attributeName}`] = image;
    }, ['jpg', 'png', 'JPG', 'PNG'], (error) => {
      this.toastr.error(error);
      fileUploader.nativeElement.value = '';
    });
  }

  isDaySelected(day) {
    return this.settings.reminder.selectedDays.includes(day.key);
  }

  toggleDaySelection(day) {
    const index = this.settings.reminder.selectedDays.findIndex(item => item === day.name);
    if (index !== -1) {
      this.settings.reminder.selectedDays.splice(index, 1);
    } else {
      this.settings.reminder.selectedDays.push(day.key);
    }
  }

}
