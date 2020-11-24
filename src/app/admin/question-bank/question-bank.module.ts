import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionBankComponent } from './question-bank.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CanDeactivateGuard } from 'src/app/services/deactivate.guard';
import { SharedModule } from 'src/app/core/shared.module';
import { QuestionBankService } from './question-bank.service';
const routes: Routes = [
  {
    path: '',
    component: QuestionBankComponent
  }
];

@NgModule({
  declarations: [
    QuestionBankComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    QuestionBankService
  ]
})
export class QuestionBankModule { }
