import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";
import {Folder} from "../dto/Folder";

export class rm implements ICommand {

    private readonly command: string = rm.name;

    private readonly description = "removes a directory with given name";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve, reject) {
            if(args && args.length > 0){
                if(args.length == 1){
                    try{
                        FilesystemService.changeDirectoryByPath(args[0], true);
                        let folder: Folder = <Folder> FilesystemService.getCurrentFolder(true);
                        folder.delete();
                        resolve();
                    }
                    catch (e) {
                        reject(e.message);
                    }
                    finally {
                        FilesystemService.resetVirtualDirectory();
                    }
                }
                else {
                    reject("This command only accepts one argument");
                }
            }
            else {
                reject("Please specify the name of the folder that you want to remove.");
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