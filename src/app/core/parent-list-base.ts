import { QueryList, ViewChildren } from '@angular/core';

export class ParentListBase {

    numberOfPages: number;
    numberOfVisiblePaginators = 10;
    paginator: number[] = [];
    activePage = 1;
    itemsPerPage = 20;
    firstVisibleIndex = 0;
    lastVisibleIndex: number = this.itemsPerPage;
    firstVisiblePaginator = 0;
    lastVisiblePaginator = this.numberOfVisiblePaginators;
    @ViewChildren('pages') pages: QueryList<any>;

    constructor() { }

    updatePagination(items: any[]) {
        if (items.length % this.itemsPerPage === 0) {
            this.numberOfPages = Math.floor(items.length / this.itemsPerPage);
        } else {
            this.numberOfPages = Math.floor(items.length / this.itemsPerPage) + 1;
        }
        this.paginator = [];
        for (let i = 1; i <= this.numberOfPages; i++) {
            this.paginator.push(i);
        }
        this.changePage({ target: { text: 1 } }); // In case of deleting some item in another page, we will navigate to first one.
        this.firstVisiblePaginator = 0;
        this.lastVisiblePaginator = this.numberOfVisiblePaginators;
    }

    changePage(event: any) {
        if (event.target.text >= 1 && event.target.text <= this.numberOfPages) {
            this.activePage = +event.target.text;
            this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage;
            this.lastVisibleIndex = this.activePage * this.itemsPerPage;
        }
    }

    nextPage() {
        if (this.pages.last.nativeElement.classList.contains('active')) {
            if ((this.numberOfPages - this.numberOfVisiblePaginators) >= this.lastVisiblePaginator) {
                this.firstVisiblePaginator += this.numberOfVisiblePaginators;
                this.lastVisiblePaginator += this.numberOfVisiblePaginators;
            } else {
                this.firstVisiblePaginator += this.numberOfVisiblePaginators;
                this.lastVisiblePaginator = this.numberOfPages;
            }
        }
        this.activePage += 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }

    previousPage() {
        if (this.pages.first.nativeElement.classList.contains('active')) {
            if ((this.lastVisiblePaginator - this.firstVisiblePaginator) === this.numberOfVisiblePaginators) {
                this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
                this.lastVisiblePaginator -= this.numberOfVisiblePaginators;
            } else {
                this.firstVisiblePaginator -= this.numberOfVisiblePaginators;
                this.lastVisiblePaginator -= (this.numberOfPages % this.numberOfVisiblePaginators);
            }
        }
        this.activePage -= 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
    }

    firstPage() {
        this.activePage = 1;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;
        this.firstVisiblePaginator = 0;
        this.lastVisiblePaginator = this.numberOfVisiblePaginators;
    }

    lastPage() {
        this.activePage = this.numberOfPages;
        this.firstVisibleIndex = this.activePage * this.itemsPerPage - this.itemsPerPage;
        this.lastVisibleIndex = this.activePage * this.itemsPerPage;

        if (this.numberOfPages % this.numberOfVisiblePaginators === 0) {
            this.firstVisiblePaginator = this.numberOfPages - this.numberOfVisiblePaginators;
            this.lastVisiblePaginator = this.numberOfPages;
        } else {
            this.lastVisiblePaginator = this.numberOfPages;
            this.firstVisiblePaginator = this.lastVisiblePaginator - (this.numberOfPages % this.numberOfVisiblePaginators);
        }
    }

}
