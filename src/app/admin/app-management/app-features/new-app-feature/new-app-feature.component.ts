import { Component, OnInit } from '@angular/core';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { FeaturesService } from 'src/app/services/admin/features.service';

@Component({
  selector: 'app-new-app-feature',
  templateUrl: './new-app-feature.component.html',
  styleUrls: ['./new-app-feature.component.scss']
})
export class NewAppFeatureComponent implements OnInit {
  saveloading: Boolean = false;
  appId: any;
  featuresList: any;
  today = new Date();
  appFeature: any = {
    createdBy: 'Ehab',
    editBy: 'Ehab',
    showA: false,
    sysAppNode: {},
    sysFeature: {}
  };

  constructor(
    private appService: AppManagementService,
    private featureService: FeaturesService,
    private route: ActivatedRoute,
    private router: Router,
    private locaiton: Location
  ) { }

  ngOnInit() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    this.route.parent.params.subscribe(params => {
      this.appId = params.id;
    });

    this.featureService.getFeatures().subscribe(data => {
      this.getFeaturesList(data);
    });
  }

  getFeaturesList(features) {
    this.featuresList = [];
    features.forEach(feature => {
      const featureItem: any = { value: feature.id, label: feature.desc };
      this.featuresList.push(featureItem);
    });
  }

  savaAppFeature() {
    this.saveloading = true;
    this.appFeature.sysAppNode.id = this.appId;
    delete this.appFeature.createdDate;
    delete this.appFeature.editDate;
    this.appService.addAppFeature(this.appFeature, this.appId).subscribe(() => {
      this.saveloading = false;
      this.router.navigate(['/apps/details/' + this.appId]);
    });
  }

  cancel() {
    this.locaiton.back();
  }

}
