import {UtilityService} from "./UtilityService";
import {File} from "../dto/File";
import {Folder} from "../dto/Folder";
import {RootFolder} from "../dto/RootFolder";
import {CRootFolder} from "../dto/CRootFolder";
import {CFolder} from "../dto/CFolder";
import {CFile} from "../dto/CFile";
import {FileType} from "../enum/FileType";
import has = Reflect.has;

export class FilesystemService {
    static readonly basePath: string = "filesystem";
    static readonly configFilePath: string = "config";
    static readonly configFileName: string = "filesystem.json";

    static readonly reservedNames: string[] = [".."];
    static readonly reservedChars: string[] = ["/"];

    public static rootFolder: RootFolder = new RootFolder();
    public static currentFolder: Folder|RootFolder = FilesystemService.rootFolder;
    private static currentVirtualFolder: Folder|RootFolder = FilesystemService.rootFolder;

    public static async initFileSystem(): Promise<void>{
        console.debug("Initializing filesystem...");

        let fileSystem: CRootFolder = <CRootFolder> <unknown> JSON.parse(await UtilityService.getResource(`./${this.configFilePath}/${this.configFileName}`));

        await FilesystemService.addNodesToFileSystemRecursive(fileSystem, FilesystemService.rootFolder);

        console.debug("Filesystem initialized.");
    }

    public static async getFileContent(filePath: string): Promise<string>{
        return await UtilityService.getResource(`./${this.basePath}/${filePath}`);
    }

    public static getFile(fileName: string, folder: Folder|RootFolder = this.currentFolder): File{
        folder.getChildren().forEach((child: File|Folder) => {
            if(child instanceof File && `${child.name}.${child.getFileType()}` === fileName){
                return child;
            }
        });
        throw new Error(`File "${fileName}" does not exist in this folder.`);
    }

    public static checkForInvalidName(files: (File|Folder)[], fileToBeChecked: File|Folder): void  {

        let child: File|Folder;
        /* check if object is folder and if yes, check if name is reserved */
        if(fileToBeChecked instanceof Folder && this.reservedNames.indexOf(fileToBeChecked.name) > -1){
            throw new Error(`Reserved name: "${fileToBeChecked.name}".`);
        }
        this.reservedChars.forEach((s: string) => {
            if(fileToBeChecked.name.indexOf(s) > 0) {
                throw new Error(`Name "${fileToBeChecked.name}" contains illegal character ${s}.`);
            }
        });
        for(let i: number = 0; i < files.length; i++){
            child = files[i];
            /* check if object has same name, filetype (in case of file) and type as existing object */
            if(typeof child === typeof fileToBeChecked && child.name === fileToBeChecked.name){
                if(fileToBeChecked instanceof Folder){
                    fileToBeChecked = <Folder> fileToBeChecked;
                    throw new Error(`Duplicate name: "${fileToBeChecked.name}".`);
                }
                else if(fileToBeChecked instanceof File) {
                    fileToBeChecked = <File> fileToBeChecked;
                    child = <File> child;
                    if(fileToBeChecked.getFileType() === child.getFileType()){
                        throw new Error(`Duplicate name: "${fileToBeChecked.name}.${fileToBeChecked.getFileType()}".`);
                    }
                }
            }
        }

    }

    public static getVirtualAbsolutePath(file: File|Folder|RootFolder, partialPath: string = ""): string {
        if(file instanceof File){
            return this.getVirtualAbsolutePath(file.parent, `/${file.name}.${file.getFileType()}`)
        }
        else if(file instanceof Folder){
            return this.getVirtualAbsolutePath(file.getParent(), `/${file.name}${partialPath}`)
        }
        else if(file instanceof RootFolder){
            return partialPath;
        }
        return "";
    }

    public static getRealAbsolutePath(file: File|Folder|RootFolder): string {
        let virtualPath: string = FilesystemService.getVirtualAbsolutePath(file);

        return FilesystemService.basePath + virtualPath;
    }

    public static changeDirectory(newDir: Folder|RootFolder): void {
        this.currentFolder = newDir;
        this.currentVirtualFolder = newDir;
    }

    public static getCurrentVirtualDirectory(): Folder|RootFolder {
        return this.currentVirtualFolder;
    }

    public static changeVirtualDirectory(newDir: Folder|RootFolder): void {
        this.currentVirtualFolder = newDir;
    }

    public static resetVirtualDirectory(): void {
        this.currentVirtualFolder = this.currentFolder;
    }

    private static async addNodesToFileSystemRecursive(currentNode: CFolder|CRootFolder, currentFolder: Folder|RootFolder): Promise<void> {
        for(let child of currentNode.children) {
            if(has(child, "name") && !has(child, "children")){
                child = <CFile> child;
                let fileName: string = child.name.substring(0, child.name.lastIndexOf("."));
                let fileType: FileType = UtilityService.convertStringToFileType(child.name.substring(child.name.lastIndexOf(".") + 1, child.name.length));

                let newFile = new File(fileName, fileType, currentFolder);
                console.debug(`Added file: ${FilesystemService.getVirtualAbsolutePath(newFile)}`);
            }
            else if(has(child, "name") && has(child, "children")){
                child = <CFolder> child;
                let newFolder: Folder = new Folder(child.name, currentFolder);
                console.debug(`Added folder: ${FilesystemService.getVirtualAbsolutePath(newFolder)}`);
                await FilesystemService.addNodesToFileSystemRecursive(<CFolder> child, newFolder);
            }
            else {
                console.debug(`Unkown Type @ ${FilesystemService.getVirtualAbsolutePath(currentFolder)}: ${JSON.stringify(child, null, '\t')} `);
            }
        }
    }

}