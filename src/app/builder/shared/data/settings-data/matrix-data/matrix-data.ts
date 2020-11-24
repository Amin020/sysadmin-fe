import SettingsModel from '../../../models/settings-models/settings-model';

const matrixBaseModel: SettingsModel = {
    type: 'matrix',
    settingsItems: [
        {
            prop: 'cells',
            displayName: 'Cells',
            type: 'text_edit',
            subType: 'cells_text'
        },{
            prop: 'ref',
            displayName: 'Reference',
            type: 'text'
        },{
            prop: 'score',
            displayName: 'Score',
            type: 'number'
        },{
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
        {
            prop: 'columns',
            displayName: 'Columns',
            type: 'text_edit',
            subType: 'choices_creation',
            translateTab: true
        },
        {
            prop: 'columnsVisibleIf',
            displayName: 'Columns Visible If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'commentText',
            displayName: 'Comment Text',
            type: 'text'
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
            type: 'text_edit',
            subType: 'choices_options'
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
            displayName: 'Enable If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number',
        },

        {
            prop: 'isAllRowRequired',
            displayName: 'Is All Row Required',
            type: 'checkbox',
        },
        {
            prop: 'isRequired',
            displayName: 'Is Required',
            type: 'checkbox',
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
        },
        {
            prop: 'requiredIf',
            displayName: 'Required If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'rows',
            displayName: 'Rows',
            type: 'text_edit',
            subType: 'choices_creation',
            translateTab: true
        },
        {
            prop: 'rowsOrder',
            displayName: 'Rows Order',
            type: 'dropdown',
            values: [{
                value: 'initial',
                displayName: 'Initial'
            }, {
                value: 'random',
                displayName: 'Random'
            }]
        },
        {
            prop: 'rowsVisibleIf',
            displayName: 'Rows Visible If',
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
            prop: 'validators',
            displayName: 'Validators',
            type: 'text_edit',
            subType: 'validator'
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

export default matrixBaseModel;
