
export default {
    'items.*.shortDescription': {
        isString: {
            errorMessage: 'Bad request: <items.*.shortDescription> must be a string',
        },
        notEmpty: {
            errorMessage: 'Bad request: <items.*.shortDescription> cannot be empty',
        },
        matches: {
            options: "^[\\w\\s\\-]+$",
            errorMessage: 'Bad request: <items.*.shortDescription> must contain only letters, numbers, spaces, and hyphens',
        },
    },
    'items.*.price': {
        isFloat: {
            errorMessage: 'Bad request: <items.*.price> must be a number',
        },
        notEmpty: {
            errorMessage: 'Bad request: <items.*.price> cannot be empty',
        },
        matches: {
            options: "^\\d+\\.\\d{2}$",
            errorMessage: 'Bad request: <items.*.price> must be a positive number with two decimal places',
        },
    }
}