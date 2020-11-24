import SettingsModel from '../../../models/settings-models/settings-model';

const panelModalModel = {
    type: 'panel',
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
                prop: 'ref',
                displayName: 'Reference',
                type: 'text'
            }, {
                prop: 'score',
                displayName: 'Score',
                type: 'number'
            }, {
                prop: 'title',
                displayName: 'Title',
                type: 'text',
                value: undefined,
            }]
        },
        {
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox',
            value: undefined,
        },
        {
            prop: 'visibleIf',
            type: 'equation',
            displayName: 'Visible If',
            value: undefined,
        }
    ]
};

export default panelModalModel;
