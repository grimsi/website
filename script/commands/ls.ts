import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {TerminalService} from "../services/TerminalService";
import {UtilityService} from "../services/UtilityService";
import {FilesystemService} from "../services/FilesystemService";
import {Folder} from "../dto/Folder";
import {RootFolder} from "../dto/RootFolder";
import {File} from "../dto/File";

export class ls implements ICommand {

    private readonly command: string = ls.name;

    private readonly description = "lists all subdirectories within a given path";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        let _this = this;
        return new Promise(function (resolve, reject) {
            let enableColors:boolean = false;

            if(args && args.length > 0 && args.indexOf("--color") > -1) {
                /* remove the flag from the argument list since it will be processed now */
                args.splice(args.indexOf("--color"), 1);
                enableColors = true;
            }

            let folder = FilesystemService.getCurrentFolder();

            if(args && args[0]){
                try{
                    FilesystemService.changeDirectoryByPath(args[0], true);
                    folder = FilesystemService.getCurrentFolder(true);
                }
                catch (e) {
                    reject(e.message);
                }
                finally {
                    FilesystemService.resetVirtualDirectory();
                }
            }

            let filenames: string[] = _this.getFileNamesStyled(folder, enableColors);

            TerminalService.outputHTML(UtilityService.formatStringsAsTable(filenames));
            resolve();
        });
    }

    public getCommand(): string {
        return this.command;
    }

    public getDescription(): string {
        return this.description;
    }

    private getFileNamesStyled(files: Folder | RootFolder, enableColors: boolean = false): string[] {
        return files.getChildren().map((child: File | Folder) => {
            if(enableColors) {
                if (child instanceof File) return `<span>${child.name}.${child.getFileType()}</span>`;
                else return `<span style="color: slateblue">${child.name}</span>`;
            }
            else {
                if (child instanceof File) return `${child.name}.${child.getFileType()}`;
                else return child.name;
            }
        });
    }
}
