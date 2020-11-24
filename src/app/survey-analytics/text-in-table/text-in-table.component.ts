import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-in-table',
  templateUrl: './text-in-table.component.html',
  styleUrls: ['./text-in-table.component.scss']
})
export class TextInTableComponent implements OnInit {
  @Input() data = [];
  @Input() title;
  constructor() { }

  ngOnInit() {
    console.log(this.data);
    var data = [];
    this.data.forEach(element => {
      data.push([element.text]);
    })
    this.data = data;
  }

}
