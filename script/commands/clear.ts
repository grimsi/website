import {ICommand} from "../interfaces/ICommand";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";

export class clear implements ICommand {

    private readonly command: string = 'clear';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve) {
            TerminalService.clearTerminal();
            resolve();
        });
    }

    public getCommand(): string {
        return this.command;
    }
}
