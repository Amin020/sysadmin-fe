import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { Page } from '../exam/models/page';
import { QuestionType } from '../exam/models/question';
import { Survey } from './models/survey.model';



@Injectable()
export class SurveyController {

    private baseUrl = environment.baseUrl;
    private surveysUrl = this.baseUrl + '/surveys';

    httpOptions = {
        headers: new HttpHeaders({
            'Authorization': localStorage.getItem('basicauth')
        })
    };

    constructor(private http: HttpClient) {
    }

    getSurveyById(id: string) {
        return this.http.get(this.surveysUrl + '/' + id);
    }

    createSurvey(survey: Survey) {
        const request = this.generateSurveyRequest(survey);
        return this.http.post(this.surveysUrl, request);
    }

    updateSurvey(survey: Survey) {
        const request = this.generateSurveyRequest(survey);
        return this.http.put(this.surveysUrl + '/' + survey.id, request);
    }

    generateSurveyRequest(survey: Survey) {
        return {
            name: survey.settings.name,
            title: survey.settings.title.default,
            surveyBody: {
                title: survey.settings.title,
                pages: this.generateCreateRequest(survey.pages),
            },
            status: survey.status,
            // add dummy data
            public: survey.settings.public,
            user: { id: JSON.parse(localStorage.getItem('userData'))['id'] },
            surveyType: 'SURVEY',
            department: {
                id: survey.settings.department
            },
            description: survey.settings.description,
            allowMultipleSubmissions: survey.settings.manySubmition,
            emailInvitationTemplate: survey.settings.emailInvitationTemplate,
            completedSurveyTemplate: survey.settings.completeMessage.default,
            logo: survey.settings.logo,
            sendAutoReminders: survey.settings.reminder.enable,
            autoRemindersDays: survey.settings.reminder.selectedDays,
            autoRemindersFrequency: survey.settings.reminder.selectedOccurs,
            autoRemindersWeeklyOccurrence: survey.settings.reminder.selectedReoccurs,
            autoRemindersMonthlyOccurrence: survey.settings.reminder.selectedReoccursMonth,
            autoRemindersDayOfMonth: survey.settings.reminder.selectedReoccursDay,
            "logoPosition": "-webkit-left",
            "logoStyle": {
                "height": 150,
                "width": 150
            },
            "logoStyleWidth": 150,
            "logoStyleHeight": 150,
            "createdBy": "test",
            "editBy": "qeqw",
            "footer": "xx",
            "introduction": "",
            "surveytheme": "bootstrap",
        };
    }

    private generateCreateRequest(pages: Array<Page>) {
        const pagesRequest = [];
        let lastQuestionIndex = 0;
        pages.forEach((page, pageIndex) => {
            const temp = this.getPageQuestions(page, lastQuestionIndex);
            const pageRequest = {
                name: page.name,
                elements: temp.elements
            };
            lastQuestionIndex = temp.lastQuestionIndex;
            pagesRequest.push(pageRequest);
        });
        return pagesRequest;
    }

    private getPageQuestions(page: Page, lastQuestionIndex: number) {
        const elements = [];
        page.elements.forEach(question => {
            const element = {
                image: question.image ? question.image.value : '',
                name: question.name,
                title: question.name,
                type: question.type,
                index: lastQuestionIndex,
                ref: question.refernce,
                choices: undefined,
                correctAnswer: undefined
            };
            if (question.type === QuestionType.checkbox || question.type === QuestionType.radiogroup) {
                element.choices = question.answers.map(answer => answer.value);
                element.correctAnswer = question.answers.filter(answer => answer.correctAnswer).map(answer => answer.value);
                element.correctAnswer = element.correctAnswer.length === 1 ? element.correctAnswer[0] : element.correctAnswer;
            } else if (question.type === QuestionType.boolean) {
                element.choices = question.answers.map(answer => answer.value);
                element.correctAnswer = question.answers.filter(answer => answer.correctAnswer)[0].value.default === 'True' ? true
                    : false;
            }
            lastQuestionIndex++;
            elements.push(element);
        });
        return {
            elements,
            lastQuestionIndex
        };
    }
}
