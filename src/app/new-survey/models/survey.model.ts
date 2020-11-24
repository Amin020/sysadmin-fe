import { Page } from 'src/app/exam/models/page';

export class Survey {
    id?: string;
    settings: SurveySettings;
    pages: Array<Page>;
    status: string;
    constructor() {
        this.pages = [new Page('Page 1')];
        this.settings = new SurveySettings();
        this.status = 'INITIATED';
    }
}


export class SurveySettings {
    name = '';
    title = {
        default: ''
    };
    description = '';
    group = '';
    department = '';
    status = '';
    public: boolean;
    manySubmition: boolean;
    completeMessage = {
        default: ''
    };
    emailInvitationTemplate = '';
    emailCompletionTemplate = '';
    logo = '';
    background = '';
    reminder: ReminderSettings;
    constructor() {
        this.status = "INITIATED";
        this.public = false;
        this.reminder = new ReminderSettings();
    }
}

export class ReminderSettings {
    enable: boolean;
    selectedOccurs;
    selectedDays;
    selectedReoccurs;
    selectedReoccursDay;
    selectedReoccursMonth;

    constructor() {
        this.enable = false;
        this.selectedDays = [];
        this.selectedOccurs = 'Weekly';
        this.selectedReoccurs = 0;
    }
}
