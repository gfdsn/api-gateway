import http, { IncomingMessage, Server, ServerResponse } from 'http';
import ip from 'ip';
import { Logger } from './logs/log.js';
import { LogRequest } from './logs/log.types.js';
import { Services } from './types/endpoints.js';

const PORT: number = Number(process.env.SERVER_PORT) ?? 3000

const server: Server = http.createServer((req: IncomingMessage, res: ServerResponse) => {

    // TODO: check for 404
    const {method, url, headers} = req

    // TODO: may the service be undefined? 
    const service: string|undefined = url?.slice(1, url.indexOf("/", 2))

    // TODO: default some Request to set here as the type
    const requestData: LogRequest = { 
        user_id: "abcdef", 
        agent: headers["user-agent"] ?? "", 
        status: 200, target: "'" + method + " " + url + "'", 
        client: ip.address() 
    }

    if (method === 'GET' && service === Services.USERS_SERVICE){

        // TODO: handle errors and log them
        Logger.log(requestData, 'Received some request to users service', Services.USERS_SERVICE);

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
