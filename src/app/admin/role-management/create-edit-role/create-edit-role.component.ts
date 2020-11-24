import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { RolesManagementService } from 'src/app/services/admin/roles-management.service';

import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-create-edit-role',
  templateUrl: './create-edit-role.component.html',
  styleUrls: ['./create-edit-role.component.scss']
})
export class CreateEditRoleComponent implements OnInit {

  saveLoading;
  apps = [];
  appList = {};
  allApps: any = [];
  allAppsArray: any = [];
  appToAdd = '';
  roleId: number;
  selectedApp;
  SelectedApps = [];
  roleObj: any;
  isCopy: boolean;
  commonParam = {
    "createdBy": JSON.parse(localStorage.getItem('userData'))['createdBy'],
    "editBy": JSON.parse(localStorage.getItem('userData'))['editBy']
  };
  private rejectedKeys = ["createdBy", "createdDate", "editBy", "editDate", "id"];
  headElements = [
    'Function Name',
    'Read',
    'write',
    'Delete',
    'Hide',
    'status',
    ''
  ];
  roleStatusList = [
    { value: 'INACTIVE', label: 'INACTIVE' },
    { value: 'ACTIVE', label: 'ACTIVE' },
    { value: 'ONHOLD', label: 'ONHOLD' }
  ];

  constructor(
    private router: Router,
    private appService: AppManagementService,
    private roleService: RolesManagementService,
    private activatedRoute: ActivatedRoute,
    private loaderSerivce: LoaderService
  ) {
  }

  ngOnInit() {
    this.isCopy = location.pathname.includes('copy');
    this.roleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (this.roleId) {
      this.getSelectedRoleData();
      this.getAppsList();
    } else {
      this.roleObj = {
        // code: '',
        desc: '',
        status: 0
      };
      this.SelectedApps = [];
      this.allApps = [];
    }
  }

  private rejectFun(obj, keys) {
    return Object.keys(obj)
      .filter(k => keys && !keys.includes(k))
      .map(k => Object.assign({}, { [k]: obj[k] }))
      .reduce((res, o) => Object.assign(res, o), {});
  }

  private getSelectedRoleData() {
    this.roleService.getSelectedRole(this.roleId).subscribe(
      data => {
        this.roleObj = this.rejectFun(data, this.rejectedKeys);
        if (this.roleObj["roleAuths"].length) {
          this.SelectedApps = this.roleObj["roleAuths"];
        }
        this.loaderSerivce.isLoading.next(false);
      },
      error => { });
  }

  private getAppsList() {
    this.appService.getApps().subscribe(data => {
      this.allAppsArray = data;
      this.allAppsArray.forEach(element => {
        this.allApps.push({ value: element.id, label: element.shortName });
      });
      this.loaderSerivce.isLoading.next(false);
    });
  }

  addBundleApp() {
    if (this.appToAdd) {
      this.selectedApp = this.allAppsArray.find(app => app.id === this.appToAdd);
      const newAppObject = {
        // id: this.selectedApp.id,
        sysAppNode: {
          id: this.selectedApp.id,
          shortName: this.selectedApp.shortName
        },
        sysRole: { id: this.roleId },
        createdBy: this.selectedApp.createdBy,
        editBy: this.selectedApp.editBy,
        write: false,
        read: false,
        hide: false,
        status: 'INACTIVE'
      };
      if (this.SelectedApps.length === 0) {
        this.SelectedApps.push(newAppObject);
      } else if (this.SelectedApps.filter(app => app.sysAppNode.id === newAppObject.sysAppNode.id)[0]) {
      } else {
        this.SelectedApps.push(newAppObject);
      }
    }

  }
  updateRole() {
    // console.log('this.SelectedApps', this.SelectedApps);
    this.roleObj = Object.assign({}, this.roleObj, this.commonParam);
    this.roleObj["roleAuths"] = this.SelectedApps;
    if (this.roleId > 0 && !this.isCopy) {
      this.roleObj["id"] = this.roleId;
      this.roleService.updateRole(this.roleId, this.roleObj).subscribe(
        data => {
          this.backToPreviousPage();
        }
      );
    } else {
      this.roleService.addNewRole(this.roleObj).subscribe(
        data => {
          this.backToPreviousPage();
          this.router.navigate(['/roles/edit/' + data["id"]]);
        }
      );
    }
  }

  deleteApp(appId, index) {
    this.SelectedApps.splice(index, 1);
  }

  backToPreviousPage() {
    this.router.navigate(['roles']);
  }
}
