import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
import { BuilderService } from 'src/app/builder/shared/services/builder/builder.service';
import { LoaderService } from 'src/app/core/loader.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-survey-response',
  templateUrl: './survey-response.component.html',
  styleUrls: ['./survey-response.component.scss']
})
export class SurveyResponseComponent implements OnInit {
  id;
  dateOptionsSelect;
  survey; pieDataObj = []
  surveyResults = [];
  numberOfPaginators: number;
  numberOfVisiblePaginators = 2;
  paginators: Array<any> = [];
  tblAnalysis = []; tblData = { sum: 0 };
  @ViewChildren('pages') pages: QueryList<any>;
  @ViewChildren('charts') charts;
  @ViewChildren('table') table;
  activePage = 1;
  itemsPerPage = 5;
  firstVisibleIndex = 0; completed = false;
  lastVisibleIndex: number = this.itemsPerPage;
  firstVisiblePaginator = 0;
  lastVisiblePaginator = this.numberOfVisiblePaginators;
  constructor(private _route: ActivatedRoute,
    private _surveyMangServ: SurveyManagementService, private _builderServ: BuilderService, private loaderSerivce: LoaderService
  ) { }

  ngOnInit() {
    this.id = this._route.snapshot.params['id'];
    this.getSurveyResponse();
  }
  exportAsPDF(Filename) {
    let data = document.getElementById(Filename);
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
      // let pdf = new jspdf('p', 'cm', 'a4'); Generates PDF in portrait mode
      pdf.addImage(contentDataURL, 'PNG', 0, 0, 29.7, 21.0);
      pdf.save(Filename + '.pdf');
    });
  }
  getSurveyResponse() {
    this._surveyMangServ.getSurveyResponse(this.id)
      .subscribe((res: any) => {
        this.surveyResults = res;
        if (res.length > 0) {
          this.survey = res[0].xsurvey.surveyBody;
          localStorage.setItem('surveyArray', JSON.stringify(this.survey));
          this._builderServ.makeSurveyModel(this.survey);
          this.survey = this._builderServ.surveyModel;
          this.completed = true;
          this.tblAnalysis['totalGrade'] = this.surveyResults[0].xsurvey.totalGrade;
          for (let i = 0; i < this.surveyResults.length; i++) {
            const submitSurvey = this.surveyResults[i];
            this.tblAnalysis.push({ totalGrade: 0, percentage: 0, sum: 0 })
            for (let y = 0; y < this.surveyResults[i].surveyAnswers.length; y++) {
              const questionAnswered = this.surveyResults[i].surveyAnswers[y];
              questionAnswered.score = questionAnswered.score ? questionAnswered.score : 0;
              this.tblAnalysis[i].sum += Number(questionAnswered.score);
            }
            this.tblAnalysis[i]['percentage'] = (this.tblAnalysis[i]['sum'] * 100) / this.tblAnalysis['totalGrade'];
          }
          for (let i = 0; i < this.tblAnalysis.length; i++) {
            const element = this.tblAnalysis[i];
            this.tblData['sum'] += this.tblAnalysis[i]['percentage'];
          }
          this.tblData['sum'] = this.tblData['sum'] / this.tblAnalysis.length;
          this.pieDataObj = [
            { data: [100 - this.tblData.sum, this.tblData.sum], label: 'total Survey Percentage' }
          ]
        }
        this.loaderSerivce.isLoading.next(false);
      })
  }
  answerTrackBy(index: number, item: any) {
    return item.id;
  }
  convertArrayOfObjectsToCSV(data) {
    var result, ctr, keys, columnDelimiter, lineDelimiter;

    if (data == null || !data.length) {
      return null;
    }

    columnDelimiter = ',';
    lineDelimiter = '\n';

    keys = Object.keys(data[0]);

    result = '';
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    data.forEach(function (item) {
      ctr = 0;
      keys.forEach(function (key) {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];
        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }
  exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i].querySelectorAll("td, th");

      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j]['innerText']);
        if (row[j].match(/\n/)) {
          var newColChar = ',';
          for (let newRowColIndex = 0; newRowColIndex < j - 1; newRowColIndex++) {
            newColChar = newColChar + ',';
          }
          row[j] = row[j].replace(/\n/, "\b");
        }
      }

      csv.push(row.join(","));
    }

    // Download CSV file
    this.downloadCSV(csv.join("\n"), filename);
  }
  downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], { type: "text/csv" });

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  }
}
