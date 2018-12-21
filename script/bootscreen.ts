window.addEventListener("load", startBootSequence, false);

function startBootSequence(): void{
    const bootscreen: HTMLElement | null = document.getElementById("bootscreen");
    if(bootscreen){
        setTimeout(() => {
            bootscreen.style.display = "none";
        }, (random(2, 10) * 1000));
    }
}