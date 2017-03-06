import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';

export default class Echo extends BotCommand{
    constructor(){
        super({
            name:'help',
            description:'Lists commands or tells about a specific command',
            usage: 'help [command]',
            minParams:0,
        });
    }

    run(bag:CommandRunBag){
        if(bag.params.length == 0){
            let commandsStr = '';

            bag.bot.commands.forEach(function(command){
                commandsStr += '\n'+command.name+ ' - ' + command.description;
            });

            bag.message.channel.sendMessage('Here are the available commands:```'+commandsStr+'\n```');
        }
        else{
            const commandName = bag.params[0];
            const command = bag.bot.commands.get(commandName.toUpperCase());

            if(!command){
                bag.message.channel.sendMessage(`I don't know \`${commandName}\`, ${bag.message.author.username}`);
                return;
            }

            bag.message.channel.sendMessage(`
**${command.name}**
${command.description}

Usage: \`${bag.bot.prefix}${command.usage}\`
            `);
        }
    }
}