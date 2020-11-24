import SettingsModel from '../../../models/settings-models/settings-model';

const editorBaseModel: SettingsModel = {
    type: 'editor',
    settingsItems: [
        {
            prop: 'html',
            displayName: 'Html',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number'
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
            type: 'text'
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
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        }, {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox',
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

export default editorBaseModel;
