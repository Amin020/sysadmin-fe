import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { LanguagesHomeComponent } from './languages-home/languages-home.component';
import { CreateEditLanguageComponent } from './create-edit-language/create-edit-language.component';
const routes: Routes = [
  {
    path: '',
    component: LanguagesHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create-language', component: CreateEditLanguageComponent },
      { path: 'edit/:id', component: CreateEditLanguageComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguagesRoutingModule { }
