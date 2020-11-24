import { Component, Input, OnInit } from '@angular/core';
import { Page } from 'src/app/exam/models/page';

@Component({
  selector: 'app-page-translate-view',
  templateUrl: './page-translate-view.component.html',
  styleUrls: ['./page-translate-view.component.scss']
})
export class PageTranslateViewComponent implements OnInit {

  @Input() targetLanguage: string;
  @Input() searchValue: string;
  @Input() page: Page;

  constructor() { }

  ngOnInit() {
  }

  canView(text: string) {
    return this.searchValue.length ? text.toLowerCase().includes(this.searchValue.toLowerCase()) : true;
  }

}
