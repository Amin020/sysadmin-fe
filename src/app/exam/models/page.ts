import { Question } from "./question";

export class Page {

    name: any;
    elements: Array<Question>;
    constructor(name: string) {
        this.name = { default: name };
        this.elements = new Array<Question>();
    }
}
