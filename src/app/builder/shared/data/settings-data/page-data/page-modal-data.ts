import SettingsModel from '../../../models/settings-models/settings-model';

const pageModalModel = {
    type: 'page',
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
                type: 'text',
                value: undefined,
            }, {
                prop: 'description',
                displayName: 'Description',
                type: 'text_area',
                value: undefined,
            }, {
                prop: 'visible',
                displayName: 'Visible',
                type: 'checkbox',
                value: undefined,
            }]
        },
        {
            prop: 'visibleIf',
            type: 'equation',
            displayName: 'Visible If',
            value: undefined,
        },
        {
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
    ]
};

export default pageModalModel;
