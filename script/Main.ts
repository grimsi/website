import {BootscreenService} from "./services/BootscreenService";
import {KeyEventService} from "./services/KeyEventService";
import {TerminalService} from "./services/TerminalService";
import {CommandHandlerService} from "./services/CommandHandlerService";

export class Main {

    /* will be called by RequireJS */
    public startApplication(): void {
        let bootscreenService = new BootscreenService();
        let terminalService = new TerminalService();
        let keyEventService = new KeyEventService();

        bootscreenService.init();
        keyEventService.init();
        terminalService.printWelcomeScreen();
        CommandHandlerService.registerCommands();
    }

}