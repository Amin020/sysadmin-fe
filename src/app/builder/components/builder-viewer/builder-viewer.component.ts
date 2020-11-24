import { Component, OnInit, Input } from '@angular/core';
import { BuilderService } from '../../shared/services/builder/builder.service';
import { ActivatedRoute } from '@angular/router';
import { SurveyManagementService } from 'src/app/services/survey-management.service';

@Component({
  selector: 'app-builder-viewer',
  templateUrl: './builder-viewer.component.html',
  styleUrls: ['./builder-viewer.component.scss']
})
export class BuilderViewerComponent implements OnInit {
  @Input() surveyId;
  data: any;
  id: any;
  constructor(public _BuilderService: BuilderService, route: ActivatedRoute, private managementServ: SurveyManagementService) {
    this.id = this.surveyId;
  }

  ngOnInit() {
    this._BuilderService._surveyModel$.subscribe((surveyModel: any) => {
      // this.surveyModel = model;
      this.data = localStorage.getItem('surveyArray');
      // this._BuilderService.saveSurveyArray(model, this.surveyModel.currentPage);
    })
  }

}
