import { CustomError } from "../types/types";
import { ERROR_MESSAGES, RESPONSE_STATUS_CODES } from "../utils/constants";

export class BadRequestError extends Error implements CustomError {
    statusCode: number;

    constructor(message:string = ERROR_MESSAGES.INVALID_UUID){
        super(message);
        this.statusCode = RESPONSE_STATUS_CODES.NOT_FOUND;
    }
}