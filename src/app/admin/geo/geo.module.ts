import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { RegionsRoutingModule } from './geo-routing.module';
import { RegionsHomeComponent } from './regions/regions-home/regions-home.component';
import { RegionsListComponent } from './regions/regions-list/regions-list.component';
import { RegiondescNewComponent } from '../region-desc/regiondesc-new/regiondesc-new.component';
import { SharedModule } from 'src/app/core/shared.module';
import { CreateEditRegionComponent } from './regions/create-edit-region/create-edit-region.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    RegionsHomeComponent,
    RegionsListComponent,
    RegiondescNewComponent,
    CreateEditRegionComponent
  ],
  imports: [
    CommonModule,
    RegionsRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class RegionsModule { }
