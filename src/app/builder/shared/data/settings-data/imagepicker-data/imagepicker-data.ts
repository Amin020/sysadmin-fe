import SettingsModel from '../../../models/settings-models/settings-model';

const imagepickerBaseModel: SettingsModel = {
    type: 'imagepicker',
    settingsItems: [
        {
            prop: 'choices',
            displayName: 'Choices',
            type: 'text_edit',
            subType: 'choices_creation',
            translateTab: true
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
            prop: 'choicesByUrl',
            displayName: 'Choices By Url',
            type: 'text_edit',
            subType: 'choices_by_url'
        },
        {
            prop: 'choicesEnableIf',
            displayName: 'Choices Enable If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'choicesOrder',
            displayName: 'Choices Order',
            type: 'dropdown',
            values: [{
                value: 'none',
                displayName: 'None'
            }, {
                value: 'ascending',
                displayName: 'Ascending'
            }, {
                value: 'descending',
                displayName: 'Descending'
            }, {
                value: 'random',
                displayName: 'Random'
            }]
        },
        {
            prop: 'choicesVisibleIf',
            displayName: 'Choices Visible If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'colCount',
            displayName: 'Col Count',
            type: 'number'
        },
        {
            prop: 'commentText',
            displayName: 'Comment Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'contentMode',
            displayName: 'Content Mode',
            type: 'dropdown',
            values: [{
                value: 'image',
                displayName: 'Image'
            }, {
                value: 'video',
                displayName: 'Video'
            }]
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
            prop: 'hideIfChoicesEmpty',
            displayName: 'Hide If Choices Empty',
            type: 'checkbox',
        },
        {
            prop: 'imageFit',
            displayName: 'Image Fit',
            type: 'checkbox',
            values: [{
                value: 'none',
                displayName: 'None'
            }, {
                value: 'contain',
                displayName: 'Contain'
            }, {
                value: 'cover',
                displayName: 'Cover'
            }, {
                value: 'fill',
                displayName: 'Fill'
            }]
        },
        {
            prop: 'imageHeight',
            displayName: 'Image Height',
            type: 'number',
        },
        {
            prop: 'imageWidth',
            displayName: 'Image Width',
            type: 'number',
        },

        {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number',
        }, {
            prop: 'isRequired',
            displayName: 'Is Required',
            type: 'checkbox',
        },

        {
            prop: 'multiSelect',
            displayName: 'Multi Select',
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
            prop: 'showLabel',
            displayName: 'Show Label',
            type: 'checkbox',
        },

        {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox',
        },
        {
            prop: 'optionsCaption',
            displayName: 'Options Caption',
            type: 'text',
            subType: 'text_area',
            translateTab: true
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

export default imagepickerBaseModel;
