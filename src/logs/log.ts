import fs from "fs";
import { SERVICES } from "../types/endpoints.js";
import { LOG_FILES, LOG_LEVELS } from "./log-types.js";

interface writeLogParams {
    file: LOG_FILES,
    level: LOG_LEVELS,
    content: string,
    service: SERVICES
}

// TODO: check log types
// TODO: limit the request.txt length

export const writeLog = ({
    file, content, level, service
}: writeLogParams): void => {
    const file_path: string = "logs/"+file+".txt";
    const log_message =  "["+new Date().toISOString()+"]" + "[service: " + service + "] " + level + ": " + content + "\n"

    fs.appendFile(file_path, log_message, {encoding: 'latin1'}, (err) => console.log(err))
}