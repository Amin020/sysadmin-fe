import SettingsModel from '../../../models/settings-models/settings-model';

const fileBaseModel: SettingsModel = {
    type: 'file',
    settingsItems: [

        {
            prop: 'acceptedTypes',
            displayName: 'Accepted Types',
            type: 'text',
        },
        {
            prop: 'allowMultiple',
            displayName: 'Allow Multiple',
            type: 'checkbox'
        },
        {
            prop: 'commentText',
            displayName: 'Comment Text',
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
            prop: 'imageHeight',
            displayName: 'Image Height',
            type: 'text'
        },
        {
            prop: 'imageWidth',
            displayName: 'Image Width',
            type: 'text'
        },
        {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number',
        },
        {
            prop: 'isRequired',
            displayName: 'Is Required',
            type: 'checkbox',
        },
        {
            prop: 'maxSize',
            displayName: 'Max Size',
            type: 'number',
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
            type: 'checkbox'
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
            prop: 'showPreview',
            displayName: 'Show Preview',
            type: 'checkbox',
        },
        {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox',
        },
        {
            prop: 'storeDataAsText',
            displayName: 'Store Data As Text',
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
        },
        {
            prop: 'waitForUpload',
            displayName: 'Wait For Upload',
            type: 'checkbox',
        }
        , {
            prop: 'width',
            displayName: 'Width',
            type: 'text',
        }

    ]
};

export default fileBaseModel;
