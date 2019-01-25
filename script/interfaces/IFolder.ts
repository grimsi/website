import {File} from "../dto/File";
import {Folder} from "../dto/Folder";
import {RootFolder} from "../dto/RootFolder";

export interface IFolder {
    addChild(childToBeAdded: File|Folder): (File|Folder)[];

    deleteChild(childToBeDeleted: File|Folder): void;

    getParent(): Folder|RootFolder;

    getChildren(): (File|Folder)[];
}