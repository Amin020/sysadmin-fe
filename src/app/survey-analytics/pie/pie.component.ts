import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit {

  @Input() dataObj: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];
  @Input('choices') chartChoices: Array<any> = ['correct', 'wrong'];
  @Input('labels') chartLabels: Array<any> = ['correct', 'wrong'];

  public chartType: string = 'pie';
  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];
  public chartOptions: any = {
    responsive: true
  };

  ngOnInit() {

  }

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
  constructor() { }



}
