import {ICommand} from "../interfaces/ICommand";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";

export class cat implements ICommand {

    private readonly command: string = 'cat';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve, reject) {
            if(args){
                if(args.length === 1){
                    let filePath = FilesystemService.getVirtualAbsolutePath(FilesystemService.currentFolder) + "/" + args[0];
                    FilesystemService.getFileContent(filePath)
                        .then(function(fileContent){
                            TerminalService.output(fileContent);
                            resolve();
                        })
                        .catch(function (error) {
                            reject(`File ".${FilesystemService.getVirtualAbsolutePath(FilesystemService.currentFolder)}/${args[0]}" could not be found.`);
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
