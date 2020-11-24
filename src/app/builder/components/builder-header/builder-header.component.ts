import { Component, OnInit } from '@angular/core';
import BuilderHeader from '../../shared/models/builder-header/builder-header';
import header from '../../shared/data/header-data/header';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-builder-header',
  templateUrl: './builder-header.component.html',
  styleUrls: ['./builder-header.component.scss']
})
export class BuilderHeaderComponent implements OnInit {

  builderHeader: BuilderHeader = header;
  id: any;
  constructor(private route: ActivatedRoute) {
    this.id = route.snapshot.params['id'];
    console.log('header  ', this.id);
  }

  ngOnInit() {
  }
}
