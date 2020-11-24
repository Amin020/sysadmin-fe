
// const SurveyDefault = require('../../../../../libFile/survey');
// const Survey = SurveyDefault.default;
// import * as $ from 'jquery';


const customWidgets = {
    name: 'Custom Widgets',
    toolBoxItems: [
        {
            icon: "fa fa-tags",
            text: 'tagbox',
            isRequired: true,
            choicesByUrl: { url: "https://restcountries.eu/rest/v2/all" },
            placeholder: "Choose...",
            title: "Please select all countries you have been for the last 3 years.",
            type: "tagbox",
        },
        {
            icon: "fa fa-caret-square-o-down",
            text: 'dropdown',
            isRequired: true,
            renderAs: "select2",
            choicesByUrl: { url: "https://restcountries.eu/rest/v2/all" },
            title: "Please select all countries you have been for the last 3 years.",
            type: "dropdown",
        },
        {
            icon: "fa fa-dropbox",
            text: 'sortablelist',
            type: "sortablelist",
            title: "Life Priorities ",
            isRequired: true,
            colCount: 0,
            choices: ["family", "work", "pets", "travels", "games"],
        },
        {
            icon: "fa fa-calendar",
            text: 'datepicker',
            type: "datepicker",
            inputType: "date",
            title: "Your favorite date:",
            dateFormat: "mm/dd/yy",
            isRequired: true
        },
        {
            icon: "fa fa-check-circle-o",
            text: 'radiogroup',
            type: "radiogroup",
            title: "Choose job position...",
            isRequired: true,
            colCount: 0,
            renderAs: "prettycheckbox",
            choices: ["1|Designer", "2|Front-end Developer", "3|Back-end Developer", "4|Database Administrator", "5|System Engineer"]
        },
        {
            icon: "fa fa-font",
            text: 'editor',
            type: "editor",
            name: "editor1",
            title: "CK Editor"
        },
        {
            icon: "fa fa-star",
            text: 'barrating',
            type: 'barrating',
            ratingTheme: "fontawesome-stars",
            title: "Please rate the movie you've just watched",
            choices: ["1", "2", "3", "4", "5"]
        },
        {
            text: 'Image picker',
            icon: 'fa fa-image',
            type: 'imagepicker',//imagepicker-multiple
            showLabel:true,
            choices: [
                {
                    value: "lion",
                    imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg"
                },
                {
                    value: "giraffe",
                    imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg"
                },
                {
                    value: "panda",
                    imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg"
                },
                {
                    value: "camel",
                    imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg"
                }
            ]
        },
        {
            text: 'Image Multi Selection',
            icon: 'fa fa-image',
            type: 'imagepicker',//imagepicker-multiple
            multiSelect:true,
            showLabel:true,
            choices: [
                {
                    value: "lion",
                    imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/lion.jpg"
                },
                {
                    value: "giraffe",
                    imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/giraffe.jpg"
                },
                {
                    value: "panda",
                    imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/panda.jpg"
                },
                {
                    value: "camel",
                    imageLink: "https://surveyjs.io/Content/Images/examples/image-picker/camel.jpg"
                }
            ]
        },
        {
            type: "emotionsratings",
            text: "emotionsratings",
            icon: "fa fa-smile-o",
            title: "Please rate the movie you've just watched",
            choices: [{ text: "angry", value: '1' }, { text: "disappointed", value: '2' }, { text: "meh", value: '3' }, { text: 'happy', value: '4' }, { text: 'inLove', value: '5' }],
            emotionSize: 50,
            emotions: ['angry', 'disappointed', 'meh', 'happy', 'inLove'],
            emotionsCount: 5,
            bgEmotion: 'happy',
        },
        {
            type: "emotionsratings",
            text: "thumbs",
            icon: "fa fa-thumbs-up",
            title: "Please rate the movie you've just watched",
            choices: ["1", "2"],
            emotionSize: 50,
            bgEmotion: 'like',
            count: 2,
            ratingCode: 2,
            emotions: ['like', 'dislike'],
            emotionsCount: 2
        },
        {
            icon: "fa fa-sliders",
            text: 'bootstrapslider',
            type: "bootstrapslider",
            step: 50,
            rangeMin: 100,
            rangeMax: 1000
        },
        {
            icon: "fa fa-sliders",
            text: 'nouislider',
            "type": "nouislider",
            "title": "Please range"
        },
        {
            icon: "fa fa-pencil-square",
            text: 'signaturepad',
            type: "signaturepad",
            title: "Please enter your signature"
        },
        {
            icon: 'fa fa-free-code-camp',
            text: 'matrix',
            type: "matrix",
            title:
                "Please indicate if you agree or disagree with the following statements",
            columns: [
                {
                    value: "Strongly Disagree",
                    text: "Strongly Disagree"
                },
                {
                    value: "Disagree",
                    text: "Disagree"
                },
                {
                    value: "Neutral",
                    text: "Neutral"
                },
                {
                    value: "Agree",
                    text: "Agree"
                },
                {
                    value: "Strongly Agree",
                    text: "Strongly Agree"
                }
            ],
            rows: [
                {
                    value: "affordable",
                    text: "Product is affordable"
                },
                {
                    value: "does what it claims",
                    text: "Product does what it claims"
                },
                {
                    value: "better then others",
                    text: "Product is better than other products on the market"
                },
                {
                    value: "easy to use",
                    text: "Product is easy to use"
                }
            ]
        },
        // {
        //     icon: 'fa fa-text-width',
        //     text: 'rating',
        //     type: "rating",
        //     name: "satisfaction",
        //     title: "How satisfied are you with the Product?",
        //     mininumRateDescription: "Not Satisfied",
        //     maximumRateDescription: "Completely satisfied"
        // },
        // {
        //     icon: 'fa fa-text-width',
        //     text: 'rating',
        //     type: "rating",
        //     name: "recommend friends",
        //     visibleIf: "{satisfaction} > 3",
        //     title:
        //         "How likely are you to recommend the Product to a friend or co-worker?",
        //     mininumRateDescription: "Will not recommend",
        //     maximumRateDescription: "I will recommend"
        // },
        // {
        //     icon: 'fa fa-text-width',
        //     text: 'comment',
        //     type: "comment",
        //     name: "suggestions",
        //     title: "What would make you more satisfied with the Product?"
        // },
        {
            icon: 'fa fa-usd',
            text: 'price to competitors',
            type: "radiogroup",
            title: "Compared to our competitors, do you feel the Product is",
            choices: [
                "Less expensive",
                "Priced about the same",
                "More expensive",
                "Not sure"
            ]
        },
        {
            icon: 'fa fa-usd',
            text: 'price',
            type: "radiogroup",
            title: "Do you feel our current price is merited by our product?",
            choices: [
                "correct|Yes, the price is about right",
                "low|No, the price is too low for your product",
                "high|No, the price is too high for your product"
            ]
        },
        {
            text: 'multipletext',
            type: "multipletext",
            icon: 'fa fa-file-text',
            title: "What is the... ",
            items: [
                {
                    name: "mostamount",
                    title: "Most amount you would every pay for a product like ours"
                },
                {
                    name: "leastamount",
                    title: "The least amount you would feel comfortable paying"
                }
            ]
        }, {
            icon: "fa fa-check-circle-o",
            text: 'prettycheckbox',
            type: "checkbox",
            title: "What car are you driving?",
            isRequired: true,
            colCount: 4,
            choices: [
                "None",
                "Ford",
                "Vauxhall",
                "Volkswagen",
                "Nissan",
                "Audi",
                "Mercedes-Benz",
                "BMW",
                "Peugeot",
                "Toyota",
                "Citroen"
            ],
            renderAs: "prettycheckbox"
        },
        {
            "type": "paneldynamic",
            "name": "items",
            "title": "Items",
            "text": 'expression calculation',
            "icon": 'fa  fa-newspaper-o',
            "keyName": "name",
            "showQuestionNumbers": "none",
            "templateTitle": "item #{panelIndex}",
            "templateElements": [
                {
                    "type": "text",
                    "name": "name",
                    "title": "Name:",
                    "isRequired": true
                }, {
                    "type": "text",
                    "name": "cost",
                    "inputType": "number",
                    "title": "Item Cost:",
                    "isRequired": true,
                    "startWithNewLine": false
                }, {
                    "type": "text",
                    "name": "vendor",
                    "title": "Vendor:",
                    "isRequired": true
                }, {
                    "type": "text",
                    "name": "quantity",
                    "inputType": "number",
                    "title": "Quantity:",
                    "isRequired": true,
                    "startWithNewLine": false
                }, {
                    "type": "text",
                    "name": "link",
                    "title": "Link:",
                    "isRequired": true
                }, {
                    "type": "expression",
                    "name": "total",
                    "title": "Total Item Cost:",
                    "expression": "{panel.cost} * {panel.quantity}",
                    "displayStyle": "currency",
                    "currency": "EUR",
                    "startWithNewLine": false
                }
            ],
            "minPanelCount": 1,
            "panelAddText": "Add another  item",
            "panelRemoveText": "Remove item"
        }, {
            "type": "panel",
            "title": "Totals",
            "elements": [
                {
                    "type": "expression",
                    "name": "totalQuantity",
                    "title": "Total  Quantity:",
                    "expression": "sumInArray({items}, 'quantity'"
                }, {
                    "type": "expression",
                    "name": "totalCost",
                    "title": "Total Cost:",
                    "expression": "sumInArray({items}, 'total'",
                    "displayStyle": "currency",
                    "currency": "EUR",
                    "startWithNewLine": false
                }
            ]
        }
    ]
};
export default customWidgets;