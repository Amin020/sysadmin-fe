import { Component, OnInit, ViewEncapsulation, ViewChildren, QueryList } from '@angular/core';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
import { Router, NavigationExtras } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { LoaderService } from 'src/app/core/loader.service';
import { MDBModalService, MDBModalRef } from 'ng-uikit-pro-standard';
import { ModalComponent } from 'src/app/core/modal/modal.component';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.scss'],
  providers: [SurveyManagementService],
  encapsulation: ViewEncapsulation.None
})
export class SurveysComponent implements OnInit {
  tblHeader = [
    { label: 'name', up: false, down: false, identifier: 'surveyList.name' }, { label: 'status', up: false, down: false, identifier: 'surveyList.status' },
    { label: 'surveyType', up: false, down: false, identifier: 'surveyList.type' }, { label: 'isPublic', up: false, down: false, identifier: 'surveyList.public' }]
  surveyList = [];
  private selectedFile: any;
  downloadJsonHref: any;
  clicked;
  numberOfPaginators: number;
  numberOfVisiblePaginators = 2;
  paginators: Array<any> = [];
  @ViewChildren('pages') pages: QueryList<any>;
  activePage = 1;
  totalPages;
  itemsPerPage = 5;
  firstVisibleIndex = 0;
  lastVisibleIndex: number = this.itemsPerPage;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;
  currentLang = 'en';
  loading: boolean = true;
  modalRef: MDBModalRef;

  constructor(
    private modalService: MDBModalService,
    private suerveys: SurveyManagementService,
    private router: Router, private loaderService: LoaderService,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.retreiveSurveyList();
    if (JSON.parse(localStorage.getItem('currentLang'))) {
      this.currentLang = JSON.parse(localStorage.getItem('currentLang'));

    }
  }
  openModal(id, index) {
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
      if (result == 'yes') {
        this.deleteSurvey(id, index);
        this.retreiveSurveyList();
      }
    });
  }
  retreiveSurveyList(orderBy?, direction?) {
    this.suerveys.retreiveSuerveyList(this.activePage - 1, this.itemsPerPage, orderBy, direction).subscribe(
      (data: any) => {
        this.surveyList = []
        if (this.activePage != 1) {
          const count = (this.activePage - 1) * 5
          for (let i = 0; i < count; i++) {
            this.surveyList.push({ id: i });
          }
          this.surveyList = this.surveyList.concat(data.content);
        } else {
          this.surveyList = data.content;
        }
        this.totalPages = data.totalPages;
        // check for # of paginators
        let remainder = data.totalElements % this.itemsPerPage;
        this.numberOfPaginators = Math.floor(
          data.totalElements / this.itemsPerPage);
        if (remainder > 0) {
          this.numberOfPaginators++;
        }
        for (let i = 1; i <= this.numberOfPaginators; i++) {
          this.paginators.push(i);
        }
        this.loaderService.isLoading.next(false);
        this.loading = false;
      },
      error => { })
  }

  deleteSurvey(id: string, index) {
    this.suerveys.deleteSuervey(id).subscribe(
      data => {
        this.surveyList[index] = data;
      },
      error => { }
    )
  }
  syncTblSort(activatedHeader, truthy, fault) {
    this.tblHeader.forEach(element => {
      element.up = false;
      element.down = false;
      if (activatedHeader.label == element.label) {
        activatedHeader[truthy] = true;
        activatedHeader[fault] = false;
        let direction = truthy == 'up' ? 'DESC' : 'ASC'
        this.retreiveSurveyList(activatedHeader.label, direction);
      }
    })
  }
  newSurvey() {
    this.router.navigate(['SurveyManagement/survey/' + 0]);
  }
  viewSurvey(surveyId: string) {
    this.router.navigate(['SurveyManagement/survey/' + surveyId]);
  }
  editSurvey(surveyId: string) {
    this.router.navigateByUrl('SurveyManagement/survey/' + surveyId);
  }
  copySurvey(surveyId: string) {
    this.router.navigate(['SurveyManagement/survey/' + surveyId + '/copy']);
  }


  onFileChanged(event) {

    this.selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(this.selectedFile, "UTF-8");
    fileReader.onload = () => {
      var data = JSON.parse(fileReader["__zone_symbol__originalInstance"]["result"]);
      let navigationExtras: NavigationExtras = {
        queryParams: {
          "data": JSON.stringify(data)
        }
      };
      this.router.navigate(["SurveyManagement/copySurvey"], navigationExtras);
    }
    fileReader.onerror = (error) => {
      console.log(error);
    }
  }

  generateDownloadJsonUri(survey) {
    var theJSON = JSON.stringify(survey);
    var uri = this.sanitizer.bypassSecurityTrustUrl("data:text/json;charset=UTF-8," + encodeURIComponent(theJSON));
    this.downloadJsonHref = uri;
  }


  changePage(event: any) {
    if (
      event.target.text >= 1 &&
      event.target.text <= this.numberOfPaginators
    ) {

      this.activePage = +event.target.text;
      this.firstVisibleIndex =
        this.activePage * this.itemsPerPage - this.itemsPerPage;
      this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }
    this.retreiveSurveyList();
  }

  nextPage() {
    if (this.pages.last.nativeElement.classList.contains('active')) {
      if (
        this.numberOfPaginators - this.numberOfVisiblePaginators >=
        this.lastVisiblePaginator
      ) {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator += this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator = this.numberOfPaginators;
      }
    }

    this.activePage += 1;
    this.firstVisibleIndex =
      this.activePage * this.itemsPerPage - this.itemsPerPage;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    this.retreiveSurveyList();
  }

  previousPage() {
    if (this.pages.first.nativeElement.classList.contains('active')) {
      if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators) {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
        this.lastVisiblePaginator -= (this.numberOfPaginators % this.numberOfVisiblePaginators);
      }
    }
    this.activePage -= 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    this.retreiveSurveyList();
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisibleIndex =
      this.activePage * this.itemsPerPage - this.itemsPerPage;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;
    this.retreiveSurveyList();
  }

  lastPage() {
    this.activePage = this.numberOfPaginators;
    this.firstVisibleIndex =
      this.activePage * this.itemsPerPage - this.itemsPerPage;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;

    if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator =
        this.numberOfPaginators - this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
    } else {
      this.lastVisiblePaginator = this.numberOfPaginators;
      this.firstVisiblePaginator =
        this.lastVisiblePaginator -
        (this.numberOfPaginators % this.numberOfVisiblePaginators);
    }
    this.retreiveSurveyList();
  }

}
