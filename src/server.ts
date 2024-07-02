import { createServer, Server } from "http";
import { handlerRequest } from "./utils/functions";
import { CustomServerResponse } from "./types/types";
import { errorHandler } from "./errors/errorHandler";

export const app = (): Server => {
    const server = createServer(async(req, res) => {
        try {
            res.setHeader('Content-Type', 'application/json');
            const serverResponse:CustomServerResponse = await handlerRequest(req);
            res.statusCode = serverResponse.statusCode;
            res.end(serverResponse.data);
        }
        catch(err) {errorHandler(err, res)}
    });
    return server;
}


