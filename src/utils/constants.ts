export const CHECK_BASE_URL_REGEX = new RegExp(/^\/api\/users(?:\/[^\/]+)?$/);
export const BASE_URL = "/api/users";

export enum RESPONSE_STATUS_CODES {
    OK = 200,
    CREATED = 201,
    NO_CONTENT = 204,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500
  }

export enum REQUEST_METHODS {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}

export enum ERROR_MESSAGES {
    NOT_FOUND = "The server cannot find the requested resource.",
    INTERNAL_SERVER_ERROR = "Internal Server Error.",
    INVALID_UUID = "Invalid user ID."
}

export const USERNAME = "username";
export const AGE = "age";
export const HOBBIES = "hobbies";