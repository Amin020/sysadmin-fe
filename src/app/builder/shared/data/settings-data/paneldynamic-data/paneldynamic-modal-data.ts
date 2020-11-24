import SettingsModel from '../../../models/settings-models/settings-model';

const paneldynamicModalModel = {
    type: 'paneldynamic',
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
                prop: 'ref',
                displayName: 'Reference',
                type: 'text'
            }, {
                prop: 'score',
                displayName: 'Score',
                type: 'number'
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
            }, {
                prop: 'startWithNewLine',
                displayName: 'Is start with new line?',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'renderMode',
                displayName: 'Render Mode',
                type: 'dropdown',
                values: [{
                    value: 'list',
                    displayName: 'List'
                }, {
                    value: 'progressTop',
                    displayName: 'Progress Top'
                }, {
                    value: 'progressBottom',
                    displayName: 'Progress Bottom'
                }, {
                    value: 'progressTopBottom',
                    displayName: 'Progress Top Bottom'
                }],
                value: undefined,
            }, {
                prop: 'allowAddPanel',
                displayName: 'Allow Add Panel',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'allowRemovePanel',
                displayName: 'Allow Remove Panel',
                type: 'checkbox',
                value: undefined,
            },
            ]
        },
        {
            prop: 'templateTitle',
            type: 'text_area',
            displayName: 'Template Title',
            value: undefined,
        }, {
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
        },
        {
            prop: 'enableIf',
            type: 'equation',
            displayName: 'Enable If',
            value: undefined,
        }
    ]
};

export default paneldynamicModalModel;
