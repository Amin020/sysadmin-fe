import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyProfileComponent } from './company-profile.component';
import { Routes, RouterModule } from '@angular/router';
import { CompanyProfileService } from './company-profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { CanDeactivateGuard } from 'src/app/services/deactivate.guard';
import { SharedModule } from 'src/app/core/shared.module';

const routes: Routes = [{
  path: '', component: CompanyProfileComponent,
}];

@NgModule({
  declarations: [CompanyProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [CompanyProfileService]
})
export class CompanyProfileModule { }
