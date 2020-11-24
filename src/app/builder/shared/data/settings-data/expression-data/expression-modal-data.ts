import SettingsModel from '../../../models/settings-models/settings-model';
import currencyData from '../currency-data';
const dropdownModalModel = {
    type: 'expression',
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
                prop: 'startWithNewLine',
                displayName: 'Is start with new line?',
                type: 'checkbox',
                value: undefined,
            },{
                prop: 'bookmark',
                displayName: 'Bookmark',
                type: 'checkbox',
                value: undefined,
            },
            {
                prop: 'currency',
                displayName: 'Currency',
                type: 'dropdown',
                value: undefined,
                values: currencyData
            },
            {
                prop: 'displayStyle',
                displayName: 'Display Style',
                type: 'dropdown',
                values: [{
                    value: 'none',
                    displayName: 'None'
                }, {
                    value: 'decimal',
                    displayName: 'Decimal'
                }, {
                    value: 'currency',
                    displayName: 'Currency'
                }, {
                    value: 'percent',
                    displayName: 'Percent'
                }]
            }]
        },
        {
            prop: 'expression',
            type: 'expression',
            displayName: 'expression',
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

export default dropdownModalModel;
