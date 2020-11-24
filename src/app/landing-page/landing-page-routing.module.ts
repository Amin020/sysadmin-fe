import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuard } from '../services/deactivate.guard';
import { LandingPageComponent } from './landing-page.component';

const routes: Routes = [{
  path: '',
  component: LandingPageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandingPageRoutingModule { }
