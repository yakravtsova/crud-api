import { IncomingMessage } from "http";
import { BooleanObject, CustomServerResponse, User } from "../types/types";
import { AGE, BASE_URL, CHECK_BASE_URL_REGEX, HOBBIES, REQUEST_METHODS, USERNAME } from "./constants";
import { NotFoundError } from "../errors/NotFoundError";
import { validate } from "uuid";
import { BadRequestError } from "../errors/BadRequestError";
import { createUser, deleteUserByIdResponse, getAllUsersResponse, getUserByIdResponse } from "../db/UsersDatabase";

const bodyParser = <T>(req: IncomingMessage): Promise<T> => {
    return new Promise((res, rej) => {
        let data: string = "";
        
        req.on("data", (chunk) => {
            data += chunk;
        });
    
        req.on("end", () => {
            try{
                const result: T = JSON.parse(data.toString())
                res(result);
            }
            catch(err) {
                rej(new Error())
            }
        })
        
    })
}

const isBodyValid = (body: object): boolean => {
    const isValid: BooleanObject = {};
    isValid[USERNAME] = (USERNAME in body) && (typeof body[USERNAME] === "string");
    isValid[AGE] = (AGE in body) && (typeof body[AGE] === "number");
    isValid[HOBBIES] = (HOBBIES in body) && Array.isArray(body[HOBBIES]) && body[HOBBIES].every((item) => typeof item === "string");
    const result = Object.values(isValid).reduce((acc: boolean, value: boolean): boolean => acc && value, true);
    if (result) return result;
    else {
        const arrayOfWrongProperties = [];
        for (const [key, value] of Object.entries(isValid)) {
            if (!value) arrayOfWrongProperties.push(key)
          }
        throw new BadRequestError(arrayOfWrongProperties.length > 0 ? `Missing value or invalid type at ${arrayOfWrongProperties.join(", ")}` : "Body object is invalid")
    }
}

export const handlerRequest = async(req: IncomingMessage): Promise<CustomServerResponse> => {
    let response: CustomServerResponse;
    const {url, method} = req;
    console.log("url: ", url);
    console.log("method: ", method)
    if (CHECK_BASE_URL_REGEX.test(url)) {
        if (url === BASE_URL) {
            if (method === REQUEST_METHODS.GET) {
                response = getAllUsersResponse()
            } 
            else if (method === REQUEST_METHODS.POST) {
                const body = await bodyParser<User>(req); 
                if (isBodyValid(body)) {
                    response = createUser(body)
                }
            } else throw new NotFoundError();
        } else {
            const supposedUserUUID = url.split("/")[3]
            if (validate(supposedUserUUID)) {
                switch (method) {
                    case REQUEST_METHODS.GET: {
                        response = getUserByIdResponse(supposedUserUUID);
                        break;
                    }
                    case REQUEST_METHODS.DELETE: {
                        response = deleteUserByIdResponse(supposedUserUUID);
                        break;
                    }
                    default: throw new NotFoundError()
                }
            } else throw new BadRequestError()
        }
    } else throw new NotFoundError()
    return response;
}