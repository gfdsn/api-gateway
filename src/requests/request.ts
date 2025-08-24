import { IncomingHttpHeaders, IncomingMessage } from "http";
import { Services } from "../endpoints.js";
import { Logger } from "../logs/log.js";
import { Request } from "../requests/request.types.js";
import { InvalidRequestException } from "./exceptions/request-exceptions.js";
import { RequestValidator } from "./request-validator.js";

export class RequestHandler extends RequestValidator {

    /**
     * Parses IncomingMessage to a simplified Request object to be sent to the services.
     * 
     * @param parsableRequest 
     * 
     * @returns Request  
     */
    public static parse = (request: IncomingMessage): Request => {
        const { method, url } = request;

        // checks if there's actually some method and url in the request
        if (!method || !url) {
            Logger.error("The received method or url is invalid.");
            throw new InvalidRequestException();
        }

        // TODO: check the method and if POST build the body

        return {
            service: this.getServiceFromUrl(url),
            data: {
                email: "email",
                password: "password"
            },
            metadata: {
                request_id: "R123-456",
                timestamp: new Date()
            },
            method: method||"",
            target: new RequestUrl(url)
        };
    }

    /**
     * Validates the contents (Content-Type, Size, Headers, ...) of the request
     * 
     * @param request 
     * 
     * @returns true if valid and false if not
     */
    public static validate = (headers: IncomingHttpHeaders, url: string): boolean => {
    
        // using RequestValidator for more readabilty
        return false;
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
            // creates a type with all the Services enum's values
            type ServicesValues = `${Services}`

            // creates an array with the all values from Services enum "stringified" 
            const url_whitelist: ServicesValues[] = Object.values<ServicesValues>(Services)

            const service = this.getServiceFromUrl(url)

            return url_whitelist.includes(service as ServicesValues);
        }
        return false;
    }

    /**
     * Gets the destination service from the request url
     * 
     * @param url 
     * 
     * @returns string 
     */
    private static getServiceFromUrl = (url: string): string => {
        const url_params: string[] = url.split("/").filter(val => val != "")
        return url_params[0]
    }

}

export class RequestUrl {
    // http:localhost:3000/service/operation/...

    private baseUrl: string;
    private service: string;
    private operation: string;
    
    constructor(url: string) {
        this.baseUrl = url;
        this.service = url.split("/").filter(val => val != "")[0];
        this.operation = url.split("/").filter(val => val != "")[1] ?? "";
    }

    /**
     * 
     * @returns the base url from the request.
     */
    public getBaseUrl(): string {return this.baseUrl}

    /**
     * 
     * @returns the retrieved service from the url.
     */
    public getService(): string {return this.service}

    /**
     * 
     * @returns the retrived operation from the url.
     */
    public getOperation(): string {return this.operation}

    /**
     * 
     * @returns true if the operation is public, false otherwise
     */
    public isPublic(): boolean {return this.operation === 'public'}

}

