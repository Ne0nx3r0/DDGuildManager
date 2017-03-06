import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class GWD extends BotCommand{
    constructor(){
        super({
            name:'gwditem',
            description:'Withdraws an item(s) from the guild',
            usage: 'gwditem <name> [amount]',
            minParams: 1,
        });
    }

    run(bag:CommandRunBag){
        const commandToForward = bag.params.join(' ');
        const giveTo = bag.message.author.id;

        this.log(bag,'give them '+commandToForward);

        bag.message.channel.sendMessage('#!gwd '+commandToForward);

        setTimeout(function() {
            bag.message.channel.sendMessage(`#!idonate <@${giveTo}> ${commandToForward}`);
        },2000);
    }
}