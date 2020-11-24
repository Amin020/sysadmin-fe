import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { Region } from '../../region';
import { LoaderService } from 'src/app/core/loader.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-regions-list',
  templateUrl: './regions-list.component.html',
  styleUrls: ['./regions-list.component.scss']
})
export class RegionsListComponent extends ParentListBase implements OnInit {

  regions: any;
  loading = true;
  message: number;
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private regionsService: RegionsService,
    private loaderSerivce: LoaderService,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.getRegionList();
    this.regionsService.refreshRegionsList.subscribe(() => {
      this.getRegionList();
    });
  }

  openModal(x) {
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
        this.delete(x);
      }
    });
  }

  private getRegionList() {
    this.loading = true;
    this.regionsService.getRegions().subscribe(data => {
      this.regions = data;
      this.updatePagination(this.regions);
      this.regionsService.changeMessage(Number(this.regions[this.regions.length - 1].id) + 1);
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  edit(region) {
    this.router.navigate(['/regions/edit/' + region.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(region) {
    this.regionsService.deleteRegion(region.id).subscribe(item => this.getRegionList());
  }

  removeLang(item) {
    const index = this.regions.indexOf(item);
    if (index > -1) {
      this.regions.splice(index, 1);
    }
  }

}
