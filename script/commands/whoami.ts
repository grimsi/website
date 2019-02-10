import {ICommand} from "../interfaces/ICommand";
import {CommandHandlerService} from "../services/CommandHandlerService";
import {TerminalService} from "../services/TerminalService";

export class whoami implements ICommand {

    private readonly command: string = whoami.name;

    private readonly description = "outputs info about the current user";

    constructor() {
        CommandHandlerService.registerCommand(this);
    }

    public execute(args?: string[]): Promise<void> {
        return new Promise(function (resolve, reject) {
            let answer = document.createElement('p');
            answer.innerHTML =
                "I believe that the question “Who am I?” can’t be simply answered. Rather, a person needs to create the answer for themselves.<br><br>" +
                "Life isn’t about finding yourself. Everyone is born a blank slate, albeit somewhat defined by things like economic class, prejudices people may have towards you and/or any diseases/disabilities you may be born with. Though most people, when asked that question, generally answer with their name, where they live, and hobbies.<br><br>" +
                "When you go through life you’re creating yourself. You like certain things, you don’t like others. You form opinions and have thoughts. You find activities that you enjoy. You meet people and make friends. You start life from somewhere but you build your own path from there, rather than tracing one laid out before you.<br><br>" +
                "One way to answer the question would be to think of the things you like, some interesting/strange facts about you or maybe even your favorite songs and books. The problem with the question is that because of the aforementioned “building your own path” thing, you can’t really make a person understand who you are with words, because they didn’t experience your life.<br><br>" +
                "But if you’re trying to answer that question for yourself, I think the main thing you can try to do is think of what you like and dislike, how you spend most of your time, what you think makes you an individual and not just a random entity going through life.<br>" +
                "<span style='font-style: normal'>&copy; 2016 <a href=\"https://www.quora.com/How-do-I-answer-the-question-who-am-I\" target=\"_blank\">Daniel Nuta</a></span>";
            answer.setAttribute("style", "font-style: italic;");
            answer.setAttribute("class", "textOutputNotFullscreen");
            TerminalService.outputHTML(answer);
            resolve();
        });
    }

    public getCommand(): string {
        return this.command;
    }

    public getDescription(): string {
        return this.description;
    }
}