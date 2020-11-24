import { AppVersionsListComponent } from './app-versions/app-versions-list/app-versions-list.component';
import { NewAppUomComponent } from './app-uoms/new-app-uom/new-app-uom.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppsRoutingModule } from './apps-routing.module';
import { AppsListComponent } from './apps/apps-list/apps-list.component';
import { NewAppComponent } from './apps/new-app/new-app.component';
import { EditAppComponent } from './apps/edit-app/edit-app.component';
import { AppsHomeComponent } from './apps/apps-home/apps-home.component';
import { AppDetailsComponent } from './apps/app-details/app-details.component';
import { UOMsModule } from '../uoms/uoms.module';
import { NewAppDescComponent } from './app-desc/new-app-desc/new-app-desc.component';
import { ListAppDescComponent } from './app-desc/list-app-desc/list-app-desc.component';
import { NewAppFeatureComponent } from './app-features/new-app-feature/new-app-feature.component';
import { NewAppVersionComponent } from './app-versions/new-app-version/new-app-version.component';
import { SharedModule } from 'src/app/core/shared.module';


@NgModule({
  declarations: [
    AppsListComponent,
    NewAppComponent,
    EditAppComponent,
    AppsHomeComponent,
    AppDetailsComponent,
    NewAppDescComponent,
    ListAppDescComponent,
    AppVersionsListComponent,
    NewAppUomComponent,
    NewAppVersionComponent,
    NewAppFeatureComponent
  ],
  imports: [
    CommonModule,
    AppsRoutingModule,
    FormsModule,
    UOMsModule,
    SharedModule,
  ],

})
export class AppsModule { }
