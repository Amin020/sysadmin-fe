import {
  Component, OnInit, Input, Output, EventEmitter, ViewChildren,
  AfterViewInit, QueryList
} from '@angular/core';
import { ValidatorComponentComponent } from '../validator-component/validator-component.component';
import { EquationComponentComponent } from '../equation-component/equation-component.component';
import { ChoicesCreationComponentComponent } from '../choices-creation-component/choices-creation-component.component';
import { GeneralComponentComponent } from '../general-component/general-component.component';
import { ChoicesByUrlComponentComponent } from '../choices-by-url-component/choices-by-url-component.component';
import { TextAreaComponentComponent } from '../text-area-component/text-area-component.component';
import { ExpressionComponentComponent } from '../expression-component/expression-component.component';

@Component({
  selector: 'app-multiple-edit',
  templateUrl: './multiple-edit.component.html',
  styleUrls: ['./multiple-edit.component.scss']
})
export class MultipleEditComponent implements OnInit, AfterViewInit {

  @Input() item: any;
  @Input() titleProp: string;
  @Input() question: any;
  @Input() editOptions: {
    prop: string,
    type: string,
    value: string,
    displayName: string
  }[];
  localOptions: {
    prop: string,
    type: string,
    value: string,
    displayName: string
  }[];

  @Output() editedItems = new EventEmitter();
  @ViewChildren(ValidatorComponentComponent) validatorChildren: QueryList<ValidatorComponentComponent>;
  @ViewChildren(EquationComponentComponent) equationChildren: QueryList<EquationComponentComponent>;
  @ViewChildren(ChoicesCreationComponentComponent) choicesCreationChildren: QueryList<ChoicesCreationComponentComponent>;
  @ViewChildren(GeneralComponentComponent) generalChildren: QueryList<GeneralComponentComponent>;
  @ViewChildren(ChoicesByUrlComponentComponent) choicesByUrlChildren: QueryList<ChoicesByUrlComponentComponent>;
  @ViewChildren(TextAreaComponentComponent) textAreaChildren: QueryList<TextAreaComponentComponent>;
  @ViewChildren(ExpressionComponentComponent) expressionChildren: QueryList<ExpressionComponentComponent>;



  constructor() { }

  ngOnInit() {
    this.localOptions = this.editOptions;
    console.log(this.localOptions);
  }

  ngAfterViewInit() {

    const validators: ValidatorComponentComponent[] = this.validatorChildren.toArray();
    console.log(validators);

    const equations: EquationComponentComponent[] = this.equationChildren.toArray();
    console.log(equations);

    const choicesCreations: ChoicesCreationComponentComponent[] = this.choicesCreationChildren.toArray();
    console.log(choicesCreations);

  }
  showValue(data) {
    console.log(data);
  }
  editItem(data, index) {
    const optionsCopy = this.localOptions;
    optionsCopy[index].value = data;
    console.log(data, index);
    console.log(optionsCopy);
    this.editedItems.emit(optionsCopy);
  }
  // TODO need to add function to get the templates values
  // search on the prop and assign the value to it
  reCallValue() {
    const optionsCopy = this.localOptions;
    const validators: ValidatorComponentComponent[] = this.validatorChildren.toArray();
    if (validators) {
      validators.filter(res => {
        const index = this.getOptionIndex(res.prop, optionsCopy);
        optionsCopy[index].value = res.getValue();
      });
    }

    const equations: EquationComponentComponent[] = this.equationChildren.toArray();
    if (equations) {
      equations.filter(res => {
        const index = this.getOptionIndex(res.prop, optionsCopy);
        optionsCopy[index].value = res.getValue();
      });
    }

    const general: GeneralComponentComponent[] = this.generalChildren.toArray();
    if (general) {
      general.filter(res => {
        const index = this.getOptionIndexByName(res.value.displayName, optionsCopy);
        console.log('get value');
        console.log(res.getValue());
        console.log(optionsCopy[index]);
        optionsCopy[index].value = res.getValue().value;
      });
    }

    const choicesCreationArray: ChoicesCreationComponentComponent[] = this.choicesCreationChildren.toArray();
    if (choicesCreationArray) {
      choicesCreationArray.filter(res => {
        const index = this.getOptionIndex(res.prop, optionsCopy);
        console.log('get choices Value');
        console.log(res.getChoices());
        console.log(optionsCopy[index]);
        optionsCopy[index].value = res.getChoices();
      });
    }

    const choicesByUrlArray: ChoicesByUrlComponentComponent[] = this.choicesByUrlChildren.toArray();
    if (choicesByUrlArray) {
      choicesByUrlArray.filter(res => {
        const index = this.getOptionIndex(res.prop, optionsCopy);
        console.log('get choices by url Value');
        console.log(res.getValue());
        console.log(optionsCopy[index]);
        optionsCopy[index].value = res.getValue();
      });
    }

    const textAreaArray: TextAreaComponentComponent[] = this.textAreaChildren.toArray();
    if (textAreaArray) {
      textAreaArray.filter(res => {
        const index = this.getOptionIndex(res.prop, optionsCopy);
        console.log('get text area');
        console.log(res.getValue());
        console.log(optionsCopy[index]);
        optionsCopy[index].value = res.getValue();
      });
    }

    const expressionArray: ExpressionComponentComponent[] = this.expressionChildren.toArray();
    if (expressionArray) {
      expressionArray.filter(res => {
        const index = this.getOptionIndex(res.prop, optionsCopy);
        console.log('get text area');
        console.log(res.getValue());
        console.log(optionsCopy[index]);
        optionsCopy[index].value = res.getValue();
      });
    }

    return optionsCopy;
  }
  getOptionIndex(prop, optionsCopy) {
    return optionsCopy.findIndex(res => {
      return res.prop === prop;
    });
  }
  getOptionIndexByName(displayName, optionsCopy) {
    return optionsCopy.findIndex(res => {
      return res.displayName === displayName;
    });
  }

}
