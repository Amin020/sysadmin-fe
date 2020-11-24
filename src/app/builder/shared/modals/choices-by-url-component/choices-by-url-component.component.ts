import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-choices-by-url-component',
  templateUrl: './choices-by-url-component.component.html',
  styleUrls: ['./choices-by-url-component.component.scss']
})
export class ChoicesByUrlComponentComponent implements OnInit {

  @Input() question: any;
  @Input() prop: any;
  @Input() value: {
    url: string,
    path: string,
    valueName: string,
    titleName: string
  };
  innerValue: {
    url: string,
    path: string,
    valueName: string,
    titleName: string
  };
  constructor() { }

  ngOnInit() {
    this.innerValue = {
      url: this.value.url,
      path: this.value.path,
      valueName: this.value.valueName,
      titleName: this.value.titleName
    };
  }

  getValue(): any {
    return this.innerValue;
  }

}
