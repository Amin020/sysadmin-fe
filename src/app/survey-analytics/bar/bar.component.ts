import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'bar-chart',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss']
})
export class BarComponent implements OnInit {
  public chartType: string = 'horizontalBar';
  ngOnInit() {
    console.log(this);
    this.dataObj = this.dataObj;
  }
  @Input() dataObj: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' }
  ];

  @Input('choices') chartChoices: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];
  @Input('labels') chartLabels
  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}