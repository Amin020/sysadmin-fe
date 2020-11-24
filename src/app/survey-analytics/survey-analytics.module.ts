import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChartsModule, ChartSimpleModule, WavesModule } from 'ng-uikit-pro-standard'
import { GaugeModule } from 'angular-gauge';
import { TagCloudModule } from 'angular-tag-cloud-module';

import { SurveyAnalyticsComponent } from './survey-analytics.component';
import { PieComponent } from './pie/pie.component';
import { BarComponent } from './bar/bar.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ScatterComponent } from './scatter/scatter.component';
import { GaugeComponent } from './gauge/gauge.component';
import { WorldCloudComponent } from './world-cloud/world-cloud.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { TextInTableComponent } from './text-in-table/text-in-table.component';

@NgModule({
  declarations: [SurveyAnalyticsComponent,
    PieComponent,
    BarComponent,
    DoughnutComponent,
    ScatterComponent,
    GaugeComponent,
    WorldCloudComponent,TextInTableComponent],
  imports: [
    CommonModule,
    ChartsModule,
    ChartSimpleModule,
    WavesModule,
    FormsModule,
    GaugeModule.forRoot(),
    TagCloudModule,
    GoogleChartsModule
  ]
  , exports: [SurveyAnalyticsComponent,
    PieComponent,
    BarComponent,
    DoughnutComponent,
    ScatterComponent,
    GaugeComponent,
    WorldCloudComponent,
    TextInTableComponent
  ]
})
export class SurveyAnalyticsModule { }
