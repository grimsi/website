import {ICommand} from "../interfaces/ICommand";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";

export class help implements ICommand {

    private readonly command: string = help.name;

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve) {
            let output: string = '';
            output += 'List of known commands:\n';
            CommandHandlerService.getAvailableCommands().forEach((c: ICommand) => {
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
