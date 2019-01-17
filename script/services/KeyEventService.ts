import {Key} from "../enum/Key";
import {KeyHandlerService} from "./KeyHandlerService";
import {CommandHandlerService} from "./CommandHandlerService";
import {TerminalService} from "./TerminalService";
import {HistoryService} from "./HistoryService";

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
        this.keyHandlerService.registerKey(Key.ARROW_UP, function () {
            _this.handleArrowUp();
        });
        this.keyHandlerService.registerKey(Key.ARROW_DOWN, function () {
            _this.handleArrowDown();
        });
    }

    private handleEnter(): void {
        if(event) event.preventDefault();
        const command: string = this.terminalService.getCurrentCommand();
        this.commandHandlerService.executeCommand(command);
        HistoryService.addHistoryEntry(command);
    }

    private handleArrowUp(): void {
        if(event) event.preventDefault();
        this.terminalService.setInputLineText(HistoryService.getPreviousHistoryEntry());
    }

    private handleArrowDown(): void {
        if(event) event.preventDefault();
        this.terminalService.setInputLineText(HistoryService.getNextHistoryEntry());
    }
}