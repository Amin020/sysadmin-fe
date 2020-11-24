import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesHomeComponent } from './features-home/features-home.component';
import { CreateEditFeatureComponent } from './create-edit-feature/create-edit-feature.component';


const routes: Routes = [
  {
    path: '',
    component: FeaturesHomeComponent,
    children: [
      { path: 'create-feature', component: CreateEditFeatureComponent },
      { path: 'edit/:id', component: CreateEditFeatureComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
