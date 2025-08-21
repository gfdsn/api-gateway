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
    agent: string| "",
    status: number,
    target: string,
    client: string
}