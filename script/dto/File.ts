import {FileType} from "../enum/FileType";
import {Folder} from "./Folder";
import {RootFolder} from "./RootFolder";

export class File {
    public name: string;
    private fileType: FileType;
    public readonly parent: Folder|RootFolder;

    constructor(name: string, fileType: FileType, parent: Folder|RootFolder){
        this.name = name;
        this.fileType = fileType;
        this.parent = parent;
        this.parent.addChild(this);
    }

    public rename(newName: string): File{
        this.name = newName;
        return this;
    }

    public changeType(newType: FileType): File{
        this.fileType = newType;
        return this;
    }

    public getFileType(): FileType {
        return this.fileType;
    }

    public getParent(): Folder|RootFolder {
        return this.parent;
    }

    public delete(): void {
        this.parent.deleteChild(this);
    }
}