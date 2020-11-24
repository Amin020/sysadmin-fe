import { FeaturesService } from 'src/app/services/admin/features.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  refreshRegList: number = 0;
  saveloading: Boolean = false;
  uomsList: object[];
  feature: any = {};
  id;

  constructor(
    private featureService: FeaturesService,
    private route: ActivatedRoute,
    private router: Router, private loaderSerivce: LoaderService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = Number(params.id);
    });

    this.featureService.getActiveUOMs().subscribe(data => {
      this.getUOMsList(data);
    });
    if (this.id == 0) {
      this.feature = {
        createdBy: JSON.parse(localStorage.getItem('userData'))['createdBy'],
        editBy: JSON.parse(localStorage.getItem('userData'))['editBy'],
        status: 1,
        desc: '',
        sysUom: { id: 0 }
      };
      this.loaderSerivce.isLoading.next(false);
    } else {
      this.getSelectedFeature(this.id);
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
    this.featureService.getSelectedFeature(id).subscribe(data => {
      this.feature = data;
      console.log(this.feature);
      this.loaderSerivce.isLoading.next(false);
    });
  }

  saveFeature() {
    this.saveloading = true;

    if (this.id == 0) {
      this.featureService.addFeature(this.feature).subscribe(() => {
        this.afterEditOrCreate()
      });
    } else {
      delete this.feature.createdDate;
      delete this.feature.editDate;
      this.featureService.editFeature(this.feature).subscribe(() => {
        this.afterEditOrCreate()
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
