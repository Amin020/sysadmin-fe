import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OffersListComponent } from './offers-list/offers-list.component';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: OffersListComponent },
      { path: 'newOffer', component: NewOfferComponent },
      { path: 'editOffer/:id', component: EditOfferComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LicenseOfferRoutingModule { }
