import SettingsModel from '../../../models/settings-models/settings-model';

const pageBaseModel: SettingsModel = {
    type: 'page',
    settingsItems: [
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
            prop: 'maxTimeToFinish',
            displayName: 'Max Time To Finish',
            type: 'number'
        },
        {
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
        {
            prop: 'name',
            displayName: 'Name',
            type: 'text'
        },
        {
            prop: 'navigationButtonsVisibility',
            displayName: 'Navigation Buttons Visibility',
            type: 'dropdown',
            values: [{
                value: 'inherit',
                displayName: 'inherit'
            }, {
                value: 'show',
                displayName: 'show'
            }, {
                value: 'hide',
                displayName: 'hide'
            }]
        },
        {
            prop: 'questionTitleLocation',
            displayName: 'Question Title Location',
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
            prop: 'questionsOrder',
            displayName: 'Questions Order',
            type: 'dropdown',
            values: [{
                value: 'default',
                displayName: 'Default'
            }, {
                value: 'initial',
                displayName: 'Initial'
            }, {
                value: 'random',
                displayName: 'Random'
            }]
        },
        {
            prop: 'readOnly',
            displayName: 'Read Only',
            type: 'checkbox'
        },
        {
            prop: 'title',
            displayName: 'Title',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },

        {
            prop: 'visible',
            displayName: 'Visible',
            type: 'checkbox'
        },
        {
            prop: 'visibleIf',
            displayName: 'Visible If',
            type: 'text_edit',
            subType: 'equation'
        },

    ]
};

export default pageBaseModel;
