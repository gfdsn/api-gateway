import { Services } from "./endpoints.js";

type RequestMetadata = {
    request_id: string // request id for request tracking
    token?: string, // user authorization token
    timestamp: Date, // when the request was sent
    location?: string // where the request is coming from
}

export interface Request {
    data: {} // data sent for that service
    method: string
    target: string // ex: users/update
    metadata: RequestMetadata
}
