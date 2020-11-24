import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'scatter-chart',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.scss']
})
export class ScatterComponent implements OnInit {
  scatter_ChartData = [
  ];
  @Input() title;
  @Input() choices = [];
  @Input() labels = [];
  @Input() answers = [];
  scatter_ChartOptions;
  constructor() { }

  ngOnInit() {
    for (let i = 0; i < this.labels.length; i++) {
      this.scatter_ChartData.push([ this.labels[i],this.answers[i]]);
    }
    this.scatter_ChartOptions = {
      legend: {
        position: 'top'
      },
      title: this.title
    };
  }

}
