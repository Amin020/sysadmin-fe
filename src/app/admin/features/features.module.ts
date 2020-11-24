
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesHomeComponent } from './features-home/features-home.component';
import { FeaturesListComponent } from './features-list/features-list.component';
import { CreateEditFeatureComponent } from './create-edit-feature/create-edit-feature.component';
import { SharedModule } from 'src/app/core/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FeaturesHomeComponent,
    FeaturesListComponent,
    CreateEditFeatureComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    FormsModule,
    SharedModule,
  ]
})
export class FeaturesModule { }
