import {Command} from "../struct/Command";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";

export class reboot implements Command {

    readonly command: string = 'reboot';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<boolean> {
        return new Promise(function (resolve) {
            TerminalService.output('System rebooting...');
            location.reload();
            resolve();
        });
    }

    public getCommand(): string {
        return this.command;
    }
}