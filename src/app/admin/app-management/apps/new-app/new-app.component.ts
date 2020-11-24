import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { AppManagementService } from 'src/app/services/admin/app-management.service';

@Component({
  selector: 'app-new-app',
  templateUrl: './new-app.component.html',
  styleUrls: ['./new-app.component.scss']
})
export class NewAppComponent implements OnInit {
  saveloading: Boolean = false;
  appId: any;
  app: any = {
    createdBy: '',
    editBy: 'Ehab',
    appClass: 'System',
    appType: 'APP',
    childs: [],
    seq: 0,
    id: 0,
    isoCode: '',
    parentRef: null,
    shortName: '',
    sysAppDesc: [],
    sysAppFeatures: [],
    sysAppVersions: [],
    sysUoms: [],
  };

  appClass = [
    { value: 'System', label: 'System' },
    { value: 'Admin', label: 'Admin' },
    { value: 'App', label: 'App' }
  ];
  appType = [
    { value: 'APP', label: 'APP' },
    { value: 'MODULE', label: 'MODULE' },
    { value: 'FUNTION', label: 'FUNTION' }
  ];

  constructor(
    private appService: AppManagementService,
    private sharedService: SharedService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.appId = params.id;
      if (this.appId) {
        this.app.parentRef = { 'id': this.appId };
      }
    });
  }

  savaApp() {
    this.saveloading = true;
    this.app.createdBy = this.sharedService.loggedInUser;
    delete this.app.childs;
    this.app.seq = 1;
    this.appService.addApp(this.app).subscribe(() => {
      this.appService.refreshApps(1);
      this.saveloading = false;
      if (this.appId) {
        this.router.navigate(['/apps/details/' + this.appId]);
      } else {
        this.router.navigate(['/apps']);
      }
    }, error => {
      this.saveloading = false;
    });
  }

  cancel() {
    if (this.appId) {
      this.router.navigate(['/apps/details/' + this.appId]);
    } else {
      this.router.navigate(['/apps']);
    }
  }
}
