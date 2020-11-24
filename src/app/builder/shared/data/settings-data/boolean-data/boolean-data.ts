import SettingsModel from '../../../models/settings-models/settings-model';

const booleanBaseModel: SettingsModel = {
    type: 'boolean',
    settingsItems: [
        {
            prop: 'commentText',
            displayName: 'Comment Text',
            type: 'text'
        },{
            prop: 'ref',
            displayName: 'Reference',
            type: 'text'
        },{
            prop: 'score',
            displayName: 'Score',
            type: 'number'
        }, 
        {
            prop: 'weight',
            displayName: 'Weight',
            type: 'text'
        },{
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
        {
            prop: 'correctAnswer',
            displayName: 'Correct Answer',
            type: 'text_edit',
            subType: 'choices_options'
        },
        {
            prop: 'defaultValue',
            displayName: 'Default Value',
            type: 'dropdown',
            values: [{
                value: 'indeterminate',
                displayName: 'Indeterminate'
            }, {
                value: 'false',
                displayName: 'False'
            }, {
                value: 'true',
                displayName: 'True'
            }]
        },
        {
            prop: 'description',
            displayName: 'Description',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'enableIf',
            displayName: 'EnableIf',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number'
        },
        {
            prop: 'isRequired',
            displayName: 'Is Required',
            type: 'checkbox'
        },
        {
            prop: 'label',
            displayName: 'Label',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },

        {
            prop: 'name',
            displayName: 'Name',
            type: 'text'
        },
        {
            prop: 'page',
            displayName: 'Page',
            type: 'dropdown',
            values: []
        },
        {
            prop: 'readOnly',
            displayName: 'Read Only',
            type: 'checkbox',
        },
        {
            prop: 'requiredErrorText',
            displayName: 'Required Error Text',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        }, {
            prop: 'requiredIf',
            displayName: 'Required If',
            type: 'text_edit',
            subType: 'equation'
        }, {
            prop: 'showTitle',
            displayName: 'Show Title',
            type: 'checkbox',
        }, {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox',
        },
        {
            prop: 'title',
            displayName: 'Title',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'titleLocation',
            displayName: 'TitleLocation',
            type: 'dropdown',
            values: [{
                value: 'default',
                displayName: 'Default'
            }, {
                value: 'top',
                displayName: 'Top'
            }, {
                value: 'bottom',
                displayName: 'Bottom'
            }, {
                value: 'left',
                displayName: 'Left'
            }, {
                value: 'hidden',
                displayName: 'Hidden'
            }]
        },
        {
            prop: 'useDisplayValuesInTitle',
            displayName: 'Use Display Values In Title',
            type: 'checkbox',
        },
        {
            prop: 'validators',
            displayName: 'validators',
            type: 'text_edit',
            subType: 'validator'
        },

        {
            prop: 'valueFalse',
            displayName: 'Value False',
            type: 'text',
        },
        {
            prop: 'valueName',
            displayName: 'Value Name',
            type: 'text',
        },
        {
            prop: 'valueTrue',
            displayName: 'Value True',
            type: 'text',
        },

        {
            prop: 'visible',
            displayName: 'Visible',
            type: 'checkbox',
        },
        {
            prop: 'visibleIf',
            displayName: 'Visible If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'width',
            displayName: 'Width',
            type: 'text',
        }

    ]
};

export default booleanBaseModel;
