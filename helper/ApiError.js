

class ApiError{

    //this is helper class for error handling
    constructor(statusCode, message = "Something wrong on the server", errors = [], stack = "") {

        this.statusCode=statusCode
        this.message=message
        this.errors=errors
        
        this.data=null
        this.success=false

        if (stack) {
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }
     }


}

module.exports =ApiError