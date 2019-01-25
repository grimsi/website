import {CFile} from "./CFile";

export class CFolder {
    public readonly name: string;
    public readonly children: (CFile|CFolder)[];

    constructor(name: string, children: (CFile|CFolder)[]){
        this.name = name;
        this.children = children;
    }
}