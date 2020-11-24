import SettingsModel from '../../../models/settings-models/settings-model';

const datepickerModalModel = {
    type: 'datepicker',
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
                prop: 'bookmark',
                displayName: 'Bookmark',
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
                prop: 'visible',
                displayName: 'Is visible?',
                type: 'checkbox',
                value: false,
            }, {
                prop: 'isRequired',
                displayName: 'Is required?',
                type: 'checkbox',
                value: false,
            }, {
                prop: 'startWithNewLine',
                displayName: 'Is start with new line?',
                type: 'checkbox',
                value: false,
            },
            {
                prop: 'inputType',
                displayName: 'Input Type',
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'color',
                    displayName: 'Color'
                }, {
                    value: 'date',
                    displayName: 'Date'
                }, {
                    value: 'datetime',
                    displayName: 'Date Time'
                }, {
                    value: 'datetime-local',
                    displayName: 'Date Time Local'
                }, {
                    value: 'email',
                    displayName: 'Email'
                }, {
                    value: 'month',
                    displayName: 'Month'
                }, {
                    value: 'number',
                    displayName: 'Number'
                }, {
                    value: 'password',
                    displayName: 'Password'
                }, {
                    value: 'range',
                    displayName: 'Range'
                }, {
                    value: 'tel',
                    displayName: 'Tel'
                }, {
                    value: 'text',
                    displayName: 'Text'
                }, {
                    value: 'time',
                    displayName: 'Time'
                }, {
                    value: 'url',
                    displayName: 'Url'
                }, {
                    value: 'week',
                    displayName: 'Week'
                }]
            },
            {
                prop: 'placeHolder',
                displayName: 'Input Place Holder',
                type: 'text',
                value: undefined
            }]
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
        },
        {
            prop: 'validators',
            displayName: 'Validators',
            type: 'validators',
            value: undefined
        }

    ]
};

export default datepickerModalModel;
