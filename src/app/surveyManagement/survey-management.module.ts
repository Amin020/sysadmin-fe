import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SurveyManagementRoutingModule } from './survey-management-routing.module';
import { SurveysComponent } from './surveys/surveys.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';
// import { NewsurveyComponent } from './newsurvey/newsurvey.component';
// import { ViewSurveyComponent } from './view-survey/view-survey.component';
import { EditSurveyComponent } from './edit-survey/edit-survey.component';
import { BuilderHomePageComponent } from '../builder/components/builder-home-page/builder-home-page.component';
import { BuilderHeaderComponent } from '../builder/components/builder-header/builder-header.component';
import { BuilderToolBoxComponent } from '../builder/components/builder-tool-box/builder-tool-box.component';
import { BuilderDesignerComponent } from '../builder/components/builder-designer/builder-designer.component';
import { BuilderViewerComponent } from '../builder/components/builder-viewer/builder-viewer.component';
import { BuilderSettingsComponent } from '../builder/components/builder-settings/builder-settings.component';
import { BuilderSketchPageComponent } from '../builder/components/builder-sketch-page/builder-sketch-page.component';
import { TextModalComponent } from '../builder/shared/modals/text-modal/text-modal.component';
import { TextAreaModalComponent } from '../builder/shared/modals/text-area-modal/text-area-modal.component';
import { EquationModalComponent } from '../builder/shared/modals/equation-modal/equation-modal.component';
import { ValidatorModalComponent } from '../builder/shared/modals/validator-modal/validator-modal.component';
import { ChoicesCreationComponent } from '../builder/shared/modals/choices-creation/choices-creation.component';
import { ChoicesByUrlComponent } from '../builder/shared/modals/choices-by-url/choices-by-url.component';
import { ChoicesOptionsComponent } from '../builder/shared/modals/choices-options/choices-options.component';
import { CellsTextComponent } from '../builder/shared/modals/cells-text/cells-text.component';
import { ExpressionModalComponent } from '../builder/shared/modals/expression-modal/expression-modal.component';
import { EquationComponentComponent } from '../builder/shared/modals/equation-component/equation-component.component';
import { MultipleEditComponent } from '../builder/shared/modals/multiple-edit/multiple-edit.component';
import { ValidatorComponentComponent } from '../builder/shared/modals/validator-component/validator-component.component';
import { ChoicesCreationComponentComponent } from '../builder/shared/modals/choices-creation-component/choices-creation-component.component';
import { GeneralComponentComponent } from '../builder/shared/modals/general-component/general-component.component';
import { GeneralEditComponent } from '../builder/shared/modals/general-edit/general-edit.component';
import { ChoicesByUrlComponentComponent } from '../builder/shared/modals/choices-by-url-component/choices-by-url-component.component';
import { TextAreaComponentComponent } from '../builder/shared/modals/text-area-component/text-area-component.component';
import { ExpressionComponentComponent } from '../builder/shared/modals/expression-component/expression-component.component';
import { MentionModule } from 'angular-mentions';
import { CanDeactivateGuard } from '../services/deactivate.guard';
import { DeactivateDialogService } from '../services/deactivate.dialog.service';
//import { BuilderHomePageComponent } from '../builder/components/builder-home-page/builder-home-page.component';
import { ModalModule, WavesModule, InputsModule, ButtonsModule } from 'ng-uikit-pro-standard'
import { WindowRef } from '../services/window.service';
import { ConfirmationMsgComponent } from '../builder/shared/modals/confirmation-msg/confirmation-msg.component';
import { BuilderTestComponent } from '../builder/components/builder-test/builder-test.component';
import { BuilderTranslationComponent } from '../builder/components/builder-translation/builder-translation.component';
import { SharedModule } from '../core/shared.module';
import { DragDropModule } from '@angular/cdk/drag-drop';

// import { SurveyResponseComponent } from './survey-response/survey-response.component';
// import { SurveyAnalyticsModule } from '../survey-analytics/survey-analytics.module';

@NgModule({
  declarations: [
    SurveysComponent,
    // NewsurveyComponent,
    // ViewSurveyComponent,
    EditSurveyComponent,
    BuilderHomePageComponent, BuilderHeaderComponent, BuilderToolBoxComponent,
    BuilderDesignerComponent, BuilderViewerComponent, BuilderTestComponent,
    BuilderSettingsComponent, BuilderSketchPageComponent, TextModalComponent, TextAreaModalComponent, EquationModalComponent,
    ValidatorModalComponent,
    ChoicesCreationComponent,
    ChoicesByUrlComponent,
    ChoicesOptionsComponent,
    CellsTextComponent,
    ExpressionModalComponent,
    EquationComponentComponent,
    MultipleEditComponent,
    ValidatorComponentComponent,
    ChoicesCreationComponentComponent,
    GeneralComponentComponent,
    GeneralEditComponent,
    ChoicesByUrlComponentComponent,
    TextAreaComponentComponent,
    ExpressionComponentComponent,
    ConfirmationMsgComponent,
    BuilderTranslationComponent,
    // SurveyResponseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    SurveyManagementRoutingModule,
    MentionModule,
    DragDropModule,
    ModalModule, WavesModule, InputsModule, ButtonsModule
  ],
  exports: [
    MentionModule,
    ModalModule, WavesModule, InputsModule, ButtonsModule
  ],
  // entryComponents: [TextModalComponent, TextAreaModalComponent, EquationModalComponent,
  //   ValidatorModalComponent, ChoicesCreationComponent, ChoicesByUrlComponent, ChoicesOptionsComponent,
  //   CellsTextComponent, ExpressionModalComponent, GeneralEditComponent, ConfirmationMsgComponent],
  providers: [
    // MDBSpinningPreloader,
    CanDeactivateGuard,
    DeactivateDialogService,
    WindowRef
  ]
})
export class SurveyManagementModule { }
