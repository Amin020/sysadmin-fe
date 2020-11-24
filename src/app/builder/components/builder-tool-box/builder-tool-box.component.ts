import { Component, OnInit, Input } from '@angular/core';
import ToolBoxModel from '../../shared/models/tool-box-models/tool-box-model';
import toolBox from '../../shared/data/tool-box-data/tool-box';
import customWidgets from '../../shared/data/custom-tool-box-data/custom-tool-box-data';
import { BuilderService } from '../../shared/services/builder/builder.service';
import { SurveyManagementService } from 'src/app/services/survey-management.service';
import * as XLSX from 'xlsx';
const SurveyDefault = require('../../../../libFile/survey');
const Survey = SurveyDefault.default;
import { LoaderService } from 'src/app/core/loader.service';

@Component({
  selector: 'app-builder-tool-box',
  templateUrl: './builder-tool-box.component.html',
  styleUrls: ['./builder-tool-box.component.scss']
})
export class BuilderToolBoxComponent implements OnInit {
  surveyModel;
  toggleBtn = true;
  toggleCustom = false;
  toolBoxData: ToolBoxModel = toolBox;
  @Input() surveyId: string;
  surveyJSON;
  customWidgets = customWidgets;
  pageNoForQuestionCategory = 0;
  pageNoCategoryList = 0; totalPagesForQuestion = 0;
  category;
  searchKeyword; selectedCategory;
  categoryList = []; totalPagesCategoryList = 0; totalElements = 0;
  constructor(public _BuilderService: BuilderService, private surveyMan: SurveyManagementService, private loaderSerivce: LoaderService) { }
  ngOnInit() {
    this.checkData();
    // this.getQuestionBank();
    // this.getCategoryBySearch()
  }
  checkData() {
    this._BuilderService._surveyModel$.subscribe((surveyModel: any) => {
      if (surveyModel) {
        this.surveyModel = surveyModel;
      }
    });
  }

  getQuestionBank() {
    this._BuilderService.getQuestionBank().subscribe(res => {

    });
  }
  getCategoryList() {
    this._BuilderService.getCategoryList(this.pageNoCategoryList)
      .subscribe((res: any) => {
        if (res.content.length > 0) {
          this.categoryList = res.content;
          this.category = res.content[0];
          // this.category.xsurveyQuestions.forEach((element, index) => {
          //   this.render(index, element);
          // });
          this.selectedCategory = this.categoryList[0].id;
          this.totalElements = res.numberOfElements;
          if (this.categoryList.length !== res.numberOfElements) {
            this.pageNoCategoryList++;
          }
          this.loaderSerivce.isLoading.next(false);
        }
      });
  }
  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    let sheetName = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });

      jsonData = workBook.SheetNames.reduce((initial, name) => {
        sheetName = name;
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      for (let i = 0; i < jsonData[sheetName].length; i++) {
        this._BuilderService.createCustomWidget(this.surveyModel, jsonData[sheetName][i]);
      }
      this._BuilderService.updateSurvey(this.surveyModel);
      const dataString = JSON.stringify(jsonData);
      console.log(dataString);
    };
    reader.readAsBinaryString(file);
  }
  exportToCSV(filename) {
    const csv = [];
    const headerTbl = [];
    const rowsValue = [];
    const surveyJson = this.surveyModel.toJSON();
    const currentPageElements = surveyJson.pages[this._BuilderService.pageIndex].elements;
    for (let i = 0; i < currentPageElements.length; i++) {
      rowsValue.push([]);
      const element = currentPageElements[i];
      for (const key in element) {
        if (!headerTbl.find(x => x === key)) {
          headerTbl.push(key);
        }
      }
    }
    for (let y = 0; y < headerTbl.length; y++) {
      const header = headerTbl[y];
      for (let i = 0; i < currentPageElements.length; i++) {
        const question = currentPageElements[i];
        if (question[header]) {
          rowsValue[i].push(question[header]);
        }
      }
    }
    rowsValue.unshift(headerTbl);

    for (let k = 0; k < rowsValue.length; k++) {
      for (const key in rowsValue[k]) {
        if (rowsValue[k].hasOwnProperty(key)) {
          const arr = rowsValue[k][key];
          if (typeof arr === 'object') {
            rowsValue[k][key] = JSON.stringify(rowsValue[k][key]);
            rowsValue[k][key] = rowsValue[k][key].replace(/,/g, '.');
          }
        }
      }
      const row = [], cols = rowsValue[k];
      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j]);
      }
      csv.push(row.join(","));
    }
    // Download CSV file
    this.downloadCSV(csv.join("\n"), filename);
  }
  downloadCSV(csv, filename) {
    let csvFile;
    let downloadLink;

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
  getCategoryBySearch() {
    this._BuilderService.searchCategory(this.searchKeyword, this.pageNoForQuestionCategory)
      .subscribe((res: any) => {
        if (res.content.length > 0) {
          this.totalPagesForQuestion = res.totalPages;
          // this.pageNoForQuestionCategory = res.totalPages;
          this.categoryList = res.content;
          this.category = res.content[0];
          // this.category.xsurveyQuestions.forEach((element, index) => {
          //   this.render(element);
          // });
          this.selectedCategory = res.content[0].id;
          this.loaderSerivce.isLoading.next(false);
        }
      });
  }
  render(question) {
    const json = {
      mode: "display",
      title: 'test question',
      pages: [
        {
          name: 'page1',
          elements: [
            question.questionBody
          ]
        }
      ]
    };
    const model = new Survey.Model(json);
    model['logoPosition'] = this.surveyModel.logoPosition;
    model['logo'] = this.surveyModel.logo;
    model['background'] = this.surveyModel.background;
    model['logoStyle'] = this.surveyModel.logoStyle;
    Survey.SurveyNG.render('surveyElementModal', { model: model });
  }
  createWidget(widget) {
    this._BuilderService.createCustomWidget(this.surveyModel, widget);
  }
  createNew(item) {
    this._BuilderService.createNewComponent(this.surveyModel, item);
  }
  dragStart(event, item) {
    event.dataTransfer.setData('data', JSON.stringify(item));
  }
}
