import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegiondescMainComponent } from './regiondesc-main/regiondesc-main.component';
import { RegiondescListComponent } from './regiondesc-list/regiondesc-list.component';
import { RegiondescEditComponent } from './regiondesc-edit/regiondesc-edit.component';
import { RegiondescNewComponent } from './regiondesc-new/regiondesc-new.component';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routes: Routes = [
  {
    path: 'regionsDesc',
    component: RegiondescMainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'new', component: RegiondescNewComponent },
          { path: 'edit/:id', component: RegiondescEditComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionDescRoutingModule { }
