import {ICommand} from "../interfaces/ICommand";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {UtilityService} from "../services/UtilityService";

export class help implements ICommand {

    private readonly command: string = help.name;

    private readonly description = "displays a list with known commands including a short description";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve) {
            let commands: string[] = [];

            TerminalService.output('List of known commands:\n');
            CommandHandlerService.getAvailableCommands().forEach((c: ICommand) => {
                commands.push(c.getCommand());
                commands.push(c.getDescription());
            });
            TerminalService.outputHTML(UtilityService.formatStringsAsTable(commands, 2));
            resolve();
        });
    }

    public getCommand(): string {
        return this.command;
    }

    public getDescription(): string {
        return this.description;
    }
}
