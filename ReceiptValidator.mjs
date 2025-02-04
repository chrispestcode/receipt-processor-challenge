export const receiptPostvalidator =  {
    retailer: {
        isString: {
            errorMessage: 'Bad request: <retailer> must be a string',
        },
        notEmpty: {
            errorMessage: 'Bad request: <retailer> cannot be empty',
        },
        matches: {
            options: "^[\\w\\s\\-&]+$",
            errorMessage: 'Bad request: <retailer> must contain only letters, numbers, spaces, hyphens, and ampersands',
        },
    },
    purchaseDate: {
        isString: {
            errorMessage: 'Bad request: <purchaseDate> must be a string',
        },
        notEmpty: {
            errorMessage: 'Bad request: <purchaseDate> cannot be empty',
        },
        isDate: {
            errorMessage: 'Bad request: <purchaseDate> must be a valid date in format: YYYY-MM-DD',
        }
    },
    purchaseTime: {
        isString: {
            errorMessage: 'Bad request: <purchaseTime> must be a string',
        },
        notEmpty: {
            errorMessage: 'Bad request: <purchaseTime> cannot be empty',
        },
        isTime: {
            errorMessage: 'Bad request: <purchaseTime> must be a valid time in format: HH:MM',
        },
    },
    items: {
        isArray: { 
            errorMessage: 'Bad request: <items> must be an array and have at least one item',
            options: {
                min: 1,
            }
        },
    },
    total: {
        notEmpty: {
            errorMessage: 'Bad request: <total> cannot be empty',
        },
        matches: {
            options: "^\\d+\\.\\d{2}$",
            errorMessage: 'Bad request: <total> must be a positive number with two decimal places',
        },
    },
}

export const receiptGetValidator = {
    id: {
        in: ['params'],
        notEmpty: {
            errorMessage: 'Bad request: <id> cannot be empty',
        },
        matches: {
            options: "^[\\w\\-]+$",
            errorMessage: 'Bad request: <id> must be a valid string with only letters, numbers, and hyphens',
        },
    },
}