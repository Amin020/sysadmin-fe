import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateNewSurveyComponent } from './pages/create-new-survey/create-new-survey.component';
import { SharedModule } from '../core/shared.module';
import { SurveySettingsComponent } from './components/survey-settings/survey-settings.component';
import { SurveyManagementRoutingModule } from './survey-managment-routing.module';
import { GroupMangementComponent } from './pages/group-mangement/group-mangement.component';
import { PageTranslateViewComponent } from './components/page-translate-view/page-translate-view.component';
import { SurveyTranslateComponent } from './pages/survey-translate/survey-translate.component';
import { SurveyController } from './survey.controller';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SurveyManagementRoutingModule
  ],
  providers: [
    SurveyController
  ],
  declarations: [
    CreateNewSurveyComponent,
    SurveySettingsComponent,
    GroupMangementComponent,
    SurveyTranslateComponent,
    PageTranslateViewComponent
  ]
})
export class NewSurveyModule { }
