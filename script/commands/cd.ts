import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";

export class cd implements ICommand {

    private readonly command: string = cd.name;

    private readonly description = "changes to a directory with given name";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(async function (resolve, reject) {
            if(args) {
                if(args.length === 1 && args[0] !== undefined) {
                    let folderPath: string = args[0];
                    try{
                        FilesystemService.changeDirectoryByPath(folderPath, true);
                        FilesystemService.overwriteRealWithVirtualDirectory();
                        resolve();
                    }
                    catch (e) {
                        reject(e.message);
                    }
                    finally {
                        FilesystemService.resetVirtualDirectory();
                    }
                }
                else if(args.length === 0) {
                    resolve();
                }
                else if(args.length > 1) {
                    reject("This command only accepts one argument.");
                }
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
