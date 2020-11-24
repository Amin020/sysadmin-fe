import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-general-component',
  templateUrl: './general-component.component.html',
  styleUrls: ['./general-component.component.scss']
})
export class GeneralComponentComponent implements OnInit {
  @Input() currencyData: [];
  @Input() pages = [];
  @Input() value: any;
  @Input() prop: any;
  constructor() { }

  ngOnInit() {
    console.log(this.value);
  }

  getValue() {
    return this.value;
  }

}
