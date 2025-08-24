import { RequestUrl } from "./request.js";

type RequestMetadata = {
    request_id: string, // request id for request tracking
    token?: string, // user authorization token
    timestamp: Date, // when the request was sent
    location?: string, // where the request is coming from
}

export interface Request {
    service: string,
    data: {}, // data sent for that service
    method: string,
    target: RequestUrl, // ex: users/update
    metadata: RequestMetadata,
}
