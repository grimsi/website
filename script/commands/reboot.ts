import {ICommand} from "../interfaces/ICommand";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";

export class reboot implements ICommand {

    private readonly command: string = 'reboot';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
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