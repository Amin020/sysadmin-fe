import SettingsModel from '../../../models/settings-models/settings-model';

const commentModalModel = {
    type: 'comment',
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
            }, {
                prop: 'bookmark',
                displayName: 'Bookmark',
                type: 'checkbox',
                value: undefined,
            },{
                prop: 'startWithNewLine',
                displayName: 'Is start with new line?',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'rows',
                displayName: 'Row count',
                type: 'number',
                value: undefined,
            }, {
                prop: 'placeHolder',
                displayName: 'Input place holder',
                type: 'text',
                value: undefined,
            }]
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

export default commentModalModel;
