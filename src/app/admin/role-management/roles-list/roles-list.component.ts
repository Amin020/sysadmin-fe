import { Component, OnInit } from '@angular/core';
import { RolesManagementService } from 'src/app/services/admin/roles-management.service';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
  styleUrls: ['./roles-list.component.scss']
})
export class RolesListComponent extends ParentListBase implements OnInit {

  loading = true;
  noDataFound = false;
  modalRef: MDBModalRef;
  roleList: any;

  constructor(
    private modalService: MDBModalService,
    private roleService: RolesManagementService,
    private router: Router,
    private loaderSerivce: LoaderService) {
    super();
  }

  ngOnInit() {
    this.getAllRoles();
  }

  openModal(id, i) {
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
        this.deleteRole(id, i);
      }
    });
  }

  private getAllRoles() {
    this.roleService.getAllRoles().subscribe(data => {
      this.roleList = data;
      this.updatePagination(this.roleList);
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  newRole() {
    this.router.navigate(['/roles/create-role']);
  }

  editRole(roleId) {
    this.router.navigate(['/roles/edit/' + roleId]);
  }

  copyRole(roleId) {
    this.router.navigate(['/roles/edit/' + roleId + '/copy']);
  }

  deleteRole(roleId, i) {
    this.roleService.DeactivateSysRole(roleId).subscribe(
      data => {
        this.roleList[i] = data;
      }, error => {
      }
    );
  }

}
