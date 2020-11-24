import SettingsModel from '../../../models/settings-models/settings-model';

const bootstrapsliderModalModel = {
    type: 'bootstrapslider',
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
            },{
                prop: 'ref',
                displayName: 'Reference',
                type: 'text'
            },{
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
                prop: 'rangeMin',
                displayName: 'range Min',
                type: 'number',
                value: undefined,
            },
            {
                prop: 'rangeMax',
                displayName: 'range Max',
                type: 'number',
                value: undefined,
            }, {
                prop: 'rangeStep',
                displayName: 'range Step',
                type: 'number',
                value: undefined,
            }
            ]
        },
        {
            prop: 'rangeValues',
            type: 'choicesCreation',
            displayName: 'range Values',
            value: undefined,
            // extraItems: [{
            //     prop: 'hasOther',
            //     displayName: 'Has Other',
            //     type: 'checkbox',
            //     value: undefined,
            // }, {
            //     prop: 'otherText',
            //     displayName: 'Other Text',
            //     type: 'text',
            //     value: undefined,
            // }]
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

export default bootstrapsliderModalModel;
