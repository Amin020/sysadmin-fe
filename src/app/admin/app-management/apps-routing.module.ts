import { AppsListComponent } from './apps/apps-list/apps-list.component';
import { AppDetailsComponent } from './apps/app-details/app-details.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { AppsHomeComponent } from './apps/apps-home/apps-home.component';
import { NewAppComponent } from './apps/new-app/new-app.component';
import { EditAppComponent } from './apps/edit-app/edit-app.component';
import { NewAppDescComponent } from './app-desc/new-app-desc/new-app-desc.component';
import { NewAppVersionComponent } from './app-versions/new-app-version/new-app-version.component';
import { NewAppFeatureComponent } from './app-features/new-app-feature/new-app-feature.component';
import { NewAppUomComponent } from './app-uoms/new-app-uom/new-app-uom.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: AppsHomeComponent,
    children: [
      { path: '', component: AppsListComponent },
      { path: 'new', component: NewAppComponent },
      { path: 'edit/:id', component: EditAppComponent },
      { path: ':id', component: AppsListComponent },
      { path: 'new/:id', component: NewAppComponent },
      {
        path: 'details/:id',
        component: AppDetailsComponent,
        children: [
          { path: 'new-desc', component: NewAppDescComponent },
          { path: 'new-version', component: NewAppVersionComponent },
          { path: 'new-feature', component: NewAppFeatureComponent },
          { path: 'new-uom', component: NewAppUomComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppsRoutingModule { }
