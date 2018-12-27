import {KeyEvent} from "../struct/KeyEvent";
import {Key} from "../enum/Key";

export class KeyHandlerService{

    private keyEvents: KeyEvent[] = [];

    private static instance: KeyHandlerService;

    constructor() {
        if (KeyHandlerService.instance) {
            return KeyHandlerService.instance;
        }
        KeyHandlerService.instance = this;
    }

    public addEventListener(element: HTMLElement): void {
        const _this = this;
        element.addEventListener('keydown', function(e){
            _this.handleKeyPress(<KeyboardEvent> e);
        }, true);
    }

    public registerKey (key: Key, action: Function): void {
        const keyEvent: KeyEvent = new KeyEvent(key, action);
        this.keyEvents.push(keyEvent);
    }

    private handleKeyPress (event: KeyboardEvent) {
        this.keyEvents.forEach((k: KeyEvent) => {
            if(k.getKey() === event.keyCode){
                k.triggerAction();
            }
        });
    }
}