import {KeyHandlerService} from "./KeyHandlerService";
import {UtilityService} from "./UtilityService";
import {FilesystemService} from "./FilesystemService";

export class TerminalService {

    private keyHandlerService = new KeyHandlerService();

    private static terminal: HTMLElement | null = document.getElementById('terminal');
    private commandCount: number = 0;

    private static instance: TerminalService;

    constructor() {
        if (TerminalService.instance) {
            return TerminalService.instance;
        }
        TerminalService.instance = this;
    }

    public static output(outputText: string): void {
        const newContent = document.createElement('p');
        newContent.innerText = outputText;
        if(TerminalService.terminal) TerminalService.terminal.appendChild(newContent);
    }

    public static clearTerminal(): void {
        if(TerminalService.terminal) TerminalService.terminal.innerHTML = '';
    }

    public setInputLineText(text: string): void {
        let currentInputLine: HTMLInputElement | null = <HTMLInputElement> document.getElementById("command_" + this.commandCount);
        if(currentInputLine){
            currentInputLine.value = text;
        }
    }

    public afterExecuteCommand(): void {
        this.setCommandInputReadOnly();
        this.commandCount++;
        this.appendInputLine();
    }

    public getCurrentCommand(): string {
        return this.getCommand(this.commandCount);
    }

    public appendInputLine(): void {
        if(TerminalService.terminal){
            const newLineElement: HTMLDivElement = document.createElement('div');
            const newLineUsername: HTMLParagraphElement = document.createElement('p');
            const newLineInput: HTMLInputElement = document.createElement('input');

            newLineElement.className = "terminalInput";

            newLineUsername.innerHTML = "<p>" +
                                        "<span style='color: lightblue'>user</span>" +
                                        "<span style='color: lightcoral'>@</span>" +
                                        "<span style='color: lightgreen'>grimsi.de" + FilesystemService.getVirtualAbsolutePath(FilesystemService.currentFolder) + ":</span>" +
                                        "<span style='color: lightpink'>~</span>" +
                                        "<span style='color: lightcoral'>$</span>" +
                                        " </p>";

            this.keyHandlerService.addEventListener(newLineInput);
            newLineInput.id = "command_" + this.commandCount;
            newLineInput.className= 'commandInput';
            /* prevent red underline */
            newLineInput.setAttribute("autocomplete", "off");
            newLineInput.setAttribute("autocorrect", "off");
            newLineInput.setAttribute("autocapitalize", "off");
            newLineInput.setAttribute("spellcheck", "false");


            newLineElement.append(newLineUsername, newLineInput);
            TerminalService.terminal.append(newLineElement);

            newLineInput.focus({'preventScroll' : false});
            newLineInput.select();
        }
    }

    public printWelcomeScreen(): void {
        TerminalService.output("Welcome to grimsi.de 1.0.0 LTS (grimsiOS™ 4.15.0-39-stable x86_64)\n" +
            "System information as of " + this.getCurrentDateString() + "\n" +
            "\n" +
            this.getPerformanceString() +
            "\n" +
            "* Security for grimsi.de!\n" +
            "We now support SSL!\n" +
            "All traffic to and from this site will now be encrypted.\n" +
            "\n" +
            "* This site is in the process of being reworked.\n" +
            "- please be patient\n" +
            "\n" +
            "0 software packets can be updated.\n" +
            "0 updates and security updates available.\n" +
            "\n" +
            "\n" +
            "Last login: " + this.getLastLoginDateString() + " from 87.187.34.178\n\n");
        this.appendInputLine();
    }

    private getCurrentDateString(): string{
        const dateStringOptions = {weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short', hour12: false};
        return new Date().toLocaleDateString("en-US", dateStringOptions).replace(new RegExp("[,.]", 'g'),"").concat(" " + new Date().getFullYear());
    }

    private getLastLoginDateString(): string{
        const now: Date = new Date();
        const dateStringOptions = {weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", dateStringOptions).replace(new RegExp("[,.]", 'g'),"").concat(" " + new Date().getFullYear());
    }

    private getPerformanceString(): string{
        return "System load:\t" + UtilityService.random(0, 1, 2) + "\t\t\tProcesses:\t\t" + UtilityService.random(0,500) + "\n" +
            "Usage of /:\t" + UtilityService.random(50,100, 0) + "% of " + UtilityService.random(256,1024, 1) + "GB\t\tUsers logged in:\t" + UtilityService.random(1, 5) + "\n" +
            "Memory usage:\t" + UtilityService.random(0,100) + "%\t\t\tIP address for ens3:\t187.58.57.246\n" +
            "Swap usage:\t" + UtilityService.random(0,10) + "%\t\t\tIP address for docker0:\t172.10.0.1\n";
    }

    private getCommand(commandNumber: number): string {
        let currentCommandElement: HTMLInputElement = (<HTMLInputElement> document.getElementById('command_' + commandNumber));
        if(currentCommandElement){
            return currentCommandElement.value;
        }
        return "";
    }

    private setCommandInputReadOnly(): void {
        const currentInputElement: HTMLElement | null = document.getElementById("command_" + this.commandCount);
        if(currentInputElement){
            currentInputElement.setAttribute('readonly', 'readonly');
        }
    }
}