import { Component, OnInit, ViewChild } from '@angular/core';
import {
  IMyOptions,
  MDBDatePickerComponent
} from 'ng-uikit-pro-standard';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AppBundleService } from 'src/app/services/admin/app-bundle.service';
import { AppManagementService } from 'src/app/services/admin/app-management.service';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-create-edit-bundle',
  templateUrl: './create-edit-bundle.component.html',
  styleUrls: ['./create-edit-bundle.component.scss']
})
export class CreateEditBundleComponent implements OnInit {

  @ViewChild('datePicker') datePicker: MDBDatePickerComponent;
  isUpdateMode: boolean;

  public myDatePickerOptions: IMyOptions = {
    firstDayOfWeek: 'su',
    closeAfterSelect: true,
    disableUntil: { year: 2019, month: 5, day: 31 },
    markDates: [
      {
        dates: [{ year: 2016, month: 11, day: 14 }],
        color: '#004198'
      }
    ]
  };

  bundle: any = {
    id: '',
    name: ''
  };
  headElements = [
    'Desciription',
    'Unit of measure',
    'Show/Hide',
    'Value',
    'Costly',
    'Estimated Cost',
    'Key Feature'
  ];
  apps = [];
  appList = {};
  allApps: any = [];
  allAppsArray: any = [];
  appToAdd = '';
  bundleTypeList = [
    { value: 'DEMO', label: 'DEMO' },
    { value: 'INDIVIDUAL', label: 'INDIVIDUAL' },
    { value: 'SMALL', label: 'SMALL' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'PROFESSIONAL', label: 'PROFESSIONAL' },
    { value: 'PREMIUM', label: 'PREMIUM' },
    { value: 'ENTERPRISE', label: 'ENTERPRISE' }
  ];
  bundleStatusList = [
    { value: 'DRAFT', label: 'DRAFT' },
    { value: 'APPROVED', label: 'APPROVED' },
    { value: 'OBSOLETED', label: 'OBSOLETED' }
  ];
  saveloading = false;

  constructor(
    private BundleService: AppBundleService,
    private appService: AppManagementService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private loaderSerivce: LoaderService
  ) {
    // this.localeService.setLocaleOptions(this.locales);
  }

  ngOnInit() {
    this.getAppsList();
    const featureBundleId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (featureBundleId) {
      this.isUpdateMode = true;
      this.getSelectedBundle(featureBundleId);
    }
  }

  private getSelectedBundle(id: number) {
    this.BundleService.getSelectedBundle(id).subscribe(data => {
      this.bundle = data;
      this.bundle.sysFeatureBundleDetails.forEach(app => {
        if (!this.apps.includes(app.sysAppFeature.sysAppNode.id)) {
          this.apps.push(app.sysAppFeature.sysAppNode.id);
          this.appList[app.sysAppFeature.sysAppNode.shortName] = [app];
        } else {
          this.appList[app.sysAppFeature.sysAppNode.shortName].push(app);
        }
      });
      this.loaderSerivce.isLoading.next(false);
    });
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
    const newApp = this.allAppsArray.find(app => app.id === this.appToAdd);
    if (this.appList[newApp.shortName] === undefined) {
      newApp.sysAppFeatures.forEach(element => {

        element.sysAppNode = {
          appClass: newApp.appClass,
          appType: newApp.appType,
          childs: newApp.childs,
          createdBy: newApp.createdBy,
          createdDate: newApp.createdDate,
          editBy: newApp.editBy,
          editDate: newApp.newAppeditDate,
          id: newApp.id,
          isoCode: newApp.isoCode,
          parentRef: newApp.parentRef,
          seq: newApp.seq,
          shortName: newApp.shortName,
          status: newApp.status,
          sysAppDescs: null,
          sysAppFeatures: null,
          sysAppVersions: null,
          sysUoms: null
        };
        const newAppObject = {
          createdBy: newApp.createdBy,
          editBy: newApp.editBy,
          costly: false,
          initialCost: 0,
          showA: true,
          value: 0,
          keyFeature: false,
          sysAppFeature: element,
          sysFeatureBundle: { name: '' }
        };

        this.bundle.sysFeatureBundleDetails.push(newAppObject);
        if (!this.apps.includes(newAppObject.sysAppFeature.sysAppNode.id)) {
          this.apps.push(newAppObject.sysAppFeature.sysAppNode.id);
          this.appList[newAppObject.sysAppFeature.sysAppNode.shortName] = [newAppObject];
        } else {
          this.appList[newAppObject.sysAppFeature.sysAppNode.shortName].push(newAppObject);
        }
      });
    }
  }

  removeBundleApp(shortName) {
    delete this.appList[shortName];
    const newSysFeatureBundleDetails = [];
    this.bundle.sysFeatureBundleDetails.forEach(app => {
      if (app.sysAppFeature.sysAppNode.shortName !== shortName) {
        newSysFeatureBundleDetails.push(app);
      } else {
        this.apps = this.apps.filter(e => e !== app.sysAppFeature.sysAppNode.id);
      }
    });
    this.bundle.sysFeatureBundleDetails = newSysFeatureBundleDetails;
  }

  saveBundle() {
    this.saveloading = true;
    delete this.bundle.editDate;
    delete this.bundle.createdDate;
    if (this.isUpdateMode) {
      this.BundleService.editBundle(this.bundle).subscribe(data => {
        this.BundleService.refreshBundles(1);
        this.saveloading = false;
        this.router.navigate(['/app-bundle']);
      }, error => {
        this.saveloading = false;
      });
    } else {
      this.BundleService.addBundle(JSON.stringify(this.bundle)).subscribe(data => {
        this.BundleService.refreshBundles(1);
        this.saveloading = false;
        this.router.navigate(['/app-bundle']);
      }, error => {
        this.saveloading = false;
      });
    }
  }

  backToPreviousPage() {
    this.location.back();
  }

}
