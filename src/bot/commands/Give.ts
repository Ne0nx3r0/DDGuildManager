import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class GWD extends BotCommand{
    constructor(){
        super({
            name:'give',
            description:'Gives a player an item from the guild',
            usage: 'give <@name> <item> [amount]',
            minParams: 2,
        });
    }

    run(bag:CommandRunBag){
        const giveTo = bag.message.mentions.users.first();
        const commandToForward = bag.params.slice(1).join(' ');

        if(!giveTo){
            bag.message.channel.sendMessage('Usage: ' + this.usage);
            return;
        }

        this.log(bag,`give ${giveTo.username} (${giveTo.id}) ${commandToForward}`);

        bag.message.channel.sendMessage('#!gwditem '+commandToForward);

        setTimeout(function() {
            bag.message.channel.sendMessage(`#!idonate ${giveTo} ${commandToForward}`);
        },2000);
    }
}