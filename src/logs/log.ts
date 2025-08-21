import fs from "fs";
import { Services } from "../types/endpoints.js";
import { LogLevels, LogRequest } from "./log.types.js";

// TODO: limit the request.log length
// TODO: search for some log
// TODO: update the user's id when possible

export class Logger {
    
    public static log = async (request: LogRequest, message: string, service: Services): Promise<void> => {

        const file_path: string = await this.verifyFile("logs");

        const log_message: string = this.buildLogMessage(request, service, LogLevels.INFO, message);
    
        fs.appendFile(
            file_path, log_message, {encoding: 'latin1'}, 
            (err) => {if (err) console.log(err)}
        )
    }

    public static error = async (): Promise<void> => {
        const file_path: string = await this.verifyFile("errors")
    }

    public static debug = async (): Promise<void> => {
        const file_path: string = await this.verifyFile("debug")
    }

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

        return `${request.client} - ${request.user_id} [${service} service][${timestamp}] ${LogLevels.INFO} ${request.target} ${request.status} ${message} ${request.agent}\n`
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
        const file_path: string = "logs/"+file+".log"
        if(!fs.existsSync(file_path))
            fs.openSync(file_path, "w")

        return file_path;
    }
}