export class BaseError extends Error {
    public baseErrorMessage: string;
    public baseErrorStatus : number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.baseErrorMessage = message;
        this.baseErrorStatus = statusCode;
        Object.setPrototypeOf(this, new.target.prototype);
    }
}