import http, { IncomingMessage, Server, ServerResponse } from 'http';
import ip from 'ip';
import { Logger } from './logs/log.js';
import { LogFiles, LogLevels, LogRequest } from './logs/log.types.js';
import { Services } from './types/endpoints.js';

const PORT: number = Number(process.env.SERVER_PORT) ?? 3000

const server: Server = http.createServer((req: IncomingMessage ,res: ServerResponse) => {

    // TODO: check for 404

    const {method, url, headers} = req
    const service: string|undefined = url?.slice(1, url.indexOf("/", 2))

    const log_request: LogRequest = {
        user_id: "abcdef",
        agent: headers["user-agent"],
        status: 200,
        target: "'" + method + " " + url + "'"
    }

    const client: string|undefined = ip.address()

    if (method === 'GET' && service === Services.USERS_SERVICE){

        // TODO: handle errors and log them

        Logger.log({
            request: log_request,
            client: client,
            file: LogFiles.REQUESTS,
            message: 'Received some request to users service', 
            service: Services.USERS_SERVICE,
            level: LogLevels.INFO
        });

        return res.end(JSON.stringify({
            service: 'Users service'
        }))
    }

    if (method === 'GET' && service === Services.PRODUCTS_SERVICE){
        return res.end(JSON.stringify({
            service: 'Products service'
        }))
    }

    if (method === 'GET' && service === Services.ORDERS_SERVICE){
        return res.end(JSON.stringify({
            service: 'Orders service'
        }))
    }

    if (method === 'GET' && service === Services.INVOICES_SERVICE){
        return res.end(JSON.stringify({
            service: 'Invoices service'
        }))
    }

    res.writeHead(200, {'Content-Type': 'application/json'})

    res.end(JSON.stringify({
        data: 'Bomboklat'
    }))
});

server.listen(PORT, () => {
    console.log('Server listening on PORT: http://localhost:' + PORT)
})
