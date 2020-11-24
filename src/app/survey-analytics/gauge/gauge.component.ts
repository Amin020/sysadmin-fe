import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {
  gaugeType = "semi";
  @Input() gaugeValue = 28.3;
  gaugeLabel = "Speed";
  gaugeAppendText = "km/hr";
  constructor() { }

  ngOnInit() {
  }

}
