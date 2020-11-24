import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-new-app-uom',
  templateUrl: './new-app-uom.component.html',
  styleUrls: ['./new-app-uom.component.scss']
})
export class NewAppUomComponent implements OnInit {
  refreshRegList: number = 0;
  saveloading: Boolean = false;
  appsList: object[];
  id: number;
  appUom: any = {
    createdBy: 'Ehab',
    editBy: 'Ehab',
    uomID: '',
    uomDesc: '',
    isoUom: '',
    status: 1,
    sysAppNode: {}
  };
  appId: any;


  constructor(
    private appService: AppManagementService,
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

  saveAppUom() {
    this.saveloading = true;
    this.appUom.sysAppNode.id = this.appId;
    delete this.appUom.createdDate;
    delete this.appUom.editDate;
    this.appService.addUOM(this.appUom).subscribe(() => {
      this.saveloading = false;
      this.router.navigate(['/apps/details/' + this.appId]);
    });
  }

  cancel() {
    this.locaiton.back();
  }
}
