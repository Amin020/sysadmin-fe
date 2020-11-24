import SettingsModel from '../../../models/settings-models/settings-model';

const panelBaseModel: SettingsModel = {
    type: 'panel',
    settingsItems: [
        {
            prop: 'description',
            displayName: 'Description',
            type: 'text_edit',
            subType: 'text_area'
        },
        {
            prop: 'enableIf',
            displayName: 'Enable If',
            type: 'text_edit',
            subType: 'equation'
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
            prop: 'indent',
            displayName: 'Indent',
            type: 'number'
        },
        {
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
        {
            prop: 'innerIndent',
            displayName: 'Inner Indent',
            type: 'number'
        },

        {
            prop: 'isRequired',
            displayName: 'Is Required',
            type: 'checkbox'
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
            prop: 'readOnly',
            displayName: 'Read Only',
            type: 'checkbox'
        },
        {
            prop: 'requiredErrorText',
            displayName: 'Required Error Text',
            type: 'text_edit',
            subType: 'text_area'
        },
        {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox'
        },
        {
            prop: 'state',
            displayName: 'State',
            type: 'dropdown',
            values: [{
                value: 'default',
                displayName: 'Default'
            }, {
                value: 'collapsed',
                displayName: 'Collapsed'
            }, {
                value: 'expanded',
                displayName: 'Expanded'
            }]
        },
        {
            prop: 'title',
            displayName: 'Title',
            type: 'text_edit',
            subType: 'text_area'
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
        }
    ]
};

export default panelBaseModel;
