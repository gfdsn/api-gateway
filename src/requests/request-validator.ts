import { IncomingHttpHeaders } from "http";
import { Logger } from "../logs/log.js";

export class RequestValidator {

    // TODO: change to private
    /**
     * Validates if the request's headers include the required ones.
     * Can be improved to check their actual content, ex: content-type only accepting json or files from forms.
     * 
     * @param headers 
     * 
     * @returns true if the contents are valid, false otherwise
     */
    public static validateHeadersContent = (headers: IncomingHttpHeaders, url: string): boolean => {
        // should be lower case for verifications
        const REQUIRED_HEADERS: string[] = ["host", "user-agent", "x-request-id", "accept"];
        const OPTIONAL_HEADERS: string[] = ["authentication"]; // only authentication needed endpoints should require it

        const received_headers: string[] = Object.keys(headers).map(h => h.toLowerCase());
        // the required headers that were not received
        const missing_headers: string[] = REQUIRED_HEADERS.filter(header => !received_headers.includes(header)); 

        if (missing_headers.length > 0) {
            Logger.error(`A request with missing headers was received. Missing headers: ${missing_headers}`)    
            return false;
        }
        
        // TODO: validate the option headers
        console.log(url)

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

}
