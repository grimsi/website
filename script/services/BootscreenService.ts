import {UtilityService} from "./UtilityService";

export class BootscreenService{

    private utilityService = new UtilityService();

     public init(): void{
        this.startBootSequence();
    }

    private startBootSequence(): void{
        const bootscreen: HTMLElement | null = document.getElementById("bootscreen");
        if(bootscreen){
            setTimeout(() => {
                bootscreen.style.display = "none";
                }, (this.utilityService.random(3, 5) * 1000));
        }
    }
}