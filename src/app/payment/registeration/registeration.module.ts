import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { RegisterationComponent } from './registeration.component';

const routes: Routes = [
  {
    path: '',
    component: RegisterationComponent
  }
];

@NgModule({
  declarations: [RegisterationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RegisterationModule { }
