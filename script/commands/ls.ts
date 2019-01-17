import {Command} from "../struct/Command";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {TerminalService} from "../services/TerminalService";
import {UtilityService} from "../services/UtilityService";
import {FilesystemService} from "../services/FilesystemService";

export class ls implements Command {

    readonly command: string = 'ls';

    private filenames: string[] = [];

    constructor() {
        CommandHandlerService.registerCommand(this);
        FilesystemService.getFiles()
            .then((files: string[]) => {
                this.filenames = files;
            })
            .catch((error: string) => {
                console.error(error);
            });
    }

    public execute(args?: string[]): Promise<boolean> {
        let filenames: string[] = this.filenames;

        return new Promise(function (resolve) {
            TerminalService.output(UtilityService.formatStringsAsTable(filenames));
            resolve();
        });
    }

    public getCommand(): string {
        return this.command;
    }
}
