

const equationQuestionOperators: {
    key: string,
    value: string,
    disableInput: boolean
}[] = [
        {
            key: 'is empty',
            value: 'empty',
            disableInput: true
        },
        {
            key: 'is not empty',
            value: 'notempty',
            disableInput: true
        },
        {
            key: 'equals',
            value: '=',
            disableInput: false
        },
        {
            key: 'not equals',
            value: '<>',
            disableInput: false
        },
        {
            key: 'contains',
            value: 'contains',
            disableInput: false
        },
        {
            key: 'not contains',
            value: 'not contains',
            disableInput: false
        },
        {
            key: 'greater',
            value: '>',
            disableInput: false
        },
        {
            key: 'less',
            value: '<',
            disableInput: false
        },
        {
            key: 'greater or equals',
            value: '>=',
            disableInput: false
        },
        {
            key: 'less or equals',
            value: '<=',
            disableInput: false
        },
    ];

export default equationQuestionOperators;
