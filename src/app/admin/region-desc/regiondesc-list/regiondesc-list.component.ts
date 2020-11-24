import { Component, OnInit, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RegiondescService } from 'src/app/services/admin/regiondesc.service';

@Component({
  selector: 'app-regiondesc-list',
  templateUrl: './regiondesc-list.component.html',
  styleUrls: ['./regiondesc-list.component.scss']
})
export class RegiondescListComponent implements OnInit {
  loading: Boolean = true;
  message: number;
  @ViewChildren('pages') pages: QueryList<any>;
  itemsPerPage = 20;
  numberOfVisiblePaginators = 10;
  numberOfPaginators: number;
  paginators: Array<any> = [];
  activePage = 1;
  firstVisibleIndex = 1;
  lastVisibleIndex: number = this.itemsPerPage;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;
  regionDescs: any;
  headElements = ['ID', 'Name', 'Native Name', 'Aprv', "RTL"];
  constructor(private RegiondescService: RegiondescService, private route: ActivatedRoute, private router: Router) {

  }

  GetRegionDescList() {
    this.loading = true;
    this.RegiondescService.getRegionsdesc().subscribe(data => {
      this.regionDescs = data;
      if (this.regionDescs.length % this.itemsPerPage === 0) {
        this.numberOfPaginators = Math.floor(this.regionDescs.length / this.itemsPerPage);
      } else {
        this.numberOfPaginators = Math.floor(this.regionDescs.length / this.itemsPerPage + 1);
      }

      for (let i = 1; i <= this.numberOfPaginators; i++) {
        this.paginators.push(i);
      }
      this.loading = false;
      this.RegiondescService.changeMessage(Number(this.regionDescs[this.regionDescs.length - 1].id) + 1);
      console.log(this.regionDescs);
    });
  }
  changePage(event: any) {
    if (event.target.text >= 1 && event.target.text <= this.numberOfPaginators) {
      this.activePage = +event.target.text;
      this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
      this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  nextPage() {
    if (this.pages.last.nativeElement.classList.contains('active')) {
      if ((this.numberOfPaginators - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator += this.numberOfVisiblePaginators;
      } else {
        this.firstVisiblePaginator += this.numberOfVisiblePaginators;
        this.lastVisiblePaginator = this.numberOfPaginators;
      }
    }

    this.activePage += 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
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
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
  }

  firstPage() {
    this.activePage = 1;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    this.firstVisiblePaginator = 0;
    this.lastVisiblePaginator = this.numberOfVisiblePaginators;
  }

  lastPage() {
    this.activePage = this.numberOfPaginators;
    this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage + 1;
    this.lastVisibleIndex = this.activePage * this.itemsPerPage;

    if (this.numberOfPaginators % this.numberOfVisiblePaginators === 0) {
      this.firstVisiblePaginator = this.numberOfPaginators - this.numberOfVisiblePaginators;
      this.lastVisiblePaginator = this.numberOfPaginators;
    } else {
      this.lastVisiblePaginator = this.numberOfPaginators;
      this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPaginators % this.numberOfVisiblePaginators);
    }
  }
  ngOnInit() {
    this.RegiondescService.currentMessage.subscribe(message => this.message = message)
    this.GetRegionDescList();
    this.RegiondescService.refreshRegionsList.subscribe(refresh => this.GetRegionDescList())
  }

  edit(language) {
    this.router.navigate(['/regionsDesc/edit/' + language.id]);
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  delete(language) {
    this.RegiondescService.deleteRegionsdesc(language.id).subscribe(item => this.GetRegionDescList())
  }

  removeLang(item) {
    console.log(this.regionDescs)
    var index = this.regionDescs.indexOf(item);
    if (index > -1) {
      this.regionDescs.splice(index, 1);
    }
    console.log(this.regionDescs);
  }
}
