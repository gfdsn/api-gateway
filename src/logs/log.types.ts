import { Agent } from "http"
import { Services } from "../types/endpoints.js"

export enum LogFiles {
    REQUESTS = "requests"
}

export enum LogLevels {
    INFO = 'INFO',
    WARN = 'WARN',
    DEBUG = 'DEBUG',
    ERROR = 'ERROR',
}

export type LogRequest = {
    user_id: string,
    agent: string|undefined,
    status: number,
    target: string,
}

export type Log = {
    request?: LogRequest,
    client: string|undefined,
    file: LogFiles,
    message: string,
    service: Services
    level: LogLevels
}
