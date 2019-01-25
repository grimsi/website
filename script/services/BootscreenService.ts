import {UtilityService} from "./UtilityService";

export class BootscreenService{

    public startBootSequence(): void {

    }

    public finishBootSequence(): void {
         const bootscreen: HTMLElement | null = document.getElementById("bootscreen");
         if(bootscreen) {
             setTimeout(() => {
                 if (bootscreen.parentNode) bootscreen.parentNode.removeChild(bootscreen);
             }, UtilityService.random(3,5) * 1000);
         }
    }
}