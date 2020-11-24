import { Component, OnInit, Input } from '@angular/core';
import { CloudData, CloudOptions } from 'angular-tag-cloud-module';

@Component({
  selector: 'app-world-cloud',
  templateUrl: './world-cloud.component.html',
  styleUrls: ['./world-cloud.component.scss']
})
export class WorldCloudComponent implements OnInit {
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value 
    width: 1000,
    height: 400,
    overflow: false,
  };
  @Input() data: CloudData[] = [
    { text: 'Weight-8-link-color', weight: 8, link: 'https://google.com', color: '#ffaaee' },
    { text: 'Weight-10-link', weight: 10, link: 'https://google.com', tooltip: 'display a tooltip' },
    // ...
  ];
  constructor() { }

  ngOnInit() {
  }

}
