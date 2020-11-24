import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { ModalComponent } from './modal/modal.component';
import { FormsModule } from '@angular/forms';
import { FormatTimePipe } from './formate-time.pipe';
import { LoaderComponent } from './loader/loader.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { QuestionComponent } from '../exam/component/question/question.component';
import { QuestionContainerComponent } from '../exam/component/question-container/question-container.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    ModalComponent,
    FormatTimePipe,
    LoaderComponent,
    QuestionComponent,
    QuestionContainerComponent,
  ],
  providers: [
    FormatTimePipe
  ],
  imports: [
    CommonModule,
    MDBBootstrapModulesPro,
    FormsModule,
    AngularSvgIconModule,
    AngularEditorModule,
    TranslateModule
  ],
  exports: [
    MDBBootstrapModulesPro,
    FormsModule,
    FormatTimePipe,
    AngularSvgIconModule,
    LoaderComponent,
    QuestionComponent,
    QuestionContainerComponent,
    AngularEditorModule,
    TranslateModule
  ]
})
export class SharedModule { }
