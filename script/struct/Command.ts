export interface Command {
    readonly command: string;

    execute(): void;

    getCommand(): string;
}