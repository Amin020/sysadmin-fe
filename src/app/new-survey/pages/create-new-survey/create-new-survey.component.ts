import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/exam/models/page';
import { QuestionType } from 'src/app/exam/models/question';
import { Survey, SurveySettings } from '../../models/survey.model';
import { SurveyController } from '../../survey.controller';

@Component({
  selector: 'app-create-new-survey',
  templateUrl: './create-new-survey.component.html',
  styleUrls: ['./create-new-survey.component.scss']
})
export class CreateNewSurveyComponent implements OnInit {

  actions = [
    {
      name: "Survey Header",
      isBackDisabled: () => {
        return this.survey.status !== 'INITIATED';
      },
      action: () => {
        this.canCreateSurvey();
      },
      infoMessage: "Progress is saved automatically once next button is clicked and you were successfully navigated to the next step",
      nextActionName: 'Next',
      backAction: () => {
        this.activeStep = this.activeStep - 1;
      },
      backActionName: "Back"
    },
    {
      name: "Survey Content",
      isBackDisabled: () => {
        return this.survey.status !== 'INITIATED';
      },
      action: () => {
        this.ableToSubmitSurvey();
      },
      infoMessage: "You can always go back and edit the previous page",
      nextActionName: "Next",
      backAction: () => {
        this.activeStep = this.activeStep - 1;
      },
      backActionName: "Back"
    },
    {
      name: "Translation",
      isBackDisabled: () => {
        return this.survey.status !== 'INITIATED';
      },
      action: () => {
        if (this.survey.id) {
          this.survey.status = "PUBLISHED";
          this.updateSurvey();
        } else {
          this.createSurvey();
        }
      },
      infoMessage: "",
      nextActionName: "Publish Survey Now",
      backAction: () => {
        this.survey.status = "INITIATED";
        if (this.survey.id) {
          this.updateSurvey();
        } else {
          this.createSurvey();
        }
      },
      backActionName: "Save & Exit"
    }
  ];
  activeStep;
  survey: Survey = new Survey();
  constructor(
    private surveyController: SurveyController,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.activeStep = 1;
  }

  navigateToUrl = (url, newIndex) => {
    this.activeStep = newIndex;
    this.router.navigate([url], { relativeTo: this.activeRoute });
  }

  canCreateSurvey() {
    const settings = this.survey.settings;
    if (settings.title.default.length && settings.name.length && settings.department.length &&
      (settings.public || (!settings.public && settings.group && settings.group.length))) {
      this.activeStep = 2;
      return true;
    }
    this.toastr.error('Please fill all mandatory feilds');
    return false;
  }

  ableToSubmitSurvey() {
    let canCreate = true;
    this.survey.pages.forEach(page => {
      page.elements.forEach(question => {
        if (question.type === QuestionType.text) {
          if (!question.name.default.length) {
            canCreate = false;
          }
        } else if (!question.answers.every(answer => !!answer.value.default.length) || !question.name.default.length) {
          canCreate = false;
        }
      });
    });
    if (!canCreate) {
      this.toastr.error('Please fill all questions titles and answers');
    } else {
      this.activeStep = 3;
    }
  }

  createSurvey() {
    this.surveyController.createSurvey(this.survey).subscribe(response => {
      this.survey.id = response['id'];
      this.toastr.success('Survey Created Successfully ');
    }, error => {
      this.toastr.error(error.message);
    });
  }

  updateSurvey() {
    this.surveyController.updateSurvey(this.survey).subscribe(response => {
      this.survey.id = response['id'];
      this.toastr.success('Survey Created Successfully ');
    }, error => {
      this.toastr.error(error.message);
    });
  }


}
