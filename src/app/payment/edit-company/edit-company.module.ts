import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CanDeactivateGuard } from 'src/app/services/deactivate.guard';
import { SharedModule } from 'src/app/core/shared.module';
import { EditCompanyComponent } from './edit-company.component';
import { CompanyProfileService } from '../company-profile/company-profile.service';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '', component: EditCompanyComponent,
}];

@NgModule({
  declarations: [EditCompanyComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
  ],
  providers: [CompanyProfileService]
})
export class EditCompanyModule { }
