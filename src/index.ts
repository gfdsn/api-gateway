import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { Logger } from './logs/log.js';
import { LogRequest } from './logs/log.types.js';
import { Services } from './endpoints.js';
import { Request } from './requests/request.types.js';
import { RequestHandler } from './requests/request.js';
import { InvalidRequestException } from './requests/exceptions/request-exceptions.js';
import { RequestValidator } from './requests/request-validator.js';

const PORT: number = Number(process.env.SERVER_PORT) ?? 3000

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {
    
    // TODO: get the request body and send it if it is a POST request
    // TODO: check for possible errors and log them
    // TODO: implement a DEBUG mode
    // TODO: Rate-Limiter

    const {method, url, headers} = req
     
    // verify that the url is in the allowed endpoints
    if (!RequestHandler.verifyUrl(url)) {
        res.writeHead(404)
        res.end()
        return;
    }

    // @ts-ignore (url verified above)
    RequestValidator.validateHeadersContent(headers, url);

    // parse the incoming request into a normalized Request
    try {
        const request: Request = RequestHandler.parse(req);
        const service: string = request.service

        if (process.env.DEBUG) console.log(method + " " + request.target)

        // TODO: forward the request to the respective service
        return res.end(JSON.stringify({
            service: `${service} service`
        }))
    } catch (err) {
        if (err instanceof InvalidRequestException) console.log("Invalid request.");
        else console.log("Some error occured.")
    }

    // TODO: handle errors and log them
    // TODO: should be logged once the service answers 
    // Logger.log(requestData, 'Request', Services.USERS_SERVICE);

    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({
        data: 'Bomboklat abc'
    }))
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Server listening on PORT: http://0.0.0.0:${PORT}`);
});
