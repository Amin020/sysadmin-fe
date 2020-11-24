import { Component, OnInit, Input } from '@angular/core';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-app-desc',
  templateUrl: './list-app-desc.component.html',
  styleUrls: ['./list-app-desc.component.scss']
})
export class ListAppDescComponent implements OnInit {
  descriptions: any;
  appId: any;

  constructor(
    private appService: AppManagementService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => [
      this.getSelectedAppDesc(params['id'])
    ]);
    this.route.params.subscribe(params => {
      this.appId = params.id;
    });
  }

  getSelectedAppDesc(id) {
    this.appService.getAppDesc(id).subscribe(data => {
      this.descriptions = data;
    });
  }
}
