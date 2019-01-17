import {UtilityService} from "./UtilityService";

export class FilesystemService {
    static readonly basePath: string = "filesystem";
    static readonly configFilePath: string = "config";
    static readonly configFileName: string = "filesystem.json";

    private static filesCached: string[] = [];

    public static async getFiles(): Promise<string[]>{
        if(this.filesCached.length > 0) return this.filesCached;

        let files: string = await UtilityService.getResource(`./${this.configFilePath}/${this.configFileName}`);
        this.filesCached = JSON.parse(files);
        return this.filesCached;
    }

    public static async getTextFileContent(path: string): Promise<string>{
        return await UtilityService.getResource(`./${this.basePath}/${path}`);
    }
}