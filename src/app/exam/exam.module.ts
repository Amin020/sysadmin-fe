import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExamSettingComponent } from './component/exam-setting/exam-setting.component';
import { SharedModule } from '../core/shared.module';
import { CreateNewExamComponent } from './pages/create-new-exam/create-new-exam.component';
import { ExamManagementRoutingModule } from './exam-managment-routing.module';
import { ExamController } from './exam.controller';
import { ExamSettingReviewComponent } from './component/exam-seeting-review/exam-setting-review.component';
import { QuestionReviewComponent } from './component/question-review/question-review.component';
import { QuestionReviewContainerComponent } from './component/question-review-container/question-review-container.component';
import { OnGoingExamComponent } from './pages/on-going-exam/on-going-exam.component';
import { StudentQuestionsComponent } from './component/student-questions/student-questions.component';
import { ExamResultContainerComponent } from './pages/exam-result-container/exam-result-container.component';
import { ExamHeaderComponent } from './component/exam-header/exam-header.component';
import { ExamMenuComponent } from './component/exam-menu/exam-menu.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ExamManagementRoutingModule
  ],
  declarations: [
    ExamSettingComponent,
    CreateNewExamComponent,
    ExamSettingReviewComponent,
    QuestionReviewComponent,
    QuestionReviewContainerComponent,
    OnGoingExamComponent,
    StudentQuestionsComponent,
    ExamResultContainerComponent,
    ExamHeaderComponent,
    ExamMenuComponent
  ],
  exports: [
    ExamHeaderComponent,
    ExamMenuComponent
  ],
  providers: [
    ExamController
  ]
})
export class ExamModule { }
