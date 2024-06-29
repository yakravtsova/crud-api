import { createServer, Server } from "http";

export const app = (): Server => {
    const server = createServer((req, res) => {
        console.log("url: ", req.url);
        console.log("method: ", req.method)
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.setHeader('Content-Type', 'application/json');
    
        res.end(JSON.stringify({"hello": "world"}));
    });
    return server;
}


