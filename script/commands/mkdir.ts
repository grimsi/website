import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";
import {Folder} from "../dto/Folder";

export class mkdir implements ICommand {

    private readonly command: string = mkdir.name;

    private readonly description = "creates a subdirectory with a given name";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve, reject) {
            if(args){
                if(args.length == 1){
                    try{
                        new Folder(args[0], FilesystemService.currentFolder);
                        resolve();
                    }
                    catch (e) {
                        reject(e.message);
                    }
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

    public getDescription(): string {
        return this.description;
    }
}