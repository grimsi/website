import {ICommand} from "../interfaces/ICommand";
import {TerminalService} from "../services/TerminalService";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {UtilityService} from "../services/UtilityService";

export class reboot implements ICommand {

    private readonly command: string = reboot.name;

    private readonly description = "reboots the terminal (reloads the site)";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve) {
            TerminalService.clearTerminal();
            TerminalService.output('System rebooting...');
            setTimeout(() => {
                location.reload();
            }, UtilityService.random(1, 3) * 1000);
        });
    }

    public getCommand(): string {
        return this.command;
    }

    public getDescription(): string {
        return this.description;
    }
}