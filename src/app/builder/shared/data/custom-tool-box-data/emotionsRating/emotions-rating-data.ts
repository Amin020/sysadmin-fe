import SettingsModel from '../../../models/settings-models/settings-model';

const emotionsratingsModalModel = {
    type: 'emotionsratings',
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
            },{
                prop: 'ref',
                displayName: 'Reference',
                type: 'text'
            },{
                prop: 'score',
                displayName: 'Score',
                type: 'number'
            }, {
                prop: 'startWithNewLine',
                displayName: 'Is start with new line?',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'rateMin',
                displayName: 'Rate Min',
                type: 'number',
                value: undefined,
            },
            {
                prop: 'rateMax',
                displayName: 'Rate Max',
                type: 'number',
                value: undefined,
            }, {
                prop: 'rateStep',
                displayName: 'Rate Step',
                type: 'number',
                value: undefined,
            },
            {
                prop: 'minRateDescription',
                displayName: 'Min Rate Description',
                type: 'text',
                value: undefined,
            },
            {
                prop: 'maxRateDescription',
                displayName: 'Max Rate Description',
                type: 'text',
                value: undefined,
            }]
        },
        {
            prop: 'rateValues',
            type: 'choicesCreation',
            displayName: 'Rate Values',
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

export default emotionsratingsModalModel;
