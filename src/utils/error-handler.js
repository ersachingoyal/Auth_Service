//we will create the class here for handling our errors

const { StatusCodes } = require('http-status-codes');

class AppErrors extends Error {  //this error class is the inbuilt one
    constructor(
        name = 'AppError',
        message = 'Something went wrong',
        explanation = 'Something went wrong',
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR
    ){
        super();
        this.message = message,
        this.explanation = explanation,
        this.name = name,
        this.statusCode = statusCode
    }

}

module.exports = AppErrors;