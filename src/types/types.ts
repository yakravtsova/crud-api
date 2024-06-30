export interface User {
    id?: string;
    username: string;
    age: number;
    hobbies: string[];

}

export interface CustomServerResponse {
    data: string;
    statusCode: number;
}

export interface CustomError extends Error {
    statusCode: number;
}