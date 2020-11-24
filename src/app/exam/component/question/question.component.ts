import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Utilities } from 'src/app/core/utilities';
import { ToastrService } from 'ngx-toastr';
import { Question, QuestionType, CheckboxQuestion, BooleanQuestion, RadiogroupQuestion, TextQuestion } from '../../models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() isSurvey: boolean;

  questionTypes = QuestionType;
  @ViewChild('fileUploader') fileUploader: ElementRef;
  utilities = new Utilities();

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
  }

  uploadImage(files: FileList) {
    if (!files.length) {
      return;
    }
    this.utilities.handleFiles(files, 10000, 'upload', 300, (image) => {
      // TODO call update customer api to udapte customer image
      this.question.image = files[0];
      this.question.image['value'] = image;
    }, ['jpg', 'png', 'JPG', 'PNG'], (error) => {
      this.toastr.error(error);
      this.fileUploader.nativeElement.value = '';
    });
  }

  getQuestionCode(QuestionNumber: number) {
    let code = '';
    let powerLevel = 3;
    let remain = (QuestionNumber + 1) / Math.pow(25, powerLevel);
    while (powerLevel + 1) {
      if (Math.floor(remain)) {
        code += String.fromCharCode(64 + remain % 25);
      }
      powerLevel--;
      remain = (QuestionNumber + 1) / Math.pow(25, powerLevel);
    }
    return code;
  }

  addOption(question) {
    question.answers.push({
      value: {
        default: ''
      },
      correctAnswer: false
    });
  }

  toggleCheckBox(index) {
    this.question.answers[index].correctAnswer = !this.question.answers[index].correctAnswer;
    if (this.question.type !== QuestionType.checkbox && this.question.answers[index].correctAnswer) {
      this.changeCorrectAnswer(index);
    }
  }

  private changeCorrectAnswer(index) {
    this.question.answers.forEach(answer => {
      answer.correctAnswer = false;
    });
    this.question.answers[index].correctAnswer = true;
  }

  changeQuestionType() {
    switch (this.question.type) {
      case QuestionType.checkbox:
        this.question = new CheckboxQuestion();
        break;
      case QuestionType.radiogroup:
        this.question = new RadiogroupQuestion();
        break;
      case QuestionType.boolean:
        this.question = new BooleanQuestion();
        break;
      case QuestionType.text:
        this.question = new TextQuestion();
        break;
      default:
        break;
    }
  }

  removeOption(index) {
    this.question.answers.splice(index, 1);
  }

}
