import {TerminalService} from "./TerminalService";
import {ICommand} from "../interfaces/ICommand";
import {cat} from "../commands/cat";
import {help} from "../commands/help";
import {clear} from "../commands/clear";
import {reboot} from "../commands/reboot";
import {ls} from "../commands/ls";
import {cd} from "../commands/cd";
import {echo} from "../commands/echo";
import {mkdir} from "../commands/mkdir";
import {rm} from "../commands/rm";

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
            let commandArgs: string[] = [];
            try{
                commandArgs = this.getCommandArgs(cmd);
            }
            catch (e) {
                TerminalService.output(e.message);
            }
            const c: number = CommandHandlerService.commands.map(function(c: ICommand) { return c.getCommand(); }).indexOf(commandName);
            if(c !== -1){
                CommandHandlerService.commands[c].execute(commandArgs)
                    .then(function(){
                        terminalService.afterExecuteCommand();
                    })
                    .catch(function (error) {
                        TerminalService.outputError(error);
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
        new echo();
        new cat();
        new ls();
        new cd();
        new mkdir();
        new rm();
    }

    private getCommandName(cmd: string): string{
        if(cmd.indexOf(" ") === -1){
            return cmd;
        }
        return cmd.substring(0, cmd.indexOf(" "));
    }

    private getCommandArgs(cmd: string): string[]{
        let args: string[] = [];
        let ignoreWhitespaces: boolean = false;

        if(cmd.indexOf(" ") < 0) return args;

        /* remove command from cmd string  */
        cmd = cmd.substring(cmd.indexOf(" ") + 1, cmd.length).trim();

        for(let i: number = 0; i < cmd.length; i++) {
            let char: string = cmd.charAt(i);
            switch(cmd.charAt(i)){
                case `"`:
                    if(cmd.charAt(i - 1) !== '\\'){
                        ignoreWhitespaces = !ignoreWhitespaces;
                        /* remove the '"' */
                        cmd = cmd.slice(0, i) + cmd.slice(i + 1, cmd.length);
                    }
                    else {
                        /* remove the '\' */
                        cmd = cmd.slice(0, i - 1) + cmd.slice(i, cmd.length);
                    }
                    i--;
                    break;
                case ' ':
                    if(!ignoreWhitespaces){
                        args.push(cmd.substring(0, i));
                        cmd = cmd.substring(i , cmd.length).trim();
                        i = -1;
                    }
                    break;
                default:
                    break;
            }
        }
        /* push the last argument that's left */
        args.push(cmd);

        return args;
    }
}