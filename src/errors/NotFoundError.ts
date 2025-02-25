import { CustomError } from "../types/types";
import { ERROR_MESSAGES, RESPONSE_STATUS_CODES } from "../utils/constants";

export class NotFoundError extends Error implements CustomError {
    statusCode: number;

    constructor(message:string = ERROR_MESSAGES.NOT_FOUND){
        super(message);
        this.statusCode = RESPONSE_STATUS_CODES.NOT_FOUND;
    }
}