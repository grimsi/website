import {TerminalService} from "./TerminalService";
import {Command} from "../struct/Command";
import {cat} from "../commands/cat";
import {help} from "../commands/help";
import {clear} from "../commands/clear";
import {reboot} from "../commands/reboot";

export class CommandHandlerService {

    private terminalService = new TerminalService();

    private static commands: Command[] = [];

    private static instance: CommandHandlerService;

    constructor() {
        if (CommandHandlerService.instance) {
            return CommandHandlerService.instance;
        }
        CommandHandlerService.instance = this;
    }

    public executeCommand(cmd: string): void {
        const c: number = CommandHandlerService.commands.map(function(c: Command) { return c.getCommand(); }).indexOf(cmd);
        if(c !== -1){
            CommandHandlerService.commands[c].execute();
        }else {
            TerminalService.output('command \'' + cmd + '\' not found. For help use \'help\'.');
        }
        this.terminalService.afterExecuteCommand();
    }

    public static registerCommand(command: Command){
        CommandHandlerService.commands.push(command);
    }

    public static getAvailableCommands(): Command[]{
        return CommandHandlerService.commands;
    }

    public static registerCommands(): void {
        new help();
        new clear();
        new reboot();
        new cat();
    }
}