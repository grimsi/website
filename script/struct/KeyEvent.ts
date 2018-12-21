class KeyEvent{
    private key: Key;
    private action: () => {};

    constructor(key: Key, event: () => {}){
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