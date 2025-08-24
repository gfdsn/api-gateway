import { Request } from "./request.types.js";

export class RequestProvider {

    /**
     * Forwards a request to its respective service
     * 
     * @param request 
     * @param service 
     * 
     * @returns 
     */
    public static forward = (request: Request, service: string): boolean => {
        return false;
    }

}