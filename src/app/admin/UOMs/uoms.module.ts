import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UOMsRoutingModule } from './uoms-routing.module';
import { UOMsHomeComponent } from './uoms-home/uoms-home.component';
import { UOMsListComponent } from './uoms-list/uoms-list.component';
import { CreateEditUOMComponent } from './create-edit-uom/create-edit-uom.component';
import { SharedModule } from 'src/app/core/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    UOMsHomeComponent,
    UOMsListComponent,
    CreateEditUOMComponent
  ],
  imports: [
    CommonModule,
    UOMsRoutingModule,
    FormsModule,
    SharedModule,
  ],
  exports: [
    UOMsListComponent,
  ]
})

export class UOMsModule { }
