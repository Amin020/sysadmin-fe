import SettingsModel from '../../../models/settings-models/settings-model';

const expressionBaseModel: SettingsModel = {
    type: 'expression',
    settingsItems: [

        {
            prop: 'correctAnswer',
            displayName: 'Correct Answer',
            type: 'text_edit',
            subType: 'text'
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
            prop: 'currency',
            displayName: 'Currency',
            type: 'dropdown',
            values: []
        },
        {
            prop: 'defaultValue',
            displayName: 'Default Value',
            type: 'text_edit',
            subType: 'text'
        },
        {
            prop: 'description',
            displayName: 'Description',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
        {
            prop: 'displayStyle',
            displayName: 'Display Style',
            type: 'dropdown',
            values: [{
                value: 'none',
                displayName: 'None'
            }, {
                value: 'decimal',
                displayName: 'Decimal'
            }, {
                value: 'currency',
                displayName: 'Currency'
            }, {
                value: 'percent',
                displayName: 'Percent'
            }]
        },
        {
            prop: 'expression',
            displayName: 'Expression',
            type: 'text_edit',
            subType: 'expression'
        },
        {
            prop: 'format',
            displayName: 'Format',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number',
        },
        {
            prop: 'maximumFractionDigits',
            displayName: 'Maximum Fraction Digits',
            type: 'number',
        },
        {
            prop: 'minimumFractionDigits',
            displayName: 'Minimum Fraction Digits',
            type: 'number',
        },
        {
            prop: 'name',
            displayName: 'Name',
            type: 'text',
        },
        {
            prop: 'page',
            displayName: 'Page',
            type: 'dropdown',
            values: []
        },

        {
            prop: 'requiredIf',
            displayName: 'Required If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
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
            displayName: 'Title Location',
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
            prop: 'useGrouping',
            displayName: 'Use Grouping',
            type: 'checkbox',
        },
        {
            prop: 'valueName',
            displayName: 'Value Name',
            type: 'text',
        },
        {
            prop: 'visible',
            displayName: 'Visible',
            type: 'checkbox',
        }, {
            prop: 'visibleIf',
            displayName: 'Visible If',
            type: 'text_edit',
            subType: 'equation'
        }
        , {
            prop: 'width',
            displayName: 'Width',
            type: 'text',
        }

    ]
};

export default expressionBaseModel;
