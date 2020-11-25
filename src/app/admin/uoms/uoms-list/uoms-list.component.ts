import { Component, OnInit, ViewChildren, QueryList, Input } from '@angular/core';
import { UOMsService } from 'src/app/services/admin/uoms.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-uoms-list',
  templateUrl: './uoms-list.component.html',
  styleUrls: ['./uoms-list.component.scss']
})
export class UOMsListComponent extends ParentListBase implements OnInit {

  @Input() uoms: any;
  loading = true;
  message: number;
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private uomService: UOMsService,
    private router: Router, private loaderSerivce: LoaderService) {
    super();
  }

  ngOnInit() {
    this.getUOMList();
    this.uomService.currentMessage.subscribe(message => {
      this.message = message;
    });
    this.uomService.refreshUOMsList.subscribe(refresh =>
      this.getUOMList()
    );
  }

  openModal(uom) {
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
        this.delete(uom);
      }
    });
  }

  private getUOMList() {
    this.loading = true;
    this.uomService.getUOMs().subscribe(data => {
      this.uoms = data;
      // check for # of paginators
      this.updatePagination(this.uoms);
      this.uomService.changeMessage(Number(this.uoms[this.uoms.length - 1].id) + 1);
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  edit(uom) {
    this.router.navigate(['/uoms/edit/' + uom.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(uom) {
    this.uomService.deleteUOM(uom.id).subscribe(() => {
      this.getUOMList();
    });
  }

}
