import {Command} from "../struct/Command";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";

export class cat implements Command {

    readonly command: string = 'cat';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(): void {
        TerminalService.output('meow.');
    }

    public getCommand(): string {
        return this.command;
    }
}
