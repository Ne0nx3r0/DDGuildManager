import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';
import { TextChannel } from 'discord.js';

export default class SetLoggingChannel extends BotCommand{
    constructor(){
        super({
            name: 'setloggingchannel',
            description: 'Sets the bots logging channel id',
            usage: 'setloggingchannel <\#channel>',
            minParams: 1,
        });
    }

    run(bag:CommandRunBag){
        const channel = bag.message.mentions.channels.first();

        bag.bot.setLoggingChannel(channel as TextChannel);

        bag.message.channel.sendMessage(`Now logging in ${channel.name} (${channel.id})`);
    }
}