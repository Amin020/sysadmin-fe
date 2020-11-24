import SettingsModel from '../../../models/settings-models/settings-model';

const bootstrapsliderBaseModel: SettingsModel = {
    type: 'bootstrapslider',
    settingsItems: [
        {
            prop: 'commentText',
            displayName: 'Comment Text',
            type: 'text',
            translateTab: true
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
            prop: 'hasComment',
            displayName: 'Has Comment',
            type: 'checkbox'
        },
        {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number',
        }, {
            prop: 'isRequired',
            displayName: 'Is Required',
            type: 'checkbox',
        },{
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
        {
            prop: 'maxRangeDescription',
            displayName: 'Max Range Description',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'minRangeDescription',
            displayName: 'Min Range Description',
            type: 'text',
            translateTab: true
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
            prop: 'rangeMax',
            displayName: 'range Max',
            type: 'number'
        },
        {
            prop: 'rangeMin',
            displayName: 'range Min',
            type: 'number'
        },
        {
            prop: 'step',
            displayName: 'range Step',
            type: 'number'
        },
        {
            prop: 'rangeValues',
            displayName: 'Range Values',
            type: 'text_edit',
            subType: 'choices_creation'
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

export default bootstrapsliderBaseModel;
