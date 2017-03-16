import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class Echo extends BotCommand{
    constructor(){
        super({
            name:'here',
            description:'?',
            usage: 'here',
            minParams:0,
        });
    }

    run(bag:CommandRunBag){
        bag.message.channel.sendMessage('Mingo Mango I am Backo');
    }
}