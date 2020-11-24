import SettingsModel from '../../../models/settings-models/settings-model';

const matrixdynamicBaseModel: SettingsModel = {
    type: 'matrixdynamic',
    settingsItems: [

        {
            prop: 'correctAnswer',
            displayName: 'Correct Answer',
            type: 'text_edit',
            subType: 'choices_options'
        },

        {
            prop: 'defaultRowValue',
            displayName: 'Default Row Value',
            type: 'text_edit',
            subType: 'choices_options'
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
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
        {
            prop: 'defaultValue',
            displayName: 'Default Value',
            type: 'text_edit',
            subType: 'choices_options'
        },

        {

            prop: 'addRowLocation',
            displayName: 'Add Row Location',
            type: 'dropdown',
            values: [{
                value: 'default',
                displayName: 'Default'
            }, {
                value: 'top',
                displayName: 'Top'
            }, {
                value: 'bottom',
                displayName: 'Bottom'
            }, {
                value: 'top and bottom',
                displayName: 'Top and Bottom'
            }]
        },
        {

            prop: 'addRowText',
            displayName: 'Add Row Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'cellType',
            displayName: 'Cell Type',
            type: 'dropdown',
            values: [{
                value: 'dropdown',
                displayName: 'DropDown'
            },
            {
                value: 'checkbox',
                displayName: 'checkbox'
            }, {
                value: 'radiogroup',
                displayName: 'radioGroup'
            }, {
                value: 'text',
                displayName: 'Single Input'
            }, {
                value: 'comment',
                displayName: 'comment'
            }, {
                value: 'boolean',
                displayName: 'Boolean'
            }, {
                value: 'expression',
                displayName: 'Expression'
            },
            ]
        },
        {

            prop: 'choices',
            displayName: 'Choices',
            type: 'text_edit',
            subType: 'choices_creation'
        },
        {
            prop: 'columnColCount',
            displayName: 'Column Col Count',
            type: 'dropdown',
            values: [{
                value: '0',
                displayName: '0'
            },
            {
                value: '1',
                displayName: '1'
            }, {
                value: '2',
                displayName: '2'
            }, {
                value: '3',
                displayName: '3'
            }, {
                value: '4',
                displayName: '4'
            }]
        },
        {
            prop: 'columnLayout',
            displayName: 'Column Layout',
            type: 'dropdown',
            values: [{
                value: 'horizontal',
                displayName: 'Horizontal'
            },
            {
                value: 'vertical',
                displayName: 'Vertical'
            }]
        },
        {
            prop: 'columnMinWidth',
            displayName: 'Column Min Width',
            type: 'text'
        },
        {
            prop: 'columns',
            displayName: 'Columns',
            type: 'text_edit',
            subType: 'choices_creation',
            translateTab: true
        },
        {
            prop: 'columnsVisibleIf',
            displayName: 'Columns Visible If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'commentText',
            displayName: 'Comment Text',
            type: 'text'
        },
        {
            prop: 'confirmDelete',
            displayName: 'Confirm Delete',
            type: 'checkbox'
        },
        {
            prop: 'confirmDeleteText',
            displayName: 'Confirm Delete Text',
            type: 'text',
            translateTab: true
        },
        // {
        //     prop: 'correctAnswer',
        //     displayName: 'Correct Answer',
        //     type: 'text_edit',
        //     subType: 'choices_options'
        // },

        // {
        //     prop: 'defaultRowValue',
        //     displayName: 'Default Row Value',
        //     type: 'text_edit',
        //     subType: 'choices_options'
        // },
        // {
        //     prop: 'defaultValue',
        //     displayName: 'Default Value',
        //     type: 'text_edit',
        //     subType: 'choices_options'
        // },
        {
            prop: 'defaultValueFromLastRow',
            displayName: 'Default Value From Last Row',
            type: 'checkbox'
        },

        {
            prop: 'description',
            displayName: 'Description',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'enableIf',
            displayName: 'Enable If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'horizontalScroll',
            displayName: 'HorizontalScroll',
            type: 'checkbox'
        },
        {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number'
        },
        {
            prop: 'isRequired',
            displayName: 'Is Required',
            type: 'checkbox'
        },
        {
            prop: 'keyDuplicationError',
            displayName: 'Key Duplication Error',
            type: 'text',
            translateTab: true
        }, {
            prop: 'keyName',
            displayName: 'Key Name',
            type: 'text'
        }, {
            prop: 'maxRowCount',
            displayName: 'Max Row Count',
            type: 'number'
        }, {
            prop: 'minRowCount',
            displayName: 'Min Row Count',
            type: 'number'
        },
        {
            prop: 'name',
            displayName: 'Name',
            type: 'text'
        },
        {
            prop: 'optionsCaption',
            displayName: 'Options Caption',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'page',
            displayName: 'Page',
            type: 'dropdown',
            values: []
        },
        {
            prop: 'readOnly',
            displayName: 'Read Only',
            type: 'checkbox'
        },
        {
            prop: 'removeRowText',
            displayName: 'Remove Row Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'requiredErrorText',
            displayName: 'Required Error Text',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'requiredIf',
            displayName: 'Required If',
            type: 'text_edit',
            subType: 'equation'
        },

        {
            prop: 'rowCount',
            displayName: 'Row Count',
            type: 'number'
        },

        {
            prop: 'showHeader',
            displayName: 'Show Header',
            type: 'checkbox'
        }, {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox'
        },
        {
            prop: 'title',
            displayName: 'Title',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'titleLocation',
            displayName: 'Title Location',
            type: 'checkbox',
            values: [{
                value: 'default',
                displayName: 'Default'
            }, {
                value: 'top',
                displayName: 'Top'
            }, {
                value: 'bottom',
                displayName: 'Bottom'
            }, {
                value: 'left',
                displayName: 'Left'
            }, {
                value: 'hidden',
                displayName: 'Hidden'
            }]
        }, {
            prop: 'useDisplayValuesInTitle',
            displayName: 'Use Display Values In Title',
            type: 'checkbox'
        },
        {
            prop: 'validators',
            displayName: 'Validators',
            type: 'text_edit',
            subType: 'validator'
        },
        {
            prop: 'valueName',
            displayName: 'Value Name',
            type: 'text'
        },
        {
            prop: 'visible',
            displayName: 'Visible',
            type: 'checkbox'
        },
        {
            prop: 'visibleIf',
            displayName: 'Visible If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'width',
            displayName: 'Width',
            type: 'text'
        },
    ]
};

export default matrixdynamicBaseModel;
