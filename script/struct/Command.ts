export interface Command {
    readonly command: string;

    execute(args?: string[]): Promise<boolean>;

    getCommand(): string;
}