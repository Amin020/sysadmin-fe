import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doughnut-chart',
  templateUrl: './doughnut.component.html',
  styleUrls: ['./doughnut.component.scss']
})
export class DoughnutComponent implements OnInit {
  public chartType: string = 'doughnut';

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
      borderWidth: 2,
    }
  ];

  @Input() dataObj: Array<any> = [
    { data: [300, 50, 100, 40, 120], label: 'My First dataset' }
  ];

  @Input('choices') chartChoices: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];
  @Input('labels') chartLabels: Array<any> = ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'];
  constructor() { }

  ngOnInit() {
  }


  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
