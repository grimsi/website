class KeyHandlerService{

    private terminal: HTMLElement | null = document.getElementById('terminal');
    private keyEvents: KeyEvent[] = [];

    constructor(){
        if(this.terminal){
            this.terminal.addEventListener('keyDown', this.handleKeyPress);
        }
    }

    public registerKey (key: Key, action: () => {}): void{
        const keyEvent: KeyEvent = new KeyEvent(key, action);
        this.keyEvents.push(keyEvent);
    }

    private handleKeyPress (event: KeyboardEvent){
        this.keyEvents.forEach((k: KeyEvent) => {
            if(k.getKey() === event.code){
                k.triggerAction();
            }
        });
    }
}