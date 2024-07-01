import { ServerResponse } from "http";
import { CustomServerResponse, User } from "../types/types";
import { RESPONSE_STATUS_CODES } from "../utils/constants";
import { v4 as uuidv4 } from 'uuid';

export const users: User[] = [];

export const getAllUsersResponse = () : CustomServerResponse => {
    return {
        data: JSON.stringify({users}),
        statusCode: RESPONSE_STATUS_CODES.OK
    }
}

export const createUser = (user: User) : CustomServerResponse => {
    const userObject: User = {
        ...user, id: uuidv4()
    }
    users.push(userObject);
    return {
        data: JSON.stringify({user}),
        statusCode: RESPONSE_STATUS_CODES.CREATED
    }
}