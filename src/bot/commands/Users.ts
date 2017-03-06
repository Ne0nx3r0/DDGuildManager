import BotCommand from '../BotCommand';
import { CommandRunBag } from '../BotCommand';
import { User } from "discord.js";

export default class Echo extends BotCommand{
    constructor(){
        super({
            name:'users',
            description:'Lists the users who have access',
            usage: 'users',
            minParams:0,
        });
    }

    run(bag:CommandRunBag){
        (async()=>{
            try{
                let owners:Array<User> = [];

                for(var i=0;i<bag.bot.ownerUIDs.length;i++){
                    const ownerUID = bag.bot.ownerUIDs[i];

                    const owner = await bag.bot.client.users.get(ownerUID);

                    owners.push(owner);
                }

                const ownersStr = owners.map(function(owner){
                    return owner.username+'#'+owner.discriminator;
                }).join('\n');

                bag.message.channel.sendMessage('Owners are:\n'+ownersStr);
            }
            catch(ex){
                bag.message.channel.sendMessage(ex);
            }
        })();
    }
}