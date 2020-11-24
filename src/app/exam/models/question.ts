export class Question {
    name: any;
    image?: any;
    weight: number;
    score: number;
    type: QuestionType;
    index: number;
    addAsBookmark?: boolean;
    answers: Array<any>;
    refernce: string;
    constructor() {
        this.name = {
            default: ''
        };
        this.weight = 1;
        this.score = 1;
    }
}

export enum QuestionType {
    checkbox = "checkbox",
    radiogroup = "radiogroup",
    boolean = "boolean",
    text = "text",
}

export class CheckboxQuestion extends Question {
    constructor() {
        super();
        this.answers = [];
        this.refernce = '';
        this.type = QuestionType.checkbox;
    }
}

export class RadiogroupQuestion extends Question {
    constructor() {
        super();
        this.answers = [];
        this.refernce = '';
        this.type = QuestionType.radiogroup;
    }
}

export class BooleanQuestion extends Question {
    constructor() {
        super();
        this.answers = [{
            value: { default: "True" },
            correctAnswer: false
        },
        {
            value: { default: "False" },
            correctAnswer: false
        }
        ];
        this.refernce = '';
        this.type = QuestionType.boolean;
    }
}

export class TextQuestion extends Question {
    constructor() {
        super();
        this.refernce = '';
        this.type = QuestionType.text;
    }
}
