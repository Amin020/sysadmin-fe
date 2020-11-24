import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamSettings, Exam } from '../../models/exam-settings';
import { ToastrService } from 'ngx-toastr';
import { ExamController } from '../../exam.controller';
import { Page } from '../../models/page';
import { QuestionType } from '../../models/question';
import { LoaderService } from 'src/app/core/loader.service';
import { ExamMapper } from '../../exam-mapper';
import { DomSanitizer } from '@angular/platform-browser';
import { ExamService } from '../../exam.service';

@Component({
  selector: 'app-create-new-exam',
  templateUrl: './create-new-exam.component.html',
  styleUrls: ['./create-new-exam.component.scss']
})
export class CreateNewExamComponent implements OnInit {

  actions = [
    {
      name: "Exam Settings",
      action: () => {
        this.canCreateExam();
      },
      infoMessage: "Progress is saved automatically once next button is clicked and you were successfully navigated to the next step",
      nextActionName: 'Create Exam',
      backAction: () => {
        this.activeStep = this.activeStep - 1;
      },
      backActionName: "Back"
    },
    {
      name: "Add Questions",
      action: () => {
        this.ableToSubmitExam();
      },
      infoMessage: "You can always go back and edit the previous page",
      nextActionName: "Next",
      backAction: () => {
        this.activeStep = this.activeStep - 1;
      },
      backActionName: "Back"
    },
    {
      name: "Review & Submit",
      action: () => {
        this.exam.status = "PUBLISHED";
        this.saveExam();
      },
      infoMessage: "",
      nextActionName: "Submit Exam Now",
      backAction: () => {
        this.saveExam();
      },
      backActionName: "Save & Exit"
    }
  ];
  exam = new Exam();
  activeStep;
  examMapper = new ExamMapper(this.domSanitizer);
  taskId = '';

  constructor(
    private domSanitizer: DomSanitizer,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private loaderService: LoaderService,
    private examController: ExamController,
    private examService: ExamService
  ) { }

  ngOnInit() {
    this.activeStep = 1;
    const examId = this.activeRoute.snapshot.paramMap.get('examId');
    const taskId = this.activeRoute.snapshot.queryParamMap.get('taskId');
    this.taskId = taskId ? taskId : '';
    if (examId) {
      this.getExamById(examId);
    }
  }

  private getExamById(examId) {
    this.loaderService.isLoading.next(true);
    this.examController.getExamById(examId).subscribe(response => {
      this.loaderService.isLoading.next(false);
      this.exam = this.examMapper.fromJson(response);
      this.examService.exam = this.exam;
    }, (error) => {
      this.loaderService.isLoading.next(false);
      this.toastr.error('Failed to load exam !!');
    });
  }

  navigateToUrl = (url, newIndex) => {
    this.activeStep = newIndex;
    this.router.navigate([url], { relativeTo: this.activeRoute });
  }

  canCreateExam() {
    if (this.exam.settings.title.default && this.exam.settings.title.default.length &&
      this.exam.settings.passScore && this.exam.settings.totalTime && this.exam.settings.selectedLanguage &&
      this.exam.settings.selectedLanguage.length) {
      this.saveExam(() => {
        this.activeStep = 2;
      });
      return true;
    }
    this.toastr.error('Please fill all feilds');
    return false;
  }

  ableToSubmitExam() {
    let canCreate = !!this.exam.pages.length;
    this.exam.pages.forEach(page => {
      canCreate = page.elements.length ? canCreate : false;
      page.elements.forEach(question => {
        if (question.type === QuestionType.text) {
          if (!question.name.default || !question.name.default.length) {
            canCreate = false;
          }
        } else if (!question.answers.every(answer => !!answer.value.default.length) ||
          !question.answers.some(answer => answer.correctAnswer) ||
          !question.name.default || !question.name.default.length) {
          canCreate = false;
        }
      });
    });
    if (!canCreate) {
      this.toastr.error('Please fill all questions titles , answers and choice at lest one correct answer for evrey question');
    } else {
      this.calculateTotalQuestions();
      this.activeStep = 3;
    }
  }

  saveExam(success?: () => void) {
    if (this.exam.id) {
      this.updateExam(success);
    } else {
      this.createExam(success);
    }
  }

  createExam(success?: () => void) {
    this.examController.createExam(this.exam).subscribe(response => {
      this.exam.id = response['id'];
      if (success) {
        success();
      }
      if (this.taskId.length) {
        this.callEduAPI('Exam Created Successfully');
      } else {
        this.toastr.success('Exam Created Successfully');
      }
    }, error => {
      this.toastr.error(error.message);
    });
  }

  updateExam(success?: () => void) {
    this.examController.updateExam(this.exam).subscribe(response => {
      this.exam.id = response['id'];
      if (success) {
        success();
      }
      if (this.taskId.length) {
        this.callEduAPI('Exam Updated Successfully');
      } else {
        this.toastr.success('Exam Updated Successfully');
      }
    }, error => {
      this.toastr.error(error.message);
    });
  }

  private callEduAPI(message: string) {
    if (this.exam.status === 'PUBLISHED') {
      this.examController.publishStudentForEDU(this.taskId, `${window.location.origin}/exam/${this.exam.id}`).subscribe(res => {
        this.toastr.success(message);
      }, (error) => {
        this.toastr.error(error.message);
      });
    }
  }

  private calculateTotalQuestions() {
    let totalQuestions = 0;
    let totalScore = 0;
    this.exam.pages.forEach(page => {
      totalQuestions += page.elements.length;
      page.elements.forEach(question => {
        totalScore += (+question.score * +question.weight);
      });
    });
    this.exam.settings.totalQuestion = totalQuestions;
    this.exam.settings.totalScore = totalScore;
  }

}
