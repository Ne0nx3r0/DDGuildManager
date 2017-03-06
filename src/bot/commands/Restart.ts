import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class Restart extends BotCommand{
    constructor(){
        super({
            name:'restart',
            description:'Restarts the bot',
            usage: 'restart',
            minParams:0,
        });
    }

    run(bag:CommandRunBag){
        bag.message.channel.sendMessage('restarting, '+bag.message.author.username);

        setTimeout(function(){
            process.exit(0);
        },1000);
    }
}