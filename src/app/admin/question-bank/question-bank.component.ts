import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionBankService } from './question-bank.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-question-bank',
  templateUrl: './question-bank.component.html',
  styleUrls: ['./question-bank.component.scss']
})
export class QuestionBankComponent implements OnInit {
  loading = false;
  firstFormGroup: FormGroup;
  newQuestion;
  constructor(private questionBankServ: QuestionBankService) { }

  ngOnInit(): void {
    this.firstFormGroup = new FormGroup({
      questionName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      category: new FormControl('', [Validators.required, Validators.minLength(2)]),
      questionBody: new FormControl('', [Validators.required, Validators.minLength(2)]),
    });
  }
  submit() {
    let data = Object.assign({}, this.firstFormGroup.value, { xsurveyQuestionBank: { xsurveyQuestions: [], status: 'INACTIVE' } });
    this.questionBankServ.addQuestionBank(data).subscribe((res: any) => {
      console.log(res);
    })
  }
  uploadQuestion(filename) {
    var csv = [];
    var rows = [
      ["Name", "title", "type", "choices", "correctAnswer", "defaultValue", "description", "isRequired", "score"],
      ["Question1", "where are you from?", "text", "", "10", "10", "description", "true", "5"]
    ]

    for (var i = 0; i < rows.length; i++) {
      var row = [], cols = rows[i]
      for (var j = 0; j < cols.length; j++) {
        row.push(cols[j]);
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
  downloadSample(ev) {
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
      // for (let i = 0; i < jsonData[sheetName].length; i++) {
      //   this._BuilderService.createCustomWidget(this.surveyModel, jsonData[sheetName][i]);
      // }
      this.newQuestion = jsonData[sheetName];
      let stringifiedData = JSON.stringify(jsonData[sheetName][0]);
      this.firstFormGroup.patchValue({ questionBody: stringifiedData })
      const dataString = JSON.stringify(jsonData);
      console.log(dataString);
    }
    reader.readAsBinaryString(file);
  }
  get questionName() { return this.firstFormGroup.get('questionName'); }
  get category() { return this.firstFormGroup.get('category'); }
  get questionBody() { return this.firstFormGroup.get('questionBody'); }
}
