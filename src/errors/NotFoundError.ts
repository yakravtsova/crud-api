import { CustomError } from "../types/types";

export class NotFoundError extends Error implements CustomError {
    statusCode: number;

    constructor(message:string){
        super(message);
        this.statusCode = 404;
    }
}