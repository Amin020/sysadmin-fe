import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { SurveysComponent } from './surveys/surveys.component';
// import { NewsurveyComponent } from './newsurvey/newsurvey.component';
// import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';

const routes: Routes = [{
  path: '',
  //component: SurveysComponent ,

  canActivate: [AuthGuard],
  children: [
    { path: '', component: SurveysComponent },
    { path: 'survey/:id/:copy', component: EditSurveyComponent },
    { path: 'survey/:id', component: EditSurveyComponent },
    { path: 'response/:id', loadChildren: () => import('./survey-response/survey-response.module').then(m => m.SurveyResponseModule) }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyManagementRoutingModule { }
