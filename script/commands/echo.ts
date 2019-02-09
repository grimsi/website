import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {TerminalService} from "../services/TerminalService";

export class echo implements ICommand {

    private readonly command: string = echo.name;

    private readonly description = "prints all arguments to the terminal";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve, reject) {
            if(args){
                let output: string = "";
                args.forEach((arg: string) => {
                    output = output.concat(arg + " ");
                });
                TerminalService.output(output.trim());
                resolve();
            }
            else {
                reject();
            }
        });
    }

    public getCommand(): string {
        return this.command;
    }

    public getDescription(): string {
        return this.description;
    }
}