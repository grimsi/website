window.addEventListener("load", setTestText, false);

function setTestText(): void {
    const terminal: HTMLElement | null = document.getElementById("terminal");
    if(terminal) {
        terminal.innerText = "Welcome to grimsi.de 1.0.0 LTS (genericOS™ 4.15.0-39-stable x86_64)\n" +
            "System information as of Thu Dec 13 19:48:23 CET 2018\n" +
            "\n" +
            "System load:  0.84                Processes:              181\n" +
            "Usage of /:   25.0% of 153.60GB   Users logged in:        2\n" +
            "Memory usage: 32%                 IP address for ens3:    187.58.57.246\n" +
            "Swap usage:   0%                  IP address for docker0: 172.10.0.1\n" +
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
            "Last login: Thu Dec 13 19:33:50 2018 from 87.187.34.178\n" +
            "grimsi@v22017125440758296:~$\n";
    }
}