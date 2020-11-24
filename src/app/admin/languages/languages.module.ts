import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { ToastModule } from 'ng-uikit-pro-standard';
import { LanguagesRoutingModule } from './languages-routing.module';
import { LanguagesHomeComponent } from './languages-home/languages-home.component';
import { LanguagesListComponent } from './languages-list/languages-list.component';
import { SharedModule } from 'src/app/core/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { CreateEditLanguageComponent } from './create-edit-language/create-edit-language.component';


@NgModule({
  declarations: [
    LanguagesHomeComponent,
    LanguagesListComponent,
    CreateEditLanguageComponent
  ],
  imports: [
    CommonModule,
    LanguagesRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class LanguagesModule { }
