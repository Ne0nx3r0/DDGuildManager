import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class Echo extends BotCommand{
    constructor(){
        super({
            name:'echo',
            description:'Replies with whatever is sent to it',
            usage: 'echo <message>',
            minParams:1,
        });
    }

    run(bag:CommandRunBag){
        bag.message.channel.sendMessage(bag.message.author.username+' says '+bag.params.join(' '));
    }
}