import fs from "fs";
import path from "path";
import ip from 'ip';
import { Services } from "../endpoints.js";
import { LogLevels, LogRequest } from "./log.types.js";

// TODO: limit the request.log length
// TODO: search for some log
// TODO: update the user's id when possible

const DEBUG: boolean = Boolean(process.env.DEBUG)

export class Logger {
    
    public static log = async (request: LogRequest, message: string, service: Services): Promise<void> => {
        const file_path: string = await this.verifyFile("logs");

        const log_message: string = this.buildLogMessage(request, service, LogLevels.INFO, message);
    
        fs.appendFileSync(file_path, log_message, { encoding: 'utf8' });
    }

    public static error = async (message: string, service?: Services): Promise<void> => {
        const file_path: string = await this.verifyFile("errors");

        const log_message: string = this.buildErrorMessage(message, service ?? undefined)

        fs.appendFile(file_path, log_message, {encoding: 'latin1'},
            (err) => {if (err) console.log(err)}
        )
    }

    public static debug = async (): Promise<void> => {
        const file_path: string = await this.verifyFile("debug")
    }

    public static parse = () => {}

    /**
     * Builds and returns the log message string.
     * 
     * @param LogRequest request
     * @param Services service
     * @param LogLevels level
     * @param string message
     * 
     * @returns string
    */
    private static buildLogMessage = (request: LogRequest, service: Services, level: LogLevels, message: string ): string => {
        const timestamp: string = this.buildTimeStamp();
        const ipAddr: string = ip.address();

        return `${ipAddr} - [${service}][${timestamp}] ${LogLevels.INFO} ${request.target} ${message} ${request.agent}\n`
    }

    /**
     * Builds and returns the error message string.
     * 
     * @param string message
     * @param Services service
     * 
     * @returns string
    */
    private static buildErrorMessage = (message: string, service?: Services): string => {
        const timestamp: string = this.buildTimeStamp();

        return `[${service??"base"}][${timestamp}] ${LogLevels.ERROR} - ${message}\n`;
    }

    /**
     * Builds a timestamp in the format mm dd, yyyy at 00:00:00 PM/AM.
     * 
     * @returns string
     * 
     */
    private static buildTimeStamp = (): string => {
        const timestamp_options: Intl.DateTimeFormatOptions = {day: 'numeric', year: "numeric", month: 'long', hour: "2-digit", minute: "2-digit", second:"2-digit"};

        return new Date().toLocaleString("en-US", timestamp_options)
    }

    /**
     * Verifies if the log file exists, if not, creates it. 
     * 
     * @param string file
     * 
     * @returns string
     */
    private static verifyFile = (file: string): string => {
        const folder_path: string = "/app/logs/"
        if (!fs.existsSync(folder_path)) 
            fs.mkdirSync(folder_path, {recursive: true})

        return path.join(folder_path, file+".log");
    }
}