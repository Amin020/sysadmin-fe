import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegionDescRoutingModule } from './region-desc-routing.module';
import { RegiondescMainComponent } from './regiondesc-main/regiondesc-main.component';
import { RegiondescListComponent } from './regiondesc-list/regiondesc-list.component';
import { RegiondescEditComponent } from './regiondesc-edit/regiondesc-edit.component';
import { RegiondescNewComponent } from './regiondesc-new/regiondesc-new.component';

@NgModule({
  declarations: [RegiondescMainComponent, RegiondescListComponent, RegiondescEditComponent],
  imports: [
    CommonModule,
    RegionDescRoutingModule
  ]
})
export class RegionDescModule { }
