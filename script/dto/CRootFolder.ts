import {CFile} from "./CFile";
import {CFolder} from "./CFolder";

export class CRootFolder {
    public readonly children: (CFile|CFolder)[];

    constructor(children: (CFile|CFolder)[]){
        this.children = children;
    }
}