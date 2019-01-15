import {Command} from "../struct/Command";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {TerminalService} from "../services/TerminalService";
import {UtilityService} from "../services/UtilityService";

export class ls implements Command {

    readonly command: string = 'ls';

    private filenames: string[] = [];

    constructor() {
        CommandHandlerService.registerCommand(this);
        this.getFiles()
            .then((files: string[]) => {
                this.filenames = files;
            })
            .catch((error: string) => {
                console.error(error);
            });
    }

    public execute(): void {
        TerminalService.output(UtilityService.formatStringsAsTable(this.filenames));
    }

    public getCommand(): string {
        return this.command;
    }

    private async getFiles(): Promise<string[]> {
        let url = "./config/filesystem.json";

        return new Promise<string[]>(function(resolve, reject){

            let jsonFile = new XMLHttpRequest();
            jsonFile.open("GET", url,true);
            jsonFile.send();

            jsonFile.onreadystatechange = function() {
                if (jsonFile.readyState== 4 && jsonFile.status == 200) {
                    resolve(JSON.parse(jsonFile.responseText));
                }
                else if(jsonFile.readyState== 4 && jsonFile.status != 200){
                    reject("Error while loading file config.");
                }

            };
        });
    }
}
