import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class GWD extends BotCommand{
    constructor(){
        super({
            name:'gwd',
            description:'Withdraws money from the guild',
            usage: 'gwd <amount>',
            minParams:1,
        });
    }

    run(bag:CommandRunBag){
        const amount = bag.params[0];
        const giveTo = bag.message.author.id;

        this.log(bag,'give them '+amount+' gold');

        bag.message.channel.sendMessage('#!gwd '+amount);

        setTimeout(function() {
            bag.message.channel.sendMessage(`#!donate <@${giveTo}> ${amount}`);
        },2000);
    }
}