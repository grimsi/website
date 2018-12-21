window.addEventListener("load", setGreeting, false);
function setGreeting(): void {
    const terminal: HTMLElement | null = document.getElementById("motd");
    if(terminal) {
        terminal.innerText = "Welcome to grimsi.de 1.0.0 LTS (grimsiOS™ 4.15.0-39-stable x86_64)\n" +
            "System information as of " + getCurrentDateString() + "\n" +
            "\n" +
            getPerformanceString() +
            "\n" +
            "* Security for grimsi.de!\n" +
            "We will soon support SSL!\n" +
            "\n" +
            " * This site is in the process of being reworked.\n" +
            "   - please be patient\n" +
            "\n" +
            "0 software packets can be updated.\n" +
            "0 updates and security updates available.\n" +
            "\n" +
            "\n" +
            "*** system reboot required ***\n" +
            "Last login: " + getLastLoginDateString() + " from 87.187.34.178\n";
    }
}

function getCurrentDateString(): string{
    const dateStringOptions = {weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short', hour12: false};
    return new Date().toLocaleDateString("en-US", dateStringOptions).replace(new RegExp(",|\\\.", 'g'),"").concat(" " + new Date().getFullYear());
}

function getLastLoginDateString(): string{
    const now: Date = new Date();
    const dateStringOptions = {weekday: 'short', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false};
    return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", dateStringOptions).replace(new RegExp(",|\\\.", 'g'),"").concat(" " + new Date().getFullYear());
}

function getPerformanceString(): string{
    return "System load:\t" + random(0, 1, 2) + "\t\t\tProcesses:\t\t" + random(0,500) + "\n" +
    "Usage of /:\t" + random(50,100, 0) + "% of " + random(256,1024, 1) + "GB\t\tUsers logged in:\t" + random(1, 5) + "\n" +
    "Memory usage:\t" + random(0,100) + "%\t\t\tIP address for ens3:\t187.58.57.246\n" +
    "Swap usage:\t" + random(0,10) + "%\t\t\tIP address for docker0:\t172.10.0.1\n";
}

function random(min: number, max:number, precision: number=0): number{
    min = Math.ceil(min) * Math.pow(10, precision);
    max = Math.floor(max) * Math.pow(10, precision);
    return (Math.floor(Math.random() * (max - min + 1)) + min) / Math.pow(10, precision);
}