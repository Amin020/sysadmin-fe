
import SettingsModel from '../../../models/settings-models/settings-model';

const surveyBaseModel: SettingsModel = {
    type: 'survey',
    settingsItems: [
        {
            prop: 'checkErrorsMode',
            displayName: 'Check Errors Mode',
            type: 'dropdown',
            values: [{
                value: 'OnNextPage',
                displayName: 'On Next Page'
            }, {
                value: 'OnValueChanged',
                displayName: 'On Value Changed'
            }]
        },
        {
            prop: 'clearInvisibleValues',
            displayName: 'Clear Invisible Values',
            type: 'dropdown',
            values: [{
                value: 'none',
                displayName: 'None'
            }, {
                value: 'OnComplete',
                displayName: 'On Complete'
            }, {
                value: 'OnHidden',
                displayName: 'On Hidden'
            }]
        },
        {
            prop: 'completeText',
            displayName: 'Complete Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'title',
            displayName: 'Title',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'description',
            displayName: 'description',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'completedBeforeHtml',
            displayName: 'Completed Before Html',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'completedHtml',
            displayName: 'Completed Html',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'questionTitleTemplate',
            displayName: 'Question Title Template',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'startSurveyText',
            displayName: 'Start Survey Text',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'cookieName',
            displayName: 'Cookie Name',
            type: 'text'
        },
        {
            prop: 'firstPageIsStarted',
            displayName: 'First Page Is Started',
            type: 'checkbox'
        },
        {
            prop: 'focusFirstQuestionAutomatic',
            displayName: 'Focus First Question Automatic',
            type: 'checkbox'
        },
        {
            prop: 'goNextPageAutomatic',
            displayName: 'Go Next Page Automatic',
            type: 'checkbox'
        },
        {
            prop: 'isSinglePage',
            displayName: 'Is Single Page',
            type: 'checkbox'
        },
        {
            prop: 'loadingHtml',
            displayName: 'Loading Html',
            type: 'text_edit',
            subType: 'text_area',
            translateTab: true
        },
        {
            prop: 'locale',
            displayName: 'Loading Html',
            type: 'dropdown',
            values: [] // languages
        },
        {
            prop: 'maxOthersLength',
            displayName: 'Max Others Length',
            type: 'number'
        },
        {
            prop: 'maxTextLength',
            displayName: 'Max Text Length',
            type: 'number'
        },
        {
            prop: 'maxTimeToFinish',
            displayName: 'Max Time To Finish',
            type: 'number'
        },
        {
            prop: 'maxTimeToFinishPage',
            displayName: 'Max Time To Finish Page',
            type: 'number'
        },
        {
            prop: 'mode',
            displayName: 'Mode',
            type: 'dropdown',
            values: [{
                value: 'edit',
                displayName: 'Edit'
            }, {
                value: 'display',
                displayName: 'Display'
            }]
        },
        {
            prop: 'pageNextText',
            displayName: 'Page Next Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'pagePrevText',
            displayName: 'Page Prev Text',
            type: 'text',
            translateTab: true
        },
        {
            prop: 'questionErrorLocation',
            displayName: 'Question Error Location',
            type: 'dropdown',
            values: [{
                value: 'top',
                displayName: 'Top'
            }, {
                value: 'bottom',
                displayName: 'Bottom'
            }]
        },
        {
            prop: 'questionStartIndex',
            displayName: 'Question Start Index',
            type: 'text'
        },
    ]
};

export default surveyBaseModel;
