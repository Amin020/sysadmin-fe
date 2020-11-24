import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { SharedModule } from 'src/app/core/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'edit/:id', component: EditComponent }
    ]
  }
];

@NgModule({
  declarations: [EditComponent, HomeComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class FeatureBundleModule { }
