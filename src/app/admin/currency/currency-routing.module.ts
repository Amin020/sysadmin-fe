import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { CurrencyHomeComponent } from './currency-home/currency-home.component';
import { CreateEditCurrencyComponent } from './create-edit-currency/create-edit-currency.component';

const routes: Routes = [
  {
    path: '',
    component: CurrencyHomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create-currency', component: CreateEditCurrencyComponent },
      { path: 'edit/:id', component: CreateEditCurrencyComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrencyRoutingModule { }
