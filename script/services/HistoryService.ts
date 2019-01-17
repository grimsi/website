export class HistoryService{
    private static history: string[] = [];
    private static offset: number = 0;

    public static addHistoryEntry(entry: string): void {
        this.history.push(entry);
        this.resetOffset();
    }

    public static getPreviousHistoryEntry(): string {
        if(this.history.length < 1){
            return "";
        }

        if(this.offset >= (this.history.length - 1)){
            return this.history[0];
        }
        else{
            let entry: string = this.history[(this.history.length - 1) - this.offset];
            this.offset++;
            return entry;
        }
    }

    public static getNextHistoryEntry(): string {
        if(this.offset < 1 || this.history.length < 1){
            return "";
        }
        else {
            let entry: string = this.history[this.history.length - this.offset];
            this.offset--;
            return entry;
        }
    }

    public static resetOffset(): void {
        this.offset = 0;
    }
}