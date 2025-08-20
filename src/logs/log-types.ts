import { SERVICES } from "../types/endpoints.js"

export enum LOG_LEVELS {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    FATAL = 'FATAL'
}

export enum LOG_FILES {
    REQUESTS = "requests"
    // TODO: add more types
}

export type Log = {
    time: Date,
    level: LOG_LEVELS,
    content: string,
    service: SERVICES
}