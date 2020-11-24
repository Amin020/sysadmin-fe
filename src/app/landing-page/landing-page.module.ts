import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page.component';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { SharedModule } from '../core/shared.module';
import { LandingPageService } from './landing-page.service';
import { ImgComponent } from '../core/default-img.component';
@NgModule({
    
    declarations: [LandingPageComponent,ImgComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
  ],
  providers:[LandingPageService]
})
export class LandingPageModule { }
