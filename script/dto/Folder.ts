import {File} from "./File";
import {FilesystemService} from "../services/FilesystemService";
import {IFolder} from "../interfaces/IFolder";
import {RootFolder} from "./RootFolder";

export class Folder implements IFolder {
    public name: string;
    private readonly parent: Folder|RootFolder;
    private children: (File|Folder)[] = [];

    constructor(name: string, parent: Folder|RootFolder) {
        this.name = name;
        this.parent = parent;
        this.parent.addChild(this);
    }

    public rename(newName: string): Folder {
        this.name = newName;
        return this;
    }

    public delete(): void {
        delete this.children;
        this.parent.deleteChild(this);
    }

    public addChild(childToBeAdded: File|Folder): (File|Folder)[] {
        try {
            FilesystemService.checkForInvalidName(this.children, childToBeAdded);
        }
        catch (e) {
            console.error(e);
            return this.children;
        }

        this.children.push(childToBeAdded);
        return this.children;
    }

    public deleteChild(childToBeDeleted: File|Folder): void {
        this.children.forEach((child: File|Folder, index: number) => {
            if(child.name === childToBeDeleted.name){
                this.children.splice(index, 1);
            }
        });
    }

    public getParent(): Folder|RootFolder {
        return this.parent;
    }

    public getChildren(): (File | Folder)[] {
        return this.children;
    }
}