import SettingsModel from '../../../models/settings-models/settings-model';

const booleanModalModel = {
    type: 'boolean',
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
                displayName: 'Visible',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'isRequired',
                displayName: 'Is Required',
                type: 'checkbox',
                value: undefined,
            },{
                prop: 'bookmark',
                displayName: 'Bookmark',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'startWithNewLine',
                displayName: 'is start with new line',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'label',
                displayName: 'Label',
                type: 'text_area',
                value: undefined,
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
                prop: 'weight',
                displayName: 'Weight',
                type: 'text'
            },]
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

export default booleanModalModel;
