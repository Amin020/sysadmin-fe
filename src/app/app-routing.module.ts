import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UserPreferencesComponent } from './user-preferences/user-preferences.component';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { TestSurveyComponent } from './survey/test-survey/test-survey.component';
import { CanDeactivateGuard } from './services/deactivate.guard';

const routes: Routes = [
  {
    path: 'exam',
    loadChildren: () => import('./exam/exam-managment-routing.module').then(m => m.ExamManagementRoutingModule),
  },
  {
    path: 'survey',
    loadChildren: () => import('./new-survey/survey-managment-routing.module').then(m => m.SurveyManagementRoutingModule),
  },
  {
    path: 'SurveyManagement',
    loadChildren: () => import('./surveyManagement/survey-management.module').then(m => m.SurveyManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'roles',
    loadChildren: () => import('./admin/role-management/role-management.module').then(m => m.RoleManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'languages',
    loadChildren: () => import('./admin/languages/languages.module').then(m => m.LanguagesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'currencies',
    loadChildren: () => import('./admin/currency/currency.module').then(m => m.CurrencyModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'test-survey/:id', component: TestSurveyComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'practice-survey/:id/:lang/:type',
    loadChildren: () => import('./practice-survey/practice-survey.module').then(m => m.PracticeSurveyModule)
  },
  // { path: 'SurveyManagement', redirectTo: './surveyManagement', pathMatch: 'full' },
  {
    path: 'UserPreferences', component: UserPreferencesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'features', loadChildren: () => import('./admin/features/features.module').then(m => m.FeaturesModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'app-bundle', loadChildren: () => import('./admin/app-bundle/app-bundle.module').then(m => m.AppBundleModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'question-bank', loadChildren: () => import('./admin/question-bank/question-bank.module').then(m => m.QuestionBankModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'uoms', loadChildren: () => import('./admin/uoms/uoms.module').then(m => m.UOMsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'regions',
    loadChildren: () => import('./admin/geo/geo.module').then(m => m.RegionsModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'pricing/:id',
    loadChildren: () => import('./payment/pricing-plan/pricing-plan.module').then(m => m.PricingPlanModule),
  },
  {
    path: 'registeration',
    loadChildren: () => import('./payment/registeration/registeration.module').then(m => m.RegisterationModule),
  },
  {
    path: 'company-profile/:id/:calcPrice',
    loadChildren: () => import('./payment/company-profile/company-profile.module').then(m => m.CompanyProfileModule),
    canDeactivate: [CanDeactivateGuard]
  },
  {
    path: 'edit-company/:id',
    loadChildren: () => import('./payment/edit-company/edit-company.module').then(m => m.EditCompanyModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'countries',
    loadChildren: () => import('./admin/geo/country.module').then(m => m.CountryModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cities',
    loadChildren: () => import('./admin/geo/city.module').then(m => m.CityModule),
    canActivate: [AuthGuard],
  },
  { path: 'apps', loadChildren: () => import('./admin/app-management/apps.module').then(m => m.AppsModule) },
  { path: 'offers', loadChildren: () => import('./admin/offers/license-offer.module').then(m => m.LicenseOfferModule) },
  { path: 'login', component: LoginComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'home', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingPageModule) },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
  // { path: 'builder',loadChildren: './builder/builder.module#BuilderModule',outlet:'builder'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
