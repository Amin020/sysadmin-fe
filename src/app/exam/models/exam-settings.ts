import { Page } from './page';
import { Question } from 'survey-angular';

export class Exam {
    id: string;
    settings: ExamSettings;
    pages: Array<Page>;
    status: string;
    constructor() {
        this.pages = [new Page('Page 1')];
        this.settings = new ExamSettings();
        this.status = 'INITIATED';
    }

    updateCalculatedSettings() {
        this.settings.totalQuestion = 0;
        this.settings.totalScore = 0;
        this.pages.forEach(page => {
            page.elements.forEach(question => {
                this.settings.totalQuestion++;
                this.settings.totalScore += (question.score * question.weight);
            });
        });
    }
}


export class ExamSettings {
    title: any;
    totalQuestion: number;
    totalScore: number;
    passScore: number;
    totalTime: number;
    addRemark: boolean;
    showResult: boolean;
    randomSequnce: boolean;
    showAnswer: boolean;
    selectedLanguage: string;

    constructor() {
        this.title = {
            default: ''
        };
        this.addRemark = true;
        this.showResult = true;
        this.showAnswer = false;
        this.randomSequnce = false;
    }
}
