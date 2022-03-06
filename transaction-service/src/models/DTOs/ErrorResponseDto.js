module.exports= class ErrorResponseDto {
    constructor(errorCode, message){
        this.errorCode= errorCode;
        this.message= message;
    }
}