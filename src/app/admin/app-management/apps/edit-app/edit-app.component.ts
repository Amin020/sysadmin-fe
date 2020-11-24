import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.scss']
})
export class EditAppComponent implements OnInit {

  refreshAppsList = 0;
  saveloading: boolean;
  app: any = {
    appClass: 'System',
    appType: 'APP',
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
    private route: ActivatedRoute,
    private router: Router, private loaderSerivce: LoaderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params =>
      this.getSelectedApp(params['id']));
    this.appService.refreshAppsList.subscribe(refresh =>
      this.refreshAppsList = refresh);
  }

  getSelectedApp(id) {
    this.appService.getAppById(id).subscribe(data => {
      this.app = data;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  saveApp() {
    this.saveloading = true;
    delete this.app.createdDate;
    delete this.app.editDate;
    this.appService.editApp(this.app).subscribe(() => {
      this.appService.refreshApps(1);
      this.saveloading = false;
      this.router.navigate(['/apps']);
    }, error => {
      this.saveloading = false;
    });
  }

  cancel() {
    this.router.navigate(['/apps']);
  }
}
