import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PracticeSurveyComponent } from './practice-survey.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../core/shared.module';
import { TranslateModule } from '@ngx-translate/core';

// import { SurveyAnalyticsModule } from '../survey-analytics/survey-analytics.module';
const routes: Routes = [
  {
    path: '',
    component: PracticeSurveyComponent
  }
];
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  declarations: [PracticeSurveyComponent]
})
export class PracticeSurveyModule { }
