import { IncomingMessage } from "http";
import { Request } from "./types/request.js";
import { Logger } from "./logs/log.js";
import { Services } from "./types/endpoints.js";

export class RequestHandler {

    /**
     * Parses IncomingMessage to a simplified Request object to be sent to the services.
     * 
     * @param parsableRequest 
     * 
     * @returns Request  
     */
    public static parse = (parsableRequest: IncomingMessage): Request => {
        const { method, url } = parsableRequest;

        if (!method || !url) {
            Logger.error(); // TODO: error that
            throw new Error("The sent request is invalid.")
        }

        return {
            data: {
                email: "email",
                password: "password"
            },
            metadata: {
                request_id: "R123-456",
                timestamp: new Date()
            },
            method: method,
            target: url
        };
    }

    /**
     * Verifies if the request sent url is in the "whitelist" of endpoints.
     * 
     * @param url 
     * 
     * @returns boolean
     */
    public static verifyUrl = (url: string|undefined): boolean => {
        if (url) {
            type ServicesValues = `${Services}`
            const url_whitelist: ServicesValues[] = Object.values<ServicesValues>(Services)
            const service = url.slice(1, url.indexOf("/", 2))
    
            return url_whitelist.includes(service as ServicesValues);
        }
        return false;
    }

}