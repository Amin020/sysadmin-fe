import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, timer } from 'rxjs';
import { LoaderService } from 'src/app/core/loader.service';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
import { ExamMapper } from '../../exam-mapper';
import { ExamController } from '../../exam.controller';
import { ExamService } from '../../exam.service';
import { Exam } from '../../models/exam-settings';
import { QuestionType } from '../../models/question';

@Component({
  selector: 'app-on-going-exam',
  templateUrl: './on-going-exam.component.html',
  styleUrls: ['./on-going-exam.component.scss']
})
export class OnGoingExamComponent implements OnInit, OnDestroy {

  activePageIndex = 0;
  questionType = QuestionType;
  exam = new Exam();
  examMapper = new ExamMapper(this.domSanitizer);
  isLoading: boolean;
  countDown: Subscription;
  counter = 70 * 60;
  tick = 1000;
  studentId: string;
  taskId: string;
  constructor(
    private domSanitizer: DomSanitizer,
    private examController: ExamController,
    private examService: ExamService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toaster: ToastrService,
    private loaderService: LoaderService,
    private suerveysController: SurveyManagementService
  ) { }

  ngOnInit() {
    this.getExamById();
  }

  private getExamById() {
    const examId = this.activatedRoute.snapshot.paramMap.get('examId');
    this.studentId = this.activatedRoute.snapshot.queryParamMap.get('studentId');
    this.taskId = this.activatedRoute.snapshot.queryParamMap.get('taskId');
    this.loaderService.isLoading.next(true);
    this.isLoading = true;
    this.examController.getExamById(examId).subscribe(response => {
      this.isLoading = false;
      this.loaderService.isLoading.next(false);
      this.exam = this.examMapper.fromJson(response);
      this.examService.exam = this.exam;
      this.counter = this.exam.settings.totalTime * 60;
      this.countDown = timer(0, this.tick).subscribe(() => {
        --this.counter;
        if (!this.counter) {
          this.submitExam();
        }
      });
    }, (error) => {
      this.isLoading = false;
      this.loaderService.isLoading.next(false);
      this.toaster.error('Failed to load exam !!');
    });
  }

  getRemarkedQuestion() {
    const questions = [];
    this.exam.pages.forEach(page => {
      page.elements.forEach(question => {
        if (question.addAsBookmark) {
          questions.push(question);
        }
      });
    });
    return questions;
  }

  submitExam() {
    const firstName = JSON.parse(localStorage.getItem('userData')).firstName;
    const answers = [];
    this.exam.pages.forEach(page => {
      page.elements.forEach(question => {
        answers.push({
          name: question.name,
          score: question.score,
          questionValue: question.type === QuestionType.text ? question['answer'] :
            question.answers.filter(answer => answer.isSelected).map(answer => answer.value.default)
          // correctAnswer: question.
        });
      });
    });
    const body = {
      xsurvey: { id: this.exam.id },
      surveyAnswers: answers,
      createdBy: "MNABIL",
      editBy: "MNABIL",
      ip: ".168.101.101",
      macAddress: "00000000000000000000",
      user: firstName ? firstName : 'test'
    };
    this.suerveysController.submitAnswer(body).subscribe((res: any) => {
      const mark = 1;
      if (this.taskId && this.studentId) {
        const url = `/edu/task/student/upload/studentId/${this.studentId}/taskId/${this.taskId}/mark/${mark}?` +
          `studentId=${this.studentId}&taskId=${this.taskId}&mark=${mark}`;
        this.examController.submitForEDU(url);
      }
      if (this.exam.settings.showResult) {
        this.router.navigate(['./result'], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
      }
    });
  }

  ngOnDestroy() {
    this.countDown = null;
  }

}

