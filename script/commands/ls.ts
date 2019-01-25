import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {TerminalService} from "../services/TerminalService";
import {UtilityService} from "../services/UtilityService";
import {FilesystemService} from "../services/FilesystemService";
import {Folder} from "../dto/Folder";
import {File} from "../dto/File";

export class ls implements ICommand {

    private readonly command: string = 'ls';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        let filenames: string[] = UtilityService.mapFileStructureToNames(FilesystemService.currentFolder);

        return new Promise(function (resolve) {
            TerminalService.output(UtilityService.formatStringsAsTable(filenames));
            resolve();
        });
    }

    public getCommand(): string {
        return this.command;
    }
}
