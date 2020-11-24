import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LicenseOfferRoutingModule } from './license-offer-routing.module';
import { OffersListComponent } from './offers-list/offers-list.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { OffersHomeComponent } from './offers-home/offers-home.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/core/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [OffersListComponent, EditOfferComponent, NewOfferComponent, OffersHomeComponent],
  imports: [
    CommonModule,
    LicenseOfferRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class LicenseOfferModule { }
