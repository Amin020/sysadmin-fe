const tagboxBaseModel = {
    type: 'tagbox',
    settingsItems: [
        {
            prop: 'choices',
            displayName: 'Choices',
            type: 'text_edit',
            subType: 'choices_creation',
            translateTab: true
        },
        {
            prop: 'choicesByUrl',
            displayName: 'Choices By Url',
            type: 'text_edit',
            subType: 'choices_by_url'
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
            prop: 'choicesEnableIf',
            displayName: 'Choices Enable If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'choicesOrder',
            displayName: 'Choices Order',
            type: 'dropdown',
            values: [{
                value: 'none',
                displayName: 'None'
            }, {
                value: 'ascending',
                displayName: 'Ascending'
            }, {
                value: 'descending',
                displayName: 'Descending'
            }, {
                value: 'random',
                displayName: 'Random'
            }]
        },
        {
            prop: 'choicesVisibleIf',
            displayName: 'Choices Visible If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'commentText',
            displayName: 'Comment Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'correctAnswer',
            displayName: 'Correct Answer',
            type: 'text_edit',
            subType: 'choices_options'
        },
        {
            prop: 'defaultValue',
            displayName: 'Default Value',
            type: 'text_edit',
            subType: 'choices_options'
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
            prop: 'hasComment',
            displayName: 'Has Comment',
            type: 'checkbox'
        },
        {
            prop: 'hasOther',
            displayName: 'Has Other',
            type: 'checkbox',
        },
        {
            prop: 'hideIfChoicesEmpty',
            displayName: 'Hide If Choices Empty',
            type: 'checkbox',
        }, {
            prop: 'indent',
            displayName: 'Indent',
            type: 'number',
        }, {
            prop: 'isRequired',
            displayName: 'Is Required',
            type: 'checkbox',
        },
        {
            prop: 'name',
            displayName: 'Name',
            type: 'text',
        },
        {
            prop: 'optionsCaption',
            displayName: 'Options Caption',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'otherErrorText',
            displayName: 'Other Error Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'otherText',
            displayName: 'Other Text',
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
            type: 'checkbox',
        },
        {
            prop: 'requiredErrorText',
            displayName: 'Required Error Text',
            type: 'text_edit',
            subType: 'text_area'
        },
        {
            prop: 'requiredIf',
            displayName: 'Required If',
            type: 'text_edit',
            subType: 'equation'
        },
        {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox',
        },
        {
            prop: 'storeOthersAsComment',
            displayName: 'Store Others As Comment',
            type: 'checkbox',
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
        }, {
            prop: 'visibleIf',
            displayName: 'Visible If',
            type: 'text_edit',
            subType: 'equation'
        }
        , {
            prop: 'width',
            displayName: 'Width',
            type: 'text',
        }

    ]
};
export default tagboxBaseModel;