import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-create-edit-region',
  templateUrl: './create-edit-region.component.html',
  styleUrls: ['./create-edit-region.component.scss']
})
export class CreateEditRegionComponent implements OnInit {

  refreshRegList = 0;
  saveloading = false;
  region: any = {
    'code': '',
    'editBy': ''
  };
  updateMode: boolean;

  constructor(
    private regionsService: RegionsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loaderSerivce: LoaderService) { }

  ngOnInit() {
    const regionId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    if (regionId) {
      this.updateMode = true;
      this.getSelectedRegion(regionId);
    }
    this.regionsService.refreshRegionsList.subscribe(refresh => this.refreshRegList = refresh);
  }

  private getSelectedRegion(regionId: number) {
    this.regionsService.getSelectedRegion(regionId).subscribe(data => {
      this.region = data;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  saveRegion() {
    this.saveloading = true;
    if (this.updateMode) {
      delete this.region.createdDate;
      delete this.region.editDate;
      this.regionsService.editRegion(this.region).subscribe(data => {
        this.saveloading = false;
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
      });
    } else {
      this.region.createdBy = JSON.parse(localStorage.getItem('userData'))['createdBy'];
      this.regionsService.addRegion(this.region).subscribe(data => {
        this.saveloading = false;
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
      });
    }
  }

  private afterEditOrCreate() {
    this.regionsService.refreshRegions(1);
    this.saveloading = false;
    this.router.navigate(['/regions']);
  }

  cancel() {
    this.router.navigate(['/regions']);
  }

}
