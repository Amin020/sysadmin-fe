import { Component, OnInit } from '@angular/core';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-versions-list',
  templateUrl: './app-versions-list.component.html',
  styleUrls: ['./app-versions-list.component.scss']
})
export class AppVersionsListComponent implements OnInit {
  versions: any;
  appId: any;

  constructor(
    private appService: AppManagementService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => [
      this.getSelectedAppVersions(params['id'])
    ]);
    this.route.params.subscribe(params => {
      this.appId = params.id;
    });
  }

  getSelectedAppVersions(id) {
    this.appService.getAppVersion(id).subscribe(data => {
      this.versions = data;
    });
  }

}
