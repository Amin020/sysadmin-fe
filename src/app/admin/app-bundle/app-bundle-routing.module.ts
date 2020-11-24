
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { BundleHomeComponent } from './bundle-home/bundle-home.component';
// import { BundleListComponent } from './bundle-list/bundle-list.component';
// import { NewBundleComponent } from './new-bundle/new-bundle.component';
import { CreateEditBundleComponent } from './create-edit-bundle/create-edit-bundle.component';
// import { ViewBundleComponent } from './view-bundle/view-bundle.component';
// import { AuthGuard } from 'src/app/auth/auth.guard';


const routes: Routes = [
  {
    path: '', component: BundleHomeComponent,
    children: [
      // { path: 'new', component: NewBundleComponent },
      { path: 'create-app-bundle', component: CreateEditBundleComponent },
      { path: 'edit/:id', component: CreateEditBundleComponent }
      // { path: ':id', component: ViewBundleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppBundleRoutingModule { }
