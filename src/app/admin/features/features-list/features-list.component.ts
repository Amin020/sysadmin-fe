import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeaturesService } from 'src/app/services/admin/features.service';
import { LoaderService } from 'src/app/core/loader.service';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-features-list',
  templateUrl: './features-list.component.html',
  styleUrls: ['./features-list.component.scss']
})
export class FeaturesListComponent extends ParentListBase implements OnInit {

  features: any;
  loading = true;
  message: number;
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private featureService: FeaturesService,
    private router: Router, private loaderSerivce: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.getFeaturesList();
    this.featureService.currentMessage.subscribe(
      message => (this.message = message)
    );
    this.featureService.refreshFeaturesList.subscribe(refresh =>
      this.getFeaturesList()
    );
  }

  openModal(feature) {
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
        this.delete(feature);
      }
    });
  }

  getFeaturesList() {
    this.loading = true;
    this.featureService.getFeatures().subscribe(data => {
      this.features = data;
      this.updatePagination(this.features);
      this.featureService.changeMessage(Number(this.features[this.features.length - 1].id) + 1);
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  edit(feature) {
    this.router.navigate(['/features/edit/' + feature.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(feature) {
    this.featureService.deleteFeature(feature.id).subscribe(() => {
      this.getFeaturesList();
    });
  }
}
