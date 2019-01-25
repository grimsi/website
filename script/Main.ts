import {BootscreenService} from "./services/BootscreenService";
import {KeyEventService} from "./services/KeyEventService";
import {TerminalService} from "./services/TerminalService";
import {CommandHandlerService} from "./services/CommandHandlerService";
import {FilesystemService} from "./services/FilesystemService";

export class Main {

    /* will be called by RequireJS */
    public startApplication(): void {
        let bootscreenService = new BootscreenService();
        let terminalService = new TerminalService();
        let keyEventService = new KeyEventService();

        bootscreenService.startBootSequence();
        keyEventService.init();
        terminalService.printWelcomeScreen();
        CommandHandlerService.registerCommands();
        FilesystemService.initFileSystem().then(() => {
            /*console.debug(`FileSystem: ${JSON.stringify(FilesystemService.rootFolder, (key, value) => {
                if(key === 'parent') return value.name || "$root";
                else return value;
            }, '\t')}`);*/
            bootscreenService.finishBootSequence();
            console.log("Application started.");
        });
    }

}