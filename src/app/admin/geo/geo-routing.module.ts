import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegionsHomeComponent } from './regions/regions-home/regions-home.component';
import { CreateEditRegionComponent } from './regions/create-edit-region/create-edit-region.component';


const routes: Routes = [
  {
    path: '',
    component: RegionsHomeComponent,
    children: [
      { path: 'create-region', component: CreateEditRegionComponent },
      { path: 'edit/:id', component: CreateEditRegionComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegionsRoutingModule { }
