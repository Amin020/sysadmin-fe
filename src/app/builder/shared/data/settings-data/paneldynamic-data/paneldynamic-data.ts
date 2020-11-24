import SettingsModel from '../../../models/settings-models/settings-model';

const paneldynamicBaseModel: SettingsModel = {
    type: 'paneldynamic',
    settingsItems: [
        {
            prop: 'allowAddPanel',
            displayName: 'Allow Add Panel',
            type: 'checkbox'
        }, {
            prop: 'bookmark',
            displayName: 'Bookmark',
            type: 'checkbox'
        }, {
            prop: 'ref',
            displayName: 'Reference',
            type: 'text'
        }, {
            prop: 'score',
            displayName: 'Score',
            type: 'number'
        }, {
            prop: 'allowRemovePanel',
            displayName: 'Allow Remove Panel',
            type: 'checkbox'
        }, {
            prop: 'commentText',
            displayName: 'Comment Text',
            type: 'text'
        }, {
            prop: 'confirmDelete',
            displayName: 'Confirm Delete',
            type: 'checkbox'
        }, {
            prop: 'confirmDeleteText',
            displayName: 'Confirm Delete Text',
            type: 'text',
            translateTab: true
        }, {
            prop: 'correctAnswer',
            displayName: 'Correct Answer',
            type: 'text_edit',
            subType: 'panel_text'
        }, {
            prop: 'defaultPanelValue',
            displayName: 'Default Panel Value',
            type: 'text_edit',
            subType: 'panel_text'
        }, {
            prop: 'defaultValue',
            displayName: 'Default Value',
            type: 'text_edit',
            subType: 'panel_text'
        }, {
            prop: 'defaultValueFromLastPanel',
            displayName: 'Default Value From Last Panel',
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
            prop: 'maxPanelCount',
            displayName: 'Max Panel Count',
            type: 'number'
        }, {
            prop: 'minPanelCount',
            displayName: 'Min Panel Count',
            type: 'number'
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
            prop: 'panelAddText',
            displayName: 'Panel Add Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'panelCount',
            displayName: 'Panel Count',
            type: 'number'
        },
        {
            prop: 'panelNextText',
            displayName: 'Panel Next Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'panelPrevText',
            displayName: 'Panel Prev Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'panelRemoveText',
            displayName: 'Panel Remove Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'panelsState',
            displayName: 'Panels State',
            type: 'dropdown',
            values: [{
                value: 'default',
                displayName: 'Default'
            }, {
                value: 'collapsed',
                displayName: 'Collapsed'
            }, {
                value: 'expanded',
                displayName: 'Expanded'
            }, {
                value: 'firstExpanded',
                displayName: 'First Expanded'
            }]
        },
        {
            prop: 'readOnly',
            displayName: 'Read Only',
            type: 'checkbox'
        },
        {
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
            }]
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
            prop: 'showQuestionNumbers',
            displayName: 'Show Question Numbers',
            type: 'dropdown',
            values: [{
                value: 'off',
                displayName: 'Off'
            }, {
                value: 'onPanel',
                displayName: 'On Panel'
            }, {
                value: 'onSurvey',
                displayName: 'On Survey'
            }]
        },
        {
            prop: 'showRangeInProgress',
            displayName: 'Show Range In Progress',
            type: 'text'
        },
        {
            prop: 'startWithNewLine',
            displayName: 'Start With New Line',
            type: 'checkbox'
        },
        {
            prop: 'templateDescription',
            displayName: 'Template Description',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        }, {
            prop: 'templateTitle',
            displayName: 'Template Title',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        }, {
            prop: 'templateTitleLocation',
            displayName: 'Template Title Location',
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
            }]
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
            displayName: 'visible',
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

export default paneldynamicBaseModel;
