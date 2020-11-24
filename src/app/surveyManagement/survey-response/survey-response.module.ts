import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';
import { SurveyResponseComponent } from './survey-response.component';
import { SurveyAnalyticsModule } from 'src/app/survey-analytics/survey-analytics.module';
import { SharedModule } from 'src/app/core/shared.module';

const routes: Routes = [{
  path: '',
  component: SurveyResponseComponent,
}];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes), SurveyAnalyticsModule, SharedModule],
  declarations: [SurveyResponseComponent],
  exports: [RouterModule]
})
export class SurveyResponseModule { }
