import SettingsModel from '../../../models/settings-models/settings-model';

const surveyModalModel = {
    type: 'survey',
    editOptions: [
        {
            prop: '',
            type: 'general',
            displayName: 'General',
            value: [ {
                prop: 'title',
                displayName: 'Title',
                type: 'text',
                value: undefined,
            }, {
                prop: 'description',
                displayName: 'description',
                type: 'text_area',
                value: undefined,
            },
            {
                prop: 'showTitle',
                displayName: 'Show/Hide Title',
                type: 'checkbox',
                value: undefined,
            },
            {
                prop: 'locale',
                displayName: 'Default language',
                type: 'dropdown',
                value: undefined,
            }, {
                prop: 'mode',
                displayName: 'Default language',
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'edit',
                    displayName: 'Edit'
                }, {
                    value: 'display',
                    displayName: 'Display'
                }]
            }, {
                prop: 'clearInvisibleValues',
                displayName: 'Clear invisible values',
                type: 'dropdown',
                value: undefined,
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
            },  {
                    prop: 'cookieName',
                    displayName: 'Cookie name (to disable run survey two times locally)',
                    type: 'text',
                    value: undefined,
            }, {
                prop: 'sendResultOnPageNext',
                displayName: 'Send survey results on page next',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'storeOthersAsComment',
                displayName: `Store 'others' value in separate field`,
                type: 'checkbox',
                value: undefined,

            }, {
                prop: 'showPageTitles',
                displayName: `Show page titles`,
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'showPageNumbers',
                displayName: 'Show page numbers',
                type: 'checkbox',
                value: undefined,
            }
          ]
        }, {
            prop: '',
            type: 'general',
            displayName: 'Navigation',
            value: [ {
                prop: 'startSurveyText',
                displayName: 'Start button text',
                type: 'text',
                value: undefined,
                // objValue: true
            }, {
                prop: 'pagePrevText',
                displayName: 'Page previous button text',
                type: 'text',
                value: undefined,
                // objValue: true
            },
            {
                prop: 'pageNextText',
                displayName: 'Page next button text',
                type: 'text',
                value: undefined,
                // objValue: true
            },  {
                prop: 'completeText',
                displayName: 'Complete button text',
                type: 'text',
                value: undefined,
                 // objValue: true
            }, {
                prop: 'showNavigationButtons',
                displayName: 'Show navigation buttons (default navigation)',
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'top',
                    displayName: 'Top'
                }, {
                    value: 'bottom',
                    displayName: 'Bottom'
                }, {
                    value: 'none',
                    displayName: 'none'
                }, {
                    value: 'both',
                    displayName: 'both'
                }]
            }, {
                prop: 'showPrevButton',
                displayName: 'Show previous button (user may return on previous page)',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'firstPageIsStarted',
                displayName: 'The first page in the survey is a started page.',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'showCompletedPage',
                displayName: 'Show the completed page at the end (completedHtml)',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'goNextPageAutomatic',
                displayName: 'On answering all questions, go to the next page automatically',
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'showProgressBar',
                displayName: 'Show progress bar',
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'off',
                    displayName: 'off'
                }, {
                    value: 'top',
                    displayName: 'Top'
                }, {
                    value: 'bottom',
                    displayName: 'Bottom'
                }, {
                    value: 'both',
                    displayName: 'both'
                }]
            }, {
                prop: 'isSinglePage',
                displayName: 'Show all elements on one page',
                type: 'checkbox',
                value: undefined,
            }
          ]
        },
        {
            prop: '',
            type: 'general',
            displayName: 'Question',
            value: [ {
                prop: 'questionTitleLocation',
                displayName: 'Question title location',
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'top',
                    displayName: 'Top'
                }, {
                    value: 'bottom',
                    displayName: 'Bottom'
                }, {
                    value: 'left',
                    displayName: 'left'
                }]
            }, {
                prop: 'requiredText',
                displayName: 'The question required symbol(s)',
                type: 'text',
                value: undefined,
            }, {
                prop: 'questionStartIndex',
                displayName: `Question start index (1, 2 or 'A', 'a')`,
                type: 'text',
                value: undefined,
            }, {
                prop: 'showQuestionNumbers',
                displayName: 'Show question numbers',
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'on',
                    displayName: 'on'
                }, {
                    value: 'onPage',
                    displayName: 'onPage'
                }, {
                    value: 'off',
                    displayName: 'off'
                }]
            }, {
                prop: 'questionTitleTemplate',
                displayName: `Question title template, default is: '{no}. {require} {title}'`,
                type: 'dropdown',
                value: undefined,
                // objValue: true
            }, {
                prop: 'questionErrorLocation',
                displayName: `Question error location`,
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'top',
                    displayName: 'top'
                }, {
                    value: 'bottom',
                    displayName: 'bottom'
                }]
            }, {
                prop: 'focusFirstQuestionAutomatic',
                displayName: `Focus first question on changing the page`,
                type: 'checkbox',
                value: undefined,
            }, {
                prop: 'questionsOrder',
                displayName: `Elements order on the page`,
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'random',
                    displayName: 'random'
                }, {
                    value: 'initial',
                    displayName: 'initial'
                }]
            }]
        }, {
            prop: 'completedHtml',
            displayName: 'Completed Html',
            type: 'textArea',
            value: undefined,
            // objValue: true
        },
        {
            prop: 'completedHtmlOnCondition',
            type: 'validators',
            displayName: 'Completed Html on Condition',
            value: undefined,
        },
        {
            prop: 'loadingHtml',
            displayName: 'Loading Html',
            type: 'textArea',
            value: undefined,
            // objValue: true
        },
        {
            prop: '',
            type: 'general',
            displayName: 'Timer/Quiz',
            value: [{
                    prop: 'maxTimeToFinish',
                    displayName: 'Maximum time to finish the survey',
                    type: 'number',
                    value: undefined,
                }, {
                prop: 'maxTimeToFinishPage',
                displayName: 'Maximum time to finish a page in the survey',
                type: 'number',
                value: undefined,
            }, {
                prop: 'showTimerPanel',
                displayName: `Show timer panel`,
                type: 'dropdown',
                value: undefined,
                values: [{
                    value: 'all',
                    displayName: 'all'
                }, {
                    value: 'page',
                    displayName: 'page'
                }, {
                    value: 'survey',
                    displayName: 'survey'
                }]
            }, ]
        }, {
            prop: 'triggers',
            type: 'validators',
            displayName: 'Triggers',
            value: undefined,
        },
    ]
};

export default surveyModalModel;
