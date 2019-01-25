import {Key} from "../enum/Key";

export class KeyEvent{
    private readonly key: Key;
    private readonly action: Function;

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