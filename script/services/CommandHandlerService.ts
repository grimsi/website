import {TerminalService} from "./TerminalService";
import {Command} from "../struct/Command";
import {cat} from "../commands/cat";
import {help} from "../commands/help";
import {clear} from "../commands/clear";
import {reboot} from "../commands/reboot";
import {ls} from "../commands/ls";

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
        let terminalService: TerminalService = this.terminalService;

        /* TODO: strip all whitespace characters after the last non-whitespace character from cmd string */

        if(cmd.length > 0){
            let commandName: string = this.getCommandName(cmd);
            let commandArgs: string[] = this.getCommandArgs(cmd);
            const c: number = CommandHandlerService.commands.map(function(c: Command) { return c.getCommand(); }).indexOf(commandName);
            if(c !== -1){
                CommandHandlerService.commands[c].execute(commandArgs)
                    .then(function(){
                        terminalService.afterExecuteCommand();
                    })
                    .catch(function (error) {
                        TerminalService.output(error);
                        terminalService.afterExecuteCommand();
                    });
            }else {
                TerminalService.output(`command '${commandName}' not found. For help use 'help'`);
                terminalService.afterExecuteCommand();
            }
        }
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
        new ls();
    }

    private getCommandName(cmd: string): string{
        if(cmd.indexOf(" ") === -1){
            return cmd;
        }
        return cmd.substring(0, cmd.indexOf(" "));
    }

    private getCommandArgs(cmd: string): string[]{
        let args: string[] = [];

        if(cmd.indexOf(" ") < 0) return args;

        cmd = cmd.substring(cmd.indexOf(" ") + 1, cmd.length) + " ";

        while (cmd.indexOf(" ") > -1){
            args.push(cmd.substring(0, cmd.indexOf(" ")));
            cmd = cmd.substring(cmd.indexOf(" ") + 1, cmd.length);
        }

        return args;
    }
}