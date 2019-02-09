import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";
import {Folder} from "../dto/Folder";
import {UtilityService} from "../services/UtilityService";

export class rm implements ICommand {

    private readonly command: string = rm.name;

    private readonly description = "removes a directory with given name";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve, reject) {
            if(args){
                if(args.length == 1){
                    let folderNames = UtilityService.mapFileStructureToNames(FilesystemService.currentFolder);
                    let folderIndex: number = folderNames.indexOf(args[0]);
                    if(folderIndex > -1) {
                        let folder: Folder = <Folder> FilesystemService.currentFolder.getChildren()[folderIndex];
                        if(folder instanceof Folder){
                            folder.delete();
                            resolve();
                        }
                    }
                    reject(`Folder ".${FilesystemService.getVirtualAbsolutePath(FilesystemService.currentFolder)}/${args[0]}" could not be found.`);
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