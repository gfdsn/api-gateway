import http, { IncomingMessage, Server, ServerResponse } from 'http';
import { LOG_FILES, LOG_LEVELS } from './logs/log-types.js';
import { writeLog } from './logs/log.js';
import { SERVICES } from './types/endpoints.js';

const PORT: number = Number(process.env.SERVER_PORT) ?? 3000

const server: Server = http.createServer((req: IncomingMessage ,res: ServerResponse) => {

    // TODO: check for 404

    const {method, url} = req
    const service: string|undefined = url?.slice(1, url.indexOf("/", 2))

    if (method === 'GET' && service === SERVICES.USERS_SERVICE){

        // TODO: handle errors and log them

        writeLog({
            file: LOG_FILES.REQUESTS, 
            content: 'Received some request to users service', 
            level: LOG_LEVELS.INFO, 
            service: SERVICES.USERS_SERVICE
        });

        return res.end(JSON.stringify({
            service: 'Users service'
        }))
    }

    if (method === 'GET' && service === SERVICES.PRODUCTS_SERVICE){
        return res.end(JSON.stringify({
            service: 'Products service'
        }))
    }

    if (method === 'GET' && service === SERVICES.ORDERS_SERVICE){
        return res.end(JSON.stringify({
            service: 'Orders service'
        }))
    }

    if (method === 'GET' && service === SERVICES.INVOICES_SERVICE){
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
