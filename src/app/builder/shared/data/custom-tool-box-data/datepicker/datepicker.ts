const datepickerBaseModel = {
    type: 'datepicker',
    settingsItems: [
        {
            prop: 'commentText',
            displayName: 'Comment Text',
            type: 'text'
        },
        {
            prop: 'correctAnswer',
            displayName: 'Correct Answer',
            type: 'text_edit',
            subType: 'text'
        },{
            prop: 'ref',
            displayName: 'Reference',
            type: 'text'
        },{
            prop: 'score',
            displayName: 'Score',
            type: 'number'
        },{
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        },
        {
            prop: 'defaultValue',
            displayName: 'Default Value',
            type: 'text_edit',
            subType: 'text'
        },
        {
            prop: 'description',
            displayName: 'Description',
            type: 'text_edit',
            subType: 'text_area'
        },
        {
            prop: 'enableIf',
            displayName: 'Enable If',
            type: 'text_edit',
            subType: 'equation'
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
            prop: 'name',
            displayName: 'Name',
            type: 'text'
        },
        {
            prop: 'page',
            displayName: 'Page',
            type: 'dropdown',
            values: []
        },
        {
            prop: 'placeHolder',
            displayName: 'PlaceHolder',
            type: 'text',
        },
        {
            prop: 'readOnly',
            displayName: 'Read Only',
            type: 'checkbox',
        },
        {
            prop: 'requiredErrorText',
            displayName: 'Required Error Text',
            type: 'text_edit',
            subType: 'text_area'
        }, {
            prop: 'requiredIf',
            displayName: 'Required If',
            type: 'text_edit',
            subType: 'equation'
        }, {
            prop: 'size',
            displayName: 'Size',
            type: 'number',
        }, {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox',
        },
        {
            prop: 'title',
            displayName: 'Title',
            type: 'text_edit',
            subType: 'text_area'
        },
        {
            prop: 'titleLocation',
            displayName: 'Title Location',
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
                value: 'left',
                displayName: 'Left'
            }, {
                value: 'hidden',
                displayName: 'Hidden'
            }]
        },
        {
            prop: 'useDisplayValuesInTitle',
            displayName: 'Use Display Values In Title',
            type: 'checkbox',
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
            type: 'text',
        },
        {
            prop: 'visible',
            displayName: 'Visible',
            type: 'checkbox',
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
            type: 'text',
        }

    ]
};
export default datepickerBaseModel;