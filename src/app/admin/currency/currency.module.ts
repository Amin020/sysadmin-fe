import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ToastModule } from 'ng-uikit-pro-standard';

import { CurrencyRoutingModule } from './currency-routing.module';
import { CurrencyListComponent } from './currency-list/currency-list.component';
import { CreateEditCurrencyComponent } from './create-edit-currency/create-edit-currency.component';
import { CurrencyHomeComponent } from './currency-home/currency-home.component';
import { SharedModule } from 'src/app/core/shared.module';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    CurrencyListComponent,
    CreateEditCurrencyComponent,
    CurrencyHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CurrencyRoutingModule,
    SharedModule,
  ]
})
export class CurrencyModule { }
