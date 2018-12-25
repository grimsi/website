import {Key} from "../enum/Key";

export class KeyEvent{
    private key: Key;
    private action: Function;

    constructor(key: Key, event: Function){
        this.key = key;
        this.action = event;
    }

    public getKey(): Key{
        return this.key;
    }

    public triggerAction(): void{
        this.action();
    }
}