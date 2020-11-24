import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { LicenseOffersService } from 'src/app/services/admin/license-offers.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { MDBModalService, MDBModalRef, ModalDirective } from 'ng-uikit-pro-standard';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-offers-list',
  templateUrl: './offers-list.component.html',
  styleUrls: ['./offers-list.component.scss'],
  providers: [LicenseOffersService],
  encapsulation: ViewEncapsulation.None
})
export class OffersListComponent extends ParentListBase implements OnInit {

  offersList: any;
  @ViewChild('confirmCopyRef') confirmCopyRef: ModalDirective;
  loading = true;
  modalRef: MDBModalRef;
  offerToCopy: any;

  constructor(
    private modalService: MDBModalService,
    private offersService: LicenseOffersService,
    private router: Router,
    private loaderSerivce: LoaderService) {
    super();
  }

  ngOnInit() {
    this.getAllOffers();
  }

  openModal(id, index) {
    this.modalRef = this.modalService.show(ModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true
    });

    this.modalRef.content.action.subscribe((result: any) => {
      if (result === 'yes') {
        this.deleteOffer(id, index);
      }
    });
  }

  private getAllOffers() {
    this.loaderSerivce.isLoading.next(true);
    this.offersService.getOffers().subscribe((offers: any[]) => {
      if (offers && offers.length > 0) {
        this.offersList = offers.filter(offer => offer.status !== 'INACTIVE');
      }
      this.updatePagination(this.offersList);
      this.loaderSerivce.isLoading.next(false);
      this.loading = false;
    }, error => {
      this.loaderSerivce.isLoading.next(false);
      this.loading = false;
    }
    );
  }

  newOffer() {
    this.router.navigate(['/offers/newOffer']);
  }

  deleteOffer(id: number, index: any) {
    this.offersService.deleteOffer(id).subscribe(data => {
      this.getAllOffers();
    }, error => {
    });
  }

  editOffer(offerId: string) {
    this.router.navigate(['offers/editOffer/' + offerId]);
  }

  openGeneralDialog(offer: any) {
    this.offerToCopy = offer;
    this.confirmCopyRef.show();
  }

  duplicateOffer(offer: any) {
    this.confirmCopyRef.hide();
    this.offersService.duplicateOffer(offer).subscribe(response => {
      this.getAllOffers();
      // Show success message.
    }, error => { });
  }

}
