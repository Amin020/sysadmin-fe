import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UOMsService } from 'src/app/services/admin/uoms.service';
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-create-edit-uom',
  templateUrl: './create-edit-uom.component.html',
  styleUrls: ['./create-edit-uom.component.scss']
})
export class CreateEditUOMComponent implements OnInit {

  saveloading: Boolean = false;
  appsList: object[];
  isUpdateMode: boolean;
  uom: any = {
    uomID: '',
    uomDesc: '',
    // isoUom: '',
  };

  constructor(
    private uomService: UOMsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loaderSerivce: LoaderService
  ) { }

  ngOnInit() {
    const UOMId = this.activatedRoute.snapshot.paramMap.get('id');
    if (!UOMId) { // Add new UOM mode.
      this.uom = {
        createdBy: JSON.parse(localStorage.getItem('userData'))['createdBy'],
        editBy: JSON.parse(localStorage.getItem('userData'))['editBy'],
        uomID: '',
        uomDesc: '',
        // isoUom: '',
        status: 1,
        sysAppNode: { id: 0 }
      };
      this.uomService.getApps().subscribe(data => {
        this.loaderSerivce.isLoading.next(false);
        this.mapAppsList(data);
      }, error => {
        this.loaderSerivce.isLoading.next(false);
      });
    } else { // Update UOM mode.
      this.isUpdateMode = true;
      this.getSelectedUOM(UOMId);
    }
  }

  getSelectedUOM(UOMId: string) {
    this.loaderSerivce.isLoading.next(true);
    this.uomService.getSelectedUOM(UOMId).subscribe(data => {
      this.uom = data;
      this.loaderSerivce.isLoading.next(false);
      if (!this.uom.sysAppNode) {
        this.uom.sysAppNode = { id: 0 };
      } else {
        this.appsList = [{ value: this.uom.sysAppNode.id, label: this.uom.sysAppNode.shortName, selected: true }];
      }
    }, error => {
      this.loaderSerivce.isLoading.next(false);
    });
  }

  mapAppsList(apps) {
    this.appsList = [];
    apps.forEach(app => {
      const appItem: any = { value: app.id, label: app.shortName };
      this.appsList.push(appItem);
    });
  }

  saveUOM() {
    if (this.uom.sysAppNode.id === 0) {
      delete this.uom.sysAppNode;
    }
    this.saveloading = true;
    if (!this.isUpdateMode) {
      this.uomService.addUOM(this.uom).subscribe(() => {
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
        this.loaderSerivce.isLoading.next(false);
      });
    } else {
      delete this.uom.createdDate;
      delete this.uom.editDate;
      this.uomService.editUOM(this.uom).subscribe(() => {
        this.afterEditOrCreate();
      }, error => {
        this.saveloading = false;
        this.loaderSerivce.isLoading.next(false);
      });
    }
  }

  afterEditOrCreate() {
    this.uomService.refreshUOMs(1);
    this.saveloading = false;
    this.router.navigate(['/uoms']);
  }

  cancel() {
    this.router.navigate(['./uoms']);
  }

}
