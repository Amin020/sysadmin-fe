import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UOMsHomeComponent } from './uoms-home/uoms-home.component';
import { CreateEditUOMComponent } from './create-edit-uom/create-edit-uom.component';

const routes: Routes = [
  {
    path: '',
    component: UOMsHomeComponent,
    children: [
      { path: 'create-uom', component: CreateEditUOMComponent },
      { path: 'edit/:id', component: CreateEditUOMComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class UOMsRoutingModule { }
