import SettingsModel from '../../../models/settings-models/settings-model';

const editorModalModel = {
    type: 'editor',
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
                prop: 'visible',
                displayName: 'Is visible?',
                type: 'checkbox',
                value: undefined,
            },{
                prop: 'ref',
                displayName: 'Reference',
                type: 'text'
            },{
                prop: 'bookmark',
                displayName: 'Bookmark',
                type: 'checkbox',
                value: undefined,
            },{
                prop: 'score',
                displayName: 'Score',
                type: 'number'
            }, {
                prop: 'startWithNewLine',
                displayName: 'Is start with new line?',
                type: 'checkbox',
                value: undefined,
            }]
        },
        {  // proplem while adding two general type
            // prop: '',
            // type: 'general',
            // displayName: 'Html Editor',
            // value: [{
            //     prop: 'html',
            //     displayName: '',
            //     type: 'text_area',
            //     value: undefined,
            // }]
            prop: 'html',
            displayName: 'Html Editor',
            type: 'textArea',
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

export default editorModalModel;
