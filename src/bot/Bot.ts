/// <reference path='../../node_modules/discord.js/typings/index.d.ts' />

import { Client, Message, TextChannel } from 'discord.js';
import { BotConfig } from "../../Config";
import BotCommand from './BotCommand';
import * as Commands from './ActiveCommands';

export default class DDGuildManagerBot{
    client:Client;
    ownerUIDs:Array<string>;
    channelUIDs:Array<string>;
    mainChannel:TextChannel;
    commands:Map<string,BotCommand>;
    prefix:string;

    constructor(bag:BotConfig){
        this.ownerUIDs = bag.ownerUIDs;
        this.channelUIDs = bag.channelUIDs;
        this.prefix = bag.prefix;

        this.commands = new Map();

        Object.keys(Commands).forEach((commandName)=>{
            const command:BotCommand = new Commands[commandName];

            this.commands.set(command.name.toUpperCase(),command);

/*          command.aliases.forEach((aliasStr)=>{
                this.commands.set(aliasStr.toUpperCase(),command);
            });
*/
        });

        this.client = new Client();

        this.setPlayingGame = this.setPlayingGame.bind(this);

        this.client.on('message',this.handleMessage.bind(this))

        this.client.on('ready',this.handleReady.bind(this));

        this.client.login(bag.token);
    }

    handleReady(){
        this.log(this.client.user.username+ ': now online');

        this.mainChannel = this.client.channels.get(this.channelUIDs[0]) as TextChannel;

        this.mainChannel.sendMessage("I'm online!");
    }

    handleMessage(message:Message){
        //Not my prefix
        if(!message.content.startsWith(this.prefix)){
            return;
        }

        //Not a channel I listen to
        if(this.channelUIDs.indexOf(message.channel.id) == -1){
            return;
        }

        //Not someone I listen to
        if(this.ownerUIDs.indexOf(message.author.id)){
            return;
        }

        const messageStr = message.content.substr(this.prefix.length);
        const params = messageStr.split(' ');
        
        const commandName = params[0];
        const command = this.commands.get(commandName);

        if(!command){
            return;
        }

        command.run({
            params: params,
            message: message,
        });
    }

    setPlayingGame(){

    }

    log(msg:string){
        console.log('['+this.client.user.username+'] '+msg);
    }
}