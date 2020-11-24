import { FeaturesService } from 'src/app/services/admin/features.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-create-edit-feature',
  templateUrl: './create-edit-feature.component.html',
  styleUrls: ['./create-edit-feature.component.scss']
})
export class CreateEditFeatureComponent implements OnInit {

  refreshRegList = 0;
  saveloading: boolean;
  uomsList: object[];
  feature: any;
  isUpdateMode: boolean;

  constructor(
    private featureService: FeaturesService,
    private route: ActivatedRoute,
    private router: Router, private loaderSerivce: LoaderService
  ) { }

  ngOnInit() {
    const featureId = this.route.snapshot.paramMap.get('id');
    this.featureService.getActiveUOMs().subscribe(data => {
      this.getUOMsList(data);
    });
    if (!featureId) {
      this.feature = {
        createdBy: JSON.parse(localStorage.getItem('userData'))['createdBy'],
        editBy: JSON.parse(localStorage.getItem('userData'))['editBy'],
        status: 1,
        desc: '',
        sysUom: { id: 0 }
      };
      this.loaderSerivce.isLoading.next(false);
    } else {
      this.isUpdateMode = true;
      this.getSelectedFeature(featureId);
    }
  }

  getUOMsList(uoms) {
    this.uomsList = [];
    uoms.forEach(uom => {
      const uomItem: any = { value: uom.id, label: uom.uomID };
      this.uomsList.push(uomItem);
    });
  }

  getSelectedFeature(id) {
    this.loaderSerivce.isLoading.next(true);
    this.featureService.getSelectedFeature(id).subscribe(data => {
      this.feature = data;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  saveFeature() {
    this.saveloading = true;
    if (!this.isUpdateMode) {
      this.featureService.addFeature(this.feature).subscribe(() => {
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
      });
    } else {
      delete this.feature.createdDate;
      delete this.feature.editDate;
      this.featureService.editFeature(this.feature).subscribe(() => {
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
      });
    }
  }

  afterEditOrCreate() {
    this.featureService.refreshFeatures(1);
    this.saveloading = false;
    this.router.navigate(['/features']);
  }

  cancel() {
    this.router.navigate(['/features']);
  }
}
