
// new CustomError(400, 'Wrong Credentials')
export default class CustomError extends Error {

    constructor(statusCode = 500, message = 'Error') {

        super(message) // it's like new Error()
        this.statusCode = statusCode
    }
}