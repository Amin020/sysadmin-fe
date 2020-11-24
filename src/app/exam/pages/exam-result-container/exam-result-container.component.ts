import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from '../../exam.service';
import { Exam } from '../../models/exam-settings';
import { Question, QuestionType } from '../../models/question';

@Component({
  selector: 'app-exam-result-container',
  templateUrl: './exam-result-container.component.html',
  styleUrls: ['./exam-result-container.component.scss']
})
export class ExamResultContainerComponent implements OnInit {

  isSuccess = true;
  refrencedQuestions;
  exam: Exam;
  rightAnswerCounter = 0;
  answeredCounter = 0;
  score = 0;
  wrongQuestions = new Array<Question>();
  @ViewChild('basicModal') basicModal;
  constructor(
    private examService: ExamService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.exam = this.examService.exam;
    if (!this.exam) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else {
      this.calculateResult();
    }
  }

  calculateResult() {
    this.rightAnswerCounter = 0;
    this.answeredCounter = 0;
    this.score = 0;
    this.exam.pages.forEach(page => {
      page.elements.forEach(question => {
        if (this.isAnsweredQuestion(question)) {
          this.answeredCounter++;
          if (this.isAnsweredQuestionRight(question)) {
            this.rightAnswerCounter++;
            this.score += (+question.score * +question.weight);
          } else {
            this.wrongQuestions.push(question);
          }
        } else {
          this.wrongQuestions.push(question);
        }
      });
    });
    this.score = +(this.score / this.exam.settings.totalScore * 100).toFixed(2);
    this.isSuccess = this.exam.settings.passScore <= this.score;
  }

  private isAnsweredQuestion(question: Question) {
    if (question.type === QuestionType.text) {
      return question['answer'] && question['answer'].length;
    } else {
      return question.answers.some(answer => answer.isSelected);
    }
  }

  private isAnsweredQuestionRight(question: Question) {
    if (question.type === QuestionType.checkbox || question.type === QuestionType.radiogroup || question.type === QuestionType.boolean) {
      let rightAnswerCounter = 0;
      question.answers.forEach(answer => {
        if (answer.isSelected && answer.correctAnswer) {
          rightAnswerCounter++;
        }
      });
      return rightAnswerCounter === question.answers.filter(answer => answer.correctAnswer).length;
    } else {
      return question['answer'] && question['answer'].length;
    }
  }

  openRefrencedDialog(wrongQuestions) {
    this.refrencedQuestions = wrongQuestions;
    this.basicModal.show();
  }

  navigateToAllExams() {
    this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
  }

}
