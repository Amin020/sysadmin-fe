import { Component, OnInit, ViewChildren, ViewChild, QueryList, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppBundleService } from 'src/app/services/admin/app-bundle.service';
import { ModalDirective, MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { LoaderService } from 'src/app/core/loader.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-bundle-list',
  templateUrl: './bundle-list.component.html',
  styleUrls: ['./bundle-list.component.scss']
})
export class BundleListComponent extends ParentListBase implements OnInit {

  loading = true;
  message: number;
  @ViewChild('confirmCopy') confirmCopy: ModalDirective;
  bundles: any;
  noDataFound: boolean;
  headElements = ['ID', 'Name', 'Native Name', 'Aprv', "RTL"];
  bundleToCopy: any;
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private BundleService: AppBundleService,
    private router: Router,
    private loaderSerivce: LoaderService) {
    super();
  }

  ngOnInit() {
    this.BundleService.currentMessage.subscribe(message => this.message = message);
    this.BundleService.refreshLanguagesList.subscribe(refresh => this.getBundleList());
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

  private getBundleList() {
    this.loading = true;
    this.BundleService.getBundels().subscribe(data => {
      this.bundles = data;
      this.updatePagination(this.bundles);
      if (this.bundles.length > 0) {
        this.BundleService.changeMessage(Number(this.bundles[this.bundles.length - 1].id) + 1);
      } else {
        this.noDataFound = true;
      }
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  edit(bundle) {
    this.router.navigate(['/app-bundle/edit/' + bundle.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  copyPop(bundle) {
    this.bundleToCopy = bundle;
    this.confirmCopy.show();
  }

  copyBundle(bundle) {
    const newBundle = Object.assign({}, bundle);
    newBundle.code += '-copy';
    delete newBundle.editDate;
    delete newBundle.id;
    delete newBundle.createdDate;
    this.confirmCopy.hide();
    this.BundleService.addBundle(JSON.stringify(newBundle)).subscribe(data => {
      this.BundleService.refreshBundles(1);
      this.router.navigate(['/app-bundle']);
    });
  }

  delete(bundle) {
    this.BundleService.deleteBundle(bundle.id).subscribe(item => this.getBundleList());
  }

}
