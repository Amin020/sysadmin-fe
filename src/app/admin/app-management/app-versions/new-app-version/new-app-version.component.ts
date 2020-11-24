import { Component, OnInit } from '@angular/core';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { SharedService } from 'src/app/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-new-app-version',
  templateUrl: './new-app-version.component.html',
  styleUrls: ['./new-app-version.component.scss']
})

export class NewAppVersionComponent implements OnInit {
  saveloading: Boolean = false;
  appId: any;
  curDate = new Date();
  formattedDate = this.curDate.getFullYear() + '-0' + (this.curDate.getMonth() + 1) + '-' + this.curDate.getDate();
  appVersion: any = {
    createdBy: 'MNABIL',
    editBy: 'MNABIL',
    applyBy: 'MNABIL',
    applyDate: this.formattedDate,
    releaseDate: this.formattedDate,
    sysAppNode: {},
    releaseControlNo: '',
    versionRemarks: ''
  };

  constructor(
    private appService: AppManagementService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private locaiton: Location
  ) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.route.parent.params.subscribe(params => {
      this.appId = params.id;
    });
  }

  savaApp() {
    this.saveloading = true;
    this.appVersion.sysAppNode.id = this.appId;
    delete this.appVersion.createdDate;
    delete this.appVersion.editDate;
    this.appService.addAppVersion(this.appVersion).subscribe(() => {
      this.saveloading = false;
      this.router.navigate(['/apps/details/' + this.appId]);
    });
  }

  cancel() {
    this.locaiton.back();
  }

}
