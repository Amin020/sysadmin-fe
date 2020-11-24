import { Component, OnInit } from '@angular/core';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoaderService } from 'src/app/core/loader.service';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-apps-list',
  templateUrl: './apps-list.component.html',
  styleUrls: ['./apps-list.component.scss']
})
export class AppsListComponent extends ParentListBase implements OnInit {

  apps: any;
  appId: any;
  loading = true;
  message: number;
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private appService: AppManagementService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loaderSerivce: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.appId = params.id;
      if (this.appId) {
        this.getChildsAppList(this.appId);
      } else {
        this.getAppsList();
      }
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

  private getAppsList() {
    this.loading = true;
    this.appService.getApps().subscribe(data => {
      this.apps = data;
      // check for # of paginators
      this.updatePagination(this.apps);
      this.appService.changeMessage(Number(this.apps[this.apps.length - 1].id) + 1);
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  private getChildsAppList(id) {
    this.loading = true;
    this.appService.getAllAppChilds(id).subscribe(data => {
      this.apps = data;
      // check for # of paginators
      this.changePage({ target: { text: 1 } }); // In case of deleting some item in another page, we will navigate to first one.
      if (this.apps.length % this.itemsPerPage === 0) {
        this.numberOfPages = Math.floor(this.apps.length / this.itemsPerPage);
      } else {
        this.numberOfPages = Math.floor(this.apps.length / this.itemsPerPage) + 1;
      }
      this.appService.changeMessage(
        Number(this.apps[this.apps.length - 1].id) + 1
      );
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  newApp() {
    if (this.appId) {
      this.router.navigate(['/apps/new/' + this.appId]);
    } else {
      this.router.navigate(['/apps/new']);
    }
  }

  backToPreviousPage() {
    this.location.back();
  }

  edit(app) {
    this.router.navigate(['/apps/edit/' + app.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(app) {
    this.appService.deleteApp(app.id).subscribe(() => {
      if (this.appId) {
        this.getChildsAppList(this.appId);
      } else {
        this.getAppsList();
      }
    });
  }
}
