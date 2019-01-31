import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";
import {Folder} from "../dto/Folder";

export class mkdir implements ICommand {

    private readonly command: string = mkdir.name;

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve, reject) {
            if(args){
                if(args.length == 1){
                    new Folder(args[0], FilesystemService.currentFolder);
                    resolve();
                }
                else {
                    reject("This command only accepts one argument");
                }
            }
            else {
                reject("Please specify a name for the new folder.");
            }
        });
    }

    public getCommand(): string {
        return this.command;
    }
}