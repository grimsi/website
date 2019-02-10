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
    private static currentFolder: Folder|RootFolder = FilesystemService.rootFolder;
    private static currentVirtualFolder: Folder|RootFolder = FilesystemService.rootFolder;

    public static async initFileSystem(): Promise<void>{
        console.debug("Initializing filesystem...");

        let fileSystem: CRootFolder = <CRootFolder> <unknown> JSON.parse(await UtilityService.getResource(`./${this.configFilePath}/${this.configFileName}`));

        await FilesystemService.addNodesToFileSystemRecursive(fileSystem, FilesystemService.rootFolder);

        console.debug("Filesystem initialized.");
    }

    public static async getFileContent(filePath: string): Promise<string>{
        try{
            return await UtilityService.getResource(`./${this.basePath}/${filePath}`);
        }
        catch (e) {
            throw new Error(`File ".${FilesystemService.getVirtualAbsolutePath(FilesystemService.getCurrentFolder())}/${filePath}" could not be found.`);
        }
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

    public static changeDirectory(newDir: Folder|RootFolder, virtual: boolean = false): void {
        if(!virtual) this.currentFolder = newDir;
        this.currentVirtualFolder = newDir;
    }

    /**
     * Changes to a directory by given relative or absolute path
     */
    public static changeDirectoryByPath(folderPath: string, virtual: boolean = false): void {
        if(folderPath.length === 0) return;
        if(folderPath.lastIndexOf("/") > -1) {
            let folderPathRest: string = folderPath.substring(0, folderPath.lastIndexOf("/"));
            folderPath = folderPath.substring(folderPath.lastIndexOf("/") + 1, folderPath.length);
            if(folderPathRest !== undefined && folderPathRest.length > 0){
                FilesystemService.changeDirectoryByPath(folderPathRest, virtual);
            }
        }
        FilesystemService.changeDirectoryByName(folderPath, virtual);
        return;
    }

    /**
     * Changes to a subdirectory by name (does not accept paths)
     */
    public static changeDirectoryByName(folderName: string, virtual: boolean = false): void {
        if(folderName.indexOf("/") > -1) throw new Error("This function does not accept paths.");
        if(folderName === ".."){
            FilesystemService.changeDirectory(FilesystemService.getCurrentFolder(virtual).getParent(), virtual);
            return;
        }
        let folderNames = UtilityService.mapFileStructureToNames(FilesystemService.getCurrentFolder(virtual));
        let folderIndex: number = folderNames.indexOf(folderName);
        if(folderIndex > -1) {
            let folder: Folder = <Folder> FilesystemService.getCurrentFolder(virtual).getChildren()[folderIndex];
            if(folder instanceof Folder){
                FilesystemService.changeDirectory(folder, virtual);
                return;
            }
        }
        throw new Error(`Folder ".${FilesystemService.getVirtualAbsolutePath(FilesystemService.getCurrentFolder(virtual))}/${folderName}" could not be found.`);
    }

    public static getCurrentFolder(virtual: boolean = false): Folder|RootFolder {
        if(!virtual){
            return this.currentFolder;
        }
        else {
            return this.currentVirtualFolder;
        }
    }

    public static resetVirtualDirectory(): void {
        this.currentVirtualFolder = this.currentFolder;
    }

    public static overwriteRealWithVirtualDirectory(): void {
        this.currentFolder = this.currentVirtualFolder;
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