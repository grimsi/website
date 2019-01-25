import {TerminalService} from "./TerminalService";
import {ICommand} from "../interfaces/ICommand";
import {cat} from "../commands/cat";
import {help} from "../commands/help";
import {clear} from "../commands/clear";
import {reboot} from "../commands/reboot";
import {ls} from "../commands/ls";
import {cd} from "../commands/cd";

export class CommandHandlerService {

    private terminalService = new TerminalService();

    private static commands: ICommand[] = [];

    private static instance: CommandHandlerService;

    constructor() {
        if (CommandHandlerService.instance) {
            return CommandHandlerService.instance;
        }
        CommandHandlerService.instance = this;
    }

    public executeCommand(cmd: string): void {
        let terminalService: TerminalService = this.terminalService;

        if(cmd.length > 0){
            cmd = cmd.trim();
            let commandName: string = this.getCommandName(cmd);
            let commandArgs: string[] = this.getCommandArgs(cmd);
            const c: number = CommandHandlerService.commands.map(function(c: ICommand) { return c.getCommand(); }).indexOf(commandName);
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

    public static registerCommand(command: ICommand){
        CommandHandlerService.commands.push(command);
    }

    public static getAvailableCommands(): ICommand[]{
        return CommandHandlerService.commands;
    }

    public static registerCommands(): void {
        new help();
        new clear();
        new reboot();
        new cat();
        new ls();
        new cd();
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