import { IncomingMessage, ServerResponse } from "http";
import { CustomServerResponse } from "../types/types";
import { CHECK_BASE_URL_REGEX } from "./constants";
import { NotFoundError } from "../errors/NotFoundError";

export const handlerRequest = async(req: IncomingMessage, res: ServerResponse): Promise<CustomServerResponse> => {
    let response: CustomServerResponse;
    const {url, method} = req;
    try {
        if (CHECK_BASE_URL_REGEX.test(url)) {
            console.log("url: ", url);
            console.log("method: ", method)
            response = {
                statusCode: 200,
                data: JSON.stringify({hello: "world"})
            }
        } else throw new NotFoundError("Not found")
    }
    catch(err) {throw err}

    return response;
}