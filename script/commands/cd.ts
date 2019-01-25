import {ICommand} from "../interfaces/ICommand";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";
import {Folder} from "../dto/Folder";
import {UtilityService} from "../services/UtilityService";

export class cd implements ICommand {

    private readonly command: string = 'cd';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve, reject) {
            if(args){
                if(args.length === 1){
                    if(args[0] === ".."){
                        FilesystemService.changeDirectory(FilesystemService.currentFolder.getParent());
                        resolve();
                    }
                    let folderNames = UtilityService.mapFileStructureToNames(FilesystemService.currentFolder);
                    let folderIndex: number = folderNames.indexOf(args[0]);
                    if(folderIndex > -1) {
                        let folder: Folder = <Folder> FilesystemService.currentFolder.getChildren()[folderIndex];
                        if(folder instanceof Folder){
                            FilesystemService.changeDirectory(folder);
                            resolve();
                        }
                    }
                    reject(`Folder ".${FilesystemService.getVirtualAbsolutePath(FilesystemService.currentFolder)}/${args[0]}" could not be found.`);
                }
                else if(args.length === 0){
                    TerminalService.output("please define a folder to be opened.");
                    resolve();
                }
                else if(args.length > 1){
                    TerminalService.output("please only define one folder to be opened.");
                    resolve();
                }
            }
        });
    }

    public getCommand(): string {
        return this.command;
    }
}
