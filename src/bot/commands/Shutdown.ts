import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class Shutdown extends BotCommand{
    constructor(){
        super({
            name:'shutdown',
            description:'Causes the bot to log off',
            usage: 'shutdown',
            minParams:0,
        });
    }

    run(bag:CommandRunBag){
        bag.message.channel.sendMessage('Shutting down until manually restarted, '+bag.message.author.username);

        setTimeout(function(){
            bag.bot.client.destroy();

            setInterval(function(){/*will never be :( */}, Number.POSITIVE_INFINITY);
        },1000);
    }
}