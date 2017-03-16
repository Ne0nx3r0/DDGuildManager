import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class Pay extends BotCommand{
    constructor(){
        super({
            name:'pay',
            description:'Pays a user with the guild vault',
            usage: 'pay <@user> <amount>',
            minParams:2,
        });
    }

    run(bag:CommandRunBag){
        const giveTo = bag.message.mentions.users.first();
        const amount = bag.params[1];

        if(!giveTo){
            bag.message.channel.sendMessage('Usage: ' + this.usage);
            return;
        }

        this.log(bag,`pay ${giveTo.username} (${giveTo.id})  ${amount} gold`);

        bag.message.channel.sendMessage('#!gwd '+amount);

        setTimeout(function() {
            bag.message.channel.sendMessage(`#!donate ${giveTo} ${amount}`);
        },2000);
    }
}