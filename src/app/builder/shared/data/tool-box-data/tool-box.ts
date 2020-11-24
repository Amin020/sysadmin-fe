// import ToolBoxModel from '../../models/tool-box-models/tool-box-model';

const toolBox = {
    name: 'ToolBox',
    toolBoxItems: [{
        id: 0,
        text: 'Single Input',
        icon: 'fa fa-text-width',
        type: 'text',
    }, {
        id: 1,
        text: 'Checkbox',
        icon: 'fa fa-check-square',
        type: 'checkbox',
        choices: [{ value: "item1", text: "item1" }, { value: "item2", text: "item2" }, { value: "item3", text: "item3" }]
    }, {
        id: 2,
        text: 'Radio Group',
        icon: 'fa fa-list-ul',
        type: 'radiogroup',
        choices: [{ value: "item1", text: "item1" }, { value: "item2", text: "item2" }, { value: "item3", text: "item3" }]
    }, {
        id: 3,
        text: 'Dropdown',
        icon: 'fa fa-caret-down',
        type: 'dropdown',
        choices: [{ value: "item1", text: "item1" }, { value: "item2", text: "item2" }, { value: "item3", text: "item3" }]
    }, {
        id: 4,
        text: 'Comment',
        icon: 'fa fa-commenting',
        type: 'comment',
    }, {
        id: 5,
        text: 'Rating',
        icon: 'fa fa-star',
        type: 'rating',
    }, {
        id: 7,
        text: 'Boolean',
        icon: 'fa fa-check-square-o',
        type: 'boolean',
    }, {
        id: 8,
        text: 'Html',
        icon: 'fa fa-file-code-o',
        type: 'html',
    }, {
        id: 9,
        text: 'Expression',
        icon: 'fa  fa-newspaper-o',
        type: 'expression',
    }, {
        id: 10,
        text: 'File',
        icon: 'fa fa-file',
        type: 'file',
        storeDataAsText: false,
        showPreview: true,
        imageWidth: 150,
        maxSize: 102400
    }, {
        id: 11,
        text: 'Matrix (single choice)',
        icon: 'fa fa-free-code-camp',
        type: 'matrix',
        columns: [
            {
                value: "Column 1",
                text: "col1"
            },
            {
                value: "Column 2",
                text: "col2"
            },
            {
                value: "Column 3",
                text: "col3"
            }
        ],
        rows: [
            {
                value: "Row 1",
                text: "row1"
            },
            {
                value: "Row 2",
                text: "row2"
            },
        ]
    }, {
        id: 12,
        text: 'Matrix (multiple choice)',
        icon: 'fa fa-free-code-camp',
        type: 'matrixdropdown',
        columns: [
            {
                name: "Column 1",
                title: 'Column 1'
            },
            {
                name: "Column 2",
                title: 'Column 2'
            },
            {
                name: "Column 3",
                title: 'Column 3'
            }
        ],
        choices: [
            1,
            2,
            3,
            4,
            5
        ],
        rows: [
            "Row 1",
            "Row 2"
        ]
    }, {
        id: 13,
        text: 'Matrix (dynamic rows)',
        icon: 'fa fa-free-code-camp',
        type: 'matrixdynamic',
        columns: [
            {
                name: "Column 1"
            },
            {
                name: "Column 2"
            },
            {
                name: "Column 3"
            }
        ],
        choices: [
            1,
            2,
            3,
            4,
            5
        ]
    }, {
        id: 14,
        text: 'Multiple Text',
        icon: 'fa fa-file-text',
        type: 'multipletext',
        items: [
            {
                name: "text1",
                title: "Most amount you would every pay for a product like ours"
            },
            {
                name: "text2",
                title: "The least amount you would feel comfortable paying"
            }
        ]
    },
    {
        id: 15,
        text: 'Panel',
        icon: 'fa fa-file-text',
        type: 'panel',
    },
    {
        id: 16,
        text: 'Panel (dynamic panels)',
        icon: 'fa fa-file-text-o',
        type: 'paneldynamic',
    },
    // {
    //     id: 17,
    //     icon: "fa fa-pencil-square",
    //     text: 'signaturepad',
    //     "name": "signature",
    //     type: "signaturepad",
    //     title: "Please enter your signature"
    // }
    ]
};

export default toolBox;
