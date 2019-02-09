import {ICommand} from "../interfaces/ICommand";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {FilesystemService} from "../services/FilesystemService";
import {Folder} from "../dto/Folder";
import {UtilityService} from "../services/UtilityService";

export class cd implements ICommand {

    private readonly command: string = cd.name;

    private readonly description = "changes to a directory with given name";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        /* TODO: implement support for argument containing a absolute ("./{...}") / relative folder path */

        /* TODO: test the path by traversing it virtually and checking for errors */

         let _this = this;
        return new Promise(async function (resolve, reject) {
            if(args) {
                if(args.length === 1 && args[0] !== undefined) {
                    let folderPath: string = args[0];
                    if(folderPath.lastIndexOf("/") > -1) {
                        let folderPathRest: string = folderPath.substring(0, folderPath.lastIndexOf("/"));
                        folderPath = folderPath.substring(folderPath.lastIndexOf("/") + 1, folderPath.length);
                        if(folderPathRest !== undefined && folderPathRest.length > 0){
                            try {
                                await _this.execute([folderPathRest]);
                            }
                            catch (e) {
                                reject(e);
                            }
                        }
                    }
                    if(folderPath === ".."){
                        FilesystemService.changeDirectory(FilesystemService.currentFolder.getParent());
                        resolve();
                    }

                    let folderNames = UtilityService.mapFileStructureToNames(FilesystemService.currentFolder);
                    let folderIndex: number = folderNames.indexOf(folderPath);
                    if(folderIndex > -1) {
                        let folder: Folder = <Folder> FilesystemService.currentFolder.getChildren()[folderIndex];
                        if(folder instanceof Folder){
                            FilesystemService.changeDirectory(folder);
                            resolve();
                        }
                    }
                    reject(`Folder ".${FilesystemService.getVirtualAbsolutePath(FilesystemService.currentFolder)}/${folderPath}" could not be found.`);
                }
                else if(args.length === 0) {
                    TerminalService.output("Please define a folder to be opened.");
                    resolve();
                }
                else if(args.length > 1) {
                    TerminalService.output("This command only accepts one argument.");
                    resolve();
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
