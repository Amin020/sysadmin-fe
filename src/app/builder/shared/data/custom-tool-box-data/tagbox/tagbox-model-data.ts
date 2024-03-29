import SettingsModel from '../../../models/settings-models/settings-model';

const tagboxModalModel = {
    type: 'tagbox',
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
            },{
                prop: 'ref',
                displayName: 'Reference',
                type: 'text'
            },{
                prop: 'score',
                displayName: 'Score',
                type: 'number'
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
                prop: 'optionsCaption',
                displayName: 'Options Caption',
                type: 'text',
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
                displayName: 'Has Other',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'otherText',
                displayName: 'Other Text',
                type: 'text',
                value: undefined,
            }, {
                prop: 'choicesMin',
                displayName: 'Minimum value for auto generated items',
                type: 'number',
                value: undefined,
            }, {
                prop: 'choicesMax',
                displayName: 'Maximum value for auto generated items',
                type: 'number',
                value: undefined,
            },
            {
                prop: 'choicesStep',
                displayName: 'The difference between auto generated items',
                type: 'number',
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

export default tagboxModalModel;
