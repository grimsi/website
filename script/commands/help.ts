import {Command} from "../struct/Command";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";

export class help implements Command {

    readonly command: string = 'help';

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<boolean> {
        return new Promise(function (resolve) {
            let output: string = '';
            output += 'List of known commands:\n';
            CommandHandlerService.getAvailableCommands().forEach((c: Command) => {
                output += c.getCommand() + '\n';
            });
            TerminalService.output(output);
            resolve();
        });
    }

    public getCommand(): string {
        return this.command;
    }
}
