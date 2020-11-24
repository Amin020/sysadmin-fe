import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MDBSpinningPreloader, MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { AuthService } from 'src/app/auth/auth.service';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { HeaderComponent } from './layout/header/header.component';
import { SidePanelComponent } from './layout/side-panel/side-panel.component';
// import { SurveyManagementModule } from './surveyManagement/survey-management.module';
import { ToastrModule } from 'ngx-toastr';
import { TestSurveyComponent } from './survey/test-survey/test-survey.component';
import { QRCodeModule } from 'angular2-qrcode';
// import { RegionsModule } from './admin/geo/geo.module';
// import { RegionDescModule } from './admin/region-desc/region-desc.module';
// import { LanguagesModule } from './admin/languages/languages.module';
// import { CurrencyModule } from './admin/currency/currency.module';
// import { UOMsModule } from './admin/uoms/uoms.module';
// import { FeaturesModule } from './admin/features/features.module';
// import { AppsModule } from './admin/app-management/apps.module';
// import { AppBundleModule } from './admin/app-bundle/app-bundle.module';
// import { LicenseOfferModule } from './admin/offers/license-offer.module';
// import { RoleManagementModule } from './admin/role-management/role-management.module';
import { AuthHttpInterceptorService } from './auth/auth-http-interceptor.service';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from './core/shared.module';
import { CanDeactivateGuard } from './services/deactivate.guard';
import { LoaderService } from './core/loader.service';
import { SecurityService } from './security/security.service';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { ExamModule } from './exam/exam.module';
import { NewSurveyModule } from './new-survey/new-survey.module';

// import { QuestionBankComponent } from './admin/question-bank/question-bank.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserPreferencesComponent,
    HeaderComponent,
    SidePanelComponent,
    TestSurveyComponent,
    // ConfirmationMsgComponent,
    // SurveyManagementComponent,
    // NewSurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-left',
      preventDuplicates: true,
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    AngularSvgIconModule.forRoot(),
    // AngularFontAwesomeModule,
    QRCodeModule,
    ExamModule,
    NewSurveyModule,
    // RegionsModule,
    // RegionDescModule,
    // LanguagesModule,
    // CurrencyModule,
    // UOMsModule,
    // FeaturesModule,
    // AppsModule,
    // AppBundleModule,
    // LicenseOfferModule,
    // RoleManagementModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
    MDBBootstrapModulesPro.forRoot(),
    // SurveyManagementModule
  ],
  exports: [TranslateModule],
  providers: [AuthGuard, AuthService, { provide: LOCALE_ID, useValue: 'ar' },
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptorService, multi: true },
    MDBSpinningPreloader, CanDeactivateGuard, LoaderService, SecurityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
