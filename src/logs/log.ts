import fs from "fs";
import { Log } from "./log.types.js";

// TODO: limit the request.txt length
// TODO: search for some log
// TODO: improve the log method's params

export class Logger {
    
    public static log = async ({
        request,
        client,
        file, 
        message, 
        service, 
        level
    }: Log): Promise<void> => {

        const file_path: string = await this.verifyFile(file);

        const timestamp_options: Intl.DateTimeFormatOptions = {day: 'numeric', year: "numeric", month: 'long', hour: "2-digit", minute: "2-digit", second:"2-digit"}
        const timestamp: string = new Date().toLocaleString("en-US", timestamp_options)

        const log_message: string = `${client} - ${request?.user_id} [${service} service][${timestamp}] ${level} ${request?.target} ${request?.status} ${message} ${request?.agent}\n`;
    
        fs.appendFile(
            file_path, log_message, {encoding: 'latin1'}, 
            (err) => {if (err) console.log(err)}
        )
    }

    private static verifyFile = (file: string): string => {
        const file_path: string = "logs/"+file+".log"
        if(!fs.existsSync(file_path))
            fs.openSync(file_path, "w")

        return file_path;
    }

}