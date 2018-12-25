import {Key} from "../enum/Key";
import {KeyHandlerService} from "./KeyHandlerService";
import {CommandHandlerService} from "./CommandHandlerService";
import {TerminalService} from "./TerminalService";

export class KeyEventService {

    private keyHandlerService = new KeyHandlerService();
    private commandHandlerService = new CommandHandlerService();
    private terminalService = new TerminalService();

    private static instance: KeyEventService;

    constructor() {
        if (KeyEventService.instance) {
            return KeyEventService.instance;
        }
        KeyEventService.instance = this;
    }

    public init(){
        this.registerKeyEvents();
    }

    public registerKeyEvents(): void{
        const _this = this;
        this.keyHandlerService.registerKey(Key.ENTER, function(){
            _this.handleEnter();
        });
    }

    private handleEnter(): void {
        if(event) event.preventDefault();
        const command: string = this.terminalService.getCurrentCommand();
        this.commandHandlerService.executeCommand(command);
    }
}