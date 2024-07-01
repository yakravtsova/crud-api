import { IncomingMessage, ServerResponse } from "http";
import { BooleanObject, CustomServerResponse, User } from "../types/types";
import { AGE, BASE_URL, CHECK_BASE_URL_REGEX, HOBBIES, REQUEST_METHODS, RESPONSE_STATUS_CODES, USERNAME } from "./constants";
import { NotFoundError } from "../errors/NotFoundError";
import { validate } from "uuid";
import { BadRequestError } from "../errors/BadRequestError";
import { createUser, getAllUsersResponse } from "../db/UsersDatabase";

const bodyParser = (req: IncomingMessage) => {
    return new Promise((res, rej) => {
        let data: string = "";
        
        req.on("data", (chunk) => {
            data += chunk;
        });
    
        req.on("end", () => {
            try{
                const result = JSON.parse(data.toString())
                res(result);}
                catch(err) {
                rej(new Error())
            }
        })
        
    })
}

const isBodyValid = (body: any): boolean => {
    const isValid: BooleanObject = {};
    isValid[USERNAME] = (USERNAME in body) && (typeof body[USERNAME] === "string");
    isValid[AGE] = (AGE in body) && (typeof body[AGE] === "number");
    isValid[HOBBIES] = (HOBBIES in body) && Array.isArray(body[HOBBIES]) && body[HOBBIES].every((item: any) => typeof item === "string");
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

export const handlerRequest = async(req: IncomingMessage, res: ServerResponse): Promise<CustomServerResponse> => {
    let response: CustomServerResponse;
    const {url, method} = req;
    console.log("url: ", url);
    console.log("method: ", method)
    try {
        if (CHECK_BASE_URL_REGEX.test(url)) {
            if (url === BASE_URL) {
                if (method === REQUEST_METHODS.GET) {
                    response = getAllUsersResponse()
                } 
                if (method === REQUEST_METHODS.POST) {
                    const body: any = await bodyParser(req);
                    if (isBodyValid(body)) {
                        response = createUser(body)
                    }
                }
            } else {
                const supposedUserUUID = url.split("/")[3]
                if (validate(supposedUserUUID)) {
                    console.log("valid")
                } else throw new BadRequestError()
            }
        } else throw new NotFoundError()
    }
    catch(err) {throw err}
    return response;
}