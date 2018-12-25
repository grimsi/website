import {Command} from "../struct/command";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";

export class clear implements Command {

    readonly command: string = 'clear';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(): void {
        TerminalService.clearTerminal();
    }

    public getCommand(): string {
        return this.command;
    }
}
