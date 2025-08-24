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
    agent: string| "",
    target: string,
}