import { IncomingHttpHeaders } from "http";
import { Logger } from "../logs/log.js";
import { RequestUrl } from "./request.js";
import { InvalidRequestException, MissingAuthenticationTokenException } from "./exceptions/request-exceptions.js";

export class RequestValidator {


    /**
     * Runs some validations(size, valid headers, valid content) on the given headers. 
     * 
     * @param headers 
     * @param url 
     * 
     * @returns true if the headers are valid, false otherwise
     */
    public static validateHeaders = (headers: IncomingHttpHeaders, url: string): boolean => {
        return this.validateReceivedHeaders(headers, url) 
            && this.validateHeadersSize(headers) 
            && this.validateHeadersContent(headers);
    }

    /**
     * Validates if the request's headers include the required ones.
     * Can be improved to check their actual content, ex: content-type only accepting json or files from forms.
     * 
     * @param headers 
     * 
     * @returns true if the contents are valid, false otherwise
     */
    private static validateReceivedHeaders = (headers: IncomingHttpHeaders, url: string): boolean => {
        // should be lower case for verifications
        const REQUIRED_HEADERS: string[] = ["host", "user-agent", "x-request-id", "accept"];
        const AUTHENTICATION_HEADER: string = "authentication"; // only authentication needed endpoints should require it

        const received_headers: string[] = Object.keys(headers).map(h => h.toLowerCase());
        // the required headers that were not received
        const missing_headers: string[] = REQUIRED_HEADERS.filter(header => !received_headers.includes(header)); 

        if (missing_headers.length > 0) {
            Logger.error(`A request with missing headers was received. Missing headers: ${missing_headers}`)    
            throw new InvalidRequestException();
        }
        
        const requestUrl: RequestUrl = new RequestUrl(url);
        
        // check if the request was not sent to a public endpoint
        // check if the received headers contain the authentication token
        if(!requestUrl.isPublic() && !received_headers.includes(AUTHENTICATION_HEADER)) {
            Logger.error(`The authentication token missing.`)   
            throw new MissingAuthenticationTokenException();
        }

        return true;
    }

    /**
     * An example of a asimple (not strict) way of validating headers size.
     * 
     * @param headers 
     * 
     * @returns true if valid, false otherwise
     */
    private static validateHeadersSize = (headers: {}): boolean => {
        const HEADER_LIMIT_IN_BITES: number = 8000; // 8Kb for example

        const enconder: TextEncoder = new TextEncoder(); // convert everything to UTF-8 
        // an example of bite counting (not so strict tho)
        const payload_header_size: number = enconder.encode(JSON.stringify(headers)).length;

        return HEADER_LIMIT_IN_BITES > payload_header_size;
    }

    private static validateHeadersContent = (header: {}): boolean => {
        return false;
    }

}
