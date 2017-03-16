import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class Echo extends BotCommand{
    constructor(){
        super({
            name:'setplaying',
            description:'Sets the bots current game',
            usage: 'setplaying <game name>',
            minParams:1,
        });
    }

    run(bag:CommandRunBag){
        const gameName = bag.params.join(' ');

        bag.message.channel.sendMessage(`Setting my current game to "${gameName}", ${bag.message.author.username}`);

        bag.bot.setPlayingGame(gameName);
    }
}