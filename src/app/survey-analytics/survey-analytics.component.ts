import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-survey-analytics',
  templateUrl: './survey-analytics.component.html',
  styleUrls: ['./survey-analytics.component.scss']
})
export class SurveyAnalyticsComponent implements OnInit {
  @Input() surveyResults: any[] = [];
  @Input() survey: any;
  chartShape = ['bar', 'pie', 'doughnut', 'scatter'];
  surveyAnsDisplay = [];
  surveyDb; allQuestions;
  questionList = [];
  selectedValue;

  constructor() {
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  ngOnInit() {
    this.allQuestions = this.survey.getAllQuestions();
    this.surveyDb = JSON.parse(localStorage.getItem('surveyArray'));
    this.getCalcuSurveyAnswer();
    this.selectBoxList()
  }
  getCalcuSurveyAnswer() {
    this.getSurveyQuestions();
    for (var i = 0; i < this.surveyResults.length; i++) {
      var surveyResult = this.surveyResults[i];
      this.getAnswersCount(surveyResult);
    }
    console.log(this.surveyAnsDisplay)
  }
  getAnswersCount(surveyResult) {
    for (let y = 0; y < surveyResult.surveyAnswers.length; y++) {
      let answeredQuestion = surveyResult.surveyAnswers[y];
      for (let z = 0; z < this.surveyAnsDisplay.length; z++) {
        let questionAnalytics = this.surveyAnsDisplay[z];
        if (answeredQuestion.name == questionAnalytics.name) {
          this.getSurveyQuestionAnswers(questionAnalytics, answeredQuestion, false);
          if (questionAnalytics.type == 'matrix') {

            questionAnalytics.dataObj = [{ data: questionAnalytics.answersCount, label: 'Row Name , Column Name' }];

          } else if (questionAnalytics.type == 'checkbox' || questionAnalytics.type == 'radiogroup' ||

            questionAnalytics.type == 'dropdown' || questionAnalytics.type == 'imagepicker') {
            questionAnalytics.dataObj = [{ data: questionAnalytics.answersCount, label: 'Choices' }];

          }
          break;
        }
      }
    }
  }
  getSurveyQuestions() {
    for (let i = 0; i < this.allQuestions.length; i++) {
      const question = this.allQuestions[i];
      let type = question.getType();
      this.getLabels_ValuesByType(question, type, this.surveyAnsDisplay, question.enabledChoices, question.choices);
      if (this.surveyAnsDisplay[i]) {
        this.surveyAnsDisplay[i]['type'] = type;
      }
    }
  }
  checkIfTxtExist(answerValue, data): boolean {
    var returnedVal = false;
    data.forEach(element => {
      if (element.text == answerValue) {
        returnedVal = true;
      }
    });
    return returnedVal;
  }

  getSurveyQuestionAnswers(questionAnalytics, answeredQuestion, isMatrix?, rowIndex?) {
    rowIndex = rowIndex >= 0 ? rowIndex : null;
    var type = questionAnalytics.type;
    switch (questionAnalytics.type) {
      case 'text'://questionValue ''
      case 'comment':
        if (isMatrix) {
          if (!questionAnalytics.data[rowIndex]) {
            questionAnalytics.data[rowIndex] = []
          }
          if (!this.checkIfTxtExist(answeredQuestion.questionValue, questionAnalytics.data[rowIndex])) {
            questionAnalytics.data[rowIndex].push({ text: answeredQuestion.questionValue, tooltip: 0 });
          } else {
            for (let i = 0; i < questionAnalytics.data[rowIndex].length; i++) {
              const element = questionAnalytics.data[rowIndex][i];
              if (element.text == answeredQuestion.questionValue) {
                element.tooltip++;
              }
            }
          }
        } else {
          if (!this.checkIfTxtExist(answeredQuestion.questionValue, questionAnalytics.data)) {
            questionAnalytics.data.push({ text: answeredQuestion.questionValue, tooltip: 0 });
          } else {
            for (let i = 0; i < questionAnalytics.data.length; i++) {
              const element = questionAnalytics.data[i];
              if (element.text == answeredQuestion.questionValue) {
                element.tooltip++;
              }
            }
          }
        }

        break;
      case 'checkbox'://questionValue []
      case 'radiogroup'://questionValue []
      case 'dropdown'://questionValue []
      case 'imagepicker':
        for (let choiceIndex = 0; choiceIndex < questionAnalytics.values.length; choiceIndex++) {
          const choiceAnswer = questionAnalytics.values[choiceIndex];
          if (Array.isArray(answeredQuestion.questionValue)) {
            for (let index = 0; index < answeredQuestion.questionValue.length; index++) {
              const selectedChoice = answeredQuestion.questionValue[index];
              if (selectedChoice == choiceAnswer) {
                if (isMatrix) {
                  questionAnalytics.answersCount[rowIndex][choiceIndex]++;
                } else {
                  questionAnalytics.answersCount[choiceIndex]++;
                }
                break;
              }
            }
          } else {
            const selectedChoice = answeredQuestion.questionValue;
            if (selectedChoice == choiceAnswer) {
              if (isMatrix) {
                questionAnalytics.answersCount[rowIndex][choiceIndex]++;
              } else {
                questionAnalytics.answersCount[choiceIndex]++;
              }
              break;
            }
          }
        }
        break;
      case 'rating'://questionValue || value
      case 'boolean':
        if (questionAnalytics.gaugeValue > 0) {
          // questionAnalytics.gaugeValue += answeredQuestion.questionValue;
          if (Number(answeredQuestion.questionValue) == 1) {
            answeredQuestion.questionValue = 2;
          } else if (Number(answeredQuestion.questionValue) == 0) {
            answeredQuestion.questionValue = 1;
          }
          var Qval = Number(answeredQuestion.questionValue) * 100 / questionAnalytics.rangeMax;
          questionAnalytics.gaugeValue = (questionAnalytics.gaugeValue + Qval) / 2;
        } else {
          if (answeredQuestion.questionValue == true) {
            answeredQuestion.questionValue = 2;
          } else {
            answeredQuestion.questionValue = 1
          }
          questionAnalytics.gaugeValue = (answeredQuestion.questionValue * 100) / questionAnalytics.rangeMax;
        }
        if (isMatrix) {
          questionAnalytics.gaugeData[rowIndex] = questionAnalytics.gaugeValue;
        } else {
          questionAnalytics.gaugeData = questionAnalytics.gaugeValue;
        }
        break;
      case 'matrix'://questionValue 
        for (const key in answeredQuestion.questionValue) {
          if (answeredQuestion.questionValue.hasOwnProperty(key)) {
            let value = key + ',' + answeredQuestion.questionValue[key];
            for (let i = 0; i < questionAnalytics.choices.length; i++) {
              const element = questionAnalytics.choices[i];
              if (value === element) {
                questionAnalytics.answersCount[i]++;
                break;
              }
            }
          }
        }
        break;
      case 'matrixdropdown':
      case 'matrixdynamic':
        for (const key in answeredQuestion.questionValue) {
          if (answeredQuestion.questionValue.hasOwnProperty(key)) {
            for (let rowIndex = 0; rowIndex < questionAnalytics.rows.length; rowIndex++) {
              var rowMatrx = questionAnalytics.rows[rowIndex];
              if (rowMatrx.value == undefined) {
                rowMatrx = { value: rowMatrx };
              }
              if (rowMatrx.value == key) {
                for (let colIndex = 0; colIndex < questionAnalytics.questions.length; colIndex++) {
                  var question = questionAnalytics.questions[colIndex];
                  for (const nestedKey in answeredQuestion.questionValue[key]) {
                    if (question.title == nestedKey) {
                      this.getSurveyQuestionAnswers(question, { questionValue: answeredQuestion.questionValue[key][nestedKey] }, true, rowIndex)
                      if (question.currentShape == 'bar') {
                        if (question.dataObj[rowIndex]) {
                          question.dataObj[rowIndex] = { data: question.answersCount[rowIndex], label: rowMatrx.text ? rowMatrx.text : 'Row ' + rowIndex };
                        } else {
                          question.dataObj.push({ data: question.answersCount[rowIndex], label: rowMatrx.text ? rowMatrx.text : 'Row ' + rowIndex })
                        }
                      } else if (question.currentShape == 'world Cloud') {
                        if (question.data[rowIndex] || question.gaugeData[rowIndex] == 0) {
                          question.data[rowIndex] = question.data[rowIndex];
                        } else {
                          question.data.push({ data: question.answersCount[rowIndex], label: rowMatrx.text })
                        }
                      } else if (question.currentShape == 'gauge') {
                        if (question.gaugeData[rowIndex] || question.gaugeData[rowIndex] == 0) {
                          question.gaugeData[rowIndex] = question.gaugeValue;
                        } else {
                          question.gaugeData.push(question.gaugeValue);
                        }
                      }
                      break;
                    }
                  }
                }
              }
            }
          }
        }
        break;
      case 'multipletext'://questionValue
        for (const key in answeredQuestion.questionValue) {
          if (answeredQuestion.questionValue.hasOwnProperty(key)) {
            const element = answeredQuestion.questionValue[key];
            var lbl;
            for (let index = 0; index < questionAnalytics.itemsLbl.length; index++) {
              lbl = questionAnalytics.itemsLbl[index];
            }
            questionAnalytics.data.push({ text: element })
            questionAnalytics.count.push(0)
          }
        }
        break;
      default:
        var type = questionAnalytics.type;
        if (type == 'barrating' || type == 'emotionsratings' || type === 'bootstrapslider' || type === "nouislider") {
          if (type == 'emotionsratings' && questionAnalytics.rangeMax == 2) {
            if (Number(answeredQuestion.questionValue) == 1) {
              answeredQuestion.questionValue = 2;
            } else if (Number(answeredQuestion.questionValue) == 2) {
              answeredQuestion.questionValue = 1;
            }
          }
          if (questionAnalytics.gaugeValue == 0) {
            questionAnalytics.gaugeValue = (Number(answeredQuestion.questionValue) * 100) / questionAnalytics.rangeMax;
            if (!isMatrix) {
              questionAnalytics.gaugeData = questionAnalytics.gaugeValue;
            }
          } else {
            var Qval = (Number(answeredQuestion.questionValue) * 100) / questionAnalytics.rangeMax;
            questionAnalytics.gaugeValue = (questionAnalytics.gaugeValue + Qval) / 2;
            if (!isMatrix) {
              questionAnalytics.gaugeData = questionAnalytics.gaugeValue;
            }
          }
        } else if (type == 'editor') {
          if (!this.checkIfTxtExist(answeredQuestion.questionValue, questionAnalytics.data)) {
            questionAnalytics.data.push({ text: answeredQuestion.questionValue, tooltip: 0 });
          } else {
            for (let i = 0; i < questionAnalytics.data.length; i++) {
              const element = questionAnalytics.data[i];
              if (element.text == answeredQuestion.questionValue) {
                element.tooltip++;
              }
            }
          }
        }
        break;
    }
  }
  selectBoxList() {
    this.surveyResults.forEach(element => {
      this.questionList.push({ value: element.name, label: element.name })
    })
  }
  getLabels_ValuesByType(question, type, surveyAnsDisplay, enabledChoices, choices, isMatrix?, rowCount?) {
    //param1:Question of SurveyObj ** param2:type of question ** param3:array to display questions for view
    if (isMatrix && rowCount == 0) {

    }
    var data = [];
    // var gaugeData = [];
    var dataObj = [{ data: [], label: '' }];
    var answersCount = [];
    // if (isMatrix) {
    //   for (let i = 0; i < rowCount.length; i++) {
    //     data.push([]);
    //     // gaugeData.push();
    //     dataObj.push({ data: [], label: '' })
    //     answersCount.push([]);
    //   }
    // }
    switch (type) {
      case 'text'://questionValue ''
      case 'comment':
        surveyAnsDisplay.push({
          name: question.name, title: question.title, data: data, type: type,
          currentShape: 'world Cloud', shapes: ['world Cloud', 'text in table'], count: []
        })
        if (isMatrix) {
          surveyAnsDisplay[surveyAnsDisplay.length - 1]['data'] = [];
          for (let i = 0; i < rowCount; i++) {
            surveyAnsDisplay[surveyAnsDisplay.length - 1]['data'].push([]);
          }
        }
        break;
      case 'checkbox'://questionValue []
      case 'radiogroup'://questionValue []
      case 'dropdown'://questionValue []
      case 'imagepicker':
        if (type == 'dropdown' && question.customWidget != null) {
          if (question.customWidget.name === 'barrating') {
            surveyAnsDisplay.push({
              name: question.name, title: question.title, gaugeValue: 0, rangeMax: question.rateMax,
              currentShape: 'gauge', shapes: ['gauge'], gaugeData: 0
            })
          } else {
            surveyAnsDisplay.push({ name: question.name, dataObj: dataObj, type: type, title: question.title, choices: this.getChoicesOfQuestion(enabledChoices, question), answersCount: this.getQuestAnswCount(choices, question), values: this.getValuesOfQuestion(choices, question), currentShape: 'bar', shapes: this.chartShape })
          }
        } else {
          surveyAnsDisplay.push({ name: question.name, dataObj: dataObj, type: type, title: question.title, choices: this.getChoicesOfQuestion(enabledChoices, question), answersCount: this.getQuestAnswCount(choices, question), values: this.getValuesOfQuestion(choices, question), currentShape: 'bar', shapes: this.chartShape })
        }
        surveyAnsDisplay[surveyAnsDisplay.length - 1]['labels'] = surveyAnsDisplay[surveyAnsDisplay.length - 1]['choices']
        if (isMatrix) {
          surveyAnsDisplay[surveyAnsDisplay.length - 1]['answersCount'] = [];
          for (let i = 0; i < rowCount; i++) {
            surveyAnsDisplay[surveyAnsDisplay.length - 1]['answersCount'].push([]);
            surveyAnsDisplay[surveyAnsDisplay.length - 1]['answersCount'][i] = this.getQuestAnswCount(choices, question);
          }
        }
        break;
      case 'rating'://questionValue || value
      case 'boolean':
        let choicesCount = type === 'rating' ? question.rateMax : 2;
        surveyAnsDisplay.push({
          name: question.name, title: question.title, rangeMax: choicesCount, gaugeValue: 0, choices: choicesCount, type: type,
          currentShape: 'gauge', shapes: ['gauge'], gaugeData: 0
        })
        if (isMatrix) {
          surveyAnsDisplay[surveyAnsDisplay.length - 1]['gaugeData'] = [];
          for (let i = 0; i < rowCount; i++) {
            surveyAnsDisplay[surveyAnsDisplay.length - 1]['gaugeData'].push(0);
          }
        }
        break;
      case 'matrix'://questionValue 
        var mtChoices = []; var answersCount = []; var cols = []; var rws = [];
        var mtLbls = [];
        for (let i = 0; i < question.cells.rows.length; i++) {
          const row = question.cells.rows[i];
          rws.push({ text: row.text, value: row.value })
          for (let y = 0; y < question.cells.columns.length; y++) {
            const column = question.cells.columns[y];
            mtChoices.push(`${row.value},${column.value}`);
            mtLbls.push(`${row.text},${column.text}`)
            cols.push({ text: column.text, value: column.value })
            answersCount.push(0);
          }
        }
        surveyAnsDisplay.push({
          name: question.name, title: question.title,
          choices: mtChoices,
          labels: mtLbls,
          answersCount: answersCount,
          values: mtChoices, currentShape: 'bar', dataObj: dataObj, type: type,
          shapes: this.chartShape
        })
        break;
      case 'matrixdropdown':
      case 'matrixdynamic':
        var answersCount = [];
        //  let rowsCount = 0;
        // if (question.rows.length == 0 && question.rowCount > 0) {
        //   rowsCount = question.rowCount;
        // } else {
        //   rowsCount = question.rows.length;
        // }
        // for (let i = 0; i < rowsCount; i++) {
        // var row = question.rows[i];
        // // if (row === undefined) {
        // //   row = { text: 'row ' + i }
        // // } 
        surveyAnsDisplay.push({
          name: question.name, title: question.title,
          choices: [], columns: [], rows: [],
          answersCount: answersCount,
          questions: [], currentShape: 'bar', type: type,
          shapes: this.chartShape, shapesCount: question.columns.length
        })
        if (!question.rows.length) {
          for (let i = 0; i < question.rowCountValue; i++) {
            surveyAnsDisplay[surveyAnsDisplay.length - 1].rows.push(i + '');
          }
        }
        for (let y = 0; y < question.columns.length; y++) {
          const column = question.columns[y];
          var columnType = column.cellType;
          surveyAnsDisplay[surveyAnsDisplay.length - 1].columns.push({ text: column.name, value: column.value })
          this.getLabels_ValuesByType(column, columnType, surveyAnsDisplay[surveyAnsDisplay.length - 1].questions, question.choices, question.choices, true, surveyAnsDisplay[surveyAnsDisplay.length - 1].rows.length)
        }
        if (question.type != 'matrixdynamic') {
          for (let i = 0; i < question.rows.length; i++) {
            const row = question.rows[i];
            surveyAnsDisplay[surveyAnsDisplay.length - 1].rows.push({ text: row.text, value: row.value })
          }
        }

        // }
        break;
      case 'multipletext'://questionValue
        let items = question.items;
        let itemsLbl = [];
        for (let i = 0; i < items.length; i++) {
          const element = items[i];
          itemsLbl.push({ title: element.title, name: element.name });
        }
        surveyAnsDisplay.push({
          name: question.name, title: question.title, data: data, itemsLbl: itemsLbl, type: type,
          currentShape: 'world Cloud', shapes: ['world Cloud', 'text in table'], count: []
        })
        break;
      default:
        if (question.customWidget != null) {
          var customType = question.customWidget.name;
          if (customType == 'barrating' || customType == 'emotionsratings' || customType === 'bootstrapslider' || customType === "nouislider") {
            surveyAnsDisplay.push({
              name: question.name, title: question.title, gaugeData: 0, gaugeValue: 0, rangeMax: question.rangeMax ? question.rangeMax : question.choices.length,
              currentShape: 'gauge', shapes: ['gauge'], type: customType
            })
          } else if (customType == 'editor') {
            surveyAnsDisplay.push({
              name: question.name, title: question.title, data: data, type: customType,
              currentShape: 'world Cloud', shapes: ['world Cloud', 'text in table'], count: []
            })
          } else if (customType == 'tagbox') {
            let tagBoxChoices = question.choices.length > 0 ? question.choices : question.choicesByUrl.getResultCallback();
            if (!tagBoxChoices) {
              setTimeout(() => {
                surveyAnsDisplay.push({ name: question.name, dataObj: dataObj, type: customType, title: question.title, choices: this.getChoicesOfQuestion(tagBoxChoices, question), answersCount: this.getQuestAnswCount(tagBoxChoices, question), values: this.getValuesOfQuestion(tagBoxChoices, question), currentShape: 'bar', shapes: this.chartShape })
                surveyAnsDisplay[surveyAnsDisplay.length - 1]['labels'] = surveyAnsDisplay[surveyAnsDisplay.length - 1]['choices']
              }, 100);
            }

          }
        }
        break;
    }
  }
  getQuestAnswCount(choices, question?) {
    if (choices == undefined) {
      return question.questionValue;
    }
    return choices.map((element) => {
      return 0;
    })
  }
  getChoicesOfQuestion(choices, question?) {
    if (choices == undefined) {
      return question.questionValue;
    }
    return choices.map((element) => {
      return element.text;
    })
  }
  getValuesOfQuestion(choices, question?) {
    if (choices == undefined) {
      return question.questionValue;
    }
    return choices.map((element) => {
      return element.value;
    })
  }
}
