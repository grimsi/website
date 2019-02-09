import {File} from "./File";
import {Folder} from "./Folder";
import {FilesystemService} from "../services/FilesystemService";
import {IFolder} from "../interfaces/IFolder";

export class RootFolder implements IFolder{
    private children: (File|Folder)[] = [];

    public addChild(childToBeAdded: File|Folder): (File|Folder)[] {
        FilesystemService.checkForInvalidName(this.children, childToBeAdded);
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

    public getParent(): RootFolder {
        return this;
    }

    public getChildren(): (File|Folder)[]{
        return this.children;
    }
}