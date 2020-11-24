import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-app-details',
  templateUrl: './app-details.component.html',
  styleUrls: ['./app-details.component.scss']
})
export class AppDetailsComponent implements OnInit {

  app: any;
  uoms: any;
  features: any;
  descriptions: any;
  AppUOMLoading = true;
  appId: any;
  noChild: boolean;

  constructor(
    private appService: AppManagementService,
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => [
      this.getSelectedApp(params['id']),
    ]);
    this.router.routeReuseStrategy.shouldReuseRoute = (() => false);
  }

  getSelectedApp(id) {
    this.appService.getAppById(id).subscribe(data => {
      this.app = data;
      this.loaderService.isLoading.next(false);
    }, error => {
      this.loaderService.isLoading.next(false);
    });
  }

  backToPreviousPage() {
    this.location.back();
  }
}
