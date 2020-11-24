import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PricingPlanComponent } from './pricing-plan.component';
import { PricingPlanService } from './pricing-plan.service';
import ar from '@angular/common/locales/ar';
import { SharedModule } from 'src/app/core/shared.module';
registerLocaleData(ar);
const routes: Routes = [{
  path: '',
  children: [
    { path: '', component: PricingPlanComponent }
  ]

}];
@NgModule({
  declarations: [PricingPlanComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  providers: [PricingPlanService]
})
export class PricingPlanModule { }
