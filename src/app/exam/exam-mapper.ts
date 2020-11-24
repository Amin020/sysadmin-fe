import { DomSanitizer } from '@angular/platform-browser';
import { Exam } from './models/exam-settings';
import { Page } from './models/page';
import { Question, QuestionType } from './models/question';

export class ExamMapper {

    constructor(private domSanitizer: DomSanitizer) {
    }
    fromJson(json) {
        const exam = new Exam();
        exam.id = json.id;
        exam.settings.title = json.name;
        exam.settings.totalScore = json.totalGrade;
        exam.settings.totalTime = json.totalTimer;
        exam.settings.passScore = json.passScore;
        exam.settings.addRemark = json.addRemark;
        exam.settings.showAnswer = json.showAnswer;
        exam.settings.showResult = json.showResult;
        exam.settings.randomSequnce = json.randomSequnce;
        exam.settings.totalQuestion = json.totalQuestion;
        exam.settings.selectedLanguage = json.selectedLanguage;
        exam.pages = [];
        json.surveyBody.pages.forEach(page => {
            exam.pages.push(this.mapPage(page));
        });
        return exam;
    }

    private mapPage(pageJson) {
        const page = new Page(pageJson.name.default);
        pageJson.elements.forEach(question => {
            const element = new Question();
            element.type = question.type;
            element.name = question.name;
            element.image = question.image;
            element.index = question.index;
            element.score = question.score;
            element.weight = question.weight;
            element.refernce = question.ref;
            if (question.type === QuestionType.checkbox || question.type === QuestionType.radiogroup) {
                element.answers = question.choices.map(choice => {
                    const answer = {
                        value: choice,
                        correctAnswer: false
                    };
                    if (Array.isArray(question.correctAnswer)) {
                        question.correctAnswer.forEach(correctAnswer => {
                            if (correctAnswer.default === choice.default) {
                                answer.correctAnswer = true;
                            }
                        });
                    } else if (question.correctAnswer.default === choice.default) {
                        answer.correctAnswer = true;
                    }
                    return answer;
                });
            } else if (question.type === QuestionType.boolean) {
                element.answers = [
                    {
                        value: question.choices[0],
                        correctAnswer: question.correctAnswer === true
                    },
                    {
                        value: question.choices[1],
                        correctAnswer: question.correctAnswer !== true
                    }
                ];
            }
            page.elements.push(element);
        });
        return page;
    }

    fromList() {

    }
}
