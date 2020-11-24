import SettingsModel from '../../../models/settings-models/settings-model';

const matrixdropdownModalModel = {
    type: 'matrixdropdown',
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
                prop: 'ref',
                displayName: 'Reference',
                type: 'text'
            }, {
                prop: 'score',
                displayName: 'Score',
                type: 'number'
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
                prop: 'cellType',
                displayName: 'Cell Type',
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'dropdown',
                    displayName: 'DropDown'
                },
                {
                    value: 'checkbox',
                    displayName: 'Checkbox'
                }, {
                    value: 'radiogroup',
                    displayName: 'RadioGroup'
                }, {
                    value: 'text',
                    displayName: 'Single Input'
                }, {
                    value: 'comment',
                    displayName: 'Comment'
                }, {
                    value: 'boolean',
                    displayName: 'Boolean'
                }, {
                    value: 'expression',
                    displayName: 'Expression (Read-Only)'
                },
                ]
            }, {
                prop: 'totalText',
                displayName: 'Total text',
                type: 'text',
                value: undefined,
            }]
        },
        {
            prop: 'columns',
            type: 'choicesCreation',
            displayName: 'Colunms',
            value: undefined,
        },
        {
            prop: 'rows',
            type: 'choicesCreation',
            displayName: 'Rows',
            value: undefined,
        },
        {
            prop: 'choices',
            type: 'choicesCreation',
            displayName: 'Choices',
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

export default matrixdropdownModalModel;
