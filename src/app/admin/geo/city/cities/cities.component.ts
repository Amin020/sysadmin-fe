import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegionsService } from 'src/app/services/admin/geo.service';
import { LoaderService } from 'src/app/core/loader.service';
import { ModalComponent } from 'src/app/core/modal/modal.component';
import { MDBModalRef, MDBModalService } from 'ng-uikit-pro-standard';
import { ParentListBase } from 'src/app/core/parent-list-base';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent extends ParentListBase implements OnInit {

  loading = true;
  message: number;
  cities: any;
  noDataFound: boolean;
  headElements = ['ID', 'Name', 'Native Name', 'Aprv', 'RTL'];
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private regionsService: RegionsService,
    private router: Router,
    private loaderSerivce: LoaderService
  ) {
    super();
  }

  ngOnInit() {
    this.regionsService.currentMessage.subscribe(
      message => (this.message = message)
    );
    this.regionsService.refreshCitiessList.subscribe(refresh =>
      this.getCitiesList()
    );
  }

  openModal(x) {
    this.modalRef = this.modalService.show(ModalComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true
    });

    this.modalRef.content.action.subscribe((result: any) => {
      if (result === 'yes') {
        this.delete(x);
      }
    });
  }

  private getCitiesList() {
    this.loading = true;
    this.regionsService.getCities().subscribe(data => {
      this.cities = data;
      this.updatePagination(this.cities);
      if (this.cities.length > 0) {
        this.regionsService.changeMessage(Number(this.cities[this.cities.length - 1].id) + 1);
      } else {
        this.noDataFound = true;
      }
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    }, error => {
      this.loading = false;
      this.loaderSerivce.isLoading.next(false);
    });
  }

  edit(city) {
    this.router.navigate(['/cities/edit/' + city.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(city) {
    this.regionsService.deleteCity(city.id).subscribe(item =>
      this.getCitiesList()
    );
  }

  removeLang(item) {
    const index = this.cities.indexOf(item);
    if (index > -1) {
      this.cities.splice(index, 1);
    }
  }
}
