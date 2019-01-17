import {Command} from "../struct/Command";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";

export class cat implements Command {

    readonly command: string = 'cat';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<boolean> {
        return new Promise(function (resolve, reject) {
            if(args){
                if(args.length === 1){
                    FilesystemService.getTextFileContent(args[0])
                        .then(function(fileContent){
                            TerminalService.output(fileContent);
                            resolve();
                        })
                        .catch(function (error) {
                            reject(`File "${args[0]}" could not be found.`);
                        });
                }
                else if(args.length === 0){
                    TerminalService.output("please define a file to be opened.");
                    resolve();
                }
                else if(args.length > 1){
                    TerminalService.output("please only define one file to be opened.");
                    resolve();
                }
            }
        });
    }

    public getCommand(): string {
        return this.command;
    }
}
