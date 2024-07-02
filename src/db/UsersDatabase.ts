import { NotFoundError } from "../errors/NotFoundError";
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
        data: JSON.stringify({user: {...userObject}}),
        statusCode: RESPONSE_STATUS_CODES.CREATED
    }
}

export const findUserById = (id: string): User => {
    const user = users.find((user) => user.id === id);
    if (user) return user;
    else throw new NotFoundError(`User with id ${id} not found`);
}

export const getUserByIdResponse = (id: string) : CustomServerResponse => {
    const user = findUserById(id);
    return {
        data: JSON.stringify({user}),
        statusCode: RESPONSE_STATUS_CODES.OK
    }
}