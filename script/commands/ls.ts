import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {TerminalService} from "../services/TerminalService";
import {UtilityService} from "../services/UtilityService";
import {FilesystemService} from "../services/FilesystemService";

export class ls implements ICommand {

    private readonly command: string = ls.name;

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        /* TODO: implement support for argument containing a absolute ("./{...}") / relative folder path */
        if(!args || args.length < 1){
            let filenames: string[] = UtilityService.mapFileStructureToNames(FilesystemService.currentFolder);

            return new Promise(function (resolve) {
                TerminalService.output(UtilityService.formatStringsAsTable(filenames));
                resolve();
            });
        }
        else {
            let filenames: string[] = UtilityService.mapFileStructureToNames(FilesystemService.currentFolder);

            return new Promise(function (resolve) {
                TerminalService.output(UtilityService.formatStringsAsTable(filenames));
                resolve();
            });
        }
    }

    public getCommand(): string {
        return this.command;
    }
}
