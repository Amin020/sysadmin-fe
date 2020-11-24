import SettingsModel from '../../../models/settings-models/settings-model';

const checkboxModalModel = {
    type: 'checkbox',
    editOptions: [
        {
            prop: '',
            type: 'general',
            displayName: 'General',
            value: [{
                prop: 'name',
                displayName: 'Name',
                type: 'text',
                value: undefined,
            }, {
                prop: 'title',
                displayName: 'Title',
                type: 'text_area',
                value: undefined,
            }, {
                prop: 'visible',
                displayName: 'Is visible?',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'isRequired',
                displayName: 'Is required?',
                type: 'checkbox',
                value: undefined,
            },{
                prop: 'bookmark',
                displayName: 'Bookmark',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'ref',
                displayName: 'Reference',
                type: 'text'
            }, {
                prop: 'score',
                displayName: 'Score',
                type: 'number'
            }, 
            {
                prop: 'weight',
                displayName: 'Weight',
                type: 'text'
            }, {
                prop: 'startWithNewLine',
                displayName: 'Is start with new line?',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'choicesOrder',
                displayName: 'Select choices order',
                type: 'dropdown',
                value: undefined,
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
            }, {
                prop: 'colCount',
                displayName: 'Col Count',
                type: 'number',
                value: undefined,
            }]
        },
        {
            prop: 'choices',
            type: 'choicesCreation',
            displayName: 'Choices',
            value: undefined,
            extraItems: [{
                prop: 'hasOther',
                displayName: 'Has other item',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'otherText',
                displayName: 'Other item text',
                type: 'text',
                value: undefined,
            },
            {
                prop: 'hasSelectAll',
                displayName: 'Has Select All item',
                type: 'checkbox',
                value: undefined,
            },
            {
                prop: 'selectAllText',
                displayName: 'Select all item text',
                type: 'text',
                value: undefined,
            },
            {
                prop: 'hasNone',
                displayName: 'Has none item',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'noneText',
                displayName: 'None item text',
                type: 'text',
                value: undefined,

            }]
        },
        {
            prop: 'choicesByUrl',
            type: 'choicesByUrl',
            displayName: 'Choices from Web',
            value: undefined,
        },
        {
            prop: 'visibleIf',
            type: 'equation',
            displayName: 'Visible If',
            value: undefined,
        }, {
            prop: 'enableIf',
            type: 'equation',
            displayName: 'Enable If',
            value: undefined,
        }

    ]
};

export default checkboxModalModel;
